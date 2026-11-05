import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Ban,
  CalendarDays,
  Check,
  Loader2,
  MapPin,
  Pencil,
  PlayCircle,
  Trash2,
  X,
} from 'lucide-react'
import { useToast } from '../components/Toast.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import Modal from '../components/Modal.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import {
  actualizarReporte,
  cambiarEstado,
  eliminarReporte,
  escucharReporte,
} from '../services/reportes'
import { ESTADOS, FLUJO, getEspecialidad, getServicio } from '../data/servicios'
import { formatFecha, formatMomento, hoyISO } from '../utils/fechas'

export default function DetalleReporte() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [reporte, setReporte] = useState(undefined) // undefined = cargando, null = no existe
  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState({})
  const [errores, setErrores] = useState({})
  const [modal, setModal] = useState(null) // 'cancelar' | 'eliminar'
  const [trabajando, setTrabajando] = useState(false)

  useEffect(() => {
    return escucharReporte(id, setReporte, (e) => {
      console.error(e)
      setReporte(null)
    })
  }, [id])

  if (reporte === undefined)
    return (
      <div className="pagina">
        <div className="skeleton alto" />
      </div>
    )

  if (reporte === null)
    return (
      <div className="pagina">
        <div className="vacio">
          <h2>No encontramos este reporte</h2>
          <p>Puede que haya sido eliminado.</p>
          <Link to="/reportes" className="btn btn-primary">
            Volver a mis reportes
          </Link>
        </div>
      </div>
    )

  const tipo = getServicio(reporte.tipo)
  const esp = getEspecialidad(reporte.tipo, reporte.especialidad)
  const Icono = tipo?.icono
  const activo = ['pendiente', 'visto', 'en_progreso'].includes(reporte.estado)
  const siguienteEstado = activo ? FLUJO[FLUJO.indexOf(reporte.estado) + 1] : null

  const momentoDe = (estado) => (reporte.historial || []).find((h) => h.estado === estado)?.en

  function empezarEdicion() {
    setForm({
      piso: reporte.piso,
      depto: reporte.depto,
      descripcion: reporte.descripcion,
      fecha: reporte.fecha,
      hora: reporte.hora,
    })
    setErrores({})
    setEditando(true)
  }

  async function guardarEdicion() {
    const e = {}
    if (!form.piso.trim()) e.piso = 'Indicá el piso.'
    if (!form.depto.trim()) e.depto = 'Indicá el depto o área.'
    if (form.descripcion.trim().length < 10) e.descripcion = 'Mínimo 10 caracteres.'
    if (!form.fecha) e.fecha = 'Elegí una fecha.'
    else if (form.fecha < hoyISO() && form.fecha !== reporte.fecha) e.fecha = 'La fecha no puede ser anterior a hoy.'
    if (!form.hora) e.hora = 'Elegí un horario.'
    setErrores(e)
    if (Object.keys(e).length) return

    setTrabajando(true)
    try {
      await actualizarReporte(reporte.id, {
        piso: form.piso.trim(),
        depto: form.depto.trim(),
        descripcion: form.descripcion.trim(),
        fecha: form.fecha,
        hora: form.hora,
      })
      toast.ok('Cambios guardados.')
      setEditando(false)
    } catch (err) {
      console.error(err)
      toast.error('No se pudieron guardar los cambios. Intentá de nuevo.')
    } finally {
      setTrabajando(false)
    }
  }

  async function cancelarReporte() {
    setTrabajando(true)
    try {
      await cambiarEstado(reporte, 'cancelado')
      toast.ok('Reporte cancelado.')
      setModal(null)
    } catch (err) {
      console.error(err)
      toast.error('No se pudo cancelar el reporte. Intentá de nuevo.')
    } finally {
      setTrabajando(false)
    }
  }

  async function borrarReporte() {
    setTrabajando(true)
    try {
      await eliminarReporte(reporte.id)
      toast.ok('Reporte eliminado.')
      navigate('/reportes')
    } catch (err) {
      console.error(err)
      toast.error('No se pudo eliminar el reporte. Intentá de nuevo.')
      setTrabajando(false)
    }
  }

  async function avanzar() {
    setTrabajando(true)
    try {
      await cambiarEstado(reporte, siguienteEstado)
      toast.ok(`Estado actualizado: ${ESTADOS[siguienteEstado].label}`)
    } catch (err) {
      console.error(err)
      toast.error('No se pudo actualizar el estado.')
    } finally {
      setTrabajando(false)
    }
  }

  return (
    <div className="pagina">
      <Breadcrumbs
        items={[
          { label: 'Mis reportes', onClick: () => navigate('/reportes') },
          { label: 'Detalle del reporte', activo: true },
        ]}
      />

      <header className="detalle-cab">
        <span className={`reporte-icono grande tipo-${reporte.tipo}`}>{Icono && <Icono size={28} />}</span>
        <div>
          <h1>
            {tipo?.nombre} · {esp?.nombre}
          </h1>
          <div className="detalle-sub">
            <StatusBadge estado={reporte.estado} />
            {reporte.prioridad === 'urgente' && <span className="tag-urgente">Urgente</span>}
          </div>
        </div>
      </header>

      <div className="detalle-grid">
        <section className="card">
          <div className="card-titulo">
            <h2>Información</h2>
            {activo && !editando && (
              <button type="button" className="btn btn-ghost btn-chico" onClick={empezarEdicion}>
                <Pencil size={15} /> Modificar
              </button>
            )}
          </div>

          {!editando ? (
            <dl className="datos">
              <div>
                <dt>
                  <MapPin size={15} /> Ubicación
                </dt>
                <dd>
                  {reporte.residencia} · Piso {reporte.piso} · {reporte.depto}
                </dd>
              </div>
              <div>
                <dt>
                  <CalendarDays size={15} /> Agendado
                </dt>
                <dd>
                  {formatFecha(reporte.fecha)} · {reporte.hora}
                </dd>
              </div>
              <div>
                <dt>Descripción</dt>
                <dd className="desc">{reporte.descripcion}</dd>
              </div>
            </dl>
          ) : (
            <div className="edicion">
              <div className="grilla-2">
                <label className="campo">
                  <span>Piso</span>
                  <input value={form.piso} maxLength={20} onChange={(e) => setForm({ ...form, piso: e.target.value })} />
                  {errores.piso && <em className="error-texto">{errores.piso}</em>}
                </label>
                <label className="campo">
                  <span>Depto / área</span>
                  <input value={form.depto} maxLength={40} onChange={(e) => setForm({ ...form, depto: e.target.value })} />
                  {errores.depto && <em className="error-texto">{errores.depto}</em>}
                </label>
              </div>
              <label className="campo">
                <span>Descripción</span>
                <textarea
                  rows={4}
                  maxLength={600}
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                />
                {errores.descripcion && <em className="error-texto">{errores.descripcion}</em>}
              </label>
              <div className="grilla-2">
                <label className="campo">
                  <span>Fecha</span>
                  <input type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} />
                  {errores.fecha && <em className="error-texto">{errores.fecha}</em>}
                </label>
                <label className="campo">
                  <span>Hora</span>
                  <input type="time" value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })} />
                  {errores.hora && <em className="error-texto">{errores.hora}</em>}
                </label>
              </div>
              <div className="fila-botones">
                <button type="button" className="btn btn-ghost" onClick={() => setEditando(false)} disabled={trabajando}>
                  <X size={16} /> Descartar
                </button>
                <button type="button" className="btn btn-primary" onClick={guardarEdicion} disabled={trabajando}>
                  {trabajando ? <Loader2 size={16} className="girar" /> : <Check size={16} />}
                  Guardar cambios
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="card">
          <h2>Estado del reporte</h2>
          <ol className="timeline">
            {FLUJO.map((e) => {
              const ms = momentoDe(e)
              const actual = reporte.estado === e
              return (
                <li key={e} className={`${ms ? 'hecho' : ''} ${actual ? 'actual' : ''}`}>
                  <span className="punto">{ms ? <Check size={13} /> : null}</span>
                  <div>
                    <strong>{ESTADOS[e].label}</strong>
                    <small>{ms ? formatMomento(ms) : 'Pendiente de avanzar'}</small>
                  </div>
                </li>
              )
            })}
            {reporte.estado === 'cancelado' && (
              <li className="hecho actual cancelado">
                <span className="punto">
                  <X size={13} />
                </span>
                <div>
                  <strong>Cancelado</strong>
                  <small>{formatMomento(momentoDe('cancelado'))}</small>
                </div>
              </li>
            )}
          </ol>

          {siguienteEstado && (
            <button type="button" className="btn btn-suave btn-bloque" onClick={avanzar} disabled={trabajando}>
              <PlayCircle size={18} />
              Simular respuesta de la administración
            </button>
          )}
          {siguienteEstado && (
            <small className="muted nota-demo">
              Modo demo: avanza el estado a “{ESTADOS[siguienteEstado].label}” como lo haría el proveedor.
            </small>
          )}
        </section>
      </div>

      <div className="acciones-detalle">
        {activo && (
          <button type="button" className="btn btn-ghost" onClick={() => setModal('cancelar')}>
            <Ban size={17} /> Cancelar reporte
          </button>
        )}
        <button type="button" className="btn btn-peligro-suave" onClick={() => setModal('eliminar')}>
          <Trash2 size={17} /> Eliminar
        </button>
      </div>

      {modal === 'cancelar' && (
        <Modal
          titulo="¿Cancelar este reporte?"
          texto="El reporte quedará marcado como cancelado y ya no se podrá modificar."
          confirmar="Sí, cancelar"
          peligro
          cargando={trabajando}
          onConfirm={cancelarReporte}
          onCancel={() => setModal(null)}
        />
      )}
      {modal === 'eliminar' && (
        <Modal
          titulo="¿Eliminar este reporte?"
          texto="Se borra definitivamente de la base de datos. Esta acción no se puede deshacer."
          confirmar="Sí, eliminar"
          peligro
          cargando={trabajando}
          onConfirm={borrarReporte}
          onCancel={() => setModal(null)}
        />
      )}
    </div>
  )
}
