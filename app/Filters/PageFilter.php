<?php

namespace App\Filters;

use App\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class PageFilter extends AbstractFilter
{
    protected $filters = [
        // 'name' => UsernamesFilter::class,
        // 'email' => EmailsFilter::class,
        // 'created_at' => CreatedFilter::class,
        // 'updated_at' => UpdatedFilter::class,
        // 'search' => UserGenericFilter::class
    ];
}
