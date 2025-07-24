USE recipe_app;

WITH UserMeal AS (
    -- ここに、アプリからユーザーが入力する食品名とグラム数を記述します
    -- アプリケーションでは、このVALUES以下の部分を動的に生成することになります
    SELECT '鶏肉' AS food_name, 200.0 AS quantity_g UNION ALL
    SELECT 'たまねぎ' AS food_name, 200.0 AS quantity_g UNION ALL -- 玉葱1個
    SELECT 'にんじん' AS food_name, 360.0 AS quantity_g UNION ALL -- にんじん2本
    SELECT 'じゃがいも' AS food_name, 300.0 AS quantity_g UNION ALL -- じゃがいも2個
    SELECT 'カレールウ' AS food_name, 100.0 AS quantity_g UNION ALL
    SELECT '水' AS food_name, 600.0 AS quantity_g
)
SELECT
    n.name AS 栄養素名,
    n.unit AS 単位,
    SUM(
        (fn.amount_per_100g / 100.0) * um.quantity_g
    ) AS 合計量
FROM
    UserMeal AS um
JOIN
    foods AS f ON um.food_name = f.name
JOIN
    food_nutrients AS fn ON f.id = fn.food_id
JOIN
    nutrients AS n ON fn.nutrient_id = n.id
WHERE
    -- ここで計算したい栄養素を絞り込みます
    n.name IN (
        '炭水化物', '脂質', 'たんぱく質', -- 五大栄養素の主要3つ
        'ビタミンA', 'ビタミンC', '葉酸', -- 代表的なビタミン
        'カリウム', 'カルシウム', '鉄',    -- 代表的なミネラル
        'ナトリウム' -- その他よく見る項目
        -- 必要に応じてさらに栄養素を追加
    )
GROUP BY
    n.name, n.unit
ORDER BY
    CASE n.name
        WHEN 'エネルギー' THEN 1 -- エネルギーはnutrientsに直接ない場合が多いが、計算アプリなら重要
        WHEN 'たんぱく質' THEN 2
        WHEN '脂質' THEN 3
        WHEN '炭水化物' THEN 4
        WHEN 'ナトリウム' THEN 5
        ELSE 6
    END, n.name;