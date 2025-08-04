
import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Login } from './pages/Login'
import { RegisterInfo } from './pages/RegisterInfo';
import { Dashboard } from './pages/Dashboard';
import { IngredientInput } from './pages/IngredientInput';
import { NutritionInfo } from './pages/NutritionInfo';
import { RecipeList } from './pages/RecipeList';
import { ProtectedRoute } from './components/ProtectedRoute';


function App() {
  return (




    <Routes>
      <Route path="/login" element={<Login />} />


      <Route path="/register-info" element={<ProtectedRoute><RegisterInfo /></ProtectedRoute>} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/ingredient-input" element={<ProtectedRoute><IngredientInput /></ProtectedRoute>} />
      <Route path="/nutrition-info" element={<ProtectedRoute><NutritionInfo /></ProtectedRoute>} />
      <Route path="/recipe-list" element={<ProtectedRoute><RecipeList /></ProtectedRoute>} />


      <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    </Routes>

  );
}
export default App
