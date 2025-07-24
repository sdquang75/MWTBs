<?php
require_once __DIR__ . '/../db/db.php';

$recipe_id = $_GET['id'] ?? null;

if (!$recipe_id || !ctype_digit($recipe_id)) {
    echo "無効なレシピIDです。";
    exit;
}

// レシピ取得
$stmt = $pdo->prepare("SELECT title, description, instructions FROM recipes WHERE recipe_id = ?");
$stmt->execute([$recipe_id]);
$recipe = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$recipe) {
    echo "レシピが見つかりません。";
    exit;
}

// 材料を取得（オプション）
$stmt_ing = $pdo->prepare("SELECT ingredient_name FROM recipe_ingredients WHERE recipe_id = ?");
$stmt_ing->execute([$recipe_id]);
$ingredients = $stmt_ing->fetchAll(PDO::FETCH_COLUMN);
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title><?= htmlspecialchars($recipe['title']) ?></title>
  <link rel="stylesheet" href="/css/common.css">
</head>
<body>
  <div class="container">
    <h1><?= htmlspecialchars($recipe['title']) ?></h1>
    <p><strong>説明:</strong> <?= nl2br(htmlspecialchars($recipe['description'])) ?></p>
    <hr>
    <?php if (!empty($ingredients)): ?>
      <h2>材料</h2>
      <ul>
        <?php foreach ($ingredients as $ing): ?>
          <li><?= htmlspecialchars($ing) ?></li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>
 <h2>作り方</h2>
<?php if (!empty($recipe['instructions'])): ?>
  <p><?= nl2br(htmlspecialchars($recipe['instructions'])) ?></p>
<?php else: ?>
  <p><em>（作り方が登録されていません）</em></p>
<?php endif; ?>

<a href="/public/suggest.html">← 検索に戻る</a>
  </div>
</body>
</html>
