import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

export default function Toast() {
  const [toasts, setToasts] = useState([])

  // Listen for custom toast events
  useEffect(() => {
    const handleShowToast = (e) => {
      const id = Date.now()
      const toast = { id, ...e.detail }
      setToasts(prev => [...prev, toast])

      // Auto remove after 4 seconds
      setTimeout(() => {
        removeToast(id)
      }, 4000)
    }

    window.addEventListener('show-toast', handleShowToast)
    return () => window.removeEventListener('show-toast', handleShowToast)
  }, [])

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const getIcon = (type) => {
    const icons = {
      success: <CheckCircle className="w-5 h-5" />,
      error: <AlertCircle className="w-5 h-5" />,
      info: <Info className="w-5 h-5" />
    }
    return icons[type] || icons.info
  }

  const getStyles = (type) => {
    const styles = {
      success: 'bg-green-100 text-green-900 border-green-300',
      error: 'bg-red-100 text-red-900 border-red-300',
      info: 'bg-blue-100 text-blue-900 border-blue-300'
    }
    return styles[type] || styles.info
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, x: 300 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: 300 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 shadow-lg ${getStyles(toast.type)}`}
          >
            {getIcon(toast.type)}
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-lg hover:opacity-70"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

/**
 * Helper function to show toast from anywhere
 */
export const showToast = (message, type = 'info') => {
  window.dispatchEvent(
    new CustomEvent('show-toast', {
      detail: { message, type }
    })
  )
}
