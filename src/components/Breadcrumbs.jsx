import { ChevronRight } from 'lucide-react'

// items: [{ label, onClick?, activo?, hecho? }]
// Los pasos ya completados son botones: permiten volver atrás.
export default function Breadcrumbs({ items, numerado = false }) {
  return (
    <nav className="crumbs" aria-label="Progreso">
      <ol>
        {items.map((it, i) => {
          const clickable = Boolean(it.onClick) && !it.activo
          const contenido = (
            <>
              {numerado && (
                <span className={`crumb-num ${it.hecho ? 'hecho' : ''} ${it.activo ? 'activo' : ''}`}>
                  {i + 1}
                </span>
              )}
              <span className="crumb-label">{it.label}</span>
            </>
          )
          return (
            <li key={i} className={it.activo ? 'activo' : ''} aria-current={it.activo ? 'step' : undefined}>
              {clickable ? (
                <button type="button" className="crumb crumb-link" onClick={it.onClick}>
                  {contenido}
                </button>
              ) : (
                <span className="crumb">{contenido}</span>
              )}
              {i < items.length - 1 && <ChevronRight size={16} className="crumb-sep" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
