
import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import styles from './NutritionInfo.module.css';
import loginStyles from './Login.module.css';


interface NutrientInfo {
  [key: string]: { value: number; unit: string };
}

interface IngredientData {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  nutrients: NutrientInfo;
}


const ingredientsData: IngredientData[] = [
  {
    id: 1,
    name: 'たまねぎ', 
    quantity: 100,
    unit: 'g',
    nutrients: {
      'たんぱく質': { value: 1, unit: 'g' },
      'エネルギー': { value: 37, unit: 'kcal' },
      '脂質': { value: 0.1, unit: 'g' },
      '炭水化物': { value: 8.8, unit: 'g' },
      'カリウム': { value: 150, unit: 'mg' },
      'ビタミンC': { value: 7, unit: 'mg' },
    },
  },
  {
    id: 2,
    name: '鶏むね肉', 
    quantity: 150,
    unit: 'g',
    nutrients: {
      'たんぱく質': { value: 33.5, unit: 'g' },
      'エネルギー': { value: 162, unit: 'kcal' },
      '脂質': { value: 2.7, unit: 'g' },
      '炭水化物': { value: 0, unit: 'g' },
    },
  },
];


export const NutritionInfo = () => {
  
  const [selectedIngredientId, setSelectedIngredientId] = useState<number>(
    ingredientsData[0]?.id || 0
  );

  
  const selectedIngredient = useMemo(() => {
    return ingredientsData.find(item => item.id === selectedIngredientId);
  }, [selectedIngredientId]);

  return (
    <div className={loginStyles.phoneFrame}>
      <div className={styles.screen}>
        <Header />
        <main className={styles.main}>
          <h2 className={styles.title}>栄養成分表示</h2>

          <div className={styles.contentWrapper}>
            <h3 className={styles.listHeader}>入力食材一覧</h3>

            {/* Dropdown để chọn nguyên liệu */}
            <div className={styles.ingredientSelectWrapper}>
              <select
                className={styles.ingredientSelect}
                value={selectedIngredientId}
                onChange={(e) => setSelectedIngredientId(Number(e.target.value))}
              >
                {ingredientsData.map(ingredient => (
                  <option key={ingredient.id} value={ingredient.id}>
                    {ingredient.name}
                  </option>
                ))}
              </select>
              <span className={styles.quantityDisplay}>
                {selectedIngredient?.quantity}{selectedIngredient?.unit}
              </span>
              <div className={styles.selectArrow}></div>
            </div>

            {/* Bảng dinh dưỡng động */}
            {selectedIngredient ? (
              <div className={styles.nutritionTable}>
                <div className={styles.tableHeader}>
                  <span className={styles.tableCell}>栄養素</span>
                  <span className={styles.tableCell}>合計値</span>
                  <span className={styles.tableCell}>単位</span>
                </div>
                <div className={styles.tableBody}>
                  {Object.entries(selectedIngredient.nutrients).map(([name, data]) => (
                    <div key={name} className={styles.tableRow}>
                      <span className={styles.tableCell}>{name}</span>
                      <span className={styles.tableCell}>{data.value}</span>
                      <span className={styles.tableCell}>{data.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p> 選択された素材。</p>
            )}

          </div>
          
          <div className={styles.actions}>
            <button className={styles.actionButton}>再入力</button>
            <button className={styles.actionButton}>登録</button>
          </div>
        </main>
      </div>
    </div>
  );
};