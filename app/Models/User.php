<?php

namespace App\Models;

use App\Filters\UserFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Traits\ModelTrait;

class User extends Authenticatable
{
    use ModelTrait, Notifiable, HasApiTokens, SoftDeletes;

    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that are shown on tables
     * @var array
     */
    protected $tableData = [
        'username', 'email', 'created_at', 'updated_at'
    ];

    /**
     * The attributes that are filterable
     * @var array
     */
    protected $filterable = [
        'username', 'email'
    ];

    /**
     * The attributes that are filterable
     * @var array
     */
    protected $editable = [
        'username'
    ];

    /**
     * The attributes that are filterable
     * @var array
     */
    protected $sortable = [
        'username'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * [scopeFilter description]
     * @param  Builder $builder [description]
     * @param  [type]  $request [description]
     * @return [type]           [description]
     */
    public function scopeFilter(Builder $builder, $request)
    {
        return (new UserFilter($request))->filter($builder);
    }
}
