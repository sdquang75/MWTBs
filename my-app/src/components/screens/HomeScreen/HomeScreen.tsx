// src/components/screens/HomeScreen/HomeScreen.tsx
import React, { useState, useMemo } from 'react';
import styles from './HomeScreen.module.css';

// --- Dữ liệu giả lập (Không đổi) ---
const ALL_INGREDIENTS = [
  "Thịt bò", "Thịt lợn ba chỉ", "Thịt gà", "Cá hồi", "Tôm",
  "Trứng", "Sữa tươi", "Phô mai", "Cà chua", "Hành tây", "Tỏi",
  "Khoai tây", "Cà rốt", "Bông cải xanh", "Ớt chuông", "Nấm"
];

const CATEGORIES = [
  { name: "Rau củ", icon: "🥦" },
  { name: "Thịt cá", icon: "🥩" },
  { name: "Trứng & Sữa", icon: "🥚" },
  { name: "Gia vị", icon: "🧂" },
  { name: "Khác", icon: "✨" }
];

// --- Component chính ---
const HomeScreen: React.FC = () => {
  // --- STATES (Không đổi) ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  // --- LOGIC (Không đổi) ---
  const addIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(prev => [...prev, ingredient]);
    }
    setSearchTerm('');
  };

  const removeIngredient = (ingredientToRemove: string) => {
    setSelectedIngredients(prev => prev.filter(ing => ing !== ingredientToRemove));
  };
  
  const autocompleteSuggestions = useMemo(() => {
    if (searchTerm.trim() === '') return [];
    return ALL_INGREDIENTS.filter(ing => 
      ing.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedIngredients.includes(ing)
    );
  }, [searchTerm, selectedIngredients]);

  const ingredientCount = selectedIngredients.length;
  const isCtaDisabled = ingredientCount === 0;

  return (
    <div className={styles.container}>
      {/* BƯỚC 2: HEADER */}
      <header className={styles.header}>
        {/* SVG được thay bằng ký tự text */}
        <span className={styles.headerIcon}>☰</span>
        <h1 className={styles.headerTitle}>Hôm nay nấu gì?</h1>
        {/* SVG được thay bằng emoji */}
        <span className={styles.headerIcon}>🔔</span>
      </header>

      <main className={styles.mainContent}>
        {/* BƯỚC 3: Ô TÌM KIẾM */}
        <div className={styles.searchWrapper}>
          {/* SVG được thay bằng emoji */}
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Thêm thịt gà, cà chua, trứng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            // SVG được thay bằng ký tự text trong button để có thể click
            <button
              className={styles.clearIcon}
              onClick={() => setSearchTerm('')}
              style={{background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer'}}
              aria-label="Xóa ô tìm kiếm"
            >
              ×
            </button>
          )}
          {autocompleteSuggestions.length > 0 && (
            <ul className={styles.autocompleteList}>
              {autocompleteSuggestions.slice(0, 5).map(suggestion => (
                <li key={suggestion} className={styles.autocompleteItem} onClick={() => addIngredient(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* BƯỚC 4: DANH MỤC GỢI Ý */}
        <div className={styles.categoryContainer}>
          {CATEGORIES.map(cat => (
            <button key={cat.name} className={styles.categoryChip}>
              <span style={{fontSize: '20px'}}>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* BƯỚC 5: GIỎ ĐỒ */}
        <section className={styles.basketSection}>
          <h2 className={styles.basketTitle}>Nguyên liệu của bạn:</h2>
          {ingredientCount === 0 ? (
            <div className={styles.emptyBasket}>
              {/* SVG hình ảnh được thay bằng emoji lớn */}
              <span style={{fontSize: '60px', opacity: 0.6}}>🧺</span>
              <p>Chiếc giỏ của bạn còn trống trơn!</p>
            </div>
          ) : (
            <div className={styles.ingredientList}>
              {selectedIngredients.map(ingredient => (
                <div key={ingredient} className={styles.ingredientTag}>
                  <span>{ingredient}</span>
                  {/* SVG được thay bằng ký tự text trong button */}
                  <button
                     className={styles.removeTagIcon}
                     onClick={() => removeIngredient(ingredient)}
                     style={{background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: 'var(--primary-color)', padding: '0 0 0 4px'}}
                     aria-label={`Xóa ${ingredient}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* BƯỚC 6: NÚT HÀNH ĐỘNG CHÍNH */}
      <footer className={styles.ctaFooter}>
        <button className={styles.ctaButton} disabled={isCtaDisabled}>
          {isCtaDisabled 
            ? "Chọn nguyên liệu để xem điều kỳ diệu!"
            : `Tìm ${ingredientCount} món ngon ngay!`}
        </button>
      </footer>
    </div>
  );
};

export default HomeScreen;