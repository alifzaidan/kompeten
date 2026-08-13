<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("UPDATE users SET referral_code = REPLACE(referral_code, 'AKSA-', 'KOMP-') WHERE referral_code LIKE 'AKSA-%'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("UPDATE users SET referral_code = REPLACE(referral_code, 'KOMP-', 'AKSA-') WHERE referral_code LIKE 'KOMP-%'");
    }
};
