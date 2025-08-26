<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            CategorySeeder::class,
            UserSeeder::class,
            AdminSeeder::class,
            EmployeeSeeder::class,
            BillSeeder::class,
            BillCategorySeeder::class,
            EmployeeCategorySeeder::class,
            BillRequestSeeder::class,
            DeviceSeeder::class,
            NotificationSeeder::class,
            RequestResponseSeeder::class,
        ]);
    }
}