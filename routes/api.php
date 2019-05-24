<?php

Route::get('users', 'UserController@index');
Route::post('users/update', 'UserController@update');
Route::post('users/destroy', 'UserController@destroy');
