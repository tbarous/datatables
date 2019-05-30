<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class Page extends Model
{
    use NodeTrait;

    protected $fillable = ['title', 'icon', 'component', 'slug'];

    public function children()
    {
        return $this->hasMany('App\Category', 'parent_id', 'id') ;
    }

    public static function getData()
    {
        return Page::get()->toTree();
    }
}
