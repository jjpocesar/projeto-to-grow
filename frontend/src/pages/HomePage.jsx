import { useAuth } from '../context/AuthContext'

export default function HomePage() {
  const { logout } = useAuth()

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Projeto To Grow</h1>
        <button onClick={logout}>Sair</button>
      </header>

      <p>Login realizado com sucesso. As telas de Pessoas e Cargos entram aqui.</p>
    </div>
  )
}
