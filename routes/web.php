<?php

use Illuminate\Support\Facades\DB;

Route::get('test', function () {
    $schema = DB::getDoctrineSchemaManager();
    $columns = $schema->listTableColumns('users');
    // return $columns;
    // return json_encode($schema->listTableColumns('users'));
    return view('test', compact('columns'));
});

Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');
Route::get('/{any}', 'HomeController@index')->where('any', '.*');
