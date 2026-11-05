import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db, firebaseConfigurado } from '../firebase'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  // undefined = todavía cargando, null = no tiene perfil, objeto = perfil guardado
  const [perfil, setPerfil] = useState(undefined)
  const [error, setError] = useState(null)

  // 1) Identificar al visitante con Authentication anónima
  useEffect(() => {
    if (!firebaseConfigurado) return
    const cancelar = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u)
      else signInAnonymously(auth).catch(setError)
    })
    return cancelar
  }, [])

  // 2) Escuchar el perfil (residencia + nombre) guardado en Firestore
  useEffect(() => {
    if (!user) return
    const cancelar = onSnapshot(
      doc(db, 'residentes', user.uid),
      (snap) => setPerfil(snap.exists() ? snap.data() : null),
      (e) => {
        setError(e)
        setPerfil(null)
      },
    )
    return cancelar
  }, [user])

  const guardarPerfil = (nombre, residencia) =>
    setDoc(
      doc(db, 'residentes', user.uid),
      { uid: user.uid, nombre, residencia, actualizadoEn: serverTimestamp() },
      { merge: true },
    )

  const cargando = firebaseConfigurado && !error && (!user || perfil === undefined)

  const valor = useMemo(
    () => ({ user, perfil, cargando, error, guardarPerfil }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, perfil, cargando, error],
  )

  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
