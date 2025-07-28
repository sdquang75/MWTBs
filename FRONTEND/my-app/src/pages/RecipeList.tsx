// src/pages/RecipeList.tsx
import { useMemo } from 'react';
import { Header } from '../components/Header';
import { RecipeCard } from '../components/RecipeCard';
import type { Recipe } from '../components/RecipeCard';
import styles from './RecipeList.module.css';
import loginStyles from './Login.module.css';

// --- Dữ liệu giả lập cho toàn bộ công thức ---
const ALL_RECIPES: Recipe[] = [
  { id: 1, name: 'ジャガイモと玉ねぎと にんじんの煮物', imageUrl: '', ingredients: ['potato', 'onion', 'carrot'] },
  { id: 2, name: 'カレーライス', imageUrl: '', ingredients: ['potato', 'onion', 'carrot', 'beef'] },
  { id: 3, name: '肉じゃが', imageUrl: '', ingredients: ['beef', 'potato', 'onion'] },
  { id: 4, name: 'チキンサラダ', imageUrl: '', ingredients: ['chicken', 'lettuce'] },
];

// --- Nguyên liệu người dùng đã nhập (giả lập) ---
const USER_INGREDIENTS = ['onion', 'potato', 'beef'];

export const RecipeList = () => {
  // [Logic] Lọc các công thức chứa ít nhất 1 nguyên liệu người dùng có
  const recommendedRecipes = useMemo(() => {
    return ALL_RECIPES.filter(recipe => 
      recipe.ingredients.some(ingredient => USER_INGREDIENTS.includes(ingredient))
    );
  }, []);

  return (
    <div className={loginStyles.phoneFrame}>
      <div className={styles.screen}>
        <Header showBackButton={true} />
        <main className={styles.main}>
          <h2 className={styles.title}>おすすめレシピ</h2>
          <div className={styles.recipeGrid}>
            {recommendedRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};