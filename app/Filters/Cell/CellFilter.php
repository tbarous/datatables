<?php

namespace App\Filters;

use App\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class CellFilter extends AbstractFilter
{
    protected $filters = [
        'name' => NamesFilter::class,
    ];
}
