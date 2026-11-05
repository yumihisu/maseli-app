import { Navigate, Outlet } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Sidebar from './Sidebar.jsx'
import SetupNotice from './SetupNotice.jsx'
import { useApp } from '../context/AppContext.jsx'
import { firebaseConfigurado } from '../firebase'

// Protege las pantallas internas: sin perfil guardado se vuelve al Ingreso.
export default function PrivateLayout() {
  const { perfil, cargando } = useApp()

  if (!firebaseConfigurado) return <SetupNotice />
  if (cargando)
    return (
      <div className="centro">
        <Loader2 className="girar" size={32} />
      </div>
    )
  if (!perfil) return <Navigate to="/" replace />

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}
