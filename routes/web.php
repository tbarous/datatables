<?php

use App\Exports\UsersExport;

Route::get('excel', function () {
    return Excel::download(new UsersExport, 'users.xlsx');
});

Route::get('datatables', 'DatatablesController@getIndex');
Route::post('datatables', 'DatatablesController@anyData')->name('datatables.data');

Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');
Route::get('/', 'HomeController@redirect')->middleware('auth');
Route::get('/{any}', 'HomeController@index')->middleware('auth')->where('any', '.*');
