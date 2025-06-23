<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RecipeController extends Controller
{
    /**
     * 手元の材料から作れるレシピを提案するAPIエンドポイント
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function suggest(Request $request)
    {
        // リクエストデータのバリデーション
        // 例: 材料の配列（ingredients）を要求
        $validator = Validator::make($request->all(), [
            'ingredients' => 'required|array',
            'ingredients.*' => 'required|string', // 各材料は文字列
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'バリデーションエラー',
                'errors' => $validator->errors()
            ], 422);
        }

        $userIngredients = $request->input('ingredients');
        $suggestedRecipes = [];

        // ここに手元の材料からレシピを検索・提案するロジックを実装します。
        // 例: データベースのレシピデータと照合する
        // 現時点ではダミーデータを返します。
        $allRecipes = [
            ['name' => '鶏肉と野菜の炒め物', 'required_ingredients' => ['鶏肉', '玉ねぎ', 'ピーマン', '醤油']],
            ['name' => '和風パスタ', 'required_ingredients' => ['パスタ', 'きのこ', 'ベーコン', '醤油', 'バター']],
            ['name' => 'カレーライス', 'required_ingredients' => ['米', 'じゃがいも', '人参', '玉ねぎ', '肉', 'カレールー']],
            ['name' => '野菜スープ', 'required_ingredients' => ['キャベツ', '人参', '玉ねぎ', 'コンソメ']],
        ];

        foreach ($allRecipes as $recipe) {
            // 必要な材料が全て手元にあるかチェック
            $canMake = true;
            foreach ($recipe['required_ingredients'] as $reqIngredient) {
                if (!in_array($reqIngredient, $userIngredients)) {
                    $canMake = false;
                    break;
                }
            }
            if ($canMake) {
                $suggestedRecipes[] = $recipe['name'];
            }
        }

        if (empty($suggestedRecipes)) {
            return response()->json([
                'status' => 'success',
                'message' => 'お持ちの材料で作れるレシピは見つかりませんでした。',
                'data' => []
            ], 200);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'お持ちの材料で作れるレシピを提案します。',
            'data' => [
                'ingredients' => $userIngredients,
                'recipes' => $suggestedRecipes,
            ]
        ], 200);
    }
}

