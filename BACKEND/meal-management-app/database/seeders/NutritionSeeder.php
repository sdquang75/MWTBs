<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NutritionSeeder extends Seeder
{
    public function run(): void
    {
        // Thêm dữ liệu cho bảng nutrients
        DB::table('nutrients')->insert([
            ['id' => 1, 'name' => '炭水化物', 'unit' => 'g'],
            ['id' => 2, 'name' => '脂質', 'unit' => 'g'],
            ['id' => 3, 'name' => 'たんぱく質', 'unit' => 'g'],
            ['id' => 4, 'name' => 'ビタミンA', 'unit' => 'µgRE'],
            ['id' => 5, 'name' => 'ビタミンD', 'unit' => 'µg'],
            ['id' => 6, 'name' => 'ビタミンE', 'unit' => 'mg'],
            ['id' => 7, 'name' => 'ビタミンK', 'unit' => 'µg'],
            ['id' => 8, 'name' => 'ビタミンB1', 'unit' => 'mg'],
            ['id' => 9, 'name' => 'ビタミンB2', 'unit' => 'mg'],
            ['id' => 10, 'name' => 'ナイアシン', 'unit' => 'mgNE'],
            ['id' => 11, 'name' => 'ビタミンB6', 'unit' => 'mg'],
            ['id' => 12, 'name' => 'ビタミンB12', 'unit' => 'µg'],
            ['id' => 13, 'name' => '葉酸', 'unit' => 'µg'],
            ['id' => 14, 'name' => 'パントテン酸', 'unit' => 'mg'],
            ['id' => 15, 'name' => 'ビオチン', 'unit' => 'µg'],
            ['id' => 16, 'name' => 'ビタミンC', 'unit' => 'mg'],
            ['id' => 17, 'name' => 'ナトリウム', 'unit' => 'mg'],
            ['id' => 18, 'name' => 'カリウム', 'unit' => 'mg'],
            ['id' => 19, 'name' => 'カルシウム', 'unit' => 'mg'],
            ['id' => 20, 'name' => 'マグネシウム', 'unit' => 'mg'],
            ['id' => 21, 'name' => 'リン', 'unit' => 'mg'],
            ['id' => 22, 'name' => '鉄', 'unit' => 'mg'],
            ['id' => 23, 'name' => '亜鉛', 'unit' => 'mg'],
            ['id' => 24, 'name' => '銅', 'unit' => 'mg'],
            ['id' => 25, 'name' => 'マンガン', 'unit' => 'mg'],
            ['id' => 26, 'name' => 'ヨウ素', 'unit' => 'µg'],
            ['id' => 27, 'name' => 'セレン', 'unit' => 'µg'],
            ['id' => 28, 'name' => 'クロム', 'unit' => 'µg'],
            ['id' => 29, 'name' => 'モリブデン', 'unit' => 'µg'],
            ['id' => 30, 'name' => 'エネルギー', 'unit' => 'kcal'],
        ]);

        // Thêm dữ liệu cho bảng foods
        DB::table('foods')->insert([
            ['id' => 1, 'name' => 'たまねぎ'],
            ['id' => 2, 'name' => 'にんじん'],
            ['id' => 3, 'name' => 'じゃがいも'],
            ['id' => 4, 'name' => 'カレールウ'],
            ['id' => 5, 'name' => '鶏肉'],
            ['id' => 6, 'name' => '水'],
            ['id' => 7, 'name' => '鶏もも肉'],
            ['id' => 8, 'name' => '卵'],
            ['id' => 9, 'name' => 'だし'],
            ['id' => 10, 'name' => '醤油'],
            ['id' => 11, 'name' => 'みりん'],
            ['id' => 12, 'name' => '豆腐'],
            ['id' => 13, 'name' => 'わかめ'],
            ['id' => 14, 'name' => '味噌'],
            ['id' => 15, 'name' => '長ネギ'],
        ]);

        // Thêm dữ liệu cho bảng food_nutrients (chỉ các mẫu chính, có thể mở rộng thêm)
        DB::table('food_nutrients')->insert([
            // たまねぎ (id=1)
            ['food_id'=>1,'nutrient_id'=>4,'amount'=>0],
            ['food_id'=>1,'nutrient_id'=>5,'amount'=>0],
            ['food_id'=>1,'nutrient_id'=>6,'amount'=>0.1],
            ['food_id'=>1,'nutrient_id'=>7,'amount'=>0],
            ['food_id'=>1,'nutrient_id'=>8,'amount'=>0.04],
            ['food_id'=>1,'nutrient_id'=>9,'amount'=>0.02],
            ['food_id'=>1,'nutrient_id'=>10,'amount'=>0.2],
            ['food_id'=>1,'nutrient_id'=>11,'amount'=>0.14],
            ['food_id'=>1,'nutrient_id'=>12,'amount'=>0],
            ['food_id'=>1,'nutrient_id'=>13,'amount'=>27],
            ['food_id'=>1,'nutrient_id'=>14,'amount'=>0.19],
            ['food_id'=>1,'nutrient_id'=>15,'amount'=>0.9],
            ['food_id'=>1,'nutrient_id'=>16,'amount'=>7],
            ['food_id'=>1,'nutrient_id'=>17,'amount'=>1],
            ['food_id'=>1,'nutrient_id'=>18,'amount'=>140],
            ['food_id'=>1,'nutrient_id'=>19,'amount'=>20],
            ['food_id'=>1,'nutrient_id'=>20,'amount'=>10],
            ['food_id'=>1,'nutrient_id'=>21,'amount'=>28],
            ['food_id'=>1,'nutrient_id'=>22,'amount'=>0.2],
            ['food_id'=>1,'nutrient_id'=>23,'amount'=>0.1],
            ['food_id'=>1,'nutrient_id'=>24,'amount'=>0.03],
            ['food_id'=>1,'nutrient_id'=>25,'amount'=>0.05],
            ['food_id'=>1,'nutrient_id'=>26,'amount'=>0],
            ['food_id'=>1,'nutrient_id'=>27,'amount'=>0],
            ['food_id'=>1,'nutrient_id'=>28,'amount'=>0],
            ['food_id'=>1,'nutrient_id'=>29,'amount'=>0],
            ['food_id'=>1,'nutrient_id'=>30,'amount'=>33.0],
            // にんじん (id=2)
            ['food_id'=>2,'nutrient_id'=>1,'amount'=>9.0],
            ['food_id'=>2,'nutrient_id'=>2,'amount'=>0.2],
            ['food_id'=>2,'nutrient_id'=>3,'amount'=>0.7],
            ['food_id'=>2,'nutrient_id'=>4,'amount'=>690],
            ['food_id'=>2,'nutrient_id'=>5,'amount'=>0],
            ['food_id'=>2,'nutrient_id'=>6,'amount'=>0.4],
            ['food_id'=>2,'nutrient_id'=>7,'amount'=>15],
            ['food_id'=>2,'nutrient_id'=>8,'amount'=>0.07],
            ['food_id'=>2,'nutrient_id'=>9,'amount'=>0.05],
            ['food_id'=>2,'nutrient_id'=>10,'amount'=>0.7],
            ['food_id'=>2,'nutrient_id'=>11,'amount'=>0.13],
            ['food_id'=>2,'nutrient_id'=>12,'amount'=>0],
            ['food_id'=>2,'nutrient_id'=>13,'amount'=>38],
            ['food_id'=>2,'nutrient_id'=>14,'amount'=>0.2],
            ['food_id'=>2,'nutrient_id'=>15,'amount'=>2.7],
            ['food_id'=>2,'nutrient_id'=>16,'amount'=>6],
            ['food_id'=>2,'nutrient_id'=>17,'amount'=>17],
            ['food_id'=>2,'nutrient_id'=>18,'amount'=>280],
            ['food_id'=>2,'nutrient_id'=>19,'amount'=>28],
            ['food_id'=>2,'nutrient_id'=>20,'amount'=>9],
            ['food_id'=>2,'nutrient_id'=>21,'amount'=>27],
            ['food_id'=>2,'nutrient_id'=>22,'amount'=>0.2],
            ['food_id'=>2,'nutrient_id'=>23,'amount'=>0.2],
            ['food_id'=>2,'nutrient_id'=>24,'amount'=>0.04],
            ['food_id'=>2,'nutrient_id'=>25,'amount'=>0.08],
            ['food_id'=>2,'nutrient_id'=>26,'amount'=>0],
            ['food_id'=>2,'nutrient_id'=>27,'amount'=>0.3],
            ['food_id'=>2,'nutrient_id'=>28,'amount'=>0],
            ['food_id'=>2,'nutrient_id'=>29,'amount'=>0],
            ['food_id'=>2,'nutrient_id'=>30,'amount'=>36.0],
            // じゃがいも (id=3)
            ['food_id'=>3,'nutrient_id'=>1,'amount'=>17.6],
            ['food_id'=>3,'nutrient_id'=>2,'amount'=>0.1],
            ['food_id'=>3,'nutrient_id'=>3,'amount'=>1.8],
            ['food_id'=>3,'nutrient_id'=>4,'amount'=>0],
            ['food_id'=>3,'nutrient_id'=>5,'amount'=>0],
            ['food_id'=>3,'nutrient_id'=>6,'amount'=>0.05],
            ['food_id'=>3,'nutrient_id'=>7,'amount'=>3],
            ['food_id'=>3,'nutrient_id'=>30,'amount'=>77.0],
            // ... (Các thực phẩm khác và dữ liệu food_nutrients tương tự, có thể bổ sung thêm nếu cần)
        ]);

        // Thêm dữ liệu cho bảng recommended_nutrients (ví dụ cho 18-29歳, II)
        DB::table('recommended_nutrients')->insert([
            // Nam
            ['age_group'=>'18-29歳','gender'=>'男性','activity_level'=>'II','nutrient_id'=>30,'amount'=>2650,'unit'=>'kcal'],
            ['age_group'=>'18-29歳','gender'=>'男性','activity_level'=>'II','nutrient_id'=>3,'amount'=>65,'unit'=>'g'],
            ['age_group'=>'18-29歳','gender'=>'男性','activity_level'=>'II','nutrient_id'=>2,'amount'=>73,'unit'=>'g'],
            ['age_group'=>'18-29歳','gender'=>'男性','activity_level'=>'II','nutrient_id'=>1,'amount'=>331,'unit'=>'g'],
            ['age_group'=>'18-29歳','gender'=>'男性','activity_level'=>'II','nutrient_id'=>16,'amount'=>100,'unit'=>'mg'],
            ['age_group'=>'18-29歳','gender'=>'男性','activity_level'=>'II','nutrient_id'=>19,'amount'=>600,'unit'=>'mg'],
            ['age_group'=>'18-29歳','gender'=>'男性','activity_level'=>'II','nutrient_id'=>22,'amount'=>7.5,'unit'=>'mg'],
            // Nữ
            ['age_group'=>'18-29歳','gender'=>'女性','activity_level'=>'II','nutrient_id'=>30,'amount'=>2000,'unit'=>'kcal'],
            ['age_group'=>'18-29歳','gender'=>'女性','activity_level'=>'II','nutrient_id'=>3,'amount'=>50,'unit'=>'g'],
            ['age_group'=>'18-29歳','gender'=>'女性','activity_level'=>'II','nutrient_id'=>2,'amount'=>56,'unit'=>'g'],
            ['age_group'=>'18-29歳','gender'=>'女性','activity_level'=>'II','nutrient_id'=>1,'amount'=>250,'unit'=>'g'],
            ['age_group'=>'18-29歳','gender'=>'女性','activity_level'=>'II','nutrient_id'=>16,'amount'=>100,'unit'=>'mg'],
            ['age_group'=>'18-29歳','gender'=>'女性','activity_level'=>'II','nutrient_id'=>19,'amount'=>600,'unit'=>'mg'],
            ['age_group'=>'18-29歳','gender'=>'女性','activity_level'=>'II','nutrient_id'=>22,'amount'=>10.5,'unit'=>'mg'],
        ]);

        // Thêm dữ liệu cho bảng recipes
        DB::table('recipes')->insert([
            [
                'recipe_id' => 1,
                'title' => 'カレーライス',
                'description' => '一般家庭で人気のスパイシーなカレーライス。鶏肉や野菜を使った具沢山のメニュー。',
                'category' => '洋風/カレー',
                'instructions' => "1. 玉葱と鶏肉を炒める。\n2. にんじんとじゃがいもを加える。\n3. 水とルウを入れて煮込む。"
            ],
            [
                'recipe_id' => 2,
                'title' => '親子丼',
                'description' => '鶏肉と卵で作る定番和食の親子丼。シンプルながら奥深い味わい。',
                'category' => '和食',
                'instructions' => "1. 鶏もも肉と玉葱を煮る。\n2. 卵を溶いて加え、軽く火を通す。\n3. ご飯にかける。"
            ],
            [
                'recipe_id' => 3,
                'title' => '味噌汁',
                'description' => '豆腐やわかめ、長ねぎを使った基本の味噌汁。家庭の健康を支える一品。',
                'category' => '和食',
                'instructions' => "1. だしを火にかける。\n2. 豆腐、わかめ、長ねぎを加える。\n3. 味噌を溶いて仕上げる。"
            ],
        ]);

        // Thêm dữ liệu cho bảng recipe_ingredients
        DB::table('recipe_ingredients')->insert([
            // カレーライス (recipe_id = 1)
            ['recipe_id' => 1, 'ingredient_name' => '鶏肉', 'amount' => '200g'],
            ['recipe_id' => 1, 'ingredient_name' => '玉葱', 'amount' => '1個'],
            ['recipe_id' => 1, 'ingredient_name' => 'にんじん', 'amount' => '1本'],
            ['recipe_id' => 1, 'ingredient_name' => 'じゃがいも', 'amount' => '2個'],
            ['recipe_id' => 1, 'ingredient_name' => 'カレールウ', 'amount' => '100g'],
            ['recipe_id' => 1, 'ingredient_name' => '水', 'amount' => '600ml'],
            // 親子丼 (recipe_id = 2)
            ['recipe_id' => 2, 'ingredient_name' => '鶏もも肉', 'amount' => '150g'],
            ['recipe_id' => 2, 'ingredient_name' => '玉葱', 'amount' => '1/2個'],
            ['recipe_id' => 2, 'ingredient_name' => '卵', 'amount' => '2個'],
            ['recipe_id' => 2, 'ingredient_name' => 'だし', 'amount' => '100ml'],
            ['recipe_id' => 2, 'ingredient_name' => '醤油', 'amount' => '大さじ1'],
            ['recipe_id' => 2, 'ingredient_name' => 'みりん', 'amount' => '大さじ1'],
            // 味噌汁 (recipe_id = 3)
            ['recipe_id' => 3, 'ingredient_name' => '豆腐', 'amount' => '100g'],
            ['recipe_id' => 3, 'ingredient_name' => 'わかめ', 'amount' => '適量'],
            ['recipe_id' => 3, 'ingredient_name' => '味噌', 'amount' => '大さじ2'],
            ['recipe_id' => 3, 'ingredient_name' => 'だし', 'amount' => '300ml'],
            ['recipe_id' => 3, 'ingredient_name' => '長ねぎ', 'amount' => '少々'],
        ]);

        // Thêm dữ liệu cho bảng ingredient_aliases
        DB::table('ingredient_aliases')->insert([
            ['name' => 'たまねぎ', 'canonical_name' => '玉葱'],
            ['name' => 'オニオン', 'canonical_name' => '玉葱'],
            ['name' => 'ポテト', 'canonical_name' => 'じゃがいも'],
            ['name' => '鶏むね肉', 'canonical_name' => '鶏肉'],
            ['name' => '鶏肉', 'canonical_name' => '鶏もも肉'],
            ['name' => '玉ねぎ', 'canonical_name' => '玉葱'],
            ['name' => '玉ネギ', 'canonical_name' => '玉葱'],
            ['name' => 'オニオンスライス', 'canonical_name' => '玉葱'],
            ['name' => 'ニンジン', 'canonical_name' => 'にんじん'],
            ['name' => 'ジャガイモ', 'canonical_name' => 'じゃがいも'],
            ['name' => 'カレー粉', 'canonical_name' => 'カレールウ'],
            ['name' => 'みそ', 'canonical_name' => '味噌'],
            ['name' => 'ネギ', 'canonical_name' => '長ねぎ'],
            ['name' => 'グリーンオニオン', 'canonical_name' => '長ねぎ'],
            ['name' => 'ワカメ', 'canonical_name' => 'わかめ'],
            ['name' => 'トーフ', 'canonical_name' => '豆腐'],
            ['name' => 'タマゴ', 'canonical_name' => '卵'],
        ]);
    }
}
