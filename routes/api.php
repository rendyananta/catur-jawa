<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return [
        'data' => $request->user()
    ];
});

Route::group(['prefix' => 'users'], function () {
    Route::get('/', 'UserController@index');
});

Route::group(['middleware' => 'auth:api', 'prefix' => 'game'], function () {
    Route::post('/', 'MatchController@store');
    Route::get('/{match}', 'MatchController@show');
    Route::patch('/{match}/accept', 'MatchController@accept');
});
