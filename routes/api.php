<?php

Route::get('users', 'UserController@index')->middleware('auth:api');
Route::post('users/update', 'UserController@update')->middleware('auth:api');
