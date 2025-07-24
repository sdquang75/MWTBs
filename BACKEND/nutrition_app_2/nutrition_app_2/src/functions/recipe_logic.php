<?php
// 食材名の同義語を正規化する関数
function normalizeIngredientName(PDO $pdo, string $name): string {
    $stmt = $pdo->prepare("SELECT canonical_name FROM ingredient_aliases WHERE name = ?");
    $stmt->execute([$name]);
    $result = $stmt->fetchColumn();
    return $result ? $result : $name;
}

// 入力された材料から作れるレシピ候補を取得する関数
function suggestRecipes(PDO $pdo, array $inputIngredients): array {
    // 同義語を正規化
    $normalized = array_map(fn($ing) => normalizeIngredientName($pdo, trim($ing)), $inputIngredients);

    // プレースホルダ作成
    $placeholders = implode(',', array_fill(0, count($normalized), '?'));

    // レシピIDと材料数を集計
    $sql = "
        SELECT r.recipe_id, r.title, r.description, r.category, COUNT(ri.ingredient_name) AS match_count
        FROM recipes r
        JOIN recipe_ingredients ri ON r.recipe_id = ri.recipe_id
        WHERE ri.ingredient_name IN ($placeholders)
        GROUP BY r.recipe_id
        HAVING match_count = (SELECT COUNT(*) FROM recipe_ingredients WHERE recipe_id = r.recipe_id)
        ORDER BY r.title ASC
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($normalized);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

