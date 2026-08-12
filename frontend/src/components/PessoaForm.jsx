import { useState } from 'react'
import { criarPessoa } from '../api/pessoaApi'

export default function PessoaForm({ cargos, onCriada }) {
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [cargoId, setCargoId] = useState('')
  const [dataAdmissao, setDataAdmissao] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setErro('')

    if (!nome.trim() || !cargoId) {
      setErro('Nome e Cargo são obrigatórios.')
      return
    }

    setCarregando(true)

    try {
      const dto = {
        nome: nome.trim(),
        idade: idade ? Number(idade) : 0,
        cargoId: Number(cargoId),
        dataAdmissao: dataAdmissao ? new Date(dataAdmissao).toISOString() : new Date().toISOString(),
      }

      await criarPessoa(dto)

      setNome('')
      setIdade('')
      setCargoId('')
      setDataAdmissao('')

      onCriada()
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <form className="pessoa-form" onSubmit={handleSubmit}>
      <h2>Cadastrar pessoa</h2>

      <div className="pessoa-form-grid">
        <div className="campo">
          <label htmlFor="nome">Nome *</label>
          <input id="nome" type="text" value={nome} onChange={(event) => setNome(event.target.value)} required />
        </div>

        <div className="campo">
          <label htmlFor="cargoId">Cargo *</label>
          <select id="cargoId" value={cargoId} onChange={(event) => setCargoId(event.target.value)} required>
            <option value="">Selecione...</option>
            {cargos.map((cargo) => (
              <option key={cargo.id} value={cargo.id}>
                {cargo.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label htmlFor="idade">Idade</label>
          <input id="idade" type="number" min="0" value={idade} onChange={(event) => setIdade(event.target.value)} />
        </div>

        <div className="campo">
          <label htmlFor="dataAdmissao">Data de admissão</label>
          <input
            id="dataAdmissao"
            type="date"
            value={dataAdmissao}
            onChange={(event) => setDataAdmissao(event.target.value)}
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
