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

export function atualizarPessoa(id, dto) {
  return apiFetch(`/pessoas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dto),
  })
}

export function removerPessoa(id) {
  return apiFetch(`/pessoas/${id}`, {
    method: 'DELETE',
  })
}
