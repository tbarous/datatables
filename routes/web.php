<?php

use Adldap\Laravel\Facades\Adldap;

Route::get('ldap4', function () {
    // return Adldap::users()->all();
    // ini_set('memory_limit', '-1');
    // $users = Adldap::search()->users()->get();
    // return $users;

    // $users = Adldap::search()->where('uid', '=', 'newton')->get();
    // return $users;
    // $user_format = env('LDAP_USER_FORMAT', 'cn=%s,' . env('LDAP_BASE_DN', ''));
    // $userdn = sprintf($user_format, 'testvdi1');

    $attempt = Adldap::auth()->attempt('testvdi1', 'P@ssw0rd');
    return json_encode($attempt);
});

Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');
Route::get('/', 'HomeController@redirect')->middleware('auth');
Route::get('/{any}', 'HomeController@index')->middleware('auth')->where('any', '.*');
