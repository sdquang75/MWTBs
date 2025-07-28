// src/pages/RecipeList.tsx
import { useMemo, useState } from 'react';
import { Header } from '../components/Header';
import { RecipeCard,  } from '../components/RecipeCard';
import type { Recipe } from '../components/RecipeCard';
import { RecipeDetailModal } from '../components/RecipeDetailModal';
import styles from './RecipeList.module.css';
import loginStyles from './Login.module.css';

// Interface mở rộng
interface DetailedRecipe extends Recipe {
  description: string;
  steps: string[];
  requiredIngredients: { name: string; quantity: string }[];
}

// --- BẮT ĐẦU PHẦN SỬA LỖI DATA ---
// Dữ liệu giả lập cho toàn bộ công thức
const ALL_RECIPES: DetailedRecipe[] = [
  { 
    id: 1, 
    name: 'ジャガイモと玉ねぎと にんじんの煮物', 
    imageUrl: '', 
    // Sửa tên nguyên liệu thành tiếng Nhật
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
    // Sửa tên nguyên liệu thành tiếng Nhật
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
    // Sửa tên nguyên liệu thành tiếng Nhật
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
    name: 'チキンサラダ', // Món này sẽ không được gợi ý
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

// Nguyên liệu người dùng đã nhập (giả lập)
const USER_INGREDIENTS = ['たまねぎ', 'じゃがいも', '醤油', '牛肉']; // Thêm '牛肉' để có 3 món được gợi ý
// --- KẾT THÚC PHẦN SỬA LỖI DATA ---


export const RecipeList = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<DetailedRecipe | null>(null);

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
              // Bọc RecipeCard trong div để gán sự kiện onClick
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