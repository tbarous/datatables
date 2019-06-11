<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Operator extends Model
{
    public function sites()
    {
        return $this->hasMany('App\Models\Site');
    }
}
