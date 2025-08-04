import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginScreen from './components/screens/LoginScreen/LoginScreen'
import SignUpScreen from './components/screens/SignUpScreen/SignUpScreen'
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen/ForgotPasswordScreen'
import HomeScreen from './components/screens/HomeScreen/HomeScreen'
import RegisterSafetyStatusScreen from './components/screens/RegisterScreen/RegisterScreen'
import RegisterScreen from './components/screens/RegisterScreen/RegisterScreen'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/register-safety-status" element={<RegisterScreen />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/add-ingredient" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
