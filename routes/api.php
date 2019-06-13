<?php

Route::apiResources([
    'users' => 'UserController',
    'pages' => 'PageController',
    'cells' => 'CellController'
]);

Route::post('users/update-many', 'UserController@updateMany');
