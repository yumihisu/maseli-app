import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, MapPin, Phone, X } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { useEmergencia } from '../context/EmergenciaContext.jsx'
import { useToast } from './Toast.jsx'
import { crearReporte } from '../services/reportes'
import { SERVICIO_EMERGENCIA } from '../data/servicios'
import { horaActual, hoyISO } from '../utils/fechas'

// Emergencia en dos clics: 1) botón rojo  2) tipo de emergencia. Se envía al tocar el tipo.
export default function EmergenciaSheet() {
  const { abierto, cerrar } = useEmergencia()
  const { user, perfil, guardarPerfil } = useApp()
  const toast = useToast()
  const navigate = useNavigate()

  const [editando, setEditando] = useState(false)
  const [piso, setPiso] = useState('')
  const [depto, setDepto] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(null) // id de la opción que se está enviando

  // Cada vez que se abre, se parte de la ubicación guardada en el perfil
  useEffect(() => {
    if (!abierto) return
    setPiso(perfil?.piso || '')
    setDepto(perfil?.depto || '')
    setEditando(!(perfil?.piso && perfil?.depto))
    setError('')
    setEnviando(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abierto])

  // Esc cierra la hoja
  useEffect(() => {
    if (!abierto) return
    const alTeclear = (e) => e.key === 'Escape' && !enviando && cerrar()
    window.addEventListener('keydown', alTeclear)
    return () => window.removeEventListener('keydown', alTeclear)
  }, [abierto, enviando, cerrar])

  if (!abierto || !perfil) return null

  async function enviar(esp) {
    if (enviando) return
    const p = editando ? piso.trim() : perfil.piso
    const d = editando ? depto.trim() : perfil.depto
    if (!p || !d) {
      setError('Indicá tu piso y tu departamento para que sepan adónde ir.')
      setEditando(true)
      return
    }
    setError('')
    setEnviando(esp.id)
    try {
      // Se recuerda la ubicación para que la próxima emergencia sea de verdad en dos clics
      if (p !== perfil.piso || d !== perfil.depto) {
        await guardarPerfil(perfil.nombre, perfil.residencia, { piso: p, depto: d })
      }
      const id = await crearReporte({
        uid: user.uid,
        nombre: perfil.nombre,
        residencia: perfil.residencia,
        tipo: 'emergencia',
        especialidad: esp.id,
        piso: p,
        depto: d,
        descripcion: `Emergencia: ${esp.nombre}`,
        prioridad: 'urgente',
        fecha: hoyISO(),
        hora: horaActual(),
      })
      cerrar()
      toast.ok('Emergencia enviada. Podés seguir su estado desde acá.')
      navigate(`/reportes/${id}`)
    } catch (err) {
      console.error(err)
      toast.error('No se pudo enviar la emergencia. Si hay peligro, llamá al 911.')
      setEnviando(null)
    }
  }

  return (
    <div
      className="modal-fondo sheet-fondo"
      role="dialog"
      aria-modal="true"
      aria-labelledby="emg-titulo"
      onClick={() => !enviando && cerrar()}
    >
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <header className="sheet-cab">
          <div>
            <h3 id="emg-titulo">¿Qué está pasando?</h3>
            <p>Tocá una opción y se envía al instante.</p>
          </div>
          <button type="button" className="icono-btn" onClick={cerrar} disabled={Boolean(enviando)} aria-label="Cerrar">
            <X size={18} />
          </button>
        </header>

        <p className="aviso-911">
          <Phone size={16} />
          <span>
            Si hay peligro inmediato para las personas, llamá primero al <strong>911</strong>.
          </span>
        </p>

        {editando ? (
          <div className="emg-ubicacion edit">
            <div className="grilla-2">
              <label className="campo">
                <span>Piso</span>
                <input value={piso} maxLength={20} onChange={(e) => setPiso(e.target.value)} placeholder="Ej: 4" />
              </label>
              <label className="campo">
                <span>Depto / área</span>
                <input value={depto} maxLength={40} onChange={(e) => setDepto(e.target.value)} placeholder="Ej: 4B" />
              </label>
            </div>
            <small className="muted">La guardamos para que tu próxima emergencia sea en dos clics.</small>
          </div>
        ) : (
          <div className="emg-ubicacion">
            <MapPin size={16} />
            <span>
              {perfil.residencia} · Piso {perfil.piso} · {perfil.depto}
            </span>
            <button type="button" className="link" onClick={() => setEditando(true)}>
              Cambiar
            </button>
          </div>
        )}
        {error && <em className="error-texto">{error}</em>}

        <div className="emg-lista">
          {SERVICIO_EMERGENCIA.especialidades.map((esp) => {
            const Icono = esp.icono
            return (
              <button
                key={esp.id}
                type="button"
                className="emg-opcion"
                disabled={Boolean(enviando)}
                onClick={() => enviar(esp)}
              >
                <span className="emg-icono">
                  <Icono size={20} />
                </span>
                <strong>{esp.nombre}</strong>
                {enviando === esp.id && <Loader2 size={18} className="girar" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
