-- 既存のデータベースがあれば削除する (これが重要！)
DROP DATABASE IF EXISTS recipe_app;

CREATE DATABASE recipe_app CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
-- ファイルを作った↑
USE recipe_app;
-- 使うやつ指定↑

-- 既存のテーブルがあれば削除 (外部キーの依存関係の逆順で削除)
DROP TABLE IF EXISTS food_nutrients;
DROP TABLE IF EXISTS foods;
DROP TABLE IF EXISTS nutrients;

CREATE TABLE foods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    unit VARCHAR(20)
);

CREATE TABLE nutrients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(10)
);

CREATE TABLE food_nutrients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    food_id INT,
    nutrient_id INT,
    amount_per_100g FLOAT,
    FOREIGN KEY (food_id) REFERENCES foods(id),
    FOREIGN KEY (nutrient_id) REFERENCES nutrients(id)
);

INSERT INTO nutrients (name, unit) VALUES
('炭水化物', 'g'),
('脂質', 'g'),
('たんぱく質', 'g'),
('ビタミンA', 'µgRE'),      -- ビタミンA（レチノール活性当量）
('ビタミンD', 'µg'),      -- # ビタミンD
('ビタミンE', 'mg'),      -- # ビタミンE
('ビタミンK', 'µg'),      -- # ビタミンK
('ビタミンB1', 'mg'),      -- # ビタミンB1
('ビタミンB2', 'mg'),     -- # ビタミンB2
('ナイアシン', 'mgNE'),   -- # ナイアシン（ナイアシン当量）
('ビタミンB6', 'mg'),     -- # ビタミンB6
('ビタミンB12', 'µg'),    -- # ビタミンB12
('葉酸', 'µg'),           -- # 葉酸
('パントテン酸', 'mg'),   -- # パントテン酸
('ビオチン', 'µg'),      -- # ビオチン
('ビタミンC', 'mg'),      -- # ビタミンC
('ナトリウム', 'mg'),     -- # ナトリウム
('カリウム', 'mg'),       -- # カリウム
('カルシウム', 'mg'),     -- # カルシウム
('マグネシウム', 'mg'),   -- # マグネシウム
('リン', 'mg'),          -- # リン
('鉄', 'mg'),            -- # 鉄
('亜鉛', 'mg'),          -- # 亜鉛
('銅', 'mg'),            -- # 銅
('マンガン', 'mg'),       -- # マンガン
('ヨウ素', 'µg'),        -- # ヨウ素
('セレン', 'µg'),        -- # セレン
('クロム', 'µg'),        -- # クロム
('モリブデン', 'µg');     -- # モリブデン
SELECT * FROM nutrients;

-- nutrientsの確認



-- DELETE FROM テーブル名;
-- テーブルの中身消去　↑

-- DROP TABLE テーブル名;
-- テーブルの消去