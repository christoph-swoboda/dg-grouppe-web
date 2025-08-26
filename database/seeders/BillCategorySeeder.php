<?php

namespace Database\Seeders;

use App\Models\BillCategory;
use Illuminate\Database\Seeder;

class BillCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 10; $i++) {
            BillCategory::factory()->create([
                'bill_id' => $i,
                'category_id' => rand(1, 4)
            ]);
        }
    }
}
