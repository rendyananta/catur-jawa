<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('game.lobby');
});

Route::group(['namespace' => 'auth', 'as' => 'auth.'], function () {
    Route::get('/login', 'LoginController@showLoginForm')->name('login.form');
    Route::post('/login', 'LoginController@login')->name('login');
    Route::get('/register', 'RegisterController@showRegistrationForm')->name('register.form');
    Route::post('/register', 'RegisterController@register')->name('register');

    Route::get('/password/forgot', 'ForgotPasswordController@showLinkRequestForm')->name('password.forgot.form');
    Route::post('/password/forgot', 'ForgotPasswordController@sendResetLinkEmail')->name('password.forgot');
    Route::get('/password/reset', 'ResetPasswordController@showResetForm')->name('password.reset.form');
    Route::post('/password/reset', 'ResetPasswordController@reset')->name('password.reset');
    Route::get('/logout', 'LoginController@logout')->name('logout');
});

Route::group(['middleware' => 'auth', 'prefix' => 'game', 'as' => 'game.'], function () {
    Route::get('/', 'MatchController@index')->name('lobby');
    Route::get('{match}', 'MatchController@show')->name('room');
});

Route::group(['middleware' => 'auth', 'prefix' => 'profile', 'as' => 'profile.'], function () {
    Route::get('edit', 'ProfileController@edit')->name('edit');
    Route::put('update', 'ProfileController@update')->name('update');
});
