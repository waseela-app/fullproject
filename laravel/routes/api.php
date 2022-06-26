<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::get('users', [UserController::class, 'users']);
Route::get('searchuser/{key}/{type}', [UserController::class, 'search']);
Route::delete('deleteuser/{id}', [UserController::class, 'delete']);

Route::get('list', [ProductController::class, 'list']);
Route::get('search/{key}/{type}', [ProductController::class, 'search']);
Route::post('addproduct', [ProductController::class, 'addProduct']);
Route::get('product/{id}', [ProductController::class, 'getProduct']);
Route::post('product', [ProductController::class, 'update']);
Route::delete('delete/{id}', [ProductController::class, 'delete']);
