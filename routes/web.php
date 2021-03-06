<?php

Route::get('/phpinfo', function () {
    return view('phpinfo');
});

Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');
Route::get('/{any}', 'MainController@index')->where('any', '.*');
