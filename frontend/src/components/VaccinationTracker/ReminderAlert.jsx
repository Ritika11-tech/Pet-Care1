import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertCircle, Heart } from 'lucide-react'

export default function ReminderAlert({ alerts, onClose }) {
  const [visibleAlerts, setVisibleAlerts] = useState(alerts.slice(0, 3))

  useEffect(() => {
    setVisibleAlerts(alerts.slice(0, 3))
  }, [alerts])

  if (alerts.length === 0) return null

  const getAlertColor = (reminderType) => {
    const colors = {
      overdue: 'bg-red-100 border-red-300 text-red-900',
      'due-today': 'bg-amber-100 border-amber-300 text-amber-900',
      'due-soon': 'bg-yellow-100 border-yellow-300 text-yellow-900'
    }
    return colors[reminderType] || colors['due-soon']
  }

  const getAlertIcon = (reminderType) => {
    return reminderType === 'overdue' ? 'bg-red-500' : 'bg-amber-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-40 max-w-sm space-y-3"
    >
      <AnimatePresence mode="popLayout">
        {visibleAlerts.map((alert, index) => (
          <motion.div
            key={`${alert.dogId}-${alert.vaccineName}`}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={`border-l-4 rounded-lg p-4 shadow-lg ${getAlertColor(alert.reminderType)}`}
          >
            <div className="flex items-start gap-3">
              <div className={`${getAlertIcon(alert.reminderType)} rounded-full p-2 text-white flex-shrink-0`}>
                <AlertCircle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">
                  {alert.dogName} - {alert.vaccineName}
                </p>
                <p className="text-xs opacity-75 mt-1">
                  {alert.reminderText}
                </p>
              </div>
              <button
                onClick={() => {
                  setVisibleAlerts(prev => prev.filter(a => a.vaccineName !== alert.vaccineName))
                  onClose?.(alert)
                }}
                className="text-lg hover:opacity-70 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {alerts.length > 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-gray-600 bg-white rounded-lg px-4 py-2 shadow-lg"
        >
          +{alerts.length - 3} more reminders
        </motion.div>
      )}
    </motion.div>
  )
}
