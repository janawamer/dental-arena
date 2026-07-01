import { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle, X } from 'lucide-react'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((msg, type = 'success') => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
        {toasts.map(({ id, msg }) => (
          <div key={id} className="flex items-center gap-3 bg-arena-navy text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in max-w-xs">
            <CheckCircle size={16} className="text-green-400 shrink-0" />
            <span>{msg}</span>
            <button onClick={() => setToasts(t => t.filter(x => x.id !== id))} className="ml-auto">
              <X size={14} className="text-slate-400 hover:text-white" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
