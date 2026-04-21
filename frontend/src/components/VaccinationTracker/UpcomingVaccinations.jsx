import { motion } from 'framer-motion'
import { AlertCircle, Calendar } from 'lucide-react'
import { checkUpcomingVaccinations, getBadgeColor, getReminderText } from '../../services/reminderService'

export default function UpcomingVaccinations({ dogs }) {
  const upcomingList = checkUpcomingVaccinations(dogs)

  if (upcomingList.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-200 text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="font-bold text-xl text-green-900 mb-1">All Vaccinations Up to Date! 🎉</h3>
        <p className="text-green-700">Great job keeping your pets healthy!</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden border border-amber-100"
    >
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-white" />
          <div>
            <h3 className="font-bold text-white text-lg">⚠️ Upcoming Reminders</h3>
            <p className="text-white/90 text-sm">{upcomingList.length} vaccination{upcomingList.length !== 1 ? 's' : ''} need attention</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-3">
        {upcomingList.map((vaccine, index) => (
          <motion.div
            key={`${vaccine.dogId}-${vaccine.vaccineName}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition"
          >
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{vaccine.dogName}</p>
              <p className="text-sm text-gray-600">{vaccine.vaccineName}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(vaccine.nextDueDate).toLocaleDateString()}
                </p>
              </div>
              <span className={`${getBadgeColor(vaccine.reminderType)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                {vaccine.reminderText}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
