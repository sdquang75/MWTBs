<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            // user_id カラム: users テーブルの id に対応する外部キー
            // unsignedBigInteger は、符号なしの大きな整数型で、通常 primary key の id に対応します。
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // usersテーブルへの外部キー制約と連鎖削除

            $table->integer('age')->nullable();
            $table->string('gender')->nullable(); // male, female
            $table->decimal('height', 5, 2)->nullable(); // 例: 170.50 cm
            $table->decimal('weight', 5, 2)->nullable(); // 例: 65.25 kg
            $table->string('activity_level')->nullable(); // sedentary, lightly_active, etc.

            // 栄養目標の計算結果もここに保存する場合
            $table->integer('target_calories')->nullable();
            $table->integer('target_protein')->nullable();
            $table->integer('target_fat')->nullable();
            $table->integer('target_carbohydrates')->nullable();

            $table->timestamps(); // created_at と updated_at カラム
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};

