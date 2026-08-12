const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function tratarResposta(response) {
  const texto = await response.text()
  const dados = texto ? JSON.parse(texto) : null

  if (!response.ok) {
    const mensagem = typeof dados === 'string' ? dados : dados?.title || 'Ocorreu um erro inesperado.'
    throw new Error(mensagem)
  }

  return dados
}

export async function registrar({ username, password }) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  return tratarResposta(response)
}

export async function login({ username, password }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  return tratarResposta(response)
}
