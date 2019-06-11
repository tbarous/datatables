<?php

namespace App\Models;

use App\Filters\CellFilter;
use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Cell extends Model
{
    use ModelTrait;

    protected $table = 'cells';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];

    /**
     * The attributes that are shown on tables
     * @var array
     */
    protected $tableData = [
        'name'
    ];

    /**
     * The attributes that are filterable
     * @var array
     */
    protected $filterable = [
        'name'
    ];

    /**
     * The attributes that are filterable
     * @var array
     */
    protected $editable = [
        'name'
    ];

    /**
     * The attributes that are filterable
     * @var array
     */
    protected $sortable = [
        'name'
    ];

    /**
     * [scopeFilter description]
     * @param  Builder $builder [description]
     * @param  [type]  $request [description]
     * @return [type]           [description]
     */
    public function scopeFilter(Builder $builder, $request)
    {
        return (new CellFilter($request))->filter($builder);
    }
}
