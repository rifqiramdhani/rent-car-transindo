<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CarApiController;
use App\Http\Controllers\Api\UserApiController;
use App\Http\Controllers\Api\ReturnApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('users', [UserApiController::class, 'index']);
Route::get('cars/index', [CarApiController::class, 'index']);
Route::get('cars/available', [CarApiController::class, 'availableCar']);
Route::get('returns', [ReturnApiController::class, 'index']);

