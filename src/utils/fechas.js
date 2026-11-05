const pad = (n) => String(n).padStart(2, '0')

// Fecha de hoy en formato YYYY-MM-DD (hora local)
export function hoyISO() {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

// "2026-10-25" -> "dom, 25 oct"
export function formatFecha(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('es-AR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

// Milisegundos -> "22 oct, 21:15"
export function formatMomento(ms) {
  if (!ms) return ''
  return new Date(ms).toLocaleString('es-AR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}
