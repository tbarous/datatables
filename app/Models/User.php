<?php

namespace App\Models;

use App\Filters\UserFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
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

    public function scopeFilter(Builder $builder, $request)
    {
        return (new UserFilter($request))->filter($builder);
    }

    public static function getData()
    {
        $headers = [
            ['title' => 'username', 'sortable' => true, 'searchable' => true, 'type'=> 'text'],
            ['title' => 'email', 'sortable' => true, 'searchable' => true, 'type'=> 'text'],
            ['title' => 'created_at', 'sortable' => true, 'searchable' => true, 'type'=> 'date'],
            ['title' => 'updated_at', 'sortable' => true, 'searchable' => true, 'type'=> 'date']
        ];

        $users = [
            'headers' => $headers,
            'url' => 'api/users'
        ];

        return $users;
    }
}
