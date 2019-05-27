<?php

Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

Route::get('/eett-overview', 'HomeController@index');
Route::get('/eett-delta-report', 'HomeController@index');
Route::get('/eett-scripts', 'HomeController@index');
Route::get('/log', 'HomeController@index');
Route::get('/documentation', 'HomeController@index');
Route::get('/users', 'HomeController@index');

Route::get('/{any}', 'HomeController@page_not_found')->where('any', '.*');
