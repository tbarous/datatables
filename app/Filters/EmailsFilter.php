<?php

namespace App\Filters;

class EmailsFilter
{
    public function filter($builder, $value)
    {
        return $builder->where('email', 'like', '%' . $value . '%');
    }
}
