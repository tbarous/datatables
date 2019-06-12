<?php

namespace App\Filters;

use App\Models\Status;

class StatusFilter
{
    public function filter($builder, $value)
    {
        $status = Status::where('name', $value)->first();

        return $builder->where('status_id', $status->id);
    }
}
