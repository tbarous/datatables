<?php

namespace App\Filters;

class PageGenericFilter
{
    public function filter($builder, $value)
    {
        return $builder->where('name', 'like', '%' . $value . '%');
    }
}
