import isotipo from '../assets/isotipo.png'
import isotipoBlanco from '../assets/isotipo-blanco.png'

// `claro`: se usa sobre fondos oscuros (isotipo en blanco). `soloIcono`: menú plegado.
export default function Logo({ claro = false, soloIcono = false }) {
  return (
    <div className={`logo ${claro ? 'logo-claro' : ''}`}>
      <img
        className="logo-img"
        src={claro ? isotipoBlanco : isotipo}
        alt={soloIcono ? 'MASELI' : ''}
        width="36"
        height="36"
      />
      {!soloIcono && <span className="logo-text">MASELI</span>}
    </div>
  )
}
