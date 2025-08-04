
import { useMemo, useState } from 'react';
import { Header } from '../components/Header';
import { RecipeCard, } from '../components/RecipeCard';
import type { Recipe } from '../components/RecipeCard';
import { RecipeDetailModal } from '../components/RecipeDetailModal';
import styles from './RecipeList.module.css';
import loginStyles from './Login.module.css';
import { useLocation } from 'react-router-dom';

interface DetailedRecipe extends Recipe {
  description: string;
  steps: string[];
  requiredIngredients: { name: string; quantity: string }[];
}



const ALL_RECIPES: DetailedRecipe[] = [
  {
    id: 1,
    name: 'ジャガイモと玉ねぎと にんじんの煮物',
    imageUrl: '',

    ingredients: ['じゃがいも', 'たまねぎ', 'にんじん'],
    description: '日本の伝統的な、温かく栄養満点の煮込み料理。',
    requiredIngredients: [
      { name: 'じゃがいも', quantity: '2個' },
      { name: 'たまねぎ', quantity: '1個' },
      { name: 'にんじん', quantity: '1本' },
      { name: 'だし', quantity: '200ml' },
    ],
    steps: ['野菜を切る', ' 簡単な炒め物をする。', '出汁を加えて20分煮込む。']
  },
  {
    id: 2,
    name: 'カレーライス',
    imageUrl: '',

    ingredients: ['じゃがいも', 'たまねぎ', 'にんじん', '牛肉'],
    description: '日本のカレーは、あらゆる年齢層に愛されている、深い味わいです。',
    requiredIngredients: [
      { name: 'じゃがいも', quantity: '2個' },
      { name: 'たまねぎ', quantity: '1個' },
      { name: '牛肉', quantity: '150g' },
      { name: 'カレールウ', quantity: '50g' },
    ],
    steps: ['肉と野菜を炒め合わせる。', ' 水を加えて煮込む。', 'カレールーと混ぜ合わせる。']
  },
  {
    id: 3,
    name: '肉じゃが',
    imageUrl: '',

    ingredients: ['牛肉', 'じゃがいも', 'たまねぎ'],
    description: '甘辛い牛肉とジャガイモとタマネギの煮込み',
    requiredIngredients: [
      { name: '牛肉', quantity: '200g' },
      { name: 'じゃがいも', quantity: '3個' },
      { name: 'たまねぎ', quantity: '1個' },
      { name: '醤油', quantity: '3  スプーン' },
    ],
    steps: ['牛肉とタマネギを炒める。', 'ジャガイモ、醤油、水を加える。', 'ジャガイモが柔らかくなるまで煮込む。']
  },
  {
    id: 4,
    name: 'チキンサラダ',
    imageUrl: '',
    ingredients: ['鶏肉', 'レタス'],
    description: '新鮮な鶏肉のサラダは軽食に最適です。',
    requiredIngredients: [
      { name: '鶏肉', quantity: '100g' },
      { name: 'レタス', quantity: '50g' },
    ],
    steps: ['鶏肉を煮てほぐす。', 'レタスとドレッシングで和える。']
  },
];


const USER_INGREDIENTS = ['たまねぎ', 'じゃがいも', '醤油', '牛肉'];



export const RecipeList = () => {
  const location = useLocation();
  const [selectedRecipe, setSelectedRecipe] = useState<DetailedRecipe | null>(null);
  const USER_INGREDIENTS = location.state?.ingredients.map((ing: any) => ing.name) || [];
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

              <div key={recipe.id} onClick={() => setSelectedRecipe(recipe)}>
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        </main>

        {selectedRecipe && (
          <RecipeDetailModal
            recipe={selectedRecipe}
            userIngredients={USER_INGREDIENTS}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </div>
    </div>
  );
};