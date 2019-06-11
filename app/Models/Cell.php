<?php

namespace App\Models;

use App\Filters\CellFilter;
use App\Traits\DatatableTrait;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Cell extends Model
{
    use DatatableTrait;

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
    protected $table = 'cells';
    protected $names = ['name', 'created_at', 'updated_at', 'status'];
    protected $types = ['text'];
    protected $values = ['name', 'created_at', 'updated_at', 'status.name'];
    protected $filterable = ['name'];
    protected $editable = ['name'];
    protected $sortable = ['name'];
    protected $selectFilters = [
        ['name' => 'status', 'options' => ['halted', 'down']]
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

    public function status()
    {
        return $this->belongsTo('App\Models\Status');
    }
}
