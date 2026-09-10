<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\CertificationProgram;
use App\Models\EnrollmentCertificationProgram;
use App\Models\Invoice;
use App\Models\ProductInstallmentTerm;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class InstallmentProfileViewsTest extends TestCase
{
    use RefreshDatabase;

    protected User $buyer;
    protected User $otherUser;
    protected CertificationProgram $program;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutVite();

        Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'user']);

        $this->buyer = User::factory()->create([
            'name' => 'Buyer Test',
            'email' => 'buyer@test.com',
        ]);
        $this->buyer->assignRole('user');

        $this->otherUser = User::factory()->create([
            'name' => 'Other User',
            'email' => 'other@test.com',
        ]);
        $this->otherUser->assignRole('user');

        $category = Category::create([
            'name' => 'Sertifikasi',
            'slug' => 'sertifikasi',
        ]);

        $this->program = CertificationProgram::create([
            'title' => 'Sertifikasi Brevet Pajak AB',
            'slug' => 'sertifikasi-brevet-pajak-ab',
            'price' => 1500000,
            'category_id' => $category->id,
            'installment_enabled' => true,
        ]);
    }

    public function test_profile_dashboard_and_transactions_show_installment_accurately_after_termin_1_paid()
    {
        // 1. Setup Parent Invoice
        $parent = Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-CERT-INST-01',
            'amount' => 1500000,
            'nett_amount' => 1500000,
            'status' => 'installment_pending',
            'is_installment' => true,
        ]);

        // Child 1 (Termin 1 / DP)
        $child1 = Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-CERT-INST-01-T1',
            'amount' => 500000,
            'nett_amount' => 500000,
            'status' => 'paid',
            'paid_at' => Carbon::now(),
            'is_installment' => false,
            'parent_invoice_id' => $parent->id,
            'installment_number' => 1,
            'installment_due_date' => Carbon::now()->addDays(3),
        ]);

        // Child 2 (Termin 2)
        $child2 = Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-CERT-INST-01-T2',
            'amount' => 1000000,
            'nett_amount' => 1000000,
            'status' => 'pending',
            'is_installment' => false,
            'parent_invoice_id' => $parent->id,
            'installment_number' => 2,
            'installment_due_date' => Carbon::now()->addDays(30),
        ]);

        // Item on parent invoice (EnrollmentCertificationProgram)
        $parent->certificationProgramItems()->create([
            'certification_program_id' => $this->program->id,
            'price' => 1500000,
        ]);

        // 2. Test /profile/dashboard
        $response = $this->actingAs($this->buyer)->get(route('profile.index'));
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('user/profile/index')
            ->where('stats.certificationPrograms', 1)
            ->where('stats.total', 1)
            ->has('recentProducts', 1, fn (Assert $item) => $item
                ->where('title', 'Sertifikasi Brevet Pajak AB')
                ->where('is_installment', true)
                ->where('is_fully_paid', false)
                ->where('is_suspended', false)
                ->etc()
            )
        );

        // 3. Test /profile/transactions (index)
        $txResponse = $this->actingAs($this->buyer)->get(route('profile.transactions'));
        $txResponse->assertStatus(200);
        $txResponse->assertInertia(fn (Assert $page) => $page
            ->component('user/profile/transaction/index')
            // Should contain parent invoice and NOT separate child invoice
            ->has('myTransactions', 1)
            ->where('myTransactions.0.id', $parent->id)
            ->where('myTransactions.0.is_installment', true)
            ->has('myTransactions.0.installment_terms', 2)
        );

        // 4. Test /profile/transactions/{id} (show)
        $showResponse = $this->actingAs($this->buyer)->get(route('profile.transaction.detail', ['invoice' => $parent->id]));
        $showResponse->assertStatus(200);
        $showResponse->assertInertia(fn (Assert $page) => $page
            ->component('user/profile/transaction/show')
            ->where('invoice.id', $parent->id)
            ->where('invoice.is_installment', true)
            ->has('invoice.installment_terms', 2)
        );

        // 5. Test IDOR protection: other user cannot view buyer's invoice detail
        $unauthResponse = $this->actingAs($this->otherUser)->get(route('profile.transaction.detail', ['invoice' => $parent->id]));
        $unauthResponse->assertStatus(403);
    }

    public function test_profile_dashboard_does_not_count_when_termin_1_unpaid()
    {
        $parent = Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-CERT-UNPAID',
            'amount' => 1500000,
            'nett_amount' => 1500000,
            'status' => 'installment_pending',
            'is_installment' => true,
        ]);

        $child1 = Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-CERT-UNPAID-T1',
            'amount' => 500000,
            'nett_amount' => 500000,
            'status' => 'pending',
            'is_installment' => false,
            'parent_invoice_id' => $parent->id,
            'installment_number' => 1,
            'installment_due_date' => Carbon::now()->addDays(3),
        ]);

        EnrollmentCertificationProgram::create([
            'certification_program_id' => $this->program->id,
            'invoice_id' => $parent->id,
            'price' => 1500000,
        ]);

        $response = $this->actingAs($this->buyer)->get(route('profile.index'));
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('user/profile/index')
            ->where('stats.certificationPrograms', 0)
            ->where('stats.total', 0)
            ->has('recentProducts', 0)
        );
    }
}
