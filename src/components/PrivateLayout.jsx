import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Sidebar from './Sidebar.jsx'
import SetupNotice from './SetupNotice.jsx'
import OfflineBanner from './OfflineBanner.jsx'
import EmergenciaSheet from './EmergenciaSheet.jsx'
import { EmergenciaProvider } from '../context/EmergenciaContext.jsx'
import { useApp } from '../context/AppContext.jsx'
import { firebaseConfigurado } from '../firebase'

const CLAVE_MENU = 'maseli-menu'

// Protege las pantallas internas: sin perfil guardado se vuelve al Ingreso.
export default function PrivateLayout() {
  const { perfil, cargando } = useApp()

  // El menú recuerda si el residente lo dejó plegado (solo íconos)
  const [colapsado, setColapsado] = useState(() => {
    try {
      return localStorage.getItem(CLAVE_MENU) === 'plegado'
    } catch {
      return false
    }
  })

  function alternarMenu() {
    setColapsado((actual) => {
      const nuevo = !actual
      try {
        localStorage.setItem(CLAVE_MENU, nuevo ? 'plegado' : 'abierto')
      } catch {
        // sin almacenamiento disponible: funciona igual, solo no se recuerda
      }
      return nuevo
    })
  }

  if (!firebaseConfigurado) return <SetupNotice />
  if (cargando)
    return (
      <div className="centro">
        <Loader2 className="girar" size={32} />
      </div>
    )
  if (!perfil) return <Navigate to="/" replace />

  return (
    <EmergenciaProvider>
      <div className={`app ${colapsado ? 'colapsado' : ''}`}>
        <OfflineBanner />
        <Sidebar colapsado={colapsado} onToggle={alternarMenu} />
        <main className="main">
          <Outlet />
        </main>
        <EmergenciaSheet />
      </div>
    </EmergenciaProvider>
  )
}
