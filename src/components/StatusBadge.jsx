import { ESTADOS } from '../data/servicios'

export default function StatusBadge({ estado }) {
  const e = ESTADOS[estado] || ESTADOS.pendiente
  return <span className={`badge ${e.clase}`}>{e.label}</span>
}
