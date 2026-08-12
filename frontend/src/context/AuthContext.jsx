import { createContext, useContext, useEffect, useState } from 'react'
import { login as loginApi, registrar as registrarApi } from '../api/authApi'

const AuthContext = createContext(null)

const STORAGE_KEY = 'projeto-to-grow.token'

function decodificarPayload(token) {
  try {
    const payloadBase64 = token.split('.')[1]
    const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(payloadJson)
  } catch {
    return null
  }
}

function obterExpiracaoEmMs(token) {
  const payload = decodificarPayload(token)

  if (!payload?.exp) {
    return null
  }

  return payload.exp * 1000
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY))

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEY, token)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [token])

  // Desloga automaticamente quando o token expira.
  useEffect(() => {
    if (!token) {
      return
    }

    const expiraEmMs = obterExpiracaoEmMs(token)

    if (!expiraEmMs) {
      return
    }

    const tempoRestante = expiraEmMs - Date.now()

    if (tempoRestante <= 0) {
      setToken(null)
      return
    }

    const timer = setTimeout(() => setToken(null), tempoRestante)

    return () => clearTimeout(timer)
  }, [token])

  // Desloga também se alguma chamada à API voltar 401 (token inválido/expirado no servidor).
  useEffect(() => {
    function handleSessaoExpirada() {
      setToken(null)
    }

    window.addEventListener('sessao-expirada', handleSessaoExpirada)
    return () => window.removeEventListener('sessao-expirada', handleSessaoExpirada)
  }, [])

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
