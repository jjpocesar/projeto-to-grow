import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function IconeHome() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
    </svg>
  )
}

function IconeCadastro() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 11h6" />
      <path d="M9 15h6" />
    </svg>
  )
}

function IconeSair() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  )
}

function linkClassName({ isActive }) {
  return `sidebar-link${isActive ? ' ativo' : ''}`
}

export default function Sidebar() {
  const { logout } = useAuth()

  return (
    <nav className="sidebar" aria-label="Navegação principal">
      <div className="sidebar-logo" aria-hidden="true">TG</div>

      <div className="sidebar-links">
        <NavLink to="/" end className={linkClassName} aria-label="Home" title="Home">
          <IconeHome />
        </NavLink>
        <NavLink to="/cadastro" className={linkClassName} aria-label="Cadastro" title="Cadastro">
          <IconeCadastro />
        </NavLink>
      </div>

      <button
        type="button"
        className="sidebar-link sidebar-sair"
        onClick={logout}
        aria-label="Sair"
        title="Sair"
      >
        <IconeSair />
      </button>
    </nav>
  )
}
