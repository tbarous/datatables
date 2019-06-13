<?php

namespace App\Models;

use App\Filters\PageFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Kalnoy\Nestedset\NodeTrait;
use Illuminate\Database\Eloquent\Builder;
use App\Traits\DatatableTrait;

class Page extends Model
{
    use NodeTrait, DatatableTrait;

    /**
     * Fillable fields
     * @var [type]
     */
    protected $fillable = ['title', 'icon', 'component', 'slug'];

    /**
     * The attributes that are shown on tables
     * @var array
     */
    protected $table = 'pages';
    protected $names = ['name', 'created_at', 'updated_at'];
    protected $types = ['text'];
    protected $values = ['name', 'created_at', 'updated_at'];
    protected $filterable = ['name'];
    protected $editable = ['name'];
    protected $sortable = ['name'];

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
