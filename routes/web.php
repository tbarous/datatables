<?php

Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

Route::get('/{slug}', 'HomeController@index')->where('slug', '(users|documentation|log|eett-scripts|eett-delta-report|eett-overview|)');
Route::get('/{any}', 'HomeController@page_not_found')->where('any', '.*');
