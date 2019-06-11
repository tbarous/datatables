<?php

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
            ReasonsTableSeeder::class,
            StatusesTableSeeder::class,
            PagesTableSeeder::class,
            OperatorTableSeeder::class,
            UsersTableSeeder::class,
            SitesTableSeeder::class,
            CellsTableSeeder::class
        ]);
    }
}
