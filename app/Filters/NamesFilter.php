<?php

namespace App\Filters;

class NamesFilter
{
    public function filter($builder, $value)
    {
        return $builder->where('name', 'like', '%' . $value . '%');
    }
}
