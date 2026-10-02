<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class GenerateReferralCodes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-referral-codes';

    /**
     * The command aliases.
     *
     * @var array
     */
    protected $aliases = ['app:generate-referral-code'];

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate unique referral codes for existing users whose referral_code is null';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('--> Command generate referral code MULAI berjalan...');
        \Illuminate\Support\Facades\Log::info('Command generate-referral-codes dipanggil.');

        $users = User::whereNull('referral_code')->orWhere('referral_code', '')->get();
        $count = $users->count();

        $this->info("Jumlah user tanpa referral code: {$count}");

        if ($count === 0) {
            $this->info('Semua user sudah memiliki referral code.');
            return 0;
        }

        $this->info("Menghasilkan referral code untuk {$count} user...");

        $bar = $this->output->createProgressBar($count);
        $bar->start();

        foreach ($users as $user) {
            do {
                $code = 'KOMP-' . strtoupper(Str::random(6));
            } while (User::where('referral_code', $code)->exists());

            $user->update([
                'referral_code' => $code
            ]);

            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info("Berhasil membuat referral code untuk {$count} user.");

        return 0;
    }
}
