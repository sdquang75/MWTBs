// src/components/screens/HomeScreen/HomeScreen.tsx
import React, { useState, useMemo } from 'react';
import styles from './HomeScreen.module.css';

// --- Dữ liệu giả lập (Không đổi) ---
const ALL_INGREDIENTS = [
  "牛肉", "豚バラ肉", "鶏肉", "サーモン", "エビ",
  "卵", "牛乳", "チーズ", "トマト", "玉ねぎ", "にんにく",
  "じゃがいも", "にんじん", "ブロッコリー", "ピーマン", "きのこ"
];

const CATEGORIES = [
  { name: "野菜", icon: "🥦" },
  { name: "肉・魚", icon: "🥩" },
  { name: "卵・乳製品", icon: "🥚" },
  { name: "調味料", icon: "🧂" },
  { name: "その他", icon: "✨" }
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

  return (
    <div className={styles.container}>
      <div className={styles.loginBox} style={{ maxWidth: 400, margin: '40px auto', borderRadius: 10, boxShadow: '2px 2px 4px rgba(0,0,0,0.15)', background: '#F9FAFB', padding: '32px 20px' }}>
        <header className={styles.header} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          {/* Menu SVG */}
          <span style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', color: '#7165E3' }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="5" width="28" height="3" rx="1.5" fill="#7165E3"/>
              <rect y="12.5" width="28" height="3" rx="1.5" fill="#7165E3"/>
              <rect y="20" width="28" height="3" rx="1.5" fill="#7165E3"/>
            </svg>
          </span>
          <h1 className={styles.title} style={{ fontSize: 22, fontWeight: 600, color: '#000', margin: 0 }}>今日のおすすめレシピ</h1>
          {/* Bell SVG */}
          <span style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', color: '#7165E3' }}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 23c1.38 0 2.5-1.12 2.5-2.5h-5A2.5 2.5 0 0 0 13 23Zm8-5V12c0-3.31-2.69-6-6-6V5a2 2 0 1 0-4 0v1c-3.31 0-6 2.69-6 6v6l-2 2v1h20v-1l-2-2Zm-2 1H7v-7c0-3.31 2.69-6 6-6s6 2.69 6 6v7Z" fill="#7165E3"/>
            </svg>
          </span>
        </header>
        <main className={styles.mainContent} style={{ padding: 0 }}>
          <div className={styles.searchWrapper} style={{ marginBottom: 20 }}>
            <span className={styles.searchIcon} style={{ fontSize: 18, color: '#6B7280', marginRight: 8 }}>🔍</span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="食材を追加（例：卵、トマト、牛乳...）"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ fontSize: 15, border: 'none', outline: 'none', background: 'transparent', flex: 1 }}
            />
            {searchTerm && (
              <button
                className={styles.clearIcon}
                onClick={() => setSearchTerm('')}
                aria-label="検索をクリア"
                style={{ background: 'none', border: 'none', fontSize: 20, color: '#6B7280', cursor: 'pointer', marginLeft: 4 }}
              >
                ×
              </button>
            )}
            {autocompleteSuggestions.length > 0 && (
              <ul className={styles.autocompleteList} style={{ position: 'absolute', top: 40, left: 0, right: 0, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', zIndex: 10, margin: 0, padding: 0, listStyle: 'none' }}>
                {autocompleteSuggestions.slice(0, 5).map(suggestion => (
                  <li key={suggestion} className={styles.autocompleteItem} style={{ padding: '10px 16px', cursor: 'pointer', color: '#7165E3' }} onClick={() => addIngredient(suggestion)}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.categoryContainer} style={{ margin: '20px 0 16px 0', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button key={cat.name} className={styles.categoryChip} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#F3F4F6', border: 'none', borderRadius: 16, padding: '6px 14px', fontSize: 15, color: '#7165E3', fontWeight: 500, cursor: 'pointer', marginRight: 8 }}>
                <span style={{ fontSize: 18 }}>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
          <section className={styles.basketSection} style={{ marginTop: 32 }}>
            <h2 className={styles.basketTitle} style={{ textAlign: 'center', marginBottom: 20, fontSize: 16, fontWeight: 600 }}>選択した食材</h2>
            {ingredientCount === 0 ? (
              <div className={styles.emptyBasket} style={{ textAlign: 'center', padding: '48px 20px', border: '2px dashed #E5E7EB', borderRadius: 16, background: '#F9FAFB' }}>
                <span style={{ fontSize: '60px', opacity: 0.6, display: 'block', marginBottom: 12 }}>🧺</span>
                <p style={{ color: '#6B7280', fontSize: 16, margin: 0 }}>まだ食材が選択されていません</p>
              </div>
            ) : (
              <div className={styles.ingredientList} style={{ justifyContent: 'center', gap: 12, display: 'flex', flexWrap: 'wrap' }}>
                {selectedIngredients.map(ingredient => (
                  <div key={ingredient} className={styles.ingredientTag} style={{ background: '#E8E6FC', color: '#7165E3', borderRadius: 8, fontWeight: 500, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span>{ingredient}</span>
                    <button
                      className={styles.removeTagIcon}
                      onClick={() => removeIngredient(ingredient)}
                      style={{ background: 'none', border: 'none', fontSize: 16, cursor: 'pointer', color: '#7165E3', padding: '0 0 0 4px' }}
                      aria-label={`「${ingredient}」を削除`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
        <footer className={styles.ctaFooter} style={{ padding: 20, background: '#fff', boxShadow: '0 -4px 10px rgba(0,0,0,0.05)', marginTop: 32 }}>
          <button className={styles.ctaButton} style={{ width: '100%', height: 52, borderRadius: 16, fontSize: 18, fontWeight: 600 }} disabled={ingredientCount === 0}>
            {ingredientCount === 0
              ? "食材を選択してください"
              : `${ingredientCount}個の食材でレシピを探す`}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default HomeScreen;