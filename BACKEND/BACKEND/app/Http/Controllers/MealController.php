<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MealController extends Controller
{
    public function analyze(Request $request)
    {
        // ダミーで返しておく（あとで実装）
        return response()->json([
            'calories' => 500,
            'protein' => 30,
            'fat' => 10,
            'carbs' => 50
        ]);
    }
}
