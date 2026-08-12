import { useState } from 'react'
import { criarCargo } from '../api/cargoApi'

export default function CargoForm({ onCriado }) {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setErro('')

    if (!nome.trim() || !descricao.trim()) {
      setErro('Nome e Descrição são obrigatórios.')
      return
    }

    setCarregando(true)

    try {
      const dto = {
        nome: nome.trim(),
        descricao: descricao.trim(),
        dataCriacao: new Date().toISOString(),
      }

      await criarCargo(dto)

      setNome('')
      setDescricao('')

      onCriado()
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Cadastrar cargo</h3>

      <div className="form-grid">
        <div className="campo">
          <label htmlFor="cargoNome">Nome *</label>
          <input
            id="cargoNome"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="cargoDescricao">Descrição *</label>
          <textarea
            id="cargoDescricao"
            rows={2}
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
            required
          />
        </div>
      </div>

      {erro && <p className="auth-erro">{erro}</p>}

      <button type="submit" disabled={carregando}>
        {carregando ? 'Salvando...' : 'Cadastrar'}
      </button>
    </form>
  )
}
