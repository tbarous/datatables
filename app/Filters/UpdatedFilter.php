<?php

namespace App\Filters;

use Carbon\Carbon;

class UpdatedFilter
{
    public function filter($builder, $value)
    {
        $value = str_replace('%20', ' ', $value);
        $start = explode(' - ', $value)[0];
        $end = explode(' - ', $value)[1];

        $start = Carbon::createFromFormat('d/m/Y H:i', $start);
        $end = Carbon::createFromFormat('d/m/Y H:i', $end);

        return $builder->where('created_at', '>', $start)
                       ->where('created_at', '<', $end);
    }
}
