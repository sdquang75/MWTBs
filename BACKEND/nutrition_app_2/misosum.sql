USE recipe_app;

WITH UserMeal AS (
    -- ここに、アプリからユーザーが入力する食品名とグラム数を記述します
    SELECT '豆腐' AS food_name, 100.0 AS quantity_g UNION ALL
    SELECT 'わかめ' AS food_name, 10.0 AS quantity_g UNION ALL     -- 戻したわかめ10gと仮定
    SELECT '味噌' AS food_name, 36.0 AS quantity_g UNION ALL     -- 味噌大さじ2
    SELECT 'だし' AS food_name, 300.0 AS quantity_g UNION ALL
    SELECT '長ネギ' AS food_name, 10.0 AS quantity_g               -- 長ネギ少々10gと仮定
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
        'ビタミンA', 'ビタミンC', '葉酸',   -- 代表的なビタミン
        'カリウム', 'カルシウム', '鉄',      -- 代表的なミネラル
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