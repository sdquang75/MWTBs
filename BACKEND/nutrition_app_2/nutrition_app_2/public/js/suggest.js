document.getElementById('searchBtn').addEventListener('click', () => {
  const input = document.getElementById('ingredientInput').value;
  const ingredients = input.split(',').map(i => i.trim()).filter(i => i);

  fetch('../api/recipes_suggest.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients })
  })
  .then(res => res.json())
  .then(data => {
    console.log('recipes:', data.recipes);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (!data.recipes || data.recipes.length === 0) {
      resultsDiv.innerHTML = '<p>該当するレシピがありません</p>';
    } else {
      data.recipes.forEach(recipe => {
        const div = document.createElement('div');
        div.className = 'recipe';
        div.innerHTML = `
          <h3><a href="../recipes/recipe_detail.php?id=${recipe.recipe_id}">${recipe.title}</a></h3>
          <p>${recipe.description}</p>
        `;
        resultsDiv.appendChild(div);
      });
    }
  })
  .catch(err => {
    alert('通信エラーが発生しました');
    console.error(err);
  });
});
