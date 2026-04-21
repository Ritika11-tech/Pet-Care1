import { motion } from 'framer-motion'
import { Trash2, Edit, Calendar, FileText } from 'lucide-react'
import { getReminderType, getReminderText, getColorClass, getBadgeColor } from '../../services/reminderService'

export default function VaccinationList({ vaccinations, onEdit, onDelete }) {
  if (!vaccinations || vaccinations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No vaccinations recorded yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {vaccinations.map((vaccine, index) => {
        const reminderType = getReminderType(vaccine.nextDueDate)
        const reminderText = getReminderText(vaccine.nextDueDate)
        const colorClass = getColorClass(reminderType)
        const badgeColor = getBadgeColor(reminderType)

        return (
          <motion.div
            key={vaccine.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border-2 rounded-2xl p-4 ${colorClass}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-lg">{vaccine.name}</h4>
                  <span className={`${badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                    {reminderText}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(vaccine)}
                  className="p-2 hover:bg-white/50 rounded-lg transition"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(vaccine.id)}
                  className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              {vaccine.lastDueDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Last: {new Date(vaccine.lastDueDate).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Next Due: {new Date(vaccine.nextDueDate).toLocaleDateString()}</span>
              </div>

              {vaccine.notes && (
                <div className="flex items-start gap-2 mt-2">
                  <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="opacity-80">{vaccine.notes}</span>
                </div>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
