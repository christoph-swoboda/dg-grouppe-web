<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        User::factory()->count(10)->create();

        User::factory()->create([
            'email' => 'dggruppe@admin.com',
            'password' => Hash::make('admindginvoice2025'),
            'role' => 1,
            'enabled' => 1,
        ]);
    }
}
