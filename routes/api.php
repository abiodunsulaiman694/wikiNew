<?php

use Illuminate\Http\Request;

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
Route::get('/', 'PageAPIController@index');
Route::post('page/{title}', 'PageAPIController@store');
Route::get('wiki/{url}', 'PageAPIController@show');
Route::get('link/{page_title}/to/{link_title}',
            'PageAPIController@store_link');
Route::get('redirect/{page_title}/to/{redirect_title}',
            'PageAPIController@store_redirect');
Route::get('delete/{page_title}', 'PageAPIController@destroy');
