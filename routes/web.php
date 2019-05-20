<?php

Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

// Route::get('/', 'HomeController@redirect')->middleware('auth');
Route::get('/{any}', 'HomeController@index')->where('any', '.*')->middleware('auth');

// Route::get('/eett-overview', 'HomeController@index')->middleware('auth');
// Route::get('/users', 'HomeController@index')->middleware('auth');
