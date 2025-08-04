
import { useState } from 'react';
import { Header } from '../components/Header';
import { InputField } from '../components/InputField';
import { SelectField } from '../components/SelectField';
import styles from './IngredientInput.module.css';
import loginStyles from './Login.module.css';
import sau from '../assets/find.svg';
import { useNavigate } from 'react-router-dom';
interface Ingredient {
  id: number;
  name: string;
  unit: string;
  quantity: string;
}

export const IngredientInput = () => {
  const [ingredientName, setIngredientName] = useState('たまねぎ');
  const [unit, setUnit] = useState('g');
  const [quantity, setQuantity] = useState('150');
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([
    { id: 1, name: 'たまねぎ', unit: 'g', quantity: '150' },
  ]);
const navigate = useNavigate(); 
  
  const handleDecimalChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  const handleAddIngredient = () => {
    if (!ingredientName || !quantity) {
      alert('材料名と数量を入力してください。');
      return;
    }
    const newIngredient: Ingredient = {
      id: Date.now(),
      name: ingredientName,
      unit: unit,
      quantity: quantity,
    };
    setIngredientList([...ingredientList, newIngredient]);
    setIngredientName('');
    setQuantity(''); 
  };
const handleSubmitToNextPage = () => {
    // 3. Điều hướng đến trang nutrition-info và truyền `ingredientList` đi
    navigate('/nutrition-info', { state: { ingredients: ingredientList } });
};
  const handleDeleteIngredient = (id: number) => {
    setIngredientList(ingredientList.filter(item => item.id !== id));
  };
  
//   const IconPlaceholder = () => <div className={styles.inputIcon}></div>;

  return (
    <div className={loginStyles.phoneFrame}>
      <div className={styles.screen}>
        <Header showBackButton={true} />
        <main className={styles.main}>
          <h2 className={styles.title}>食材入力</h2>

          <div className={styles.form}>
            <InputField id="search" label="検索" type="text" placeholder="食材で検索" icon={<img  src={sau}/>} />
            <InputField id="name" label="食材名" type="text" value={ingredientName} onChange={(e) => setIngredientName(e.target.value)} icon={<></>} rightIcon={<img  src={sau}/>} />
            <SelectField id="unit" label="単位" value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="個">個</option>
              <option value="ml">ml</option>
            </SelectField>
            
           
            <InputField
              id="quantity"
              label="分量"
              type="text" 
              placeholder=""
              icon={<></>} 
              value={quantity}
              onChange={(e) => handleDecimalChange(e, setQuantity)}
            />

            <button type="button" className={styles.addButton} onClick={handleAddIngredient}>
              ＋食材を追加
            </button>
          </div>

          <div className={styles.listContainer}>
            <div className={styles.listHeader}>
              <span>食材名</span>
              <span>単位</span>
              <span>分量</span>
              <span></span>
            </div>
            {ingredientList.map((item) => (
              <div key={item.id} className={styles.listItem}>
                <span>{item.name}</span>
                <span>{item.unit}</span>
                <span>{item.quantity}</span>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteIngredient(item.id)}
                >
                  削除
                </button>
              </div>
            ))}
          </div>
          
          <button type="button" className={styles.submitButton} onClick={handleSubmitToNextPage}>
            登録する
          </button>
        </main>
      </div>
    </div>
  );
};