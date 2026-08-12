import { useCallback, useEffect, useState } from 'react'
import { listarPessoas, removerPessoa } from '../api/pessoaApi'
import { listarCargos } from '../api/cargoApi'
import PessoaForm from '../components/PessoaForm'
import PessoaList from '../components/PessoaList'
import CargoForm from '../components/CargoForm'
import CargoList from '../components/CargoList'

export default function CadastroPage() {
  const [pessoas, setPessoas] = useState([])
  const [cargos, setCargos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [mostrarCargoForm, setMostrarCargoForm] = useState(false)

  const carregarDados = useCallback(async () => {
    setErro('')

    try {
      const [pessoasData, cargosData] = await Promise.all([listarPessoas(), listarCargos()])
      setPessoas(pessoasData)
      setCargos(cargosData)
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    carregarDados()
  }, [carregarDados])

  async function handleCargoCriado() {
    await carregarDados()
    setMostrarCargoForm(false)
  }

  async function handleExcluirPessoa(id) {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta pessoa?')

    if (!confirmar) {
      return
    }

    setErro('')

    try {
      await removerPessoa(id)
      await carregarDados()
    } catch (error) {
      setErro(error.message)
    }
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Cadastro</h1>
      </header>

      {erro && <p className="auth-erro">{erro}</p>}

      <section className="secao">
        <div className="secao-cabecalho">
          <h2>Pessoas</h2>
          <div className="secao-acoes">
            <button
              type="button"
              className="botao-secundario"
              onClick={() => setMostrarCargoForm((atual) => !atual)}
            >
              Criar cargo
            </button>
          </div>
        </div>

        {mostrarCargoForm && (
          <div className="cargo-popover-overlay" onClick={() => setMostrarCargoForm(false)}>
            <div className="cargo-popover" onClick={(event) => event.stopPropagation()}>
              <div className="cargo-popover-cabecalho">
                <h3>Novo cargo</h3>
                <button
                  type="button"
                  className="botao-fechar"
                  onClick={() => setMostrarCargoForm(false)}
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>
              <CargoForm onCriado={handleCargoCriado} />
              {!carregando && <CargoList cargos={cargos} />}
            </div>
          </div>
        )}

        <PessoaForm cargos={cargos} onCriada={carregarDados} />
        {carregando ? (
          <p>Carregando...</p>
        ) : (
          <PessoaList pessoas={pessoas} onExcluir={handleExcluirPessoa} />
        )}
      </section>
    </div>
  )
}
