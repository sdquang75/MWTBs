<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo; // BelongsTo を使うために追加

class UserProfile extends Model
{
    use HasFactory;

    /**
     * モデルに関連付けられているテーブル
     *
     * @var string
     */
    protected $table = 'user_profiles';

    /**
     * マスアサインメント可能な属性。
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'age',
        'gender',
        'height',
        'weight',
        'activity_level',
        'target_calories',
        'target_protein',
        'target_fat',
        'target_carbohydrates',
    ];

    /**
     * ユーザープロフィールを所有するユーザーを取得
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
