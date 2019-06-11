<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    public function status()
    {
        return $this->hasOne('App\Models\Status');
    }
}
