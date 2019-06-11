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
        $cell->save();
    }
}
