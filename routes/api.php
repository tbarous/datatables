<?php
Route::post('users/:id', 'UserController@update');

Route::apiResources([
    'users' => 'UserController',
    'pages' => 'PageController',
    'cells' => 'CellController'
]);

Route::post('users/update-many', 'UserController@updateMany');
