
import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Login } from './pages/Login'
import { RegisterInfo } from './pages/RegisterInfo';
import { Dashboard } from './pages/Dashboard';
import { IngredientInput } from './pages/IngredientInput';
import { NutritionInfo } from './pages/NutritionInfo';
import { RecipeList } from './pages/RecipeList';


function App() {
  return (
  



    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register-info" element={<RegisterInfo />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/ingredient-input" element={<IngredientInput />} />
      <Route path="/nutrition-info" element={<NutritionInfo />} />
      <Route path="/recipe-list" element={<RecipeList />} />
      

      <Route index element={<Dashboard />} /> 
    </Routes>
    
  );
}
export default App
