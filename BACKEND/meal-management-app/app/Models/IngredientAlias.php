<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IngredientAlias extends Model
{
    protected $table = 'ingredient_aliases';
    public $timestamps = false;
    protected $fillable = [
        'name', 'canonical_name'
    ];
}
