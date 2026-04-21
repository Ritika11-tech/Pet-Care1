import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, PawPrint, Filter, Mail } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { filterDogsByStatus, checkUpcomingVaccinations } from '../services/reminderService'
import { sendVaccinationReminderEmail } from '../services/emailService'
import { showToast } from '../components/Toast'
import DogForm from '../components/VaccinationTracker/DogForm'
import VaccinationForm from '../components/VaccinationTracker/VaccinationForm'
import SterilizationTracker from '../components/VaccinationTracker/SterilizationTracker'
import EmailSettingsModal from '../components/VaccinationTracker/EmailSettingsModal'
import DogCard from '../components/VaccinationTracker/DogCard'
import UpcomingVaccinations from '../components/VaccinationTracker/UpcomingVaccinations'
import ReminderAlert from '../components/VaccinationTracker/ReminderAlert'
import Toast from '../components/Toast'

export default function VaccinationDashboard() {
  const [dogs, setDogs] = useLocalStorage('pet-care-dogs', [])
  const [userEmail, setUserEmail] = useLocalStorage('pet-care-user-email', '')
  const [filterType, setFilterType] = useState('all')
  const [showDogForm, setShowDogForm] = useState(false)
  const [showVaccineForm, setShowVaccineForm] = useState(false)
  const [showSterilizationForm, setShowSterilizationForm] = useState(false)
  const [showEmailSettings, setShowEmailSettings] = useState(false)
  const [editingDog, setEditingDog] = useState(null)
  const [editingVaccine, setEditingVaccine] = useState(null)
  const [editingVaccineDog, setEditingVaccineDog] = useState(null)
  const [editingSterilizationDog, setEditingSterilizationDog] = useState(null)
  const [upcomingReminders, setUpcomingReminders] = useState([])

  // Check for upcoming vaccinations on mount and when dogs change
  useEffect(() => {
    const reminders = checkUpcomingVaccinations(dogs)
    setUpcomingReminders(reminders)
  }, [dogs])

  // Add or update dog
  const handleAddDog = (formData) => {
    if (editingDog) {
      setDogs(dogs.map(dog =>
        dog.id === editingDog.id
          ? { ...dog, ...formData, id: dog.id }
          : dog
      ))
      setEditingDog(null)
    } else {
      const newDog = {
        id: Date.now().toString(),
        ...formData,
        vaccinations: [],
        sterilization: {}
      }
      setDogs([...dogs, newDog])
    }
    setShowDogForm(false)
  }

  // Delete dog
  const handleDeleteDog = (dogId) => {
    if (confirm('Are you sure you want to delete this dog?')) {
      setDogs(dogs.filter(dog => dog.id !== dogId))
    }
  }

  // Edit dog
  const handleEditDog = (dog) => {
    setEditingDog(dog)
    setShowDogForm(true)
  }

  // Add vaccine
  const handleAddVaccine = (dog) => {
    setEditingVaccineDog(dog)
    setEditingVaccine(null)
    setShowVaccineForm(true)
  }

  // Edit vaccine
  const handleEditVaccine = (dog, vaccine) => {
    setEditingVaccineDog(dog)
    setEditingVaccine(vaccine)
    setShowVaccineForm(true)
  }

  // Save vaccine
  const handleSaveVaccine = (formData) => {
    if (!editingVaccineDog) return

    const vaccineWithId = {
      id: editingVaccine?.id || Date.now().toString(),
      ...formData
    }

    // Check if vaccine is due today and send email notification
    const today = new Date().toISOString().split('T')[0]
    if (formData.nextDueDate === today && userEmail) {
      sendVaccinationReminderEmail({
        userEmail: userEmail,
        userName: editingVaccineDog.name,
        dogName: editingVaccineDog.name,
        vaccineName: formData.name,
        nextDueDate: formData.nextDueDate,
        breed: editingVaccineDog.breed
      }).then(result => {
        showToast(result.message, result.success ? 'success' : 'info')
      })
    }

    setDogs(dogs.map(dog => {
      if (dog.id === editingVaccineDog.id) {
        if (editingVaccine) {
          return {
            ...dog,
            vaccinations: dog.vaccinations.map(v =>
              v.id === editingVaccine.id ? vaccineWithId : v
            )
          }
        } else {
          return {
            ...dog,
            vaccinations: [...(dog.vaccinations || []), vaccineWithId]
          }
        }
      }
      return dog
    }))

    setShowVaccineForm(false)
    setEditingVaccine(null)
    setEditingVaccineDog(null)
  }

  // Delete vaccine
  const handleDeleteVaccine = (dogId, vaccineId) => {
    if (confirm('Are you sure you want to delete this vaccine?')) {
      setDogs(dogs.map(dog =>
        dog.id === dogId
          ? { ...dog, vaccinations: dog.vaccinations.filter(v => v.id !== vaccineId) }
          : dog
      ))
    }
  }

  // Edit sterilization
  const handleEditSterilization = (dog) => {
    setEditingSterilizationDog(dog)
    setShowSterilizationForm(true)
  }

  // Save sterilization
  const handleSaveSterilization = (formData) => {
    if (!editingSterilizationDog) return

    setDogs(dogs.map(dog =>
      dog.id === editingSterilizationDog.id
        ? { ...dog, sterilization: formData }
        : dog
    ))

    setShowSterilizationForm(false)
    setEditingSterilizationDog(null)
  }

  // Save email settings
  const handleSaveEmail = (email) => {
    setUserEmail(email)
    setShowEmailSettings(false)
    showToast('✅ Email notifications enabled!', 'success')
  }

  // Filter dogs
  const filteredDogs = filterDogsByStatus(dogs, filterType)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50 pb-12">
      {/* Toast Notifications */}
      <Toast />

      {/* Reminder Alerts */}
      <ReminderAlert alerts={upcomingReminders} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <PawPrint className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl sm:text-3xl text-gray-800">
                  Pet Vaccination Tracker
                </h1>
                <p className="text-sm text-gray-500">Keep your dogs healthy with organized vaccination records</p>
              </div>
            </div>

            <div className="flex gap-2">
              {userEmail && (
                <button
                  onClick={() => setShowEmailSettings(true)}
                  className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition border border-blue-200"
                  title={`Email: ${userEmail}`}
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">Email On</span>
                </button>
              )}
              <button
                onClick={() => {
                  setEditingDog(null)
                  setShowDogForm(true)
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition"
              >
                <Plus className="w-5 h-5" />
                Add Dog
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Upcoming Vaccinations */}
        {dogs.length > 0 && (
          <UpcomingVaccinations dogs={dogs} />
        )}

        {/* Filter Tabs */}
        {dogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-3 items-center"
          >
            <Filter className="w-5 h-5 text-gray-600" />
            {[
              { label: 'All Dogs', value: 'all' },
              { label: 'Due Soon', value: 'due-soon' },
              { label: 'Overdue', value: 'overdue' }
            ].map(filter => (
              <button
                key={filter.value}
                onClick={() => setFilterType(filter.value)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  filterType === filter.value
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Dogs Grid */}
        {filteredDogs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <AnimatePresence>
              {filteredDogs.map(dog => (
                <DogCard
                  key={dog.id}
                  dog={dog}
                  onEdit={handleEditDog}
                  onDelete={handleDeleteDog}
                  onAddVaccine={handleAddVaccine}
                  onEditVaccine={handleEditVaccine}
                  onDeleteVaccine={handleDeleteVaccine}
                  onEditSterilization={handleEditSterilization}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <PawPrint className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Dogs Yet</h3>
            <p className="text-gray-500 mb-6">Start by adding your first dog to track vaccinations</p>
            <button
              onClick={() => {
                setEditingDog(null)
                setShowDogForm(true)
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg transition"
            >
              <Plus className="w-5 h-5" />
              Add Your First Dog
            </button>
          </motion.div>
        )}
      </div>

      {/* Stats Footer */}
      {dogs.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 text-center border border-green-100">
              <p className="text-2xl font-bold text-green-600">{dogs.length}</p>
              <p className="text-sm text-gray-600">Dogs</p>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center border border-blue-100">
              <p className="text-2xl font-bold text-blue-600">
                {dogs.reduce((sum, dog) => sum + (dog.vaccinations?.length || 0), 0)}
              </p>
              <p className="text-sm text-gray-600">Vaccinations</p>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center border border-pink-100">
              <p className="text-2xl font-bold text-pink-600">
                {dogs.filter(dog => dog.sterilization?.isSterilized).length}
              </p>
              <p className="text-sm text-gray-600">Sterilized</p>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center border border-amber-100">
              <p className="text-2xl font-bold text-amber-600">{upcomingReminders.length}</p>
              <p className="text-sm text-gray-600">Reminders</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showDogForm && (
          <DogForm
            key="dog-form"
            initialData={editingDog}
            onSubmit={handleAddDog}
            onCancel={() => {
              setShowDogForm(false)
              setEditingDog(null)
            }}
          />
        )}

        {showVaccineForm && (
          <VaccinationForm
            key="vaccine-form"
            initialData={editingVaccine}
            onSubmit={handleSaveVaccine}
            onCancel={() => {
              setShowVaccineForm(false)
              setEditingVaccine(null)
              setEditingVaccineDog(null)
            }}
          />
        )}

        {showSterilizationForm && (
          <SterilizationTracker
            key="sterilization-form"
            initialData={editingSterilizationDog?.sterilization}
            onSubmit={handleSaveSterilization}
            onCancel={() => {
              setShowSterilizationForm(false)
              setEditingSterilizationDog(null)
            }}
          />
        )}

        {showEmailSettings && (
          <EmailSettingsModal
            key="email-settings"
            userEmail={userEmail}
            onSave={handleSaveEmail}
            onCancel={() => setShowEmailSettings(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
