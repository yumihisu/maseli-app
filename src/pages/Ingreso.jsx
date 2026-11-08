import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowRight, BellRing, Eye, Loader2, ShieldCheck } from 'lucide-react'
import IlustracionEdificio from '../components/IlustracionEdificio.jsx'
import Logo from '../components/Logo.jsx'
import SetupNotice from '../components/SetupNotice.jsx'
import { useApp } from '../context/AppContext.jsx'
import { useToast } from '../components/Toast.jsx'
import { firebaseConfigurado } from '../firebase'
import { EDIFICIOS } from '../data/servicios'

export default function Ingreso() {
  const { perfil, cargando, error, guardarPerfil } = useApp()
  const toast = useToast()
  const navigate = useNavigate()
  const [residencia, setResidencia] = useState('')
  const [nombre, setNombre] = useState('')
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)

  if (!firebaseConfigurado) return <SetupNotice />
  if (perfil) return <Navigate to="/reportes" replace />

  async function enviar(e) {
    e.preventDefault()
    const nuevos = {}
    if (!residencia) nuevos.residencia = 'Elegí tu edificio.'
    if (nombre.trim().length < 2) nuevos.nombre = 'Ingresá tu nombre.'
    setErrores(nuevos)
    if (Object.keys(nuevos).length) return

    setEnviando(true)
    try {
      await guardarPerfil(nombre.trim(), residencia.trim())
      toast.ok(`¡Bienvenido/a, ${nombre.trim()}!`)
      navigate('/reportes')
    } catch (err) {
      console.error(err)
      toast.error('No pudimos guardar tus datos. Revisá tu conexión e intentá de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="ingreso">
      <section className="ingreso-hero">
        <Logo claro />
        <div>
          <p className="eyebrow">Servicios para la vida en comunidad</p>
          <h1>
            Reportar un problema.
            <br />
            Saber qué pasa después.
          </h1>
          <IlustracionEdificio />
          <ul className="hero-lista">
            <li>
              <BellRing size={20} /> Avisá en pocos pasos
            </li>
            <li>
              <Eye size={20} /> Seguí el estado en tiempo real
            </li>
            <li>
              <ShieldCheck size={20} /> Sin intermediarios ni llamadas
            </li>
          </ul>
        </div>
        <small>Mantenimiento · Seguridad · Limpieza</small>
      </section>

      <section className="ingreso-form">
        <form className="card ingreso-card" onSubmit={enviar} noValidate>
          <h2>Ingresá a tu residencia</h2>
          <p className="muted">Solo necesitamos dos datos para empezar.</p>

          {error && (
            <div className="alerta alerta-error">
              No se pudo conectar con Firebase ({error.code || 'error'}). Verificá que la autenticación
              anónima esté habilitada.
            </div>
          )}

          <label className="campo">
            <span>Residencia / Edificio</span>
            <select value={residencia} onChange={(e) => setResidencia(e.target.value)}>
              <option value="">Elegí tu edificio</option>
              {EDIFICIOS.map((edificio) => (
                <option key={edificio} value={edificio}>
                  {edificio}
                </option>
              ))}
            </select>
            {errores.residencia && <em className="error-texto">{errores.residencia}</em>}
          </label>

          <label className="campo">
            <span>Nombre</span>
            <input
              type="text"
              placeholder="¿Cómo te llamás?"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              maxLength={60}
              autoComplete="given-name"
            />
            {errores.nombre && <em className="error-texto">{errores.nombre}</em>}
          </label>

          <button className="btn btn-primary btn-grande" type="submit" disabled={enviando || cargando}>
            {enviando || cargando ? <Loader2 size={18} className="girar" /> : null}
            {cargando ? 'Conectando…' : 'Ingresar'}
            {!enviando && !cargando && <ArrowRight size={18} />}
          </button>
        </form>
      </section>
    </div>
  )
}
