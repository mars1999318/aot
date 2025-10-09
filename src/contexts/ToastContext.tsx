import React, { createContext, useContext, useState, useCallback } from 'react'
import { ErrorToast, ToastProps } from '../components/ErrorToast'

interface ToastContextType {
  showToast: (toast: Omit<ToastProps, 'id' | 'onClose'>) => void
  showSuccess: (title: string, message: string, duration?: number) => void
  showError: (title: string, message: string, duration?: number) => void
  showWarning: (title: string, message: string, duration?: number) => void
  showInfo: (title: string, message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const showToast = useCallback((toast: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: ToastProps = {
      ...toast,
      id,
      onClose: removeToast
    }
    setToasts(prev => [...prev, newToast])
  }, [removeToast])

  const showSuccess = useCallback((title: string, message: string, duration = 5000) => {
    showToast({ type: 'success', title, message, duration })
  }, [showToast])

  const showError = useCallback((title: string, message: string, duration = 8000) => {
    showToast({ type: 'error', title, message, duration })
  }, [showToast])

  const showWarning = useCallback((title: string, message: string, duration = 6000) => {
    showToast({ type: 'warning', title, message, duration })
  }, [showToast])

  const showInfo = useCallback((title: string, message: string, duration = 5000) => {
    showToast({ type: 'info', title, message, duration })
  }, [showToast])

  return (
    <ToastContext.Provider value={{
      showToast,
      showSuccess,
      showError,
      showWarning,
      showInfo
    }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <ErrorToast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
