<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// routes/api.php
// use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MealController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\UserController;

use App\Http\Controllers\AuthController;

use App\Http\Controllers\UserProfileController;

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


Route::post('/meals/analyze', [MealController::class, 'analyze']);
Route::post('/recipes/suggest', [RecipeController::class, 'suggest']);
Route::get('/users/{id}/nutrient-goals', [UserController::class, 'nutrientGoals']);


Route::post('/register', [AuthController::class, 'register']);   // ユーザー登録
Route::post('/login', [AuthController::class, 'login']);         // ログイン

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);   // ログアウト
    Route::get('/user', function(Request $request) {
        return $request->user();
    }); // ログインユーザー情報取得例
});


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users/{id}/profile', [UserProfileController::class, 'show']);
    Route::put('/users/{id}/profile', [UserProfileController::class, 'update']);
});
