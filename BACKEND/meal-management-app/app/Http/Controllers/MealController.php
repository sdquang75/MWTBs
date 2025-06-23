<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; // バリデーションに利用

class MealController extends Controller
{
    /**
     * 食事内容から摂取栄養を分析するAPIエンドポイント
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function analyze(Request $request)
    {
        // リクエストデータのバリデーション
        // 例: 食事内容の配列（foodItems）と、各アイテムの名称（name）と量（quantity）を要求
        $validator = Validator::make($request->all(), [
            'foodItems' => 'required|array',
            'foodItems.*.name' => 'required|string',
            'foodItems.*.quantity' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'バリデーションエラー',
                'errors' => $validator->errors()
            ], 422); // HTTP 422 Unprocessable Entity
        }

        $foodItems = $request->input('foodItems');
        $totalNutrients = [
            'calories' => 0,
            'protein' => 0,
            'fat' => 0,
            'carbohydrates' => 0,
        ];

        // ここに食事内容から栄養を計算するロジックを実装します。
        // 例: データベースから食品成分データを取得し、計算を行う
        // 現時点ではダミーデータを返します。
        foreach ($foodItems as $item) {
            // ダミー計算: 実際のアプリではDBから食品成分データを参照します
            $totalNutrients['calories'] += $item['quantity'] * 100; // 例: 1単位あたり100kcal
            $totalNutrients['protein'] += $item['quantity'] * 5;    // 例: 1単位あたり5gタンパク質
            $totalNutrients['fat'] += $item['quantity'] * 3;       // 例: 1単位あたり3g脂質
            $totalNutrients['carbohydrates'] += $item['quantity'] * 15; // 例: 1単位あたり15g炭水化物
        }

        return response()->json([
            'status' => 'success',
            'message' => '食事内容の分析が完了しました。',
            'data' => [
                'foodItems' => $foodItems,
                'totalNutrients' => $totalNutrients,
            ]
        ], 200); // HTTP 200 OK
    }
}

