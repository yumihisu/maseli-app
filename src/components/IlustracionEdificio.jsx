// Ilustración de portada (línea + relleno suave), en la línea de las del case study.
export default function IlustracionEdificio() {
  const linea = '#fff'
  const suave = 'rgba(255,255,255,0.14)'
  const luz = '#cdbcff'
  return (
    <svg className="hero-ilustracion" viewBox="0 0 340 230" fill="none" role="img" aria-label="Edificio con un servicio en seguimiento">
      <ellipse cx="170" cy="118" rx="150" ry="104" stroke={linea} strokeOpacity=".35" strokeDasharray="3 7" />
      <g stroke={linea} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
        <rect x="60" y="112" width="62" height="90" rx="3" fill={suave} />
        <rect x="224" y="94" width="62" height="108" rx="3" fill={suave} />
        <rect x="118" y="34" width="106" height="168" rx="3" fill={suave} />
        <path d="M28 202h284" />
        <rect x="152" y="170" width="38" height="32" rx="2" fill={luz} fillOpacity=".55" />
        <path d="M141 20h58" />
      </g>
      <g fill={luz}>
        <rect x="134" y="52" width="20" height="20" rx="2" />
        <rect x="188" y="88" width="20" height="20" rx="2" />
        <rect x="134" y="124" width="20" height="20" rx="2" />
      </g>
      <g stroke={linea} strokeWidth="1.8">
        <rect x="188" y="52" width="20" height="20" rx="2" />
        <rect x="134" y="88" width="20" height="20" rx="2" />
        <rect x="188" y="124" width="20" height="20" rx="2" />
        <rect x="72" y="130" width="14" height="14" rx="2" />
        <rect x="96" y="130" width="14" height="14" rx="2" />
        <rect x="72" y="158" width="14" height="14" rx="2" />
        <rect x="236" y="112" width="14" height="14" rx="2" />
        <rect x="260" y="112" width="14" height="14" rx="2" />
        <rect x="236" y="140" width="14" height="14" rx="2" />
        <rect x="260" y="140" width="14" height="14" rx="2" />
      </g>
      <g transform="translate(212 14)">
        <rect width="124" height="26" rx="13" fill="#fff" />
        <circle cx="14" cy="13" r="4" fill="#22b57a" />
        <text x="24" y="17.500" fontSize="10.500" fontWeight="700" fill="#201062" fontFamily="Plus Jakarta Sans, sans-serif">En seguimiento</text>
      </g>
      <g stroke={linea} strokeOpacity=".7" strokeWidth="1.6" strokeLinecap="round">
        <path d="M30 60v8M26 64h8M310 170v8M306 174h8" />
      </g>
    </svg>
  )
}
