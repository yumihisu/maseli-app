import { NavLink } from 'react-router-dom'
import { Building2, ClipboardList, PlusCircle } from 'lucide-react'
import Logo from './Logo.jsx'
import { useApp } from '../context/AppContext.jsx'

const ITEMS = [
  { to: '/reportes', label: 'Mis reportes', corto: 'Reportes', icono: ClipboardList, end: false },
  { to: '/nuevo', label: 'Nuevo reporte', corto: 'Nuevo', icono: PlusCircle, destacado: true },
  { to: '/residencia', label: 'Mi residencia', corto: 'Residencia', icono: Building2 },
]

export default function Sidebar() {
  const { perfil } = useApp()

  return (
    <>
      {/* Escritorio: sidebar lateral */}
      <aside className="sidebar">
        <Logo claro />
        <nav className="side-nav" aria-label="Navegación principal">
          {ITEMS.map(({ to, label, icono: Icono, destacado }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `side-link ${isActive ? 'activo' : ''} ${destacado ? 'destacado' : ''}`
              }
            >
              <Icono size={19} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="side-user">
          <span className="avatar">{perfil?.nombre?.[0]?.toUpperCase() || '?'}</span>
          <div>
            <strong>{perfil?.nombre}</strong>
            <small>{perfil?.residencia}</small>
          </div>
        </div>
      </aside>

      {/* Celular: barra superior + navegación inferior */}
      <header className="topbar">
        <Logo />
      </header>
      <nav className="bottom-nav" aria-label="Navegación principal">
        {ITEMS.map(({ to, corto, icono: Icono, destacado }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `bottom-link ${isActive ? 'activo' : ''} ${destacado ? 'destacado' : ''}`
            }
          >
            <Icono size={destacado ? 24 : 21} />
            <span>{corto}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}
