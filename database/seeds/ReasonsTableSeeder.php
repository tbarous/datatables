<?php

use App\Models\Reason;
use Illuminate\Database\Seeder;

class ReasonsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $reason = new Reason();
        $reason->description = 'IT broke :(';
        $reason->save();
    }
}
