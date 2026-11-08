// Catálogo basado en la arquitectura de información:
//   1. Tipo de servicio  ->  2. Especialidad  ->  3. Ubicación y descripción  ->  4. Agendado
import {
  IcAdministracion, IcAgua, IcAreasComunes, IcAvisos, IcElectrico, IcElectrodomesticos, IcEmergencia,
  IcGas, IcGasFuga, IcGeneral, IcIncendio, IcInfraestructura, IcInundacion, IcLimpieza, IcMantenimiento,
  IcOtraEmergencia, IcPersona, IcPlagas, IcPortero, IcProfunda, IcRiesgoElectrico, IcSeguridad,
} from '../components/Iconos.jsx'

// Edificios disponibles en el ingreso (menú desplegable)
export const EDIFICIOS = ['Edificio 1', 'Edificio 2', 'Edificio 3']

export const SERVICIOS = [
  {
    id: 'avisos',
    nombre: 'Avisos / Otros',
    ayuda: 'Comunicá algo a la administración o al portero',
    icono: IcAvisos,
    especialidades: [
      { id: 'administracion', nombre: 'Administración', icono: IcAdministracion },
      { id: 'portero', nombre: 'Portero', icono: IcPortero },
    ],
  },
  {
    id: 'limpieza',
    nombre: 'Limpieza',
    ayuda: 'Limpieza de tu unidad o de espacios comunes',
    icono: IcLimpieza,
    especialidades: [
      { id: 'profunda', nombre: 'Profunda', icono: IcProfunda },
      { id: 'general', nombre: 'General', icono: IcGeneral },
      { id: 'areas_comunes', nombre: 'Áreas comunes', icono: IcAreasComunes },
      { id: 'plagas', nombre: 'Control de plagas', icono: IcPlagas },
    ],
  },
  {
    id: 'mantenimiento',
    nombre: 'Mantenimiento',
    ayuda: 'Arreglos, roturas y fallas técnicas',
    icono: IcMantenimiento,
    especialidades: [
      { id: 'electrico', nombre: 'Eléctrico', icono: IcElectrico },
      { id: 'agua', nombre: 'Agua', icono: IcAgua },
      { id: 'gas', nombre: 'Gas', icono: IcGas },
      { id: 'infraestructura', nombre: 'Infraestructura', icono: IcInfraestructura },
      { id: 'electrodomesticos', nombre: 'Electrodomésticos', icono: IcElectrodomesticos },
    ],
  },
]

// Emergencias: no forman parte del formulario de 4 pasos, se envían en dos clics desde el botón rojo.
export const SERVICIO_EMERGENCIA = {
  id: 'emergencia',
  nombre: 'Emergencia',
  icono: IcEmergencia,
  especialidades: [
    { id: 'incendio', nombre: 'Incendio o humo', icono: IcIncendio },
    { id: 'gas', nombre: 'Olor o pérdida de gas', icono: IcGasFuga },
    { id: 'agua', nombre: 'Inundación o pérdida de agua', icono: IcInundacion },
    { id: 'electrico', nombre: 'Riesgo eléctrico', icono: IcRiesgoElectrico },
    { id: 'persona', nombre: 'Persona herida o en riesgo', icono: IcPersona },
    { id: 'seguridad', nombre: 'Intruso o seguridad', icono: IcSeguridad },
    { id: 'otra', nombre: 'Otra emergencia', icono: IcOtraEmergencia },
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
