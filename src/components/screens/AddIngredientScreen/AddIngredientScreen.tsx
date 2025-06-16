// src/components/screens/AddIngredientScreen/AddIngredientScreen.tsx
import React, { useState } from 'react';
import styles from './AddIngredientScreen.module.css';

// Import SVG icons
import LogoutIcon from '../../../assets/icons/logout-icon.svg?react';
import PlusIcon from '../../../assets/icons/plus-icon.svg?react';

// Định nghĩa kiểu dữ liệu cho một nguyên liệu
interface Ingredient {
  id: number;
  name: string;
  quantity: string;
  unit: string;
}

const AddIngredientScreen: React.FC = () => {
  // State cho nguyên liệu đang được nhập trong form
  const [currentItem, setCurrentItem] = useState({ name: '', quantity: '', unit: 'g' });
  // State cho danh sách các nguyên liệu đã thêm
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);

  // Hàm xử lý khi thay đổi input trong form
  const handleInputChange = (field: 'name' | 'quantity' | 'unit', value: string) => {
    setCurrentItem(prev => ({ ...prev, [field]: value }));
  };

  // Hàm thêm nguyên liệu vào danh sách
  const handleAddIngredient = () => {
    if (!currentItem.name || !currentItem.quantity) {
      alert('Vui lòng nhập tên và số lượng nguyên liệu!');
      return;
    }
    const newIngredient: Ingredient = {
      id: Date.now(), // Dùng timestamp làm ID đơn giản
      ...currentItem,
    };
    setIngredientList(prevList => [...prevList, newIngredient]);
    // Reset form sau khi thêm
    setCurrentItem({ name: '', quantity: '', unit: 'g' });
  };

  // Hàm xóa một nguyên liệu khỏi danh sách
  const handleDeleteIngredient = (id: number) => {
    setIngredientList(prevList => prevList.filter(item => item.id !== id));
  };
  
  // Hàm gửi toàn bộ danh sách
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredientList.length === 0) {
      alert('Vui lòng thêm ít nhất một nguyên liệu!');
      return;
    }
    console.log("Danh sách nguyên liệu đã đăng ký:", ingredientList);
    alert('Đã đăng ký! Kiểm tra console để xem dữ liệu.');
  }

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <button className={styles.logoutButton}>
          <LogoutIcon />
          <span>ログアウト</span>
        </button>
      </header>

      <main className={styles.content}>
        <h1 className={styles.title}>食材入力</h1>

        {/* --- Form Section --- */}
        <div className={styles.formSection}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>食材名</label>
            <input
              id="name"
              type="text"
              placeholder="例：たまねぎ"
              className={styles.input}
              value={currentItem.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="quantity" className={styles.label}>分量</label>
            <input
              id="quantity"
              type="number"
              placeholder="例：150"
              className={styles.input}
              value={currentItem.quantity}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="unit" className={styles.label}>単位</label>
            <select
              id="unit"
              className={styles.select}
              value={currentItem.unit}
              onChange={(e) => handleInputChange('unit', e.target.value)}
            >
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="個">個 (cái)</option>
              <option value="ml">ml</option>
              <option value="l">l</option>
              <option value="大さじ">大さじ (thìa canh)</option>
              <option value="小さじ">小さじ (thìa cà phê)</option>
            </select>
          </div>
          
          <button className={styles.addButton} onClick={handleAddIngredient}>
            <PlusIcon width={16} height={16} />
            食材を追加
          </button>
        </div>

        <div className={styles.divider}></div>

        {/* --- List Section --- */}
        <div className={styles.listSection}>
          <div className={styles.listHeader}>
            <span>食材名</span>
            <span>分量</span>
            <span>単位</span>
            <span></span> {/* Cột trống cho nút xóa */}
          </div>
          {ingredientList.map(item => (
            <div key={item.id} className={styles.listItem}>
              <span>{item.name}</span>
              <span>{item.quantity}</span>
              <span>{item.unit}</span>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteIngredient(item.id)}
              >
                削除
              </button>
            </div>
          ))}
        </div>
        
        {ingredientList.length > 0 && (
          <button className={styles.submitButton} onClick={handleSubmit}>
            登録する
          </button>
        )}
      </main>
    </div>
  );
};

export default AddIngredientScreen;