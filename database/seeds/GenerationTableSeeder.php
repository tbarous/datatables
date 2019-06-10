<?php

use App\Models\Generation;
use Illuminate\Database\Seeder;

class GenerationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $generations = ['GSM', 'UMTS', 'LTE'];
        foreach ($generations as $key => $generation) {
            $gen = new Generation();
            $gen->name = $generation;
            $gen->save();
        }
    }
}
