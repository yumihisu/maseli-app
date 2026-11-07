// Catálogo basado en la arquitectura de información:
//   1. Tipo de servicio  ->  2. Especialidad  ->  3. Ubicación y descripción  ->  4. Agendado
import {
  Brush,
  Bug,
  Building,
  Building2,
  DoorOpen,
  Droplets,
  Flame,
  Hammer,
  HeartPulse,
  Megaphone,
  Plug,
  ShieldAlert,
  Siren,
  Sparkles,
  TriangleAlert,
  Wind,
  Wrench,
  Zap,
} from 'lucide-react'

// Edificios disponibles en el ingreso (menú desplegable)
export const EDIFICIOS = ['Edificio 1', 'Edificio 2', 'Edificio 3']

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
      { id: 'plagas', nombre: 'Control de plagas', icono: Bug },
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

// Emergencias: no forman parte del formulario de 4 pasos, se envían en dos clics desde el botón rojo.
export const SERVICIO_EMERGENCIA = {
  id: 'emergencia',
  nombre: 'Emergencia',
  icono: Siren,
  especialidades: [
    { id: 'incendio', nombre: 'Incendio o humo', icono: Flame },
    { id: 'gas', nombre: 'Olor o pérdida de gas', icono: Wind },
    { id: 'agua', nombre: 'Inundación o pérdida de agua', icono: Droplets },
    { id: 'electrico', nombre: 'Riesgo eléctrico', icono: Zap },
    { id: 'persona', nombre: 'Persona herida o en riesgo', icono: HeartPulse },
    { id: 'seguridad', nombre: 'Intruso o seguridad', icono: ShieldAlert },
    { id: 'otra', nombre: 'Otra emergencia', icono: TriangleAlert },
  ],
}

export const getServicio = (id) =>
  id === 'emergencia' ? SERVICIO_EMERGENCIA : SERVICIOS.find((s) => s.id === id)

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
