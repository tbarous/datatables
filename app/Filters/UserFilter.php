<?php

namespace App\Filters;

use App\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class UserFilter extends AbstractFilter
{
    protected $filters = [
        'username' => UsernamesFilter::class,
        'email' => EmailsFilter::class,
        'created_at' => CreatedFilter::class,
        'updated_at' => UpdatedFilter::class,
        'search' => UserGenericFilter::class
    ];
}
