<?php

use Illuminate\Http\Request;
use App\Http\Resources\Image as ImageResource;
use App\Image;

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
    return $request->user();
});


Route::get('/images', function () {
    $images = ImageResource::collection(Image::all());

    return response()->json($images);
});

Route::post('/fileupload', 'FileuploadController@upload');
Route::post('/edit/{id}', 'FileuploadController@update');
