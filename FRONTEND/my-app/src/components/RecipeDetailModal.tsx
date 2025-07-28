// src/components/RecipeDetailModal.tsx
import styles from './RecipeDetailModal.module.css';
import type { Recipe } from './RecipeCard';

interface DetailedRecipe extends Recipe {
  description: string;
  steps: string[];
  requiredIngredients: { name: string; quantity: string }[];
}

interface ModalProps {
  recipe: DetailedRecipe;
  userIngredients: string[];
  onClose: () => void;
}

export const RecipeDetailModal = ({ recipe, userIngredients, onClose }: ModalProps) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      {/* Đổi tên class từ modalContent thành modalContainer */}
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        {/* Thêm một div mới để chứa nội dung có thể cuộn */}
        <div className={styles.scrollingContent}>
          <div className={styles.recipeImage}></div>
          <h2 className={styles.title}>{recipe.name}</h2>
          <p className={styles.description}>{recipe.description}</p>

          <h3 className={styles.sectionTitle}>必要な材料</h3>
          <ul className={styles.ingredientList}>
            {recipe.requiredIngredients.map((ing, index) => {
              const hasIngredient = userIngredients.includes(ing.name);
              const itemClass = hasIngredient ? styles.ingredientHave : styles.ingredientMissing;

              return (
                <li key={index} className={`${styles.ingredientItem} ${itemClass}`}>
                  <span className={styles.ingredientIcon}>
                    {hasIngredient ? '✔' : '✖'}
                  </span>
                  <span>{ing.name}</span>
                  <span className={styles.ingredientQuantity}>{ing.quantity}</span>
                </li>
              );
            })}
          </ul>

          <h3 className={styles.sectionTitle}>作り方</h3>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};