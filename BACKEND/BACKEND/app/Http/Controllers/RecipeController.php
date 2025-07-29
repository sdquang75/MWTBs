<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function suggest(Request $request)
    {
        // ダミーのレシピ返す
        return response()->json([
            ['name' => 'オムレツ', 'ingredients' => ['卵', '牛乳']],
            ['name' => '味噌汁', 'ingredients' => ['味噌', '豆腐', 'わかめ']]
        ]);
    }
}
