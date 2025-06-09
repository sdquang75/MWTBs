import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RecipeListScreen from './components/screens/RecipeListScreen/RecipeListScreen'
import HomeScreen from './components/screens/HomeScreen/HomeScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <RecipeListScreen />
    </div>
    
  )

}

export default App
