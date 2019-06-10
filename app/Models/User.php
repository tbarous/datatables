<?php

namespace App\Models;

use App\Filters\UserFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens, SoftDeletes;

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

    public function scopeFilter(Builder $builder, $request)
    {
        return (new UserFilter($request))->filter($builder);
    }

    public function getColumns()
    {
        $columns = [];
        $schema = DB::getDoctrineSchemaManager()->listTableColumns('users');

        foreach ($schema as $sch) {
            if (in_array($sch->getName(), $this->tableData)) {
                $columns[] = [
                    'title' => $sch->getName(),
                    'sortable' => in_array($sch->getName(), $this->sortable),
                    'filterable' => in_array($sch->getName(), $this->filterable),
                    'editable' => in_array($sch->getName(), $this->editable),
                    'type'=> $sch->getType(),
                ];
            }
        }

        return $columns;
    }

    public function getData()
    {
        $data = [
            'columns' => $this->getColumns(),
            'url' => 'api/users'
        ];

        return $data;
    }
}
