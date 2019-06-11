<?php

namespace App\Models;

use App\Filters\PageFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Kalnoy\Nestedset\NodeTrait;
use Illuminate\Database\Eloquent\Builder;
use App\Traits\ModelTrait;

class Page extends Model
{
    use NodeTrait, ModelTrait;

    /**
     * Table name of the model
     * @var string
     */
    protected $table = 'pages';

    /**
     * Fillable fields
     * @var [type]
     */
    protected $fillable = ['title', 'icon', 'component', 'slug'];

    /**
     * The fields that will appear on the table
     * @var [type]
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
     * [children description]
     * @return [type] [description]
     */
    public function children()
    {
        return $this->hasMany('App\Category', 'parent_id', 'id') ;
    }

    /**
     * [scopeFilter description]
     * @param  Builder $builder [description]
     * @param  [type]  $request [description]
     * @return [type]           [description]
     */
    public function scopeFilter(Builder $builder, $request)
    {
        return (new PageFilter($request))->filter($builder);
    }

    /**
     * [getMenu description]
     * @return [type] [description]
     */
    public static function getMenu()
    {
        return Page::get()->toTree();
    }
}
