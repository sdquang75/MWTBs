
import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Dashboard } from './pages/Dashboard';
import { IngredientInput } from './pages/IngredientInput';
import { Login } from './pages/Login'
import { NutritionInfo } from './pages/NutritionInfo';
import { RecipeList } from './pages/RecipeList';
import { RegisterInfo } from './pages/RegisterInfo';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register-info" element={<RegisterInfo />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/ingredient-input" element={<IngredientInput />} />
      <Route path="/nutrition-info" element={<NutritionInfo />} />
      <Route path="/recipe-list" element={<RecipeList />} />
      
      {/* Route mặc định, có thể trỏ về trang dashboard hoặc login */}
      <Route index element={<Dashboard />} /> 
    </Routes>
  );
}
export default App
