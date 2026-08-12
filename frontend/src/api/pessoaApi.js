import { apiFetch } from './apiClient'

export function listarPessoas() {
  return apiFetch('/pessoas')
}

export function criarPessoa(dto) {
  return apiFetch('/pessoas', {
    method: 'POST',
    body: JSON.stringify(dto),
  })
}
