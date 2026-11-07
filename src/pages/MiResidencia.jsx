import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { useToast } from '../components/Toast.jsx'
import { EDIFICIOS } from '../data/servicios'

export default function MiResidencia() {
  const { perfil, guardarPerfil } = useApp()
  const toast = useToast()
  const [residencia, setResidencia] = useState(perfil.residencia)
  const [nombre, setNombre] = useState(perfil.nombre)
  const [piso, setPiso] = useState(perfil.piso || '')
  const [depto, setDepto] = useState(perfil.depto || '')
  const [errores, setErrores] = useState({})
  const [guardando, setGuardando] = useState(false)

  // Si el perfil viene de la versión anterior (texto libre), se conserva como opción
  const opciones = EDIFICIOS.includes(perfil.residencia) ? EDIFICIOS : [perfil.residencia, ...EDIFICIOS]

  const sinCambios =
    residencia === perfil.residencia &&
    nombre.trim() === perfil.nombre &&
    piso.trim() === (perfil.piso || '') &&
    depto.trim() === (perfil.depto || '')

  async function guardar(e) {
    e.preventDefault()
    const nuevos = {}
    if (!residencia) nuevos.residencia = 'Elegí tu edificio.'
    if (nombre.trim().length < 2) nuevos.nombre = 'Ingresá tu nombre.'
    if (Boolean(piso.trim()) !== Boolean(depto.trim()))
      nuevos.unidad = 'Completá el piso y el departamento, o dejá los dos vacíos.'
    setErrores(nuevos)
    if (Object.keys(nuevos).length) return

    setGuardando(true)
    try {
      await guardarPerfil(nombre.trim(), residencia, { piso: piso.trim(), depto: depto.trim() })
      toast.ok('Datos actualizados.')
    } catch (err) {
      console.error(err)
      toast.error('No se pudieron guardar los cambios. Revisá tu conexión e intentá de nuevo.')
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
          <span>Edificio</span>
          <select value={residencia} onChange={(e) => setResidencia(e.target.value)}>
            {opciones.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
          {errores.residencia && <em className="error-texto">{errores.residencia}</em>}
        </label>

        <label className="campo">
          <span>Nombre</span>
          <input value={nombre} maxLength={60} onChange={(e) => setNombre(e.target.value)} />
          {errores.nombre && <em className="error-texto">{errores.nombre}</em>}
        </label>

        <fieldset className="campo">
          <legend>Mi unidad (opcional)</legend>
          <div className="grilla-2">
            <label className="campo">
              <span>Piso</span>
              <input value={piso} maxLength={20} placeholder="Ej: 4" onChange={(e) => setPiso(e.target.value)} />
            </label>
            <label className="campo">
              <span>Depto / área</span>
              <input value={depto} maxLength={40} placeholder="Ej: 4B" onChange={(e) => setDepto(e.target.value)} />
            </label>
          </div>
          <small className="muted">Se usa para que las emergencias se envíen en dos clics.</small>
          {errores.unidad && <em className="error-texto">{errores.unidad}</em>}
        </fieldset>

        <p className="muted">
          Tus reportes nuevos usarán estos datos. Los reportes anteriores conservan los datos con los que
          fueron enviados.
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
