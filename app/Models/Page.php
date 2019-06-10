<?php

namespace App\Models;

use App\Filters\PageFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Kalnoy\Nestedset\NodeTrait;
use Illuminate\Database\Eloquent\Builder;

class Page extends Model
{
    use NodeTrait;

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

    public function getColumns()
    {
        $columns = [];
        $schema = DB::getDoctrineSchemaManager()->listTableColumns('pages');

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
            'url' => 'api/pages'
        ];

        return $data;
    }
}
