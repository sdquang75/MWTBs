<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function nutrientGoals($id)
    {
        // 仮データ（あとでDBから取得）
        return response()->json([
            'calories' => 2000,
            'protein' => 100,
            'fat' => 55,
            'carbs' => 250
        ]);
    }
}
