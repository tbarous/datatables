<?php

use App\Exports\UsersExport;

Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');


Route::get('/excel', function () {
    return Excel::download(new UsersExport(), 'users.pdf');
});

Route::get('/{any}', 'HomeController@index')->where('any', '.*');
