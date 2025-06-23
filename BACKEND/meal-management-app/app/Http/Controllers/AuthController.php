<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * ユーザー登録APIエンドポイント
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // 入力データのバリデーション
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users', // emailはusersテーブルでユニークであることを保証
            'password' => 'required|string|min:8|confirmed', // password_confirmationフィールドも必要
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'バリデーションエラー',
                'errors' => $validator->errors()
            ], 422);
        }

        // ユーザーの作成
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // パスワードはハッシュ化して保存
        ]);

        // APIトークンの生成
        // 'AuthToken' はトークン名で、任意の文字列でOKです。
        // abilities(['*']) は、このトークンが持つ権限を示します。今回は全ての権限を与えています。
        $token = $user->createToken('AuthToken', ['*'])->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'ユーザー登録が完了しました。',
            'data' => [
                'user' => $user,
                'token' => $token, // 生成されたトークンをクライアントに返す
            ]
        ], 201); // HTTP 201 Created
    }

    /**
     * ユーザーログインAPIエンドポイント
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // 入力データのバリデーション
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);



        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'バリデーションエラー',
                'errors' => $validator->errors()
            ], 422);
        }

        // ユーザーの認証を試みる
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'status' => 'error',
                'message' => '認証情報が無効です。'
            ], 401); // HTTP 401 Unauthorized
        }

        // 認証されたユーザーを取得
        $user = Auth::user(); // ★この行で $user が null になっている可能性があります

        // 既存のトークンを全て削除（オプション：複数ログインを許可しない場合など）
        // $user->tokens()->delete();

        // 新しいAPIトークンの生成
        $token = $user -> createToken('AuthToken', ['*'])->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'ログインに成功しました。',
            'data' => [
                'user' => $user,
                'token' => $token, // 生成されたトークンをクライアントに返す
            ]
        ], 200);
    }

    /**
     * ログアウトAPIエンドポイント (Sanctumトークンを無効化)
     * 認証済みのユーザーのみがアクセス可能
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // 現在のリクエストで使用されているAPIトークンを削除する
        // これにより、そのトークンは以降無効になります
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'ログアウトしました。'
        ], 200);
    }
}
