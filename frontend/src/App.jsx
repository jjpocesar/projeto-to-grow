import { Navigate, Route, Routes } from 'react-router-dom'
import RotaProtegida from './components/RotaProtegida'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import CadastroPage from './pages/CadastroPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <RotaProtegida>
            <HomePage />
          </RotaProtegida>
        }
      />
      <Route
        path="/cadastro"
        element={
          <RotaProtegida>
            <CadastroPage />
          </RotaProtegida>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
