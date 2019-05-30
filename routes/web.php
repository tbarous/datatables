<?php

Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

Route::prefix('eett')->group(function () {
    Route::get('{slug}', 'HomeController@index')->where('slug', '(users|documentation|log|scripts|delta-report|overview|info|)');
});

Route::get('users', 'HomeController@index');

Route::get('/{any}', 'HomeController@page_not_found')->where('any', '.*');
