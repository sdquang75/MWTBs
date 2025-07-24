<?php
require_once __DIR__ . '/../db/db.php';
require_once __DIR__ . '/../src/functions/recipe_logic.php';

$ingredientsParam = $_GET['ingredients'] ?? '';
$recipes = [];
if ($ingredientsParam) {
    $ingredients = explode(',', $ingredientsParam);
    $recipes = suggestRecipes($pdo, $ingredients);
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>レシピ提案システム</title>
<link rel="stylesheet" href="/public/css/common.css" />
</head>
<body>
  <h1>材料から作れるレシピを検索</h1>
  <form method="get" action="suggest.php">
    <label for="ingredients">材料をカンマ区切りで入力してください：</label><br />
    <input type="text" id="ingredients" name="ingredients" placeholder="例：たまねぎ,にんじん,じゃがいも" value="<?php echo htmlspecialchars($ingredientsParam); ?>" required style="width: 300px;" /><br /><br />
    <button type="submit">検索</button>
  </form>

  <div id="result">
    <?php if (!empty($ingredientsParam)): ?>
      <?php if (count($recipes) === 0): ?>
        <p>該当するレシピがありません。</p>
      <?php else: ?>
        <h2>作れるレシピ候補</h2>
        <ul>
          <?php foreach ($recipes as $recipe): ?>
              <li>
                  <a href="recipe_detail.php?id=<?= urlencode($recipe['recipe_id']) ?>">
                      <?= htmlspecialchars($recipe['title'], ENT_QUOTES, 'UTF-8') ?>
                  </a>
              </li>
          <?php endforeach; ?>
        </ul>
      <?php endif; ?>
    <?php endif; ?>
  </div>
</body>
</html>
