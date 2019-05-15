<?php

Route::get('ldap', function(){
    $results = $provider->search()->where('cn', '=', 'John Doe')->get();
    return $results;
});

Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');
Route::get('/', 'HomeController@redirect')->middleware('auth');
Route::get('/{any}', 'HomeController@index')->middleware('auth')->where('any', '.*');
