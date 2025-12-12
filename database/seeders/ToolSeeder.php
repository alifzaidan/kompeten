<?php

namespace Database\Seeders;

use App\Models\Tool;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class ToolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tools = [
            [
                'name' => 'Accurate Online',
                'slug' => Str::slug('Accurate Online'),
                'description' => 'Cloud-based Accounting Software',
                'icon' => null,
            ],
            [
                'name' => 'Jurnal ID by Mekari',
                'slug' => Str::slug('Jurnal ID by Mekari'),
                'description' => 'Online Accounting & Business Management Software',
                'icon' => null,
            ],
            [
                'name' => 'Zahir Accounting',
                'slug' => Str::slug('Zahir Accounting'),
                'description' => 'Desktop Accounting Software',
                'icon' => null,
            ],
            [
                'name' => 'Quick Books',
                'slug' => Str::slug('Quick Books'),
                'description' => 'Accounting Software for Small Business',
                'icon' => null,
            ],
            [
                'name' => 'Xero Accounting',
                'slug' => Str::slug('Xero Accounting'),
                'description' => 'Cloud-based Accounting Platform',
                'icon' => null,
            ],
            [
                'name' => 'Ms. Excel',
                'slug' => Str::slug('Ms. Excel'),
                'description' => 'Spreadsheet Software',
                'icon' => null,
            ],
            [
                'name' => 'Spreadsheets',
                'slug' => Str::slug('Spreadsheets'),
                'description' => 'Data Organization & Analysis Tool',
                'icon' => null,
            ],
            [
                'name' => 'Meta Ads',
                'slug' => Str::slug('Meta Ads'),
                'description' => 'Social Media Advertising Platform',
                'icon' => null,
            ],
            [
                'name' => 'TLS',
                'slug' => Str::slug('TLS'),
                'description' => 'Transport Layer Security Protocol',
                'icon' => null,
            ],
            [
                'name' => 'Coretax',
                'slug' => Str::slug('Coretax'),
                'description' => 'Tax Administration System',
                'icon' => null,
            ],
            [
                'name' => 'Python',
                'slug' => Str::slug('Python'),
                'description' => 'Programming Language',
                'icon' => null,
            ],
            [
                'name' => 'SQL',
                'slug' => Str::slug('SQL'),
                'description' => 'Database Query Language',
                'icon' => null,
            ],
            [
                'name' => 'Gemini AI',
                'slug' => Str::slug('Gemini AI'),
                'description' => 'AI Assistant & Chatbot',
                'icon' => null,
            ],
            [
                'name' => 'Figma',
                'slug' => Str::slug('Figma'),
                'description' => 'Collaborative Design & Prototyping Tool',
                'icon' => null,
            ],
        ];

        foreach ($tools as $tool) {
            Tool::firstOrCreate(['name' => $tool['name']], $tool);
        }
    }
}
