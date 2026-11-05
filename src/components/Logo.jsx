import { Building2 } from 'lucide-react'

// Logo provisorio: reemplazar por el logo final cuando esté listo.
export default function Logo({ claro = false }) {
  return (
    <div className={`logo ${claro ? 'logo-claro' : ''}`}>
      <span className="logo-mark">
        <Building2 size={18} strokeWidth={2.2} />
      </span>
      <span className="logo-text">MASELI</span>
    </div>
  )
}
