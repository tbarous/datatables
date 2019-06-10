<?php

use App\Models\Operator;
use Illuminate\Database\Seeder;

class OperatorTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $operators = ['Vodafone', 'Wind'];
        foreach ($operators as $key => $operator) {
            $op = new Operator();
            $op->name = $operator;
            $op->save();
        }
    }
}
