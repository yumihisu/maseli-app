import { NavLink } from 'react-router-dom'
import { Building2, ClipboardList, PlusCircle, Siren } from 'lucide-react'
import Logo from './Logo.jsx'
import { useApp } from '../context/AppContext.jsx'
import { useEmergencia } from '../context/EmergenciaContext.jsx'

const ITEMS = [
  { to: '/reportes', label: 'Mis reportes', corto: 'Reportes', icono: ClipboardList },
  { to: '/nuevo', label: 'Nuevo reporte', corto: 'Nuevo', icono: PlusCircle, destacado: true },
  { to: '/residencia', label: 'Mi residencia', corto: 'Residencia', icono: Building2 },
]

export default function Sidebar({ colapsado, onToggle }) {
  const { perfil } = useApp()
  const { abrir: abrirEmergencia } = useEmergencia()

  return (
    <>
      {/* Escritorio: menú lateral plegable (el clic en el logo lo despliega y lo pliega) */}
      <aside className="sidebar">
        <button
          type="button"
          className="logo-btn"
          onClick={onToggle}
          aria-expanded={!colapsado}
          aria-label={colapsado ? 'Desplegar menú' : 'Plegar menú'}
          title={colapsado ? 'Desplegar menú' : 'Plegar menú'}
        >
          <Logo soloIcono={colapsado} />
        </button>

        <nav className="side-nav" aria-label="Navegación principal">
          {ITEMS.map(({ to, label, icono: Icono, destacado }) => (
            <NavLink
              key={to}
              to={to}
              title={label}
              aria-label={label}
              className={({ isActive }) =>
                `side-link ${isActive ? 'activo' : ''} ${destacado ? 'destacado' : ''}`
              }
            >
              <Icono size={19} />
              <span className="txt">{label}</span>
            </NavLink>
          ))}
          <button
            type="button"
            className="side-link emergencia"
            onClick={abrirEmergencia}
            title="Emergencia"
            aria-label="Emergencia"
          >
            <Siren size={19} />
            <span className="txt">Emergencia</span>
          </button>
        </nav>

        {/* El perfil lleva a "Mi residencia", donde se puede cambiar el nombre */}
        <NavLink to="/residencia" className="side-user" title="Mi residencia: editar nombre y datos">
          <span className="avatar">{perfil?.nombre?.[0]?.toUpperCase() || '?'}</span>
          <div className="txt">
            <strong>{perfil?.nombre}</strong>
            <small>{perfil?.residencia}</small>
          </div>
        </NavLink>
      </aside>

      {/* Celular: barra superior (con la emergencia siempre a mano) + navegación inferior */}
      <header className="topbar">
        <Logo />
        <button type="button" className="btn btn-emergencia btn-chico" onClick={abrirEmergencia}>
          <Siren size={16} /> Emergencia
        </button>
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
