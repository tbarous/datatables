<?php

Route::get('ldap', function () {
    $user = Adldap::search()->users()->where('cn', '=', 'testvdi1')->first();

    $groups = $user->getGroups();
    // return $groups[0];

    if ($user->inGroup(['Application Users', 'Victus Users', 'MASSUPDATE_enabled'])) {
        return 'in group';
    } else {
        return 'not in group';
    }
});

Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');
Route::get('/', 'HomeController@redirect')->middleware('auth');
Route::get('/{any}', 'HomeController@index')->middleware('auth')->where('any', '.*');
