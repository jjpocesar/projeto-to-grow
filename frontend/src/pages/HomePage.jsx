import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { listarPessoas } from '../api/pessoaApi'
import { listarCargos } from '../api/cargoApi'
import PessoaForm from '../components/PessoaForm'
import PessoaList from '../components/PessoaList'
import CargoForm from '../components/CargoForm'
import CargoList from '../components/CargoList'

export default function HomePage() {
  const { logout } = useAuth()

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

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Projeto To Grow</h1>
        <button onClick={logout}>Sair</button>
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
          <div className="cargo-popover">
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
        )}

        <PessoaForm cargos={cargos} onCriada={carregarDados} />
        {carregando ? <p>Carregando...</p> : <PessoaList pessoas={pessoas} />}
      </section>
    </div>
  )
}
