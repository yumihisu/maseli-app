# MASELI · Servicios para la vida en comunidad

Web app (React + Vite + Firebase) para que los residentes de un edificio reporten problemas de
limpieza, mantenimiento o avisos, indiquen la ubicación exacta y sigan el estado de su pedido en
tiempo real.

- **Interfaz:** React + Vite
- **Base de datos y autenticación:** Firebase (Cloud Firestore + Authentication anónima)
- **Despliegue:** Vercel

## Pantallas

| Ruta | Pantalla |
|---|---|
| `/` | Ingreso (residencia + nombre). Única pantalla sin sidebar |
| `/reportes` | Mis reportes (dashboard con filtros y estado vacío) |
| `/nuevo` | Nuevo reporte en 4 pasos con breadcrumbs: Tipo de servicio → Especialidad → Ubicación y descripción → Agendado |
| `/reportes/:id` | Detalle: ver estado (línea de tiempo), modificar, cancelar, eliminar |
| `/residencia` | Mi residencia (editar perfil) |

## Novedades de la versión 2

- **Botón de emergencia (rojo):** junto a "Nuevo reporte" en el dashboard, en el menú lateral y en la barra
  superior del celular. En dos clics (botón + tipo de emergencia) se envía un reporte urgente con la ubicación
  guardada del residente. Recuerda llamar al 911 si hay peligro inmediato.
- **Ingreso con menú desplegable** de edificios (Edificio 1, 2 y 3).
- **Doble clic (o doble toque)** en Tipo de servicio y Especialidad para avanzar sin usar "Siguiente".
- **Fecha y hora:** todo el recuadro abre el calendario o el reloj.
- **Línea de estado en verde** cuando el reporte está completado.
- **Control de plagas** como nueva especialidad de Limpieza.
- **Se quitó la prioridad** del formulario (la urgencia se resuelve con el botón de emergencia).
- **Menú lateral plegable:** solo íconos; el clic en el logo lo despliega o lo pliega y recuerda la elección.
- **El perfil del menú** abre "Mi residencia", donde se edita el nombre y la unidad (piso y depto).
- **Error visible sin conexión:** cartel rojo "Sin conexión", aviso inmediato al guardar y tiempo máximo de
  espera, para que la app nunca simule que algo se guardó cuando no fue así.
- **Logo real** (isotipo) en el menú, el ingreso y la pestaña del navegador.

> Importante: la versión 2 cambia `firestore.rules` (permite el tipo `emergencia` y los campos `piso` y
> `depto` en el perfil). Hay que volver a pegar el archivo en Firebase → Firestore → Reglas y **Publicar**.

## Datos que se guardan en Firestore

- `residentes/{uid}`: nombre, residencia y, de forma opcional, piso y depto del usuario.
- `reportes/{id}`: uid, nombre, residencia, tipo, especialidad, piso, depto, descripcion, prioridad,
  fecha, hora, estado, historial de estados, creadoEn, actualizadoEn.

Operaciones (todas en `src/services/reportes.js`): consultar en tiempo real, agregar, modificar
(datos y estado) y eliminar.

## Ejecutar en local

```bash
npm install
cp .env.example .env     # y completar los valores (ver más abajo)
npm run dev
```

Si cambiás `.env`, reiniciá `npm run dev`.

## Configurar Firebase

1. Entrá a https://console.firebase.google.com/ y creá un proyecto (sin Analytics).
2. En **Configuración del proyecto → Tus apps**, registrá una app web (`</>`) y copiá el
   `firebaseConfig`.
3. Completá el archivo `.env` con estos valores (uno por línea, sin comas ni comillas):

   ```
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_APP_ID=
   ```

4. **Authentication → Método de acceso → Anónimo → Habilitar.**
5. **Firestore Database → Crear base de datos** (edición Standard, id `(default)`, región
   `southamerica-east1`, **modo producción**).
6. En la pestaña **Reglas**, pegá el contenido de `firestore.rules` y **Publicar** (también cada vez que
   cambie ese archivo, por ejemplo en la versión 2).
   (Las reglas no se despliegan con Vercel: se publican en Firebase.)

## Publicar en Vercel

1. Subí el proyecto a GitHub (el `.gitignore` ya excluye `.env`, `node_modules` y `dist`).
2. En https://vercel.com importá el repositorio. Framework: **Vite**, build `npm run build`,
   output `dist`.
3. En **Settings → Environment Variables** cargá las 4 variables `VITE_FIREBASE_*` en Production.
4. Desplegá. Si cambiás variables después, hacé **Redeploy**.
5. En Firebase → Authentication → Configuración → **Dominios autorizados**, agregá el dominio de
   Vercel (`tu-app.vercel.app`).

`vercel.json` ya incluye la regla para que las rutas (`/reportes`, `/nuevo`…) funcionen al recargar.

## Notas

- Cada navegador tiene una identidad anónima propia: abrir la app en otro dispositivo no recupera
  los reportes del primero. El inicio de sesión permanente es una ampliación posible.
- El botón "Simular respuesta de la administración" del detalle avanza el estado del reporte
  (Pendiente → Visto → En progreso → Completado) para poder demostrar el flujo sin panel de admin.
- El logo es provisorio (`src/components/Logo.jsx`).

## Estructura

```
src/
  firebase.js            conexión con Firebase (lee import.meta.env)
  context/AppContext.jsx autenticación anónima + perfil del residente
  services/reportes.js   operaciones con Firestore
  data/servicios.js      catálogo: tipos, especialidades y estados
  components/            Sidebar, Breadcrumbs, Modal, Toast, etc.
  pages/                 Ingreso, Reportes, NuevoReporte, DetalleReporte, MiResidencia
firestore.rules          reglas de seguridad de Firestore
```
