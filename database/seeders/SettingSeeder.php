<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Setting::factory()->create([
            'keyword' => 'faq',
            'value' => 'Dies ist ein Demotext für die Informationsseite

Dies ist ein Demotext für die Informationsseite

Dies ist ein Demotext für die Informationsseite',
        ]);
    }
}
