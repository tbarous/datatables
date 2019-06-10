<?php
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

Route::get('/', 'HomeController@index');
foreach (App\Models\Page::get() as $page) {
    Route::get('/' . $page->slug, 'HomeController@index');
}
// Route::get('/{any}', 'HomeController@index')->where('any', '.*');
