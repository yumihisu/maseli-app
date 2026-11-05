import { KeyRound } from 'lucide-react'

// Se muestra mientras no esté configurado el archivo .env
export default function SetupNotice() {
  return (
    <div className="centro">
      <div className="card aviso-setup">
        <KeyRound size={28} />
        <h2>Falta conectar Firebase</h2>
        <p>
          Creá un archivo <code>.env</code> en la raíz del proyecto (al lado de{' '}
          <code>package.json</code>) con estas variables y reiniciá <code>npm run dev</code>:
        </p>
        <pre>{`VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_APP_ID=...`}</pre>
        <p className="muted">
          Los valores están en Firebase Console → Configuración del proyecto → Tus apps. En Vercel se
          cargan en Settings → Environment Variables.
        </p>
      </div>
    </div>
  )
}
