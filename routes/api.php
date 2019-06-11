<?php

$items = [
    ['name' => 'users', 'method' => 'UserController'],
    ['name' => 'pages', 'method' => 'PageController'],
    ['name' => 'cells', 'method' => 'CellController']
];

foreach ($items as $item) {
    Route::get($item['name'], $item['method'] . '@index');
    Route::post($item['name'] . '/update', $item['method'] . '@update');
    Route::post($item['name'] . '/update-many', $item['method'] . '@updateMany');
    Route::post($item['name'] . '/destroy', $item['method'] . '@destroy');
    Route::post($item['name'] . '/excel', $item['method'] . '@excel');
}
