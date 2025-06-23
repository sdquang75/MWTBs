<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth; // Auth ファサードを使用
use App\Models\User; // Userモデル
use App\Models\UserProfile; // ★ UserProfile モデルをインポート

class UserController extends Controller
{
    /**
     * ユーザーの栄養目標（とプロフィール情報）を取得するAPIエンドポイント
     *
     * @param  int  $id ユーザーID
     * @return \Illuminate\Http\JsonResponse
     */
    public function getNutrientGoals($id)
    {
        // 認証されたユーザーのIDを取得
        $authenticatedUserId = Auth::id();

        // 認可チェック: 認証されたユーザーが自分のプロフィールのみにアクセスできることを保証
        if (!$authenticatedUserId || $authenticatedUserId != $id) {
            return response()->json([
                'status' => 'error',
                'message' => 'アクセス権がありません。'
            ], 403); // HTTP 403 Forbidden
        }

        // 指定されたユーザーのプロフィール情報を取得
        // UserProfile モデルから user_id で検索するか、User モデルのリレーションシップを使う
        $userProfile = UserProfile::where('user_id', $authenticatedUserId)->first();

        if (!$userProfile) {
            return response()->json([
                'status' => 'success',
                'message' => 'ユーザープロフィールが見つかりません。',
                'data' => null
            ], 200); // プロフィールがない場合も200で返す（まだ設定されていない可能性があるため）
        }

        return response()->json([
            'status' => 'success',
            'message' => 'ユーザーの栄養目標とプロフィールを取得しました。',
            'data' => [
                'user_id' => $userProfile->user_id,
                'age' => $userProfile->age,
                'gender' => $userProfile->gender,
                'height' => $userProfile->height,
                'weight' => $userProfile->weight,
                'activity_level' => $userProfile->activity_level,
                'nutrient_goals' => [
                    'calories' => $userProfile->target_calories,
                    'protein' => $userProfile->target_protein,
                    'fat' => $userProfile->target_fat,
                    'carbohydrates' => $userProfile->target_carbohydrates,
                ],
            ]
        ], 200);
    }

    /**
     * ユーザーの栄養目標（とプロフィール情報）を保存または更新するAPIエンドポイント
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id ユーザーID
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveNutrientGoals(Request $request, $id)
    {
        // 認証されたユーザーのIDを取得
        $authenticatedUserId = Auth::id();

        // 認可チェック: 認証されたユーザーが自分のプロフィールのみを更新できることを保証
        if (!$authenticatedUserId || $authenticatedUserId != $id) {
            return response()->json([
                'status' => 'error',
                'message' => 'アクセス権がありません。'
            ], 403); // HTTP 403 Forbidden
        }

        // リクエストデータのバリデーション
        $validator = Validator::make($request->all(), [
            'age' => 'required|integer|min:1',
            'gender' => 'required|string|in:male,female',
            'height' => 'required|numeric|min:1',
            'weight' => 'required|numeric|min:1',
            'activityLevel' => 'required|string|in:sedentary,lightly_active,moderately_active,very_active,extra_active',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'バリデーションエラー',
                'errors' => $validator->errors()
            ], 422);
        }

        $userData = $request->only(['age', 'gender', 'height', 'weight', 'activityLevel']);

        // 栄養目標の計算ロジック（前回のUserControllerから移動）
        $bmr = $this->calculateBMR($userData['gender'], $userData['weight'], $userData['height'], $userData['age']);
        $tdee = $this->calculateTDEE($bmr, $userData['activityLevel']);
        $nutrientTargets = $this->calculateNutrientTargets($tdee);

        // UserProfile モデルを使ってプロフィール情報を保存または更新
        // user_id をキーとして、存在すれば更新、なければ新規作成
        $userProfile = UserProfile::updateOrCreate(
            ['user_id' => $authenticatedUserId], // 検索条件
            [ // 保存または更新するデータ
                'age' => $userData['age'],
                'gender' => $userData['gender'],
                'height' => $userData['height'],
                'weight' => $userData['weight'],
                'activity_level' => $userData['activityLevel'],
                'target_calories' => $nutrientTargets['calories'],
                'target_protein' => $nutrientTargets['protein'],
                'target_fat' => $nutrientTargets['fat'],
                'target_carbohydrates' => $nutrientTargets['carbohydrates'],
            ]
        );

        return response()->json([
            'status' => 'success',
            'message' => 'ユーザーのプロフィールと栄養目標が保存/更新されました。',
            'data' => [
                'user_id' => $userProfile->user_id,
                'profile' => $userProfile, // 保存されたUserProfileオブジェクトを返す
                'calculated_goals' => $nutrientTargets, // 計算された目標値も返す
            ]
        ], 200);
    }

    // 基礎代謝量 (BMR) の計算 (Mifflin-St Jeor Equation)
    private function calculateBMR($gender, $weight, $height, $age)
    {
        if ($gender === 'male') {
            return (10 * $weight) + (6.25 * $height) - (5 * $age) + 5;
        } else { // female
            return (10 * $weight) + (6.25 * $height) - (5 * $age) - 161;
        }
    }

    // 活動レベルに応じた推定一日エネルギー消費量 (TDEE) の計算
    private function calculateTDEE($bmr, $activityLevel)
    {
        $multiplier = 1.2; // sedentary
        switch ($activityLevel) {
            case 'lightly_active':
                $multiplier = 1.375;
                break;
            case 'moderately_active':
                $multiplier = 1.55;
                break;
            case 'very_active':
                $multiplier = 1.725;
                break;
            case 'extra_active':
                $multiplier = 1.9;
                break;
        }
        return $bmr * $multiplier;
    }

    // 栄養素の目安量（簡易版）
    private function calculateNutrientTargets($tdee)
    {
        // 参照: 日本人の食事摂取基準（2020年版）などを参考に、TDEEからの簡易的な目安
        $proteinGrams = $tdee * 0.15 / 4; // 15%をタンパク質 (4kcal/g)
        $fatGrams = $tdee * 0.25 / 9;     // 25%を脂質 (9kcal/g)
        $carbGrams = $tdee * 0.60 / 4;    // 60%を炭水化物 (4kcal/g)

        return [
            'calories' => round($tdee),
            'protein' => round($proteinGrams),
            'fat' => round($fatGrams),
            'carbohydrates' => round($carbGrams),
        ];
    }
}
