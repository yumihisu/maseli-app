// Catálogo basado en la arquitectura de información:
//   1. Tipo de servicio  ->  2. Especialidad  ->  3. Ubicación y descripción  ->  4. Agendado
import {
  Brush,
  Building,
  Building2,
  DoorOpen,
  Droplets,
  Flame,
  Hammer,
  Megaphone,
  Plug,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react'

export const SERVICIOS = [
  {
    id: 'avisos',
    nombre: 'Avisos / Otros',
    ayuda: 'Comunicá algo a la administración o al portero',
    icono: Megaphone,
    especialidades: [
      { id: 'administracion', nombre: 'Administración', icono: Building2 },
      { id: 'portero', nombre: 'Portero', icono: DoorOpen },
    ],
  },
  {
    id: 'limpieza',
    nombre: 'Limpieza',
    ayuda: 'Limpieza de tu unidad o de espacios comunes',
    icono: Sparkles,
    especialidades: [
      { id: 'profunda', nombre: 'Profunda', icono: Sparkles },
      { id: 'general', nombre: 'General', icono: Brush },
      { id: 'areas_comunes', nombre: 'Áreas comunes', icono: Building },
    ],
  },
  {
    id: 'mantenimiento',
    nombre: 'Mantenimiento',
    ayuda: 'Arreglos, roturas y fallas técnicas',
    icono: Wrench,
    especialidades: [
      { id: 'electrico', nombre: 'Eléctrico', icono: Zap },
      { id: 'agua', nombre: 'Agua', icono: Droplets },
      { id: 'gas', nombre: 'Gas', icono: Flame },
      { id: 'infraestructura', nombre: 'Infraestructura', icono: Hammer },
      { id: 'electrodomesticos', nombre: 'Electrodomésticos', icono: Plug },
    ],
  },
]

export const getServicio = (id) => SERVICIOS.find((s) => s.id === id)

export const getEspecialidad = (tipoId, espId) =>
  getServicio(tipoId)?.especialidades.find((e) => e.id === espId)

export const ESTADOS = {
  pendiente: { label: 'Pendiente', clase: 'st-pendiente' },
  visto: { label: 'Visto', clase: 'st-visto' },
  en_progreso: { label: 'En progreso', clase: 'st-progreso' },
  completado: { label: 'Completado', clase: 'st-completado' },
  cancelado: { label: 'Cancelado', clase: 'st-cancelado' },
}

// Orden del flujo normal de un reporte
export const FLUJO = ['pendiente', 'visto', 'en_progreso', 'completado']

export const ESTADOS_ACTIVOS = ['pendiente', 'visto', 'en_progreso']
