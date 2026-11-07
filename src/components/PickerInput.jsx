// Campo de fecha u hora que abre el calendario / reloj al tocar CUALQUIER parte del recuadro
// (por defecto solo se abre desde el ícono diminuto de la derecha).
export default function PickerInput({ className = '', ...props }) {
  function abrir(e) {
    try {
      e.currentTarget.showPicker?.()
    } catch {
      // Algunos navegadores no permiten abrirlo por código: queda el comportamiento normal.
    }
  }
  return <input {...props} className={`picker ${className}`} onClick={abrir} />
}
