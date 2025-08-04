
import styles from './RecipeCard.module.css';


export interface Recipe {
  id: number;
  name: string;
  imageUrl: string; 
  ingredients: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{recipe.name}</h3>
        <div className={styles.ingredients}>
          {/* Hiển thị 3 icon nguyên liệu placeholder */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={styles.ingredientIcon}></div>
          ))}
        </div>
        <div className={styles.footer}>
          <a href="#" className={styles.link}>
            このレシピを見る
          </a>
        </div>
      </div>
    </div>
  );
};