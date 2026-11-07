import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CalendarDays, ChevronRight, ClipboardList, MapPin, Plus, Siren } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { useEmergencia } from '../context/EmergenciaContext.jsx'
import { escucharReportes } from '../services/reportes'
import { ESTADOS_ACTIVOS, getEspecialidad, getServicio } from '../data/servicios'
import { formatFecha } from '../utils/fechas'
import StatusBadge from '../components/StatusBadge.jsx'

const FILTROS = [
  { id: 'todos', label: 'Todos' },
  { id: 'activos', label: 'Activos' },
  { id: 'completados', label: 'Completados' },
  { id: 'cancelados', label: 'Cancelados' },
]

function pasaFiltro(r, filtro) {
  if (filtro === 'activos') return ESTADOS_ACTIVOS.includes(r.estado)
  if (filtro === 'completados') return r.estado === 'completado'
  if (filtro === 'cancelados') return r.estado === 'cancelado'
  return true
}

export default function Reportes() {
  const { user, perfil } = useApp()
  const { abrir: abrirEmergencia } = useEmergencia()
  const navigate = useNavigate()
  const [reportes, setReportes] = useState(null) // null = cargando
  const [error, setError] = useState(null)
  const [filtro, setFiltro] = useState('todos')

  useEffect(() => {
    return escucharReportes(user.uid, setReportes, (e) => {
      console.error(e)
      setError('No pudimos cargar tus reportes. Revisá tu conexión.')
      setReportes([])
    })
  }, [user.uid])

  const conteo = useMemo(() => {
    const lista = reportes || []
    return {
      activos: lista.filter((r) => ESTADOS_ACTIVOS.includes(r.estado)).length,
      completados: lista.filter((r) => r.estado === 'completado').length,
      total: lista.length,
    }
  }, [reportes])

  const visibles = (reportes || []).filter((r) => pasaFiltro(r, filtro))

  return (
    <div className="pagina">
      <header className="pagina-cab">
        <div>
          <p className="eyebrow">{perfil.residencia}</p>
          <h1>Hola, {perfil.nombre}</h1>
        </div>
        <div className="cab-acciones">
          <button type="button" className="btn btn-emergencia" onClick={abrirEmergencia}>
            <Siren size={18} /> Emergencia
          </button>
          <Link to="/nuevo" className="btn btn-primary">
            <Plus size={18} /> Nuevo reporte
          </Link>
        </div>
      </header>

      {error && <div className="alerta alerta-error">{error}</div>}

      <section className="stats">
        <div className="stat">
          <strong>{conteo.activos}</strong>
          <span>En curso</span>
        </div>
        <div className="stat">
          <strong>{conteo.completados}</strong>
          <span>Resueltos</span>
        </div>
        <div className="stat">
          <strong>{conteo.total}</strong>
          <span>Total</span>
        </div>
      </section>

      <div className="chips" role="tablist" aria-label="Filtrar reportes">
        {FILTROS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filtro === f.id}
            className={`chip ${filtro === f.id ? 'activo' : ''}`}
            onClick={() => setFiltro(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {reportes === null && (
        <div className="lista">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton" />
          ))}
        </div>
      )}

      {reportes !== null && reportes.length === 0 && !error && (
        <div className="vacio">
          <span className="vacio-icono">
            <ClipboardList size={34} />
          </span>
          <h2>Todavía no hay reportes</h2>
          <p>Cuando algo falle en tu residencia, avisalo acá y seguí su estado en tiempo real.</p>
          <button className="btn btn-primary" onClick={() => navigate('/nuevo')}>
            <Plus size={18} /> Crear mi primer reporte
          </button>
        </div>
      )}

      {reportes !== null && reportes.length > 0 && visibles.length === 0 && (
        <p className="muted centrado">No hay reportes en esta categoría.</p>
      )}

      <div className="lista">
        {visibles.map((r) => {
          const tipo = getServicio(r.tipo)
          const esp = getEspecialidad(r.tipo, r.especialidad)
          const Icono = tipo?.icono || ClipboardList
          return (
            <Link
              key={r.id}
              to={`/reportes/${r.id}`}
              className={`reporte ${r.prioridad === 'urgente' ? 'urgente' : ''}`}
            >
              <span className={`reporte-icono tipo-${r.tipo}`}>
                <Icono size={22} />
              </span>
              <div className="reporte-cuerpo">
                <div className="reporte-fila">
                  <strong>
                    {tipo?.nombre} · {esp?.nombre}
                  </strong>
                  <StatusBadge estado={r.estado} />
                </div>
                <p className="reporte-desc">{r.descripcion}</p>
                <div className="reporte-meta">
                  <span>
                    <MapPin size={14} /> Piso {r.piso} · {r.depto}
                  </span>
                  <span>
                    <CalendarDays size={14} /> {formatFecha(r.fecha)} · {r.hora}
                  </span>
                  {r.prioridad === 'urgente' && <span className="tag-urgente">Urgente</span>}
                </div>
              </div>
              <ChevronRight size={20} className="reporte-flecha" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
