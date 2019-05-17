<?php

use App\User;
use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('users/data-table', 'UserController@getUsersForDataTable')->middleware('auth:api');
