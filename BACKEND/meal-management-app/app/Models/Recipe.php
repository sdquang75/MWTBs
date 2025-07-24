<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $table = 'recipes';
    protected $primaryKey = 'recipe_id';
    public $timestamps = false;
    protected $fillable = [
        'title', 'description', 'instructions', 'category'
    ];

    public function ingredients()
    {
        return $this->hasMany(RecipeIngredient::class, 'recipe_id', 'recipe_id');
    }
}
