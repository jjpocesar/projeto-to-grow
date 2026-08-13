import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { listarPessoas, removerPessoa } from '../api/pessoaApi'
import { listarCargos, removerCargo } from '../api/cargoApi'
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
  const [cargoEditando, setCargoEditando] = useState(null)
  const [pessoaEditando, setPessoaEditando] = useState(null)

  const formPessoaRef = useRef(null)

  const cargosEmUso = useMemo(() => {
    return new Set(pessoas.map((pessoa) => pessoa.cargo?.id).filter(Boolean))
  }, [pessoas])

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

  function handleAbrirCriarCargo() {
    setCargoEditando(null)
    setMostrarCargoForm(true)
  }

  function handleEditarCargo(cargo) {
    setCargoEditando(cargo)
    setMostrarCargoForm(true)
  }

  function handleFecharCargoPopover() {
    setMostrarCargoForm(false)
    setCargoEditando(null)
  }

  async function handleCargoSalvo() {
    await carregarDados()
    handleFecharCargoPopover()
  }

  async function handleExcluirCargo(id) {
    const confirmar = window.confirm('Tem certeza que deseja excluir este cargo?')

    if (!confirmar) {
      return
    }

    setErro('')

    try {
      await removerCargo(id)
      await carregarDados()
    } catch (error) {
      setErro(error.message)
    }
  }

  function handleEditarPessoa(pessoa) {
    setPessoaEditando(pessoa)
    formPessoaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleCancelarEdicaoPessoa() {
    setPessoaEditando(null)
  }

  async function handlePessoaSalva() {
    await carregarDados()
    setPessoaEditando(null)
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
            <button type="button" className="botao-secundario" onClick={handleAbrirCriarCargo}>
              Criar cargo
            </button>
          </div>
        </div>

        {mostrarCargoForm && (
          <div className="cargo-popover-overlay" onClick={handleFecharCargoPopover}>
            <div className="cargo-popover" onClick={(event) => event.stopPropagation()}>
              <div className="cargo-popover-cabecalho">
                <h3>{cargoEditando ? 'Editar cargo' : 'Novo cargo'}</h3>
                <button
                  type="button"
                  className="botao-fechar"
                  onClick={handleFecharCargoPopover}
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>
              <CargoForm
                cargoEditando={cargoEditando}
                onSalvo={handleCargoSalvo}
                onCancelar={() => setCargoEditando(null)}
              />
              {!carregando && (
                <CargoList
                  cargos={cargos}
                  onEditar={handleEditarCargo}
                  onExcluir={handleExcluirCargo}
                  cargosEmUso={cargosEmUso}
                />
              )}
            </div>
          </div>
        )}

        <div ref={formPessoaRef}>
          <PessoaForm
            cargos={cargos}
            pessoaEditando={pessoaEditando}
            onSalva={handlePessoaSalva}
            onCancelarEdicao={handleCancelarEdicaoPessoa}
          />
        </div>
        {carregando ? (
          <p>Carregando...</p>
        ) : (
          <PessoaList pessoas={pessoas} onEditar={handleEditarPessoa} onExcluir={handleExcluirPessoa} />
        )}
      </section>
    </div>
  )
}
