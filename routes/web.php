<?php

Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

// Route::get('/', 'HomeController@index');

// Route::prefix('eett')->group(function () {
//     Route::get('', 'HomeController@index');
//     Route::get('overview', 'HomeController@index');
//     Route::get('scripts', 'HomeController@index');
//     Route::get('delta-report', 'HomeController@index');
//     Route::get('log', 'HomeController@index');
// });

// Route::get('/users', 'HomeController@index');
// Route::get('/documentation', 'HomeController@index');
// Route::get('/info', 'HomeController@index');

Route::get('/{any}', 'HomeController@index')->where('any', '.*');
