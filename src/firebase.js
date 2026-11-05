// Inicialización de Firebase.
// Los valores vienen del archivo .env (variables con prefijo VITE_).
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Si falta alguna variable, la app muestra una pantalla de ayuda en vez de romperse.
export const firebaseConfigurado = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
)

let auth = null
let db = null

if (firebaseConfigurado) {
  const app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
}

export { auth, db }
