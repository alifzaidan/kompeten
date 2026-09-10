<?php

namespace Tests\Feature;

use App\Models\AffiliateEarning;
use App\Models\Bootcamp;
use App\Models\Category;
use App\Models\EnrollmentBootcamp;
use App\Models\Invoice;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class InstallmentSecurityHardeningTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected User $mentor;
    protected User $buyer;
    protected User $otherBuyer;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutVite();

        Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'mentor']);
        Role::firstOrCreate(['name' => 'user']);
        Role::firstOrCreate(['name' => 'affiliate']);

        $this->admin = User::factory()->create(['email' => 'admin@security.test']);
        $this->admin->assignRole('admin');

        $this->mentor = User::factory()->create(['email' => 'mentor@security.test']);
        $this->mentor->assignRole('mentor');

        $this->buyer = User::factory()->create(['email' => 'buyer@security.test', 'phone_number' => '0811111111']);
        $this->buyer->assignRole('user');

        $this->otherBuyer = User::factory()->create(['email' => 'other@security.test']);
        $this->otherBuyer->assignRole('user');
    }

    /**
     * Security Check 1: Route RBAC protection
     */
    public function test_installment_admin_routes_forbidden_for_regular_user_and_mentor()
    {
        // Mentor should receive 403 Forbidden
        $response = $this->actingAs($this->mentor)->post(route('admin.installment-terms.store'), [
            'type' => 'bootcamp',
            'id' => '1',
            'installment_enabled' => true,
            'terms' => [
                ['term_number' => 1, 'amount' => 500000, 'due_date' => now()->toDateString()],
                ['term_number' => 2, 'amount' => 500000, 'due_date' => now()->addDays(30)->toDateString()],
            ],
        ]);
        $response->assertStatus(403);

        // Regular buyer should also receive 403 Forbidden
        $response = $this->actingAs($this->buyer)->post(route('admin.installment-terms.store'), [
            'type' => 'bootcamp',
            'id' => '1',
            'installment_enabled' => true,
            'terms' => [
                ['term_number' => 1, 'amount' => 500000, 'due_date' => now()->toDateString()],
                ['term_number' => 2, 'amount' => 500000, 'due_date' => now()->addDays(30)->toDateString()],
            ],
        ]);
        $response->assertStatus(403);
    }

    /**
     * Security Check 2: Validation - count(terms) >= 2 and sum(terms) >= product price
     */
    public function test_installment_term_creation_requires_minimum_two_terms_and_full_price_sum()
    {
        $category = Category::create(['name' => 'IT', 'slug' => 'it']);
        $bootcamp = Bootcamp::create([
            'title' => 'Web Dev Bootcamp',
            'slug' => 'web-dev-bootcamp',
            'price' => 1000000,
            'category_id' => $category->id,
            'start_date' => now()->addDays(5),
            'end_date' => now()->addDays(60),
            'is_published' => true,
        ]);

        // Attempt 1: Only 1 term -> should fail validation (HTTP 422 JSON)
        $response = $this->actingAs($this->admin)->postJson(route('admin.installment-terms.store'), [
            'type' => 'bootcamp',
            'id' => (string) $bootcamp->id,
            'installment_enabled' => true,
            'terms' => [
                ['term_number' => 1, 'amount' => 1000000, 'due_date' => now()->toDateString()],
            ],
        ]);
        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => 'Minimal harus ada 2 termin cicilan.'
            ]);

        // Attempt 2: Sum < product price (only 800.000 < 1.000.000) -> should fail validation (HTTP 422 JSON)
        $response = $this->actingAs($this->admin)->postJson(route('admin.installment-terms.store'), [
            'type' => 'bootcamp',
            'id' => (string) $bootcamp->id,
            'installment_enabled' => true,
            'terms' => [
                ['term_number' => 1, 'amount' => 400000, 'due_date' => now()->toDateString()],
                ['term_number' => 2, 'amount' => 400000, 'due_date' => now()->addDays(30)->toDateString()],
            ],
        ]);
        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => 'Total nominal cicilan tidak boleh kurang dari harga produk.'
            ]);

        // Attempt 3: Valid 2 terms with sum 1.000.000 -> succeeds
        $response = $this->actingAs($this->admin)->postJson(route('admin.installment-terms.store'), [
            'type' => 'bootcamp',
            'id' => (string) $bootcamp->id,
            'installment_enabled' => true,
            'terms' => [
                ['term_number' => 1, 'amount' => 500000, 'due_date' => now()->toDateString()],
                ['term_number' => 2, 'amount' => 500000, 'due_date' => now()->addDays(30)->toDateString()],
            ],
        ]);
        $response->assertStatus(200)
            ->assertJson(['success' => true]);
    }

    /**
     * Security Check 3: IDOR protection on invoice PDF download
     */
    public function test_invoice_pdf_download_prevents_idor_for_other_users()
    {
        $buyerInvoice = Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-SEC-001',
            'amount' => 500000,
            'nett_amount' => 500000,
            'status' => 'paid',
            'is_installment' => false,
        ]);

        // otherBuyer attempts to download buyerInvoice -> 403
        $response = $this->actingAs($this->otherBuyer)->get(route('invoice.pdf', $buyerInvoice->id));
        $response->assertStatus(403);
    }

    /**
     * Security Check 4: Affiliate commission duplicate prevention (idempotency)
     */
    public function test_affiliate_commission_is_idempotent_on_duplicate_recording()
    {
        $affiliate = User::factory()->create([
            'affiliate_code' => 'AFFTEST',
            'affiliate_status' => 'Active',
            'commission' => 10,
        ]);
        $affiliate->assignRole('affiliate');

        $invoice = Invoice::create([
            'user_id' => $this->buyer->id,
            'referred_by_user_id' => $affiliate->id,
            'invoice_code' => 'KMT-AFF-001',
            'amount' => 1000000,
            'nett_amount' => 1000000,
            'affiliate_code' => 'AFFTEST',
            'status' => 'paid',
            'is_installment' => false,
        ]);

        $controller = new \App\Http\Controllers\InvoiceController();
        $recordMethod = new \ReflectionMethod($controller, 'recordAffiliateCommission');
        $recordMethod->setAccessible(true);

        // First call
        $recordMethod->invoke($controller, $invoice);
        $this->assertEquals(1, AffiliateEarning::where('invoice_id', $invoice->id)->count());

        // Simulated webhook retry / duplicate call
        $recordMethod->invoke($controller, $invoice);
        $this->assertEquals(1, AffiliateEarning::where('invoice_id', $invoice->id)->count());
    }

    /**
     * Security Check 5: Certificate download & preview blocked when installment active & not fully paid
     */
    public function test_certificate_download_and_preview_forbidden_when_installment_not_fully_paid()
    {
        $category = Category::create(['name' => 'Data', 'slug' => 'data']);
        $bootcamp = Bootcamp::create([
            'title' => 'Data Science Bootcamp',
            'slug' => 'data-science-bootcamp',
            'price' => 1000000,
            'category_id' => $category->id,
            'start_date' => now()->subDays(60),
            'end_date' => now()->subDays(5),
            'is_published' => true,
        ]);

        // Parent invoice with active installment (not yet fully paid)
        $parentInvoice = Invoice::create([
            'user_id' => $this->buyer->id,
            'invoice_code' => 'KMT-CERT-001',
            'amount' => 1000000,
            'nett_amount' => 1000000,
            'status' => 'installment_pending',
            'is_installment' => true,
        ]);

        // Child term 1 (paid)
        Invoice::create([
            'user_id' => $this->buyer->id,
            'parent_invoice_id' => $parentInvoice->id,
            'invoice_code' => 'KMT-CERT-001-1',
            'amount' => 500000,
            'nett_amount' => 500000,
            'installment_number' => 1,
            'status' => 'paid',
            'is_installment' => true,
        ]);

        // Child term 2 (still pending)
        Invoice::create([
            'user_id' => $this->buyer->id,
            'parent_invoice_id' => $parentInvoice->id,
            'invoice_code' => 'KMT-CERT-001-2',
            'amount' => 500000,
            'nett_amount' => 500000,
            'installment_number' => 2,
            'status' => 'pending',
            'is_installment' => true,
        ]);

        // Link enrollment
        EnrollmentBootcamp::create([
            'invoice_id' => $parentInvoice->id,
            'bootcamp_id' => $bootcamp->id,
            'price' => 1000000,
            'attendance_verified' => true,
            'review' => 'Great bootcamp',
            'rating' => 5,
        ]);

        // Try download certificate while installment is not fully paid -> should be rejected
        $response = $this->actingAs($this->buyer)->get(route('profile.bootcamp.certificate', $bootcamp->slug));
        $response->assertSessionHas('error', 'Sertifikat kelulusan hanya dapat diunduh setelah seluruh termin cicilan lunas.');

        // Try preview certificate while installment is not fully paid -> should be rejected
        $previewResponse = $this->actingAs($this->buyer)->get(route('profile.bootcamp.certificate.preview', $bootcamp->slug));
        $previewResponse->assertSessionHas('error', 'Sertifikat kelulusan hanya dapat diunduh setelah seluruh termin cicilan lunas.');
    }
}
