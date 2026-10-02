<?php

use App\Models\User;
use Database\Seeders\StaffPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->withoutVite();

    Role::firstOrCreate(['name' => 'admin']);
    Role::firstOrCreate(['name' => 'user']);
    Role::firstOrCreate(['name' => 'staff']);

    $this->seed(StaffPermissionSeeder::class);
});

test('admin can view staff index page', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $response = $this->actingAs($admin)->get('/admin/staff');

    $response->assertOk();
});

test('admin can create a staff member with permissions', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $payload = [
        'name' => 'Staff John',
        'email' => 'john.staff@kompeten.id',
        'phone_number' => '081234567890',
        'password' => 'password123',
        'permissions' => ['courses.view', 'courses.manage', 'articles.view'],
    ];

    $response = $this->actingAs($admin)->post('/admin/staff', $payload);

    $response->assertRedirect('/admin/staff');

    $staff = User::where('email', 'john.staff@kompeten.id')->first();
    expect($staff)->not->toBeNull()
        ->and($staff->hasRole('staff'))->toBeTrue()
        ->and($staff->hasPermissionTo('courses.view'))->toBeTrue()
        ->and($staff->hasPermissionTo('courses.manage'))->toBeTrue()
        ->and($staff->hasPermissionTo('articles.view'))->toBeTrue()
        ->and($staff->hasPermissionTo('users.view'))->toBeFalse();
});

test('admin can update staff member and sync permissions', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $staff = User::factory()->create(['name' => 'Old Staff', 'phone_number' => '081234567890']);
    $staff->assignRole('staff');
    $staff->givePermissionTo(['courses.view', 'courses.manage']);

    $response = $this->actingAs($admin)->put("/admin/staff/{$staff->id}", [
        'name' => 'Updated Staff',
        'email' => $staff->email,
        'phone_number' => '081234567890',
        'permissions' => ['articles.view', 'articles.manage'],
    ]);

    $response->assertRedirect('/admin/staff');

    $staff->refresh();
    expect($staff->name)->toBe('Updated Staff')
        ->and($staff->hasPermissionTo('articles.view'))->toBeTrue()
        ->and($staff->hasPermissionTo('articles.manage'))->toBeTrue()
        ->and($staff->hasPermissionTo('courses.view'))->toBeFalse();
});

test('admin can delete a staff member', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $staff = User::factory()->create();
    $staff->assignRole('staff');

    $response = $this->actingAs($admin)->delete("/admin/staff/{$staff->id}");

    $response->assertRedirect('/admin/staff');
    $this->assertDatabaseMissing('users', ['id' => $staff->id]);
});

test('staff cannot access staff management module', function () {
    $staff = User::factory()->create();
    $staff->assignRole('staff');

    $response = $this->actingAs($staff)->get('/admin/staff');

    $response->assertForbidden();
});

test('staff without permission gets 403 on protected module', function () {
    $staff = User::factory()->create();
    $staff->assignRole('staff');

    $response = $this->actingAs($staff)->get('/admin/courses');

    $response->assertForbidden();
});

test('staff with view permission can access index but not create', function () {
    $staff = User::factory()->create();
    $staff->assignRole('staff');
    $staff->givePermissionTo('courses.view');

    $indexResponse = $this->actingAs($staff)->get('/admin/courses');
    $indexResponse->assertOk();

    $createResponse = $this->actingAs($staff)->get('/admin/courses/create');
    $createResponse->assertForbidden();
});

test('staff with manage permission can access create and store', function () {
    $staff = User::factory()->create();
    $staff->assignRole('staff');
    $staff->givePermissionTo(['courses.view', 'courses.manage']);

    $createResponse = $this->actingAs($staff)->get('/admin/courses/create');
    $createResponse->assertOk();
});

test('staff can access staff dashboard', function () {
    $staff = User::factory()->create();
    $staff->assignRole('staff');
    $staff->givePermissionTo(['courses.view', 'articles.view']);

    $response = $this->actingAs($staff)->get('/admin/dashboard');

    $response->assertOk();
});
