import { createContext, useContext, useEffect, useState } from 'react'
import { login as loginApi, registrar as registrarApi } from '../api/authApi'

const AuthContext = createContext(null)

const STORAGE_KEY = 'projeto-to-grow.token'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY))

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEY, token)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [token])

  async function login(credenciais) {
    const resultado = await loginApi(credenciais)
    setToken(resultado.token)
    return resultado
  }

  async function registrar(credenciais) {
    return registrarApi(credenciais)
  }

  function logout() {
    setToken(null)
  }

  const value = {
    token,
    estaAutenticado: Boolean(token),
    login,
    registrar,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de um AuthProvider')
  }

  return context
}
