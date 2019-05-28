<?php

namespace App\Filters;

use Carbon\Carbon;

class CreatedFilter
{
    public function filter($builder, $value)
    {
        $start = Carbon::createFromFormat('d/m/Y', explode(',', $value)[0], 'Europe/Athens');
        $end = Carbon::createFromFormat('d/m/Y', explode(',', $value)[1], 'Europe/Athens');

        return $builder->where('created_at', '>', $start)
                       ->where('created_at', '<', $end);
    }
}
