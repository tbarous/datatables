<?php

$items = [
    ['name' => 'users', 'method' => 'UserController'],
    ['name' => 'pages', 'method' => 'PageController'],
    ['name' => 'cells', 'method' => 'CellController']
];

Route::resource('users', 'UserController');
Route::resource('pages', 'PageController');
Route::resource('cells', 'CellController');
