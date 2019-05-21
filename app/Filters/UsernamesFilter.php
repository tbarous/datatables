<?php

namespace App\Filters;

class UsernamesFilter
{
    public function filter($builder, $value)
    {
        return $builder->where('username', 'like', '%' . $value . '%');
    }
}
