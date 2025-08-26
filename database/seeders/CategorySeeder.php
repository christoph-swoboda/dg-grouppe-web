<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            [
                'title' => 'Bahn',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'PKW',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Telefon',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Internet',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
