<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->bigIncrements('recipe_id');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('category', 100)->nullable();
            $table->text('instructions')->nullable();
        });
        Schema::create('recipe_ingredients', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('recipe_id');
            $table->string('ingredient_name', 100);
            $table->string('amount', 50)->nullable();
            $table->foreign('recipe_id')->references('recipe_id')->on('recipes')->onDelete('cascade');
        });
        Schema::create('ingredient_aliases', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('canonical_name', 100);
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('ingredient_aliases');
        Schema::dropIfExists('recipe_ingredients');
        Schema::dropIfExists('recipes');
    }
};
