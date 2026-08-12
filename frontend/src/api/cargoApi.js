import { apiFetch } from './apiClient'

export function listarCargos() {
  return apiFetch('/cargos')
}
