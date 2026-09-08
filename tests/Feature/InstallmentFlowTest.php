<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\CertificationProgram;
use App\Models\EnrollmentCertificationProgram;
use App\Models\Invoice;
use App\Models\ProductInstallmentTerm;
use App\Models\User;
use App\Services\DokuService;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Mockery;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class InstallmentFlowTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected User $buyer;
    protected CertificationProgram $program;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutVite();

        Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'user']);
        Role::firstOrCreate(['name' => 'affiliate']);

        $this->admin = User::factory()->create(['email' => 'admin@test.com']);
        $this->admin->assignRole('admin');

        $this->buyer = User::factory()->create([
            'name' => 'Buyer Test',
            'email' => 'buyer@test.com',
            'phone_number' => '081234567890',
        ]);
        $this->buyer->assignRole('user');

        $category = Category::create([
            'name' => 'Perpajakan',
            'slug' => 'perpajakan',
        ]);

        $this->program = CertificationProgram::create([
            'title' => 'Sertifikasi Konsultan Pajak A',
            'slug' => 'sertifikasi-konsultan-pajak-a',
            'price' => 1000000,
            'category_id' => $category->id,
            'installment_enabled' => true,
        ]);
    }

    /**
     * Test 1: Helper methods and scopes on Invoice model
     */
    public function test_invoice_model_installment_helpers_and_scopes()
    {
        // 1. Parent Invoice
        $parent = Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-INST-001',
            'amount' => 1000000,
            'nett_amount' => 1000000,
            'status' => 'installment_pending',
            'is_installment' => true,
        ]);

        // 2. Child Invoices (Terms)
        $child1 = Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-INST-001-T1',
            'amount' => 400000,
            'nett_amount' => 400000,
            'status' => 'pending',
            'is_installment' => false,
            'parent_invoice_id' => $parent->id,
            'installment_number' => 1,
            'installment_due_date' => Carbon::now()->addDays(5),
        ]);

        $child2 = Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-INST-001-T2',
            'amount' => 600000,
            'nett_amount' => 600000,
            'status' => 'pending',
            'is_installment' => false,
            'parent_invoice_id' => $parent->id,
            'installment_number' => 2,
            'installment_due_date' => Carbon::now()->addDays(15),
        ]);

        $this->assertTrue($parent->isInstallmentParent());
        $this->assertFalse($parent->isInstallmentChild());
        $this->assertTrue($child1->isInstallmentChild());
        $this->assertFalse($child1->isInstallmentParent());
        $this->assertFalse($parent->isFullyPaid());
        $this->assertEquals(0, $parent->paidTermsCount());
        $this->assertEquals($child1->id, $parent->nextUnpaidTerm()->id);

        // Before paying DP, scopePurchasedByUser should not return this parent
        $this->assertCount(0, Invoice::purchasedByUser($this->buyer->id)->get());

        // Pay DP (Term 1)
        $child1->update(['status' => 'paid', 'paid_at' => Carbon::now()]);

        $this->assertEquals(1, $parent->paidTermsCount());
        $this->assertFalse($parent->isFullyPaid());
        $this->assertEquals($child2->id, $parent->nextUnpaidTerm()->id);

        // After DP is paid, scopePurchasedByUser and scopeAccessibleForUser should include parent
        $this->assertCount(1, Invoice::purchasedByUser($this->buyer->id)->get());
        $this->assertCount(1, Invoice::accessibleForUser($this->buyer->id)->get());

        // Suspend access
        $parent->update(['access_suspended_at' => Carbon::now()]);
        $this->assertTrue($parent->isAccessSuspended());
        // Purchased still counts it, but accessible excludes it
        $this->assertCount(1, Invoice::purchasedByUser($this->buyer->id)->get());
        $this->assertCount(0, Invoice::accessibleForUser($this->buyer->id)->get());

        // Pay Term 2 (Final) and clear suspension
        $child2->update(['status' => 'paid', 'paid_at' => Carbon::now()]);
        $parent->update(['status' => 'paid', 'access_suspended_at' => null]);

        $this->assertTrue($parent->isFullyPaid());
        $this->assertNull($parent->nextUnpaidTerm());
        $this->assertCount(1, Invoice::accessibleForUser($this->buyer->id)->get());
    }

    /**
     * Test 2: Revenue calculation query correctly excludes parent installment to prevent double counting
     */
    public function test_revenue_calculation_is_accurate_and_not_double_counted()
    {
        // 1. Regular direct purchase: Rp 500.000
        Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-REG-001',
            'amount' => 500000,
            'nett_amount' => 500000,
            'status' => 'paid',
            'is_installment' => false,
            'paid_at' => Carbon::now(),
        ]);

        // 2. Installment parent invoice: Rp 1.000.000 (status: paid when completed)
        $parent = Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-INST-002',
            'amount' => 1000000,
            'nett_amount' => 1000000,
            'status' => 'paid',
            'is_installment' => true,
            'paid_at' => Carbon::now(),
        ]);

        // 3. Term 1 (DP): Rp 400.000 (status: paid)
        Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-INST-002-T1',
            'amount' => 400000,
            'nett_amount' => 400000,
            'status' => 'paid',
            'is_installment' => false,
            'parent_invoice_id' => $parent->id,
            'installment_number' => 1,
            'paid_at' => Carbon::now(),
        ]);

        // 4. Term 2: Rp 600.000 (status: paid)
        Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-INST-002-T2',
            'amount' => 600000,
            'nett_amount' => 600000,
            'status' => 'paid',
            'is_installment' => false,
            'parent_invoice_id' => $parent->id,
            'installment_number' => 2,
            'paid_at' => Carbon::now(),
        ]);

        // Revenue query: paid regular direct invoices + paid child term invoices
        $revenueQuery = Invoice::where('status', 'paid')
            ->where(function ($q) {
                $q->where(function ($sq) {
                    $sq->whereNull('parent_invoice_id')->where('is_installment', false);
                })->orWhereNotNull('parent_invoice_id');
            });

        $totalRevenue = $revenueQuery->sum('nett_amount');

        // Expected: 500.000 (regular) + 400.000 (T1) + 600.000 (T2) = 1.500.000
        $this->assertEquals(1500000, $totalRevenue);
    }

    /**
     * Test 3: Overdue command automatically suspends access when term is past due
     */
    public function test_check_installment_overdue_command_suspends_access()
    {
        $parent = Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-INST-003',
            'amount' => 1000000,
            'nett_amount' => 1000000,
            'status' => 'installment_pending',
            'is_installment' => true,
        ]);

        // Term 1 (DP) paid
        Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-INST-003-T1',
            'amount' => 400000,
            'nett_amount' => 400000,
            'status' => 'paid',
            'is_installment' => false,
            'parent_invoice_id' => $parent->id,
            'installment_number' => 1,
            'paid_at' => Carbon::now()->subDays(10),
        ]);

        // Term 2 is pending and overdue (due 2 days ago)
        Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-INST-003-T2',
            'amount' => 600000,
            'nett_amount' => 600000,
            'status' => 'pending',
            'is_installment' => false,
            'parent_invoice_id' => $parent->id,
            'installment_number' => 2,
            'installment_due_date' => Carbon::now()->subDays(2),
        ]);

        $this->assertNull($parent->access_suspended_at);

        // Run artisan command
        Artisan::call('installment:check-overdue');

        $parent->refresh();
        $this->assertNotNull($parent->access_suspended_at);
        $this->assertTrue($parent->isAccessSuspended());
    }

    /**
     * Test 4: Cannot pay overdue term online via payTerm
     */
    public function test_cannot_pay_overdue_term_online()
    {
        $parent = Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-INST-004',
            'amount' => 1000000,
            'nett_amount' => 1000000,
            'status' => 'installment_pending',
            'is_installment' => true,
        ]);

        // Term 1 (DP) paid
        Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-INST-004-T1',
            'amount' => 400000,
            'nett_amount' => 400000,
            'status' => 'paid',
            'is_installment' => false,
            'parent_invoice_id' => $parent->id,
            'installment_number' => 1,
            'paid_at' => Carbon::now()->subDays(10),
        ]);

        // Term 2 is overdue
        Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-INST-004-T2',
            'amount' => 600000,
            'nett_amount' => 600000,
            'status' => 'pending',
            'is_installment' => false,
            'parent_invoice_id' => $parent->id,
            'installment_number' => 2,
            'installment_due_date' => Carbon::now()->subDays(2),
        ]);

        $response = $this->actingAs($this->buyer)
            ->postJson("/installment/{$parent->id}/pay");

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => 'Batas waktu pembayaran untuk termin ini telah melewati jatuh tempo. Pembayaran online ditutup, silakan hubungi admin untuk penyelesaian cicilan.',
            ]);
    }

    /**
     * Test 5: Active installment guard prevents duplicate installment and check-email returns active installment
     */
    public function test_active_installment_guard_prevents_duplicate_installment_and_check_email_detects_it()
    {
        // Setup installment terms for program
        ProductInstallmentTerm::create([
            'termable_type' => CertificationProgram::class,
            'termable_id' => $this->program->id,
            'term_number' => 1,
            'amount' => 400000,
            'due_date' => Carbon::now()->addDays(5),
        ]);
        ProductInstallmentTerm::create([
            'termable_type' => CertificationProgram::class,
            'termable_id' => $this->program->id,
            'term_number' => 2,
            'amount' => 600000,
            'due_date' => Carbon::now()->addDays(20),
        ]);

        // Create active installment for buyer
        $parent = Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-INST-005',
            'amount' => 1000000,
            'nett_amount' => 1000000,
            'status' => 'installment_pending',
            'is_installment' => true,
        ]);

        EnrollmentCertificationProgram::create([
            'invoice_id' => $parent->id,
            'certification_program_id' => $this->program->id,
            'price' => 1000000,
        ]);

        Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-INST-005-T1',
            'amount' => 400000,
            'nett_amount' => 400000,
            'status' => 'paid',
            'is_installment' => false,
            'parent_invoice_id' => $parent->id,
            'installment_number' => 1,
            'paid_at' => Carbon::now(),
        ]);

        Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-INST-005-T2',
            'amount' => 600000,
            'nett_amount' => 600000,
            'status' => 'pending',
            'is_installment' => false,
            'parent_invoice_id' => $parent->id,
            'installment_number' => 2,
            'installment_due_date' => Carbon::now()->addDays(15),
        ]);

        // 1. Trying to create another installment for the same program returns 422
        $response = $this->actingAs($this->buyer)
            ->postJson('/invoice/installment', [
                'type' => 'certification_program',
                'id' => $this->program->id,
            ]);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => 'Anda memiliki transaksi cicilan yang sedang aktif untuk program ini. Silakan lanjutkan pembayaran termin cicilan Anda.',
            ]);

        // 2. /api/check-email returns active_installment
        $checkEmailResponse = $this->postJson('/api/check-email', [
            'email' => $this->buyer->email,
            'program_id' => $this->program->id,
        ]);

        $checkEmailResponse->assertStatus(200)
            ->assertJson([
                'exists' => true,
                'active_installment' => [
                    'parent_invoice_id' => $parent->id,
                    'is_fully_paid' => false,
                    'paid_terms' => 1,
                    'total_terms' => 2,
                ],
            ]);
    }

    /**
     * Test 6: Store installment creates parent and terms with payment URL
     */
    public function test_store_installment_creates_parent_and_terms_with_doku_url()
    {
        ProductInstallmentTerm::create([
            'termable_type' => CertificationProgram::class,
            'termable_id' => $this->program->id,
            'term_number' => 1,
            'amount' => 400000,
            'due_date' => Carbon::now()->addDays(5),
        ]);
        ProductInstallmentTerm::create([
            'termable_type' => CertificationProgram::class,
            'termable_id' => $this->program->id,
            'term_number' => 2,
            'amount' => 600000,
            'due_date' => Carbon::now()->addDays(20),
        ]);

        // Mock DokuService
        $mockDoku = Mockery::mock(DokuService::class);
        $mockDoku->shouldReceive('createCheckout')
            ->once()
            ->andReturn([
                'response' => [
                    'payment' => [
                        'url' => 'https://mock.doku.com/checkout/12345',
                    ],
                ],
            ]);
        $this->app->instance(DokuService::class, $mockDoku);

        $response = $this->actingAs($this->buyer)
            ->postJson('/invoice/installment', [
                'type' => 'certification_program',
                'id' => $this->program->id,
            ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'payment_url' => 'https://mock.doku.com/checkout/12345',
                'dp_amount' => 400000,
                'total_terms' => 2,
            ]);

        $parent = Invoice::where('user_id', $this->buyer->id)
            ->where('is_installment', true)
            ->first();

        $this->assertNotNull($parent);
        $this->assertEquals('installment_pending', $parent->status);
        $this->assertEquals(1000000, $parent->amount);

        $terms = $parent->installmentTerms()->orderBy('installment_number')->get();
        $this->assertCount(2, $terms);
        $this->assertEquals(400000, $terms[0]->amount);
        $this->assertEquals('https://mock.doku.com/checkout/12345', $terms[0]->invoice_url);
        $this->assertEquals(600000, $terms[1]->amount);
    }

    /**
     * Test 7: PayTerm generates payment URL for next unpaid term
     */
    public function test_pay_term_generates_payment_url_for_next_unpaid_term()
    {
        $parent = Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-INST-007',
            'amount' => 1000000,
            'nett_amount' => 1000000,
            'status' => 'installment_pending',
            'is_installment' => true,
        ]);

        EnrollmentCertificationProgram::create([
            'invoice_id' => $parent->id,
            'certification_program_id' => $this->program->id,
            'price' => 1000000,
        ]);

        // Term 1 paid
        Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-INST-007-T1',
            'amount' => 400000,
            'nett_amount' => 400000,
            'status' => 'paid',
            'is_installment' => false,
            'parent_invoice_id' => $parent->id,
            'installment_number' => 1,
            'paid_at' => Carbon::now()->subDays(5),
        ]);

        // Term 2 pending and NOT overdue
        $term2 = Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-INST-007-T2',
            'amount' => 600000,
            'nett_amount' => 600000,
            'status' => 'pending',
            'is_installment' => false,
            'parent_invoice_id' => $parent->id,
            'installment_number' => 2,
            'installment_due_date' => Carbon::now()->addDays(10),
        ]);

        // Mock DokuService
        $mockDoku = Mockery::mock(DokuService::class);
        $mockDoku->shouldReceive('createCheckout')
            ->once()
            ->andReturn([
                'response' => [
                    'payment' => [
                        'url' => 'https://mock.doku.com/checkout/term2-67890',
                    ],
                ],
            ]);
        $this->app->instance(DokuService::class, $mockDoku);

        $response = $this->actingAs($this->buyer)
            ->postJson("/installment/{$parent->id}/pay");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'payment_url' => 'https://mock.doku.com/checkout/term2-67890',
                'term_number' => 2,
                'amount' => 600000,
            ]);

        $term2->refresh();
        $this->assertEquals('https://mock.doku.com/checkout/term2-67890', $term2->invoice_url);
    }
}
