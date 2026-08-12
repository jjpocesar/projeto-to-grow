import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listarPessoas } from '../api/pessoaApi'
import { listarCargos } from '../api/cargoApi'

export default function HomePage() {
  const [totalPessoas, setTotalPessoas] = useState(null)
  const [totalCargos, setTotalCargos] = useState(null)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregarResumo() {
      try {
        const [pessoas, cargos] = await Promise.all([listarPessoas(), listarCargos()])
        setTotalPessoas(pessoas.length)
        setTotalCargos(cargos.length)
      } catch (error) {
        setErro(error.message)
      }
    }

    carregarResumo()
  }, [])

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Projeto To Grow</h1>
      </header>

      {erro && <p className="auth-erro">{erro}</p>}

      <p className="home-boas-vindas">Bem-vindo(a)! Aqui está um resumo do que já foi cadastrado.</p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <span className="dashboard-card-numero">{totalPessoas ?? '-'}</span>
          <span className="dashboard-card-label">Pessoas cadastradas</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-numero">{totalCargos ?? '-'}</span>
          <span className="dashboard-card-label">Cargos cadastrados</span>
        </div>
      </div>

      <Link to="/cadastro" className="botao-primario-link">
        Ir para o cadastro
      </Link>
    </div>
  )
}
