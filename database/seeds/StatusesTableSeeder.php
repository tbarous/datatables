<?php

use App\Models\Status;
use Illuminate\Database\Seeder;

class StatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $status = new Status();
        $status->name = 'down';
        $status->reason_id = 1;
        $status->save();

        $status = new Status();
        $status->name = 'halted';
        $status->reason_id = 1;
        $status->save();
    }
}
