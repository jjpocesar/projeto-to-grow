import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AppLayout from './AppLayout'

export default function RotaProtegida({ children }) {
  const { estaAutenticado } = useAuth()

  if (!estaAutenticado) {
    return <Navigate to="/login" replace />
  }

  return <AppLayout>{children}</AppLayout>
}
