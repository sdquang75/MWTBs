// src/components/screens/RecipeListScreen/RecipeListScreen.tsx
import React, { useState } from 'react';
import styles from './RecipeListScreen.module.css';

// --- DỮ LIỆU GIẢ LẬP ---
type Recipe = {
  id: number;
  name: string;
  image: string; // URL của ảnh
  time: number; // Phút
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  calories: number;
  ingredientsUsed: number;
  ingredientsTotal: number;
  type: 'Món chính' | 'Món phụ' | 'Canh';
};

const MOCK_RECIPES: Recipe[] = [
  { id: 1, name: "Gà xào sả ớt", image: "https://images.unsplash.com/photo-1604908176997-12c7553e21d3?w=500", time: 25, difficulty: "Dễ", calories: 350, ingredientsUsed: 3, ingredientsTotal: 4, type: 'Món chính' },
  { id: 2, name: "Canh chua cá lóc", image: "https://images.unsplash.com/photo-1598515598523-23348f435338?w=500", time: 45, difficulty: "Trung bình", calories: 280, ingredientsUsed: 4, ingredientsTotal: 6, type: 'Canh' },
  { id: 3, name: "Thịt ba chỉ kho trứng", image: "https://images.unsplash.com/photo-1627042599222-3a72515004db?w=500", time: 60, difficulty: "Trung bình", calories: 550, ingredientsUsed: 2, ingredientsTotal: 4, type: 'Món chính' },
  { id: 4, name: "Rau muống xào tỏi", image: "https://images.unsplash.com/photo-1625944239203-5419a4e33660?w=500", time: 15, difficulty: "Dễ", calories: 150, ingredientsUsed: 2, ingredientsTotal: 2, type: 'Món phụ' },
  { id: 5, name: "Bò lúc lắc", image: "https://images.unsplash.com/photo-1594041682318-634f40435538?w=500", time: 30, difficulty: "Trung bình", calories: 480, ingredientsUsed: 3, ingredientsTotal: 5, type: 'Món chính' },
];

// --- CÁC COMPONENT CON ---

// Thẻ công thức
const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => (
  <div className={styles.recipeCard}>
    <div className={styles.heroImage} style={{ backgroundImage: `url(${recipe.image})` }}>
      <h2 className={styles.recipeTitle}>{recipe.name}</h2>
    </div>
    <div className={styles.infoSection}>
      <div className={styles.quickInfoBar}>
        <span className={styles.quickInfoItem}>🕒 {recipe.time} phút</span>
        <span className={styles.quickInfoItem}>⭐ {recipe.difficulty}</span>
        <span className={styles.quickInfoItem}>🔥 {recipe.calories} Kcal</span>
      </div>
      <p className={styles.highlightInfo}>
        Dùng {recipe.ingredientsUsed}/{recipe.ingredientsTotal} nguyên liệu bạn có
      </p>
    </div>
  </div>
);

// Trạng thái không có kết quả
const EmptyState: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className={styles.emptyState}>
    <span className={styles.icon}>👨‍🍳</span>
    <h2>Ôi, không tìm thấy món nào!</h2>
    <p>Thử thay đổi hoặc thêm bớt vài nguyên liệu ở màn hình trước xem sao nhé!</p>
    <button className={styles.backButton} onClick={onBack}>
      Quay lại & Thay đổi
    </button>
  </div>
);

// Modal lọc
const FilterModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className={styles.filterOverlay} onClick={onClose}>
    <div className={styles.filterModal} onClick={(e) => e.stopPropagation()}>
      <div className={styles.filterSection}>
        <h3>Sắp xếp theo</h3>
        <div className={styles.filterOptions}>
          <button className={`${styles.filterChip} ${styles.active}`}>Liên quan nhất</button>
          <button className={styles.filterChip}>Thời gian nấu nhanh</button>
          <button className={styles.filterChip}>Độ khó tăng dần</button>
        </div>
      </div>
      <div className={styles.filterSection}>
        <h3>Lọc theo loại món</h3>
        <div className={styles.filterOptions}>
          <button className={styles.filterChip}>Món chính</button>
          <button className={styles.filterChip}>Món phụ</button>
          <button className={styles.filterChip}>Canh</button>
        </div>
      </div>
      <div className={styles.filterActions}>
        <button className={styles.resetButton}>Đặt lại</button>
        <button className={styles.applyButton} onClick={onClose}>Xem kết quả</button>
      </div>
    </div>
  </div>
);

// --- COMPONENT CHÍNH ---

const RecipeListScreen: React.FC = () => {
  const [recipes] = useState<Recipe[]>(MOCK_RECIPES);
  const [showFilter, setShowFilter] = useState(false);

  const recipeCount = recipes.length;

  return (
    <div className={styles.container}>
      {/* BƯỚC 2: HEADER */}
      <header className={styles.header}>
        <button className={styles.headerButton} aria-label="Quay lại">{'<'}</button>
        <h1 className={styles.headerTitle}>Gợi ý cho bạn</h1>
        <button className={styles.headerButton} aria-label="Lọc" onClick={() => setShowFilter(true)}>
          <span style={{fontSize: '20px'}}>🎛️</span>
        </button>
      </header>

      {recipeCount > 0 ? (
        <>
          {/* BƯỚC 3: TÓM TẮT */}
          <div className={styles.summaryText}>
            Tìm thấy <strong>{recipeCount} món ngon</strong> với nguyên liệu của bạn!
          </div>
          
          {/* DANH SÁCH MÓN ĂN */}
          <div className={styles.recipeList}>
            {recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
          </div>
        </>
      ) : (
        // BƯỚC 6: TRẠNG THÁI RỖNG
        <EmptyState onBack={() => alert("Quay về màn hình trước...")} />
      )}

      {/* BƯỚC 5: MODAL LỌC */}
      {showFilter && <FilterModal onClose={() => setShowFilter(false)} />}
    </div>
  );
};

export default RecipeListScreen;