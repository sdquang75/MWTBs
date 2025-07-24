-- 推奨栄養量を格納するテーブル
CREATE TABLE recommended_nutrients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    age_group VARCHAR(50) NOT NULL,    -- 年齢区分 (例: '18-29歳', '30-49歳', '65歳以上', '妊婦', '授乳婦')
    gender VARCHAR(10) NOT NULL,       -- 性別 (例: '男性', '女性')
    activity_level VARCHAR(50) NOT NULL, -- 活動レベル (例: '低い', '普通', '高い' または 'Ⅰ', 'Ⅱ', 'Ⅲ')
    nutrient_id INT NOT NULL,          -- 栄養素ID (nutrientsテーブルのIDを参照)
    amount FLOAT NOT NULL,             -- 推奨量または目安量
    unit VARCHAR(10) NOT NULL,         -- 単位 (nutrientsテーブルのunitと同じになるはず)
    UNIQUE (age_group, gender, activity_level, nutrient_id), -- 重複を防ぐ
    FOREIGN KEY (nutrient_id) REFERENCES nutrients(id)
);


-- recommended_nutrients テーブルへのINSERT文の例
-- (厚生労働省「日本人の食事摂取基準（2020年版）」より抜粋・簡略化)

USE recipe_app;

-- nutrientsテーブルに「エネルギー」がid=30で追加されていると仮定
-- (もし違うIDの場合は、以下のSELECT id FROM nutrients WHERE name = '...') を適切に修正してください)

-- 18-29歳 男性 身体活動レベルII（普通）
INSERT INTO recommended_nutrients (age_group, gender, activity_level, nutrient_id, amount, unit) VALUES
('18-29歳', '男性', 'II', (SELECT id FROM nutrients WHERE name = 'エネルギー'), 2650, 'kcal'),
('18-29歳', '男性', 'II', (SELECT id FROM nutrients WHERE name = 'たんぱく質'), 65, 'g'),
('18-29歳', '男性', 'II', (SELECT id FROM nutrients WHERE name = '脂質'), 73, 'g'), -- エネルギー比率で計算されることが多いが、ここでは目安値
('18-29歳', '男性', 'II', (SELECT id FROM nutrients WHERE name = '炭水化物'), 331, 'g'), -- エネルギー比率で計算されることが多いが、ここでは目安値
('18-29歳', '男性', 'II', (SELECT id FROM nutrients WHERE name = 'ビタミンC'), 100, 'mg'),
('18-29歳', '男性', 'II', (SELECT id FROM nutrients WHERE name = 'カルシウム'), 600, 'mg'),
('18-29歳', '男性', 'II', (SELECT id FROM nutrients WHERE name = '鉄'), 7.5, 'mg');

-- 18-29歳 女性 身体活動レベルII（普通）
INSERT INTO recommended_nutrients (age_group, gender, activity_level, nutrient_id, amount, unit) VALUES
('18-29歳', '女性', 'II', (SELECT id FROM nutrients WHERE name = 'エネルギー'), 2000, 'kcal'),
('18-29歳', '女性', 'II', (SELECT id FROM nutrients WHERE name = 'たんぱく質'), 50, 'g'),
('18-29歳', '女性', 'II', (SELECT id FROM nutrients WHERE name = '脂質'), 56, 'g'),
('18-29歳', '女性', 'II', (SELECT id FROM nutrients WHERE name = '炭水化物'), 250, 'g'),
('18-29歳', '女性', 'II', (SELECT id FROM nutrients WHERE name = 'ビタミンC'), 100, 'mg'),
('18-29歳', '女性', 'II', (SELECT id FROM nutrients WHERE name = 'カルシウム'), 600, 'mg'),
('18-29歳', '女性', 'II', (SELECT id FROM nutrients WHERE name = '鉄'), 10.5, 'mg'); -- 月経ありの場合

-- 栄養素IDの確認
-- SELECT id, name FROM nutrients WHERE name IN ('エネルギー', 'たんぱく質', '脂質', '炭水化物', 'ビタミンC', 'カルシウム', '鉄');