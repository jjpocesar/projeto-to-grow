import { useEffect, useState } from 'react'
import { atualizarPessoa, criarPessoa } from '../api/pessoaApi'

function formatarDataParaInput(valor) {
  if (!valor) {
    return ''
  }

  return new Date(valor).toISOString().slice(0, 10)
}

export default function PessoaForm({ cargos, pessoaEditando, onSalva, onCancelarEdicao }) {
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [cargoId, setCargoId] = useState('')
  const [dataAdmissao, setDataAdmissao] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    if (pessoaEditando) {
      setNome(pessoaEditando.nome ?? '')
      setIdade(pessoaEditando.idade ? String(pessoaEditando.idade) : '')
      setCargoId(pessoaEditando.cargo?.id ? String(pessoaEditando.cargo.id) : '')
      setDataAdmissao(formatarDataParaInput(pessoaEditando.dataAdmissao))
    } else {
      setNome('')
      setIdade('')
      setCargoId('')
      setDataAdmissao('')
    }
    setErro('')
  }, [pessoaEditando])

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

      if (pessoaEditando) {
        await atualizarPessoa(pessoaEditando.id, dto)
      } else {
        await criarPessoa(dto)
      }

      setNome('')
      setIdade('')
      setCargoId('')
      setDataAdmissao('')

      onSalva()
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>{pessoaEditando ? 'Editar pessoa' : 'Cadastrar pessoa'}</h3>

      <div className="form-grid">
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

      <div className="form-acoes">
        <button type="submit" className="botao-primario" disabled={carregando}>
          {carregando ? 'Salvando...' : pessoaEditando ? 'Salvar alterações' : 'Cadastrar'}
        </button>

        {pessoaEditando && (
          <button type="button" className="botao-secundario" onClick={onCancelarEdicao} disabled={carregando}>
            Cancelar edição
          </button>
        )}
      </div>
    </form>
  )
}
