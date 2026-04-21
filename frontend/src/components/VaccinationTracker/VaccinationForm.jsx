import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Syringe } from 'lucide-react'

const VACCINE_TYPES = [
  'Rabies',
  'DHPP (Distemper)',
  'Leptospirosis',
  'Bordetella',
  'Lyme Disease',
  'COVID-19',
  'Custom'
]

export default function VaccinationForm({ onSubmit, onCancel, initialData = null }) {
  const [form, setForm] = useState(
    initialData || {
      name: '',
      lastDueDate: '',
      nextDueDate: '',
      notes: ''
    }
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name || !form.nextDueDate) {
      alert('Please fill in required fields')
      return
    }

    onSubmit(form)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full"
      >
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Syringe className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {initialData ? 'Edit Vaccine' : 'Add Vaccine'}
              </h2>
            </div>
            <button
              type="button"
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vaccine Name *
              </label>
              <select
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              >
                <option value="">Select vaccine</option>
                {VACCINE_TYPES.map(vaccine => (
                  <option key={vaccine} value={vaccine}>
                    {vaccine}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Vaccination Date
              </label>
              <input
                type="date"
                name="lastDueDate"
                value={form.lastDueDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Next Due Date *
              </label>
              <input
                type="date"
                name="nextDueDate"
                value={form.nextDueDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleInputChange}
                placeholder="e.g., Given at ABC Clinic"
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition"
            >
              {initialData ? 'Update' : 'Add'} Vaccine
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
