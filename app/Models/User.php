<?php

namespace App\Models;

use App\Filters\UserFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Traits\DatatableTrait;

class User extends Authenticatable
{
    use DatatableTrait, Notifiable, HasApiTokens, SoftDeletes;

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
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The datatable attributes
     * @var array
     */
    protected $names = ['username', 'email', 'created_at','updated_at'];
    protected $types = ['text', 'text', 'date', 'date'];
    protected $values = ['username', 'email', 'created_at', 'updated_at'];
    protected $filterable = ['username', 'email'];
    protected $editable = ['username', 'email'];
    protected $sortable = ['username'];
    protected $url = 'api/users';
    protected $crud = ['add', 'update', 'delete', 'update-multiple'];
    protected $files = ['excel', 'pdf'];

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
