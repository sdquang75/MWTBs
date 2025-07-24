<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Recipe;
use App\Models\RecipeIngredient;
use App\Models\IngredientAlias;

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
        $validator = Validator::make($request->all(), [
            'ingredients' => 'required|array',
            'ingredients.*' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'バリデーションエラー',
                'errors' => $validator->errors()
            ], 422);
        }
        $userIngredients = $request->input('ingredients');
        // Chuẩn hóa tên nguyên liệu
        $canonicalIngredients = [];
        foreach ($userIngredients as $name) {
            $alias = IngredientAlias::where('name', $name)->first();
            $canonicalIngredients[] = $alias ? $alias->canonical_name : $name;
        }
        // Lấy các recipe mà tất cả nguyên liệu đều có trong danh sách người dùng
        $recipes = Recipe::whereHas('ingredients', function($q) use ($canonicalIngredients) {
            $q->whereIn('ingredient_name', $canonicalIngredients);
        })
        ->withCount(['ingredients as match_count' => function($q) use ($canonicalIngredients) {
            $q->whereIn('ingredient_name', $canonicalIngredients);
        }])
        ->withCount('ingredients')
        ->with('ingredients')
        ->get()
        ->filter(function($recipe) {
            return $recipe->match_count == $recipe->ingredients_count;
        })
        ->values();
        return response()->json([
            'status' => 'success',
            'message' => 'お持ちの材料で作れるレシピを提案します。',
            'data' => [
                'ingredients' => $userIngredients,
                'recipes' => $recipes,
            ]
        ], 200);
    }

    /**
     * レシピ詳細APIエンドポイント
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function detail($id)
    {
        $recipe = Recipe::with('ingredients')->find($id);
        if (!$recipe) {
            return response()->json([
                'status' => 'error',
                'message' => 'レシピが見つかりません。'
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'data' => [
                'recipe' => $recipe,
                'ingredients' => $recipe->ingredients
            ]
        ], 200);
    }
}

