<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserProfileController extends Controller
{
    // プロフィール取得
    public function show($id)
    {
        $user = User::findOrFail($id);

        // 認証済みユーザーとIDが一致するかチェック（セキュリティ）
        if (auth()->id() !== (int)$id) {
            return response()->json(['error' => '権限がありません'], 403);
        }

        return response()->json([
            'age' => $user->age,
            'height' => $user->height,
            'weight' => $user->weight,
            'gender' => $user->gender,
        ]);
    }

    // プロフィール更新
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if (auth()->id() !== (int)$id) {
            return response()->json(['error' => '権限がありません'], 403);
        }

        $validated = $request->validate([
            'age' => 'nullable|integer|min:0|max:150',
            'height' => 'nullable|numeric|min:0',
            'weight' => 'nullable|numeric|min:0',
            'gender' => 'nullable|string|in:male,female,other',
        ]);

        $user->update($validated);

        return response()->json(['message' => 'プロフィールを更新しました']);
    }
}
