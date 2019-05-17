<?php

Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

Route::get('users/data-table', 'UserController@getUsersForDataTable');

Route::get('/', 'HomeController@redirect')->middleware('auth');
Route::get('/eett-overview', 'HomeController@index')->middleware('auth');
Route::get('/users', 'HomeController@index')->middleware('auth');
