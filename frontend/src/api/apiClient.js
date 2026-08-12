const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const STORAGE_KEY = 'projeto-to-grow.token'

async function tratarResposta(response) {
  const texto = await response.text()
  let dados = null

  if (texto) {
    try {
      dados = JSON.parse(texto)
    } catch {
      dados = texto
    }
  }

  if (!response.ok) {
    const mensagem =
      typeof dados === 'string' ? dados : dados?.message || dados?.title || 'Ocorreu um erro inesperado.'
    throw new Error(mensagem)
  }

  return dados
}

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem(STORAGE_KEY)

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  return tratarResposta(response)
}
