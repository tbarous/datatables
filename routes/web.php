<?php

use Adldap\Laravel\Facades\Adldap;

Route::get('/ldap', function () {
    try {
        Adldap::connect();
        return 'ok';
    } catch (\Exception $e) {
        return 'bad';
    }
});

Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');
Route::get('/', 'HomeController@redirect')->middleware('auth');
Route::get('/{any}', 'HomeController@index')->middleware('auth')->where('any', '.*');
