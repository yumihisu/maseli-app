import { Navigate, Route, Routes } from 'react-router-dom'
import PrivateLayout from './components/PrivateLayout.jsx'
import Ingreso from './pages/Ingreso.jsx'
import Reportes from './pages/Reportes.jsx'
import NuevoReporte from './pages/NuevoReporte.jsx'
import DetalleReporte from './pages/DetalleReporte.jsx'
import MiResidencia from './pages/MiResidencia.jsx'

export default function App() {
  return (
    <Routes>
      {/* Ingreso: única pantalla sin sidebar */}
      <Route path="/" element={<Ingreso />} />

      {/* Pantallas internas, con sidebar */}
      <Route element={<PrivateLayout />}>
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/nuevo" element={<NuevoReporte />} />
        <Route path="/reportes/:id" element={<DetalleReporte />} />
        <Route path="/residencia" element={<MiResidencia />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
