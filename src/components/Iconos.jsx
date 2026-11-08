// Iconos propios de MASELI (v3.1): formas sólidas en dos tonos + chispas, como las
// referencias de iconos de limpieza y mantenimiento. Misma API que lucide: <Icono size={24} />
// Colores por variables CSS: --ic-a (tono oscuro) y --ic-b (detalle de color).

const A = { fill: 'var(--ic-a, #201062)' }
const B = { fill: 'var(--ic-b, #8b63f2)' }
const SA = { stroke: 'var(--ic-a, #201062)', fill: 'none', strokeWidth: 4.5, strokeLinecap: 'round', strokeLinejoin: 'round' }
const SB = { stroke: 'var(--ic-b, #8b63f2)', fill: 'none', strokeWidth: 4.5, strokeLinecap: 'round', strokeLinejoin: 'round' }

// Chispa de cuatro puntas centrada en (x, y) con radio r
function Chispa({ x, y, r = 6, tono = B }) {
  const c = r * 0.22
  const d = `M${x} ${y - r}Q${x + c} ${y - c} ${x + r} ${y}Q${x + c} ${y + c} ${x} ${y + r}Q${x - c} ${y + c} ${x - r} ${y}Q${x - c} ${y - c} ${x} ${y - r}Z`
  return <path d={d} style={tono} />
}

function crear(nombre, dibujo, chispa = true) {
  const Icono = ({ size = 24, ...resto }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false" {...resto}>
      {dibujo}
      {chispa && <Chispa x={55} y={9} r={6} />}
    </svg>
  )
  Icono.displayName = nombre
  return Icono
}

// ---- Tipos de servicio ----
export const IcAvisos = crear(
  'IcAvisos',
  <>
    <path d="M38 10V50L18 40H10a4 4 0 0 1-4-4V24a4 4 0 0 1 4-4h8z" style={A} />
    <path d="M17 41l4 14h9l-4-12z" style={B} />
    <path d="M45 24q6 8 0 16" {...SB} />
    <path d="M52 16q10 16 0 32" {...SB} />
  </>,
  false,
)

export const IcLimpieza = crear(
  'IcLimpieza',
  <>
    <path d="M41 5 31 33" {...SA} />
    <path d="M22 32h18l8 23H13z" style={A} />
    <path d="M22 32h18l1.600 5H20.400z" style={B} />
    <circle cx="52" cy="53" r="4.500" style={B} />
    <circle cx="47" cy="57" r="3.500" style={B} />
    <Chispa x={52} y={22} r={6} />
    <Chispa x={13} y={20} r={4} />
  </>,
  false,
)

export const IcMantenimiento = crear(
  'IcMantenimiento',
  <>
    <g transform="rotate(40 32 32)">
      <path d="M38 5.600A14 14 0 1 1 26 5.600L26 18L38 18Z" style={A} transform="translate(0 2)" />
      <rect x="27" y="26" width="10" height="34" rx="5" style={A} />
      <circle cx="32" cy="53" r="2.500" style={B} />
    </g>
    <Chispa x={52} y={50} r={6} />
    <Chispa x={13} y={50} r={4} />
  </>,
  false,
)

export const IcEmergencia = crear(
  'IcEmergencia',
  <>
    <path d="M16 40V28a16 16 0 0 1 32 0v12z" style={A} />
    <path d="M22 38V29a10 10 0 0 1 6-9l2 5a5 5 0 0 0-2 4v9z" style={B} />
    <rect x="9" y="40" width="46" height="10" rx="3" style={A} />
    <path d="M32 4v6M10 13l4 4M54 13l-4 4" {...SB} />
  </>,
  false,
)

// ---- Avisos ----
export const IcAdministracion = crear(
  'IcAdministracion',
  <>
    <path d="M14 58V14a3 3 0 0 1 3-3h30a3 3 0 0 1 3 3v44z" style={A} />
    <rect x="21" y="19" width="8" height="8" rx="1.500" style={B} />
    <rect x="35" y="19" width="8" height="8" rx="1.500" style={B} />
    <rect x="21" y="33" width="8" height="8" rx="1.500" style={B} />
    <rect x="35" y="33" width="8" height="8" rx="1.500" style={B} />
    <path d="M26 58V47h12v11z" style={B} />
  </>,
)

export const IcPortero = crear(
  'IcPortero',
  <>
    <path d="M8 59c0-13 10-20 24-20s24 7 24 20z" style={A} />
    <circle cx="32" cy="27" r="11" style={A} />
    <path d="M19 25c0-15 26-15 26 0z" style={B} />
    <rect x="16" y="24" width="32" height="5" rx="2.500" style={B} />
    <path d="M26 41l6 10 6-10z" style={B} />
  </>,
  false,
)

// ---- Limpieza ----
export const IcProfunda = crear(
  'IcProfunda',
  <>
    <Chispa x={27} y={36} r={26} tono={A} />
    <Chispa x={50} y={14} r={10} />
    <Chispa x={52} y={52} r={7} />
  </>,
  false,
)

export const IcGeneral = crear(
  'IcGeneral',
  <>
    <path d="M12 26h40l-4.500 29a4 4 0 0 1-4 3.500H20.500a4 4 0 0 1-4-3.500z" style={A} />
    <path d="M16 26a16 16 0 0 1 32 0" {...SA} />
    <path d="M14 36h36l-1 7H15z" style={B} />
  </>,
)

export const IcAreasComunes = crear(
  'IcAreasComunes',
  <>
    <path d="M10 58V30a22 22 0 0 1 44 0v28z" style={A} />
    <rect x="17" y="28" width="13" height="30" rx="2" style={B} />
    <rect x="34" y="28" width="13" height="30" rx="2" style={B} />
    <circle cx="27" cy="44" r="1.800" style={A} />
    <circle cx="37" cy="44" r="1.800" style={A} />
  </>,
)

export const IcPlagas = crear(
  'IcPlagas',
  <>
    <path d="M28 12 22 4M36 12l6-8" {...SA} strokeWidth={3.500} />
    <path d="M21 33 8 27M20 42 6 44M22 51 11 59M43 33l13-6M44 42l14 2M42 51l11 8" {...SA} strokeWidth={3.500} />
    <ellipse cx="32" cy="39" rx="14" ry="18" style={A} />
    <circle cx="32" cy="17" r="8" style={A} />
    <path d="M32 24v32" {...SB} strokeWidth={3} />
    <circle cx="25" cy="38" r="2.800" style={B} />
    <circle cx="39" cy="38" r="2.800" style={B} />
  </>,
  false,
)

// ---- Mantenimiento ----
export const IcElectrico = crear(
  'IcElectrico',
  <>
    <path d="M39 4 14 37h15l-5 23 27-35H35z" style={A} />
    <path d="M33 18 25 29h8z" style={B} />
  </>,
  false,
)

export const IcAgua = crear(
  'IcAgua',
  <>
    <path d="M32 4S12 26 12 40a20 20 0 0 0 40 0C52 26 32 4 32 4z" style={A} />
    <path d="M20 40c0-5 3-10 6-14-1 9-1 16 5 22-7 0-11-3-11-8z" style={B} />
  </>,
)

export const IcGas = crear(
  'IcGas',
  <>
    <rect x="24" y="5" width="16" height="7" rx="3.500" style={B} />
    <path d="M27 14h10v6H27z" style={A} />
    <rect x="15" y="18" width="34" height="42" rx="13" style={A} />
    <rect x="15" y="34" width="34" height="11" style={B} />
  </>,
  false,
)

export const IcInfraestructura = crear(
  'IcInfraestructura',
  <g transform="rotate(38 32 32)">
    <rect x="27" y="18" width="10" height="42" rx="5" style={B} />
    <rect x="14" y="5" width="36" height="16" rx="4" style={A} />
    <rect x="40" y="5" width="10" height="16" rx="4" style={B} />
  </g>,
)

export const IcElectrodomesticos = crear(
  'IcElectrodomesticos',
  <>
    <rect x="19" y="3" width="6" height="16" rx="2" style={A} />
    <rect x="39" y="3" width="6" height="16" rx="2" style={A} />
    <path d="M12 18h40v12a20 20 0 0 1-40 0z" style={A} />
    <path d="M12 18h40v7H12z" style={B} />
    <path d="M32 50v10" {...SA} />
  </>,
)

// ---- Emergencias ----
export const IcIncendio = crear(
  'IcIncendio',
  <>
    <path d="M32 3C34 18 52 26 52 42a20 20 0 0 1-40 0c0-10 6-16 10-22 0 8 4 12 8 12-2-10-2-19 2-29z" style={A} />
    <path d="M32 59a11 11 0 0 1-11-11c0-8 6-11 11-18 5 7 11 10 11 18a11 11 0 0 1-11 11z" style={B} />
  </>,
  false,
)

export const IcGasFuga = crear(
  'IcGasFuga',
  <>
    <path d="M17 22v-6h10v6" style={A} />
    <rect x="8" y="20" width="28" height="40" rx="10" style={A} />
    <rect x="8" y="38" width="28" height="9" style={B} />
    <path d="M43 18c6 5-6 9 0 14s-6 9 0 14" {...SB} strokeWidth={4} />
    <path d="M53 12c6 5-6 9 0 14s-6 9 0 14" {...SB} strokeWidth={4} />
  </>,
  false,
)

export const IcInundacion = crear(
  'IcInundacion',
  <>
    <path d="M32 3S19 18 19 27a13 13 0 0 0 26 0C45 18 32 3 32 3z" style={A} />
    <path d="M3 43q7-9 14 0t14 0 14 0 14 0" {...SB} strokeWidth={5} />
    <path d="M3 56q7-9 14 0t14 0 14 0 14 0" {...SA} strokeWidth={5} />
  </>,
  false,
)

export const IcRiesgoElectrico = crear(
  'IcRiesgoElectrico',
  <>
    <path d="M32 9 55 52H9z" style={A} stroke="var(--ic-a, #201062)" strokeWidth="7" strokeLinejoin="round" />
    <path d="M35 21 24 38h8l-3 11 13-19h-8z" style={B} />
  </>,
  false,
)

export const IcPersona = crear(
  'IcPersona',
  <>
    <path d="M32 58C5 40 5 17 20 12c6-2 10 1 12 6 2-5 6-8 12-6 15 5 15 28-12 46z" style={A} />
    <rect x="28" y="22" width="8" height="22" rx="2" style={B} />
    <rect x="21" y="29" width="22" height="8" rx="2" style={B} />
  </>,
  false,
)

export const IcSeguridad = crear(
  'IcSeguridad',
  <>
    <path d="M32 4 54 12v18c0 14-10 24-22 30C20 54 10 44 10 30V12z" style={A} />
    <circle cx="32" cy="27" r="6.500" style={B} />
    <path d="M29 31h6l2 13H27z" style={B} />
  </>,
  false,
)

export const IcOtraEmergencia = crear(
  'IcOtraEmergencia',
  <>
    <path d="M32 9 55 52H9z" style={A} stroke="var(--ic-a, #201062)" strokeWidth="7" strokeLinejoin="round" />
    <rect x="29" y="22" width="6" height="19" rx="3" style={B} />
    <circle cx="32" cy="47" r="3.500" style={B} />
  </>,
  false,
)
