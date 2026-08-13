import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listarPessoas } from '../api/pessoaApi'
import { listarCargos } from '../api/cargoApi'

function IconePessoas() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 14.2c2.5.4 4 2 4 4.8" />
    </svg>
  )
}

function IconeCargos() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="11" rx="2" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </svg>
  )
}

function IconeSeta() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  )
}

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
          <div className="dashboard-card-icone dashboard-card-icone-pessoas" aria-hidden="true">
            <IconePessoas />
          </div>
          <div className="dashboard-card-texto">
            <span className="dashboard-card-numero">{totalPessoas ?? '-'}</span>
            <span className="dashboard-card-label">Pessoas cadastradas</span>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-icone dashboard-card-icone-cargos" aria-hidden="true">
            <IconeCargos />
          </div>
          <div className="dashboard-card-texto">
            <span className="dashboard-card-numero">{totalCargos ?? '-'}</span>
            <span className="dashboard-card-label">Cargos cadastrados</span>
          </div>
        </div>
      </div>

      <Link to="/cadastro" className="botao-primario-link">
        Ir para o cadastro
        <IconeSeta />
      </Link>
    </div>
  )
}
