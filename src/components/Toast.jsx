import { createContext, useCallback, useContext, useState } from 'react'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const mostrar = useCallback((tipo, texto) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, tipo, texto }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200)
  }, [])

  const toast = {
    ok: (texto) => mostrar('ok', texto),
    error: (texto) => mostrar('error', texto),
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.tipo}`}>
            {t.tipo === 'ok' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
            <span>{t.texto}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
