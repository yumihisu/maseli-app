// Todas las operaciones con Cloud Firestore están en este archivo.
//   CONSULTAR  -> escucharReportes / escucharReporte (tiempo real)
//   AGREGAR    -> crearReporte
//   MODIFICAR  -> actualizarReporte / cambiarEstado
//   ELIMINAR   -> eliminarReporte
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase'

const COLECCION = 'reportes'

const milis = (r) => (r.creadoEn?.toMillis ? r.creadoEn.toMillis() : Date.now())

// CONSULTAR: lista de reportes del usuario, en tiempo real (más nuevos primero)
export function escucharReportes(uid, onData, onError) {
  const q = query(collection(db, COLECCION), where('uid', '==', uid))
  return onSnapshot(
    q,
    (snap) => {
      const lista = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      lista.sort((a, b) => milis(b) - milis(a))
      onData(lista)
    },
    onError,
  )
}

// CONSULTAR: un solo reporte, en tiempo real
export function escucharReporte(id, onData, onError) {
  return onSnapshot(
    doc(db, COLECCION, id),
    (snap) => onData(snap.exists() ? { id: snap.id, ...snap.data() } : null),
    onError,
  )
}

// AGREGAR
export async function crearReporte(datos) {
  const ref = await addDoc(collection(db, COLECCION), {
    ...datos,
    estado: 'pendiente',
    historial: [{ estado: 'pendiente', en: Date.now() }],
    creadoEn: serverTimestamp(),
    actualizadoEn: serverTimestamp(),
  })
  return ref.id
}

// MODIFICAR: campos editables (ubicación, descripción, fecha, hora)
export function actualizarReporte(id, cambios) {
  return updateDoc(doc(db, COLECCION, id), {
    ...cambios,
    actualizadoEn: serverTimestamp(),
  })
}

// MODIFICAR: cambio de estado, guardando el historial para la línea de tiempo
export function cambiarEstado(reporte, nuevoEstado) {
  return updateDoc(doc(db, COLECCION, reporte.id), {
    estado: nuevoEstado,
    historial: [...(reporte.historial || []), { estado: nuevoEstado, en: Date.now() }],
    actualizadoEn: serverTimestamp(),
  })
}

// ELIMINAR
export function eliminarReporte(id) {
  return deleteDoc(doc(db, COLECCION, id))
}
