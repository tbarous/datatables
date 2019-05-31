<?php

Route::get('users', 'UserController@index');
Route::post('users/update', 'UserController@update');
Route::post('users/update-many', 'UserController@updateMany');
Route::post('users/destroy', 'UserController@destroy');
Route::post('users/excel', 'UserController@excel');
