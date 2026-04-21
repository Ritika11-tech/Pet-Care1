import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Heart } from 'lucide-react'

export default function SterilizationTracker({ onSubmit, onCancel, initialData = null }) {
  const [form, setForm] = useState(
    initialData || {
      isSterilized: false,
      date: '',
      veterinarian: '',
      notes: ''
    }
  )

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
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
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Sterilization
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
            <div className="flex items-center p-4 bg-pink-50 rounded-2xl border border-pink-200">
              <input
                type="checkbox"
                name="isSterilized"
                id="isSterilized"
                checked={form.isSterilized}
                onChange={handleInputChange}
                className="w-5 h-5 text-pink-500 rounded focus:ring-2 focus:ring-pink-500 cursor-pointer"
              />
              <label htmlFor="isSterilized" className="ml-3 text-gray-700 font-medium cursor-pointer">
                Dog has been sterilized
              </label>
            </div>

            {form.isSterilized && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sterilization Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Veterinarian Name
                  </label>
                  <input
                    type="text"
                    name="veterinarian"
                    value={form.veterinarian}
                    onChange={handleInputChange}
                    placeholder="e.g., Dr. Smith"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
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
                    placeholder="e.g., Recovery tips, post-care notes"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition resize-none"
                  />
                </div>
              </>
            )}
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
              className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-rose-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
