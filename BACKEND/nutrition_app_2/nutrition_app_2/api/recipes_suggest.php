<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../db/db.php';

$rawInput = file_get_contents("php://input");
// $rawInput = mb_convert_encoding($rawInput, 'UTF-8', 'auto'); // 一旦外す
$input = json_decode($rawInput, true);

error_log("受信データ: " . print_r($input, true));

$ingredients = array_map('trim', $input['ingredients'] ?? []);

if (empty($ingredients)) {
    echo json_encode(["recipes" => []]);
    exit;
}

$canonicalIngredients = [];
foreach ($ingredients as $name) {
    $name = trim($name);
    error_log("同義語変換対象: [" . $name . "]");
    $stmt = $pdo->prepare("SELECT canonical_name FROM ingredient_aliases WHERE name = ?");
    $stmt->execute([$name]);
    error_log("実行したクエリ: SELECT canonical_name FROM ingredient_aliases WHERE name = '{$name}'");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($row) {
        error_log("変換結果: " . $row['canonical_name']);
        $canonicalIngredients[] = $row['canonical_name'];
    } else {
        error_log("変換結果なし（原文を使用）: " . $name);
        $canonicalIngredients[] = $name;
    }
}

error_log("標準化後の材料: " . print_r($canonicalIngredients, true));

$placeholders = implode(',', array_fill(0, count($canonicalIngredients), '?'));
$sql = "SELECT DISTINCT r.recipe_id, r.title, r.description
        FROM recipes r
        JOIN recipe_ingredients ri ON r.recipe_id = ri.recipe_id
        WHERE ri.ingredient_name IN ($placeholders)";
error_log("SQL実行: " . $sql);

$stmt = $pdo->prepare($sql);
$stmt->execute($canonicalIngredients);
$recipes = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["recipes" => $recipes]);
