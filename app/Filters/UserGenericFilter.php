<?php

namespace App\Filters;

class UserGenericFilter
{
    public function filter($builder, $value)
    {
        return $builder->where('username', 'like', '%' . $value . '%');
    }
}
