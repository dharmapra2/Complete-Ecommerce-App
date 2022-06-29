<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\OrderController;
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

Route::post('login', [UserController::class, 'login']);
Route::post('register', [UserController::class, 'register']);
Route::post('storeProduct', [ProductsController::class, 'storeProduct']);
Route::get('getProducts', [ProductsController::class, 'index']);
Route::get('prodDetails/{id}', [ProductsController::class, 'prodDetails']);


Route::middleware('auth:api')->group(function () {
    Route::get('show', [UserController::class, 'show']);
    Route::post('addToCart', [CartController::class, 'store']);
    Route::post('deleteFromCart', [CartController::class, 'destroy']);
    Route::post('cartDetails', [CartController::class, 'index']);
    Route::post('storeOrder', [OrderController::class, 'store']);
    Route::post('getOrderedDetails', [OrderController::class, 'index']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
