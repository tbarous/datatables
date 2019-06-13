<?php

namespace App\Filters;

use App\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class PageFilter extends AbstractFilter
{
    protected $filters = [
        'name' => NamesFilter::class,
        'search' => PageGenericFilter::class
    ];
}
