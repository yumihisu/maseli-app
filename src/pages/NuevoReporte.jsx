import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Loader2, Send } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { useToast } from '../components/Toast.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { crearReporte } from '../services/reportes'
import { SERVICIOS, getEspecialidad, getServicio } from '../data/servicios'
import { formatFecha, hoyISO } from '../utils/fechas'

const PASOS = ['Tipo de servicio', 'Especialidad', 'Ubicación y descripción', 'Agendado']

const INICIAL = {
  tipo: '',
  especialidad: '',
  piso: '',
  depto: '',
  descripcion: '',
  prioridad: 'normal',
  fecha: '',
  hora: '',
}

// Devuelve un objeto { campo: 'mensaje' } con los errores del paso indicado
function validarPaso(paso, f) {
  const e = {}
  if (paso === 0 && !f.tipo) e.tipo = 'Elegí un tipo de servicio para continuar.'
  if (paso === 1 && !f.especialidad) e.especialidad = 'Elegí una especialidad para continuar.'
  if (paso === 2) {
    if (!f.piso.trim()) e.piso = 'Indicá el piso.'
    if (!f.depto.trim()) e.depto = 'Indicá el departamento o el área (ej: Hall).'
    if (f.descripcion.trim().length < 10) e.descripcion = 'Contanos un poco más (mínimo 10 caracteres).'
  }
  if (paso === 3) {
    if (!f.fecha) e.fecha = 'Elegí una fecha.'
    else if (f.fecha < hoyISO()) e.fecha = 'La fecha no puede ser anterior a hoy.'
    if (!f.hora) e.hora = 'Elegí un horario.'
  }
  return e
}

export default function NuevoReporte() {
  const { user, perfil } = useApp()
  const toast = useToast()
  const navigate = useNavigate()

  const [paso, setPaso] = useState(0)
  const [maxPaso, setMaxPaso] = useState(0)
  const [form, setForm] = useState(INICIAL)
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)

  const servicio = getServicio(form.tipo)
  const esp = getEspecialidad(form.tipo, form.especialidad)

  const set = (campo, valor) => {
    setForm((f) => ({ ...f, [campo]: valor }))
    setErrores((e) => ({ ...e, [campo]: undefined }))
  }

  function elegirTipo(id) {
    // Si cambia el tipo, la especialidad anterior ya no corresponde
    setForm((f) => ({ ...f, tipo: id, especialidad: f.tipo === id ? f.especialidad : '' }))
    setErrores({})
  }

  function irA(n) {
    setErrores({})
    setPaso(n)
  }

  function siguiente() {
    const e = validarPaso(paso, form)
    setErrores(e)
    if (Object.keys(e).length) return
    const n = paso + 1
    setMaxPaso((m) => Math.max(m, n))
    setPaso(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function enviar() {
    const e = validarPaso(3, form)
    setErrores(e)
    if (Object.keys(e).length) return

    setEnviando(true)
    try {
      const id = await crearReporte({
        uid: user.uid,
        nombre: perfil.nombre,
        residencia: perfil.residencia,
        tipo: form.tipo,
        especialidad: form.especialidad,
        piso: form.piso.trim(),
        depto: form.depto.trim(),
        descripcion: form.descripcion.trim(),
        prioridad: form.prioridad,
        fecha: form.fecha,
        hora: form.hora,
      })
      toast.ok('¡Reporte enviado! Podés seguir su estado desde acá.')
      navigate(`/reportes/${id}`)
    } catch (err) {
      console.error(err)
      toast.error('No se pudo enviar el reporte. Revisá tu conexión e intentá de nuevo.')
      setEnviando(false)
    }
  }

  const crumbs = PASOS.map((label, i) => ({
    label,
    activo: i === paso,
    hecho: i < paso,
    onClick: i <= maxPaso && i !== paso ? () => irA(i) : undefined,
  }))

  return (
    <div className="pagina pagina-form">
      <header className="pagina-cab">
        <div>
          <p className="eyebrow">Nuevo reporte</p>
          <h1>{PASOS[paso]}</h1>
        </div>
      </header>

      <Breadcrumbs items={crumbs} numerado />

      <div className="card form-card">
        {/* PASO 1 · Tipo de servicio */}
        {paso === 0 && (
          <>
            <p className="muted">¿Qué tipo de servicio necesitás?</p>
            <div className="opciones">
              {SERVICIOS.map((s) => {
                const Icono = s.icono
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`opcion ${form.tipo === s.id ? 'sel' : ''}`}
                    onClick={() => elegirTipo(s.id)}
                    aria-pressed={form.tipo === s.id}
                  >
                    <span className={`opcion-icono tipo-${s.id}`}>
                      <Icono size={24} />
                    </span>
                    <span className="opcion-texto">
                      <strong>{s.nombre}</strong>
                      <small>{s.ayuda}</small>
                    </span>
                    {form.tipo === s.id && <Check size={20} className="opcion-check" />}
                  </button>
                )
              })}
            </div>
            {errores.tipo && <em className="error-texto">{errores.tipo}</em>}
          </>
        )}

        {/* PASO 2 · Especialidad */}
        {paso === 1 && servicio && (
          <>
            <p className="muted">
              {servicio.nombre}: ¿de qué se trata?
            </p>
            <div className="opciones opciones-chicas">
              {servicio.especialidades.map((s) => {
                const Icono = s.icono
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`opcion ${form.especialidad === s.id ? 'sel' : ''}`}
                    onClick={() => set('especialidad', s.id)}
                    aria-pressed={form.especialidad === s.id}
                  >
                    <span className={`opcion-icono tipo-${servicio.id}`}>
                      <Icono size={22} />
                    </span>
                    <span className="opcion-texto">
                      <strong>{s.nombre}</strong>
                    </span>
                    {form.especialidad === s.id && <Check size={20} className="opcion-check" />}
                  </button>
                )
              })}
            </div>
            {errores.especialidad && <em className="error-texto">{errores.especialidad}</em>}
          </>
        )}

        {/* PASO 3 · Ubicación y descripción */}
        {paso === 2 && (
          <>
            <div className="grilla-2">
              <label className="campo">
                <span>Piso</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Ej: 4"
                  value={form.piso}
                  onChange={(e) => set('piso', e.target.value)}
                  maxLength={20}
                />
                {errores.piso && <em className="error-texto">{errores.piso}</em>}
              </label>
              <label className="campo">
                <span>Nro de depto / área</span>
                <input
                  type="text"
                  placeholder="Ej: 4B, Hall, Palier"
                  value={form.depto}
                  onChange={(e) => set('depto', e.target.value)}
                  maxLength={40}
                />
                {errores.depto && <em className="error-texto">{errores.depto}</em>}
              </label>
            </div>

            <label className="campo">
              <span>Descripción</span>
              <textarea
                rows={4}
                placeholder="Contá el contexto: qué pasó, desde cuándo, qué se ve…"
                value={form.descripcion}
                onChange={(e) => set('descripcion', e.target.value)}
                maxLength={600}
              />
              <small className="contador">{form.descripcion.length}/600</small>
              {errores.descripcion && <em className="error-texto">{errores.descripcion}</em>}
            </label>

            <fieldset className="campo">
              <legend>Prioridad</legend>
              <div className="segmentado">
                {[
                  ['normal', 'Normal'],
                  ['urgente', 'Urgente'],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    className={`seg ${form.prioridad === id ? 'sel' : ''} ${id === 'urgente' ? 'urg' : ''}`}
                    onClick={() => set('prioridad', id)}
                    aria-pressed={form.prioridad === id}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
          </>
        )}

        {/* PASO 4 · Agendado */}
        {paso === 3 && (
          <>
            <p className="muted">¿Cuándo te viene bien que se haga el servicio?</p>
            <div className="grilla-2">
              <label className="campo">
                <span>Fecha</span>
                <input
                  type="date"
                  min={hoyISO()}
                  value={form.fecha}
                  onChange={(e) => set('fecha', e.target.value)}
                />
                {errores.fecha && <em className="error-texto">{errores.fecha}</em>}
              </label>
              <label className="campo">
                <span>Hora</span>
                <input type="time" value={form.hora} onChange={(e) => set('hora', e.target.value)} />
                {errores.hora && <em className="error-texto">{errores.hora}</em>}
              </label>
            </div>

            <div className="resumen">
              <h3>Resumen de tu reporte</h3>
              <dl>
                <div>
                  <dt>Servicio</dt>
                  <dd>
                    {servicio?.nombre} · {esp?.nombre}
                  </dd>
                </div>
                <div>
                  <dt>Ubicación</dt>
                  <dd>
                    {perfil.residencia} · Piso {form.piso} · {form.depto}
                  </dd>
                </div>
                <div>
                  <dt>Descripción</dt>
                  <dd>{form.descripcion}</dd>
                </div>
                <div>
                  <dt>Prioridad</dt>
                  <dd>{form.prioridad === 'urgente' ? 'Urgente' : 'Normal'}</dd>
                </div>
                {form.fecha && (
                  <div>
                    <dt>Agendado</dt>
                    <dd>
                      {formatFecha(form.fecha)} {form.hora && `· ${form.hora}`}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </>
        )}
      </div>

      <div className="barra-acciones">
        {paso > 0 ? (
          <button type="button" className="btn btn-ghost" onClick={() => irA(paso - 1)} disabled={enviando}>
            <ArrowLeft size={18} /> Atrás
          </button>
        ) : (
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/reportes')}>
            Cancelar
          </button>
        )}

        {paso < 3 ? (
          <button type="button" className="btn btn-primary" onClick={siguiente}>
            Siguiente <ArrowRight size={18} />
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={enviar} disabled={enviando}>
            {enviando ? <Loader2 size={18} className="girar" /> : <Send size={18} />}
            {enviando ? 'Enviando…' : 'Enviar reporte'}
          </button>
        )}
      </div>
    </div>
  )
}
