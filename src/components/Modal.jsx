import { Loader2 } from 'lucide-react'

export default function Modal({ titulo, texto, confirmar, peligro = false, cargando = false, onConfirm, onCancel }) {
  return (
    <div className="modal-fondo" role="dialog" aria-modal="true" aria-label={titulo} onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{titulo}</h3>
        <p>{texto}</p>
        <div className="modal-acciones">
          <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={cargando}>
            Volver
          </button>
          <button
            type="button"
            className={`btn ${peligro ? 'btn-danger' : 'btn-primary'}`}
            onClick={onConfirm}
            disabled={cargando}
          >
            {cargando && <Loader2 size={16} className="girar" />}
            {confirmar}
          </button>
        </div>
      </div>
    </div>
  )
}
