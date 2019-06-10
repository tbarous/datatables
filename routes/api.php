<?php

Route::get('users', 'UserController@index');
Route::post('users/update', 'UserController@update');
Route::post('users/update-many', 'UserController@updateMany');
Route::post('users/destroy', 'UserController@destroy');
Route::post('users/excel', 'UserController@excel');

Route::get('pages', 'PageController@index');
Route::post('pages/update', 'PageController@update');
Route::post('pages/update-many', 'PageController@updateMany');
Route::post('pages/destroy', 'PageController@destroy');
Route::post('pages/excel', 'PageController@excel');
