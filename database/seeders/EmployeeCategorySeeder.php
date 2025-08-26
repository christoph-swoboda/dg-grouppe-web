<?php

namespace Database\Seeders;

use App\Models\EmployeeCategory;
use Illuminate\Database\Seeder;

class EmployeeCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 10; $i++) {
            EmployeeCategory::factory()->create([
                'employee_id' => $i,
                'category_id' => rand(1, 4)
            ]);
        }
    }
}
