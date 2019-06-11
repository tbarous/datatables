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

    protected $table = 'pages';

    protected $fillable = ['title', 'icon', 'component', 'slug'];

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

    public function children()
    {
        return $this->hasMany('App\Category', 'parent_id', 'id') ;
    }

    public function scopeFilter(Builder $builder, $request)
    {
        return (new PageFilter($request))->filter($builder);
    }

    public static function getMenu()
    {
        return Page::get()->toTree();
    }
}
