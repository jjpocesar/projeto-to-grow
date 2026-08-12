import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { listarPessoas } from '../api/pessoaApi'
import { listarCargos } from '../api/cargoApi'
import PessoaForm from '../components/PessoaForm'
import PessoaList from '../components/PessoaList'

export default function HomePage() {
  const { logout } = useAuth()

  const [pessoas, setPessoas] = useState([])
  const [cargos, setCargos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

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

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Projeto To Grow</h1>
        <button onClick={logout}>Sair</button>
      </header>

      {erro && <p className="auth-erro">{erro}</p>}

      <PessoaForm cargos={cargos} onCriada={carregarDados} />

      <section className="pessoa-lista">
        <h2>Pessoas cadastradas</h2>
        {carregando ? <p>Carregando...</p> : <PessoaList pessoas={pessoas} />}
      </section>
    </div>
  )
}
