<?php

use App\Models\Cell;
use Illuminate\Database\Seeder;

class CellsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $cell = new Cell();
        $cell->name = 'cellname';
        $cell->status_id = 1;
        $cell->save();

        $cell = new Cell();
        $cell->name = 'cellname2';
        $cell->status_id = 2;
        $cell->save();

        $cell = new Cell();
        $cell->name = 'cellname3';
        $cell->status_id = 2;
        $cell->save();
    }
}
