import { createContext, useCallback, useContext, useMemo, useState } from 'react'

// Permite abrir la hoja de emergencia desde cualquier botón de la app.
const EmergenciaContext = createContext(null)

export function EmergenciaProvider({ children }) {
  const [abierto, setAbierto] = useState(false)
  const abrir = useCallback(() => setAbierto(true), [])
  const cerrar = useCallback(() => setAbierto(false), [])
  const valor = useMemo(() => ({ abierto, abrir, cerrar }), [abierto, abrir, cerrar])
  return <EmergenciaContext.Provider value={valor}>{children}</EmergenciaContext.Provider>
}

export const useEmergencia = () => useContext(EmergenciaContext)
