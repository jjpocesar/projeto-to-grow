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
