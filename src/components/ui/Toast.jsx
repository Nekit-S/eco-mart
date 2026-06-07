import { useEffect } from 'react'
import { useToastStore } from '../../hooks/useToast.js'

function ToastItem({ toast }) {
  const dismiss = useToastStore((s) => s.dismiss)
  useEffect(() => {
    const id = setTimeout(() => dismiss(toast.id), toast.duration)
    return () => clearTimeout(id)
  }, [toast.id, toast.duration, dismiss])
  return (
    <div className={'toast toast--' + toast.tone} role="status" onClick={() => dismiss(toast.id)}>
      {toast.message}
    </div>
  )
}

// Mount once near the app root (inside the shell).
export default function ToastHost() {
  const toasts = useToastStore((s) => s.toasts)
  if (!toasts.length) return null
  return (
    <div className="toast-host" aria-live="polite">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  )
}
