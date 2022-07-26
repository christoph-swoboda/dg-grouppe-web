<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = [
            'email' => 'dg-gruppe@admin.com',
            'password' => bcrypt('Civediamo22'),
            'role' => 1,
            'enabled' => true,
            'email_verified_at' => now()
        ];
        User::create($user);
    }
}
