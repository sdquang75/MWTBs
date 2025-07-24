
INSERT INTO nutrients (name, unit) VALUES
('エネルギー', 'kcal');
-- nutrientsにエネルギーを追加
USE recipe_app;

-- 各食品のエネルギー量を food_nutrients テーブルに追加
-- 注意：nutrient_id = 30 が「エネルギー」のIDであることを前提とします。
-- もし既に同じ food_id と nutrient_id の組み合わせが存在する場合、PRIMARY KEY/UNIQUE制約違反になる可能性があります。
-- その場合は、INSERT INTO ... ON DUPLICATE KEY UPDATE ... を使うか、事前にDELETE FROM food_nutrients WHERE nutrient_id = 30; で削除してください。

-- たまねぎ (id=1) のエネルギー量
INSERT INTO food_nutrients (food_id, nutrient_id, amount_per_100g) VALUES (1, 30, 33.0);

-- にんじん (id=2) のエネルギー量
INSERT INTO food_nutrients (food_id, nutrient_id, amount_per_100g) VALUES (2, 36.0);

-- ジャガイモ (id=3) のエネルギー量
INSERT INTO food_nutrients (food_id, nutrient_id, amount_per_100g) VALUES (3, 30, 77.0);

-- カレールウ (id=4) のエネルギー量
INSERT INTO food_nutrients (food_id, nutrient_id, amount_per_100g) VALUES (4, 30, 482.5);

-- 鶏肉 (id=5) のエネルギー量
INSERT INTO food_nutrients (food_id, nutrient_id, amount_per_100g) VALUES (5, 30, 110.1);

-- 水 (id=6) のエネルギー量
INSERT INTO food_nutrients (food_id, nutrient_id, amount_per_100g) VALUES (6, 30, 4.0); -- ナトリウム1mgとカルシウム3mg、マグネシウム1mgを考慮した上で0に近いため、4kcalとします。（厳密には0ですが、計算の都合上）

-- 鶏もも肉 (id=7) のエネルギー量
INSERT INTO food_nutrients (food_id, nutrient_id, amount_per_100g) VALUES (7, 30, 203.8);

-- 卵 (id=8) のエネルギー量
INSERT INTO food_nutrients (food_id, nutrient_id, amount_per_100g) VALUES (8, 30, 150.3);

-- だし (id=9) のエネルギー量
INSERT INTO food_nutrients (food_id, nutrient_id, amount_per_100g) VALUES (9, 30, 2.4);

-- 醤油 (id=10) のエネルギー量
INSERT INTO food_nutrients (food_id, nutrient_id, amount_per_100g) VALUES (10, 30, 72.1);

-- みりん (id=11) のエネルギー量
INSERT INTO food_nutrients (food_id, nutrient_id, amount_per_100g) VALUES (11, 30, 160.8);

-- 豆腐 (id=12) のエネルギー量
INSERT INTO food_nutrients (food_id, nutrient_id, amount_per_100g) VALUES (12, 30, 75.7);

-- わかめ (id=13) のエネルギー量
INSERT INTO food_nutrients (food_id, nutrient_id, amount_per_100g) VALUES (13, 30, 16.5);

-- 味噌 (id=14) のエネルギー量
INSERT INTO food_nutrients (food_id, nutrient_id, amount_per_100g) VALUES (14, 30, 149.5);

-- 長ネギ (id=15) のエネルギー量
INSERT INTO food_nutrients (food_id, nutrient_id, amount_per_100g) VALUES (15, 30, 38.0);