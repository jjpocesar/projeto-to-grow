import { apiFetch } from './apiClient'

export function listarCargos() {
  return apiFetch('/cargos')
}

export function criarCargo(dto) {
  return apiFetch('/cargos', {
    method: 'POST',
    body: JSON.stringify(dto),
  })
}

export function atualizarCargo(id, dto) {
  return apiFetch(`/cargos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dto),
  })
}

export function removerCargo(id) {
  return apiFetch(`/cargos/${id}`, {
    method: 'DELETE',
  })
}
