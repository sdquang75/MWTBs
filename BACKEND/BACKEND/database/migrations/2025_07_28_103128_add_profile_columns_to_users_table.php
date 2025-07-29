<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{
    Schema::table('users', function (Blueprint $table) {
        $table->integer('age')->nullable();
        $table->float('height')->nullable(); // cm単位など
        $table->float('weight')->nullable(); // kg単位など
        $table->string('gender')->nullable(); // 'male', 'female', 'other'など
    });
}

public function down()
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn(['age', 'height', 'weight', 'gender']);
    });
}
};
