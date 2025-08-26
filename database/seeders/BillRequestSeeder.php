<?php

namespace Database\Seeders;

use App\Models\BillRequest;
use Illuminate\Database\Seeder;

class BillRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 10; $i++) {
            BillRequest::factory()->create([
                'user_id' => $i,
                'bill_id' => $i,
                'category_id' => rand(1, 4),
                'published' => rand(0, 1),
                'status' => rand(1, 3),
            ]);
        }
    }
}
