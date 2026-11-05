import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { useToast } from '../components/Toast.jsx'

export default function MiResidencia() {
  const { perfil, guardarPerfil } = useApp()
  const toast = useToast()
  const [residencia, setResidencia] = useState(perfil.residencia)
  const [nombre, setNombre] = useState(perfil.nombre)
  const [errores, setErrores] = useState({})
  const [guardando, setGuardando] = useState(false)

  const sinCambios = residencia.trim() === perfil.residencia && nombre.trim() === perfil.nombre

  async function guardar(e) {
    e.preventDefault()
    const nuevos = {}
    if (residencia.trim().length < 2) nuevos.residencia = 'Ingresá el nombre de tu residencia.'
    if (nombre.trim().length < 2) nuevos.nombre = 'Ingresá tu nombre.'
    setErrores(nuevos)
    if (Object.keys(nuevos).length) return

    setGuardando(true)
    try {
      await guardarPerfil(nombre.trim(), residencia.trim())
      toast.ok('Datos actualizados.')
    } catch (err) {
      console.error(err)
      toast.error('No se pudieron guardar los cambios. Intentá de nuevo.')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <div className="pagina pagina-form">
      <header className="pagina-cab">
        <div>
          <p className="eyebrow">Perfil</p>
          <h1>Mi residencia</h1>
        </div>
      </header>

      <form className="card form-card" onSubmit={guardar} noValidate>
        <label className="campo">
          <span>Residencia / Edificio</span>
          <input value={residencia} maxLength={80} onChange={(e) => setResidencia(e.target.value)} />
          {errores.residencia && <em className="error-texto">{errores.residencia}</em>}
        </label>
        <label className="campo">
          <span>Nombre</span>
          <input value={nombre} maxLength={60} onChange={(e) => setNombre(e.target.value)} />
          {errores.nombre && <em className="error-texto">{errores.nombre}</em>}
        </label>
        <p className="muted">
          Tus reportes nuevos usarán estos datos. Los reportes anteriores conservan la residencia con la
          que fueron enviados.
        </p>
        <div className="fila-botones">
          <button className="btn btn-primary" type="submit" disabled={guardando || sinCambios}>
            {guardando ? <Loader2 size={16} className="girar" /> : <Check size={16} />}
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  )
}
