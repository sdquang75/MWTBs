CREATE DATABASE nutrition_db DEFAULT CHARACTER SET utf8mb4;

USE nutrition_db;

-- レシピ本体
CREATE TABLE IF NOT EXISTS recipes (
  recipe_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100)
);
ALTER TABLE recipes ADD COLUMN instructions TEXT AFTER description;
UPDATE recipes SET instructions = '1. 玉葱と鶏肉を炒める。\n2. にんじんとじゃがいもを加える。\n3. 水とルウを入れて煮込む。' WHERE recipe_id = 1;

UPDATE recipes SET instructions = '1. 鶏もも肉と玉葱を煮る。\n2. 卵を溶いて加え、軽く火を通す。\n3. ご飯にかける。' WHERE recipe_id = 2;

UPDATE recipes SET instructions = '1. だしを火にかける。\n2. 豆腐、わかめ、長ねぎを加える。\n3. 味噌を溶いて仕上げる。' WHERE recipe_id = 3;


-- レシピの材料
CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT NOT NULL,
  ingredient_name VARCHAR(100) NOT NULL,
  amount VARCHAR(50),
  FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
);

-- 材料の同義語
CREATE TABLE IF NOT EXISTS ingredient_aliases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  canonical_name VARCHAR(100) NOT NULL
);



-- レシピデータ
INSERT INTO recipes (title, description, category) VALUES
('カレーライス', '一般家庭で人気のスパイシーなカレーライス。鶏肉や野菜を使った具沢山のメニュー。', '洋風/カレー'),
('親子丼', '鶏肉と卵で作る定番和食の親子丼。シンプルながら奥深い味わい。', '和食'),
('味噌汁', '豆腐やわかめ、長ねぎを使った基本の味噌汁。家庭の健康を支える一品。', '和食');

-- 材料データ
-- カレーライス (recipe_id = 1)
INSERT INTO recipe_ingredients (recipe_id, ingredient_name, amount) VALUES
(1, '鶏肉', '200g'),
(1, '玉葱', '1個'),
(1, 'にんじん', '1本'),
(1, 'じゃがいも', '2個'),
(1, 'カレールウ', '100g'),
(1, '水', '600ml');

-- 親子丼 (recipe_id = 2)
INSERT INTO recipe_ingredients (recipe_id, ingredient_name, amount) VALUES
(2, '鶏もも肉', '150g'),
(2, '玉葱', '1/2個'),
(2, '卵', '2個'),
(2, 'だし', '100ml'),
(2, '醤油', '大さじ1'),
(2, 'みりん', '大さじ1');

-- 味噌汁 (recipe_id = 3)
INSERT INTO recipe_ingredients (recipe_id, ingredient_name, amount) VALUES
(3, '豆腐', '100g'),
(3, 'わかめ', '適量'),
(3, '味噌', '大さじ2'),
(3, 'だし', '300ml'),
(3, '長ねぎ', '少々');


-- 同義語データ
INSERT INTO ingredient_aliases (name, canonical_name) VALUES
('たまねぎ', '玉葱'),
('オニオン', '玉葱'),
('ポテト', 'じゃがいも'),
('鶏むね肉', '鶏肉'),
('鶏肉', '鶏もも肉'),
('玉ねぎ', '玉葱'),
('玉ネギ', '玉葱'),
('オニオンスライス', '玉葱'),
('ニンジン', 'にんじん'),
('ジャガイモ', 'じゃがいも'),
('カレー粉', 'カレールウ'),
('みそ', '味噌'),
('ネギ', '長ねぎ'),
('グリーンオニオン', '長ねぎ'),
('ワカメ', 'わかめ'),
('トーフ', '豆腐'),
('タマゴ', '卵');
