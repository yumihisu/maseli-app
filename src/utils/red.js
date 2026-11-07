// Firestore, sin internet, deja las escrituras "en cola" y la promesa nunca se resuelve ni
// falla: la pantalla quedaría cargando sin avisar. Estas funciones hacen que el error sea visible.

export class ErrorRed extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
  }
}

// Falla enseguida si el navegador no tiene conexión
export function asegurarConexion() {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    throw new ErrorRed('sin-conexion', 'Sin conexión a internet')
  }
}

// Falla si el servidor no confirma la operación en `ms` milisegundos
export function conTimeout(promesa, ms = 8000) {
  let temporizador
  const limite = new Promise((_, rechazar) => {
    temporizador = setTimeout(
      () => rechazar(new ErrorRed('timeout', 'El servidor no confirmó la operación')),
      ms,
    )
  })
  return Promise.race([promesa, limite]).finally(() => clearTimeout(temporizador))
}

// Ejecuta una escritura en Firestore con ambas protecciones
export async function escribir(operacion) {
  asegurarConexion()
  return conTimeout(operacion())
}
