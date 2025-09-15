import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-200'
    }`

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-indigo-700">Condo</Link>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
              <NavLink to="/quotas" className={navLinkClass}>Quotas</NavLink>
              <NavLink to="/despesas" className={navLinkClass}>Despesas</NavLink>
              <NavLink to="/reunioes" className={navLinkClass}>Reuniões</NavLink>
              <NavLink to="/notificacoes" className={navLinkClass}>Notificações</NavLink>
              {isAdmin && <span className="ml-3 text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">Admin</span>}
              <button onClick={handleLogout} className="ml-3 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>Login</NavLink>
              <NavLink to="/signup" className={navLinkClass}>Signup</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
