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
        // Tạo bảng nutrients
        Schema::create('nutrients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('unit', 20)->nullable();
            $table->timestamps();
        });

        // Tạo bảng food_nutrients
        Schema::create('food_nutrients', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('food_id');
            $table->unsignedBigInteger('nutrient_id');
            $table->float('amount')->nullable();
            $table->timestamps();
            $table->unique(['food_id', 'nutrient_id']);
            $table->foreign('food_id')->references('id')->on('foods')->onDelete('cascade');
            $table->foreign('nutrient_id')->references('id')->on('nutrients')->onDelete('cascade');
        });

        // Tạo bảng recommended_nutrients
        Schema::create('recommended_nutrients', function (Blueprint $table) {
            $table->id();
            $table->string('age_group');
            $table->string('gender');
            $table->string('activity_level');
            $table->unsignedBigInteger('nutrient_id');
            $table->float('amount')->nullable();
            $table->string('unit', 20)->nullable();
            $table->timestamps();
            $table->foreign('nutrient_id')->references('id')->on('nutrients')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recommended_nutrients');
        Schema::dropIfExists('food_nutrients');
        Schema::dropIfExists('nutrients');
    }
};
