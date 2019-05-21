<?php

namespace App\Filters;

use App\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class UserFilter extends AbstractFilter
{
    protected $filters = [
        'username' => UsernamesFilter::class,
        'email' => EmailsFilter::class,
        'created_at' => Created::class,
        'updated_at' => Updated::class,
        'search' => UserGenericFilter::class
    ];
}
