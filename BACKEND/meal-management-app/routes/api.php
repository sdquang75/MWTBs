<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MealController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController; // ★この行を追加

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

// 認証不要なAPIルート（ユーザー登録、ログイン）
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// 認証が必要なAPIルートのグループ
// middleware('auth:sanctum') は Sanctum のAPI認証ミドルウェアを使用することを想定しています。
Route::middleware('auth:sanctum')->group(function () {
    // 食事内容分析API
    Route::post('/meals/analyze', [MealController::class, 'analyze']);

    // レシピ提案API
    Route::post('/recipes/suggest', [RecipeController::class, 'suggest']);

    // ユーザーの栄養目標API
    Route::get('/users/{id}/nutrient-goals', [UserController::class, 'getNutrientGoals']);
    Route::post('/users/{id}/nutrient-goals', [UserController::class, 'saveNutrientGoals']);

    // ログイン中のユーザー情報を取得するルート (認証テスト用)
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // ログアウトAPI
    Route::post('/logout', [AuthController::class, 'logout']); // ★この行を追加
});

