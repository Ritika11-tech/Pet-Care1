import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Plus, Edit, Trash2, Heart } from 'lucide-react'
import VaccinationList from './VaccinationList'

export default function DogCard({ dog, onEdit, onDelete, onAddVaccine, onEditVaccine, onDeleteVaccine, onEditSterilization }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const isSterilized = dog.sterilization?.isSterilized

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            {dog.image && (
              <img
                src={dog.image}
                alt={dog.name}
                className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-lg"
              />
            )}
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{dog.name}</h3>
              <p className="text-white/90 text-sm">{dog.breed}</p>
              {dog.age && <p className="text-white/75 text-xs mt-1">{dog.age} years old • {dog.gender}</p>}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(dog)}
              className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(dog.id)}
              className="p-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-lg transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Sterilization Status */}
        <motion.div
          initial={false}
          animate={{ height: isSterilized ? 'auto' : 0, opacity: isSterilized ? 1 : 0 }}
          className="overflow-hidden mb-4"
        >
          {isSterilized && (
            <div className="flex items-center justify-between bg-pink-50 rounded-2xl p-4 border border-pink-200 mb-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                <div>
                  <p className="font-semibold text-gray-800">Sterilized</p>
                  <p className="text-xs text-gray-600">
                    {dog.sterilization?.date ? new Date(dog.sterilization.date).toLocaleDateString() : 'Date not specified'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onEditSterilization(dog)}
                className="p-2 hover:bg-pink-200 rounded-lg transition"
              >
                <Edit className="w-4 h-4 text-pink-600" />
              </button>
            </div>
          )}
        </motion.div>

        {/* Vaccinations Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-800">Vaccinations</h4>
            <button
              onClick={() => onAddVaccine(dog)}
              className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          {!isExpanded && dog.vaccinations?.length > 0 && (
            <div className="text-sm text-gray-600 mb-3">
              {dog.vaccinations.length} vaccine{dog.vaccinations.length !== 1 ? 's' : ''} recorded
            </div>
          )}

          {isExpanded && (
            <VaccinationList
              vaccinations={dog.vaccinations}
              onEdit={(vaccine) => onEditVaccine(dog, vaccine)}
              onDelete={(vaccineId) => onDeleteVaccine(dog.id, vaccineId)}
            />
          )}
        </div>

        {/* Expand Button */}
        {dog.vaccinations?.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 py-3 text-green-600 font-semibold hover:bg-green-50 rounded-lg transition"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-5 h-5" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5" />
                View Details
              </>
            )}
          </button>
        )}

        {!dog.vaccinations || dog.vaccinations.length === 0 && (
          !isSterilized ? (
            <p className="text-center py-6 text-gray-400">
              No data recorded yet
            </p>
          ) : null
        )}
      </div>
    </motion.div>
  )
}
