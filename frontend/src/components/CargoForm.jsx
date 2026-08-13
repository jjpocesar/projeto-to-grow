import { useEffect, useState } from 'react'
import { atualizarCargo, criarCargo } from '../api/cargoApi'

export default function CargoForm({ cargoEditando, onSalvo, onCancelar }) {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    if (cargoEditando) {
      setNome(cargoEditando.nome)
      setDescricao(cargoEditando.descricao)
    } else {
      setNome('')
      setDescricao('')
    }
    setErro('')
  }, [cargoEditando])

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
        dataCriacao: cargoEditando ? cargoEditando.dataCriacao : new Date().toISOString(),
      }

      if (cargoEditando) {
        await atualizarCargo(cargoEditando.id, dto)
      } else {
        await criarCargo(dto)
      }

      setNome('')
      setDescricao('')

      onSalvo()
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <form className="cargo-form" onSubmit={handleSubmit}>
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

      <div className="form-acoes">
        <button type="submit" className="botao-primario" disabled={carregando}>
          {carregando ? 'Salvando...' : cargoEditando ? 'Salvar alterações' : 'Cadastrar'}
        </button>

        {cargoEditando && (
          <button type="button" className="botao-secundario" onClick={onCancelar} disabled={carregando}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
