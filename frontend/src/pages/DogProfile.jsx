import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, MapPin, User, Heart, PawPrint, Shield, Calendar } from 'lucide-react'
 
export default function DogProfile() {
  const { dogId } = useParams()
 
  // Mock data - in production this would come from an API
  const dogData = {
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: '3 years',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop',
    owner: {
      name: 'Sarah Johnson',
      address: '123 Green Valley Road, Apt 4B, Springfield, IL 62701',
      phone: '+1 (555) 123-4567'
    },
    medicalInfo: {
      vaccinated: true,
      lastCheckup: 'Jan 15, 2024',
      allergies: 'None known'
    }
  }
 
  const handleCall = () => {
    window.location.href = `tel:${dogData.owner.phone.replace(/\s/g, '')}`
  }
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-pastel-green/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-pastel-green/30 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-gray-800">PetTag</h1>
              <p className="text-xs text-gray-500">Quick Connect</p>
            </div>
          </div>
        </div>
      </header>
 
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-soft-lg overflow-hidden border border-green-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Photo Section */}
            <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 p-6 lg:p-10 flex items-center justify-center">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-green-400 blur-2xl" />
                <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-emerald-400 blur-3xl" />
              </div>
 
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative"
              >
                <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-4 ring-green-100">
                  <img
                    src={dogData.photo}
                    alt={dogData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <span className="text-sm font-medium text-gray-700">I'm Lost! Help Me</span>
                </div>
              </motion.div>
            </div>
 
            {/* Info Section */}
            <div className="p-6 lg:p-10">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {/* Dog Info */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <PawPrint className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-green-600 uppercase tracking-wide">Pet Profile</span>
                  </div>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-800 mb-2">
                    {dogData.name}
                  </h2>
                  <p className="text-gray-500 text-lg">
                    {dogData.breed} • {dogData.age}
                  </p>
                </div>
 
                {/* Owner Info */}
                <div className="bg-green-50/50 rounded-2xl p-6 mb-6 border border-green-100">
                  <h3 className="font-display font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-green-500" />
                    Owner Information
                  </h3>
 
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium text-gray-800">{dogData.owner.name}</p>
                      </div>
                    </div>
 
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium text-gray-800 leading-relaxed">{dogData.owner.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
 
                {/* Medical Badge */}
                <div className="flex gap-3 mb-6">
                  {dogData.medicalInfo.vaccinated && (
                    <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Vaccinated</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Last Check: {dogData.medicalInfo.lastCheckup}</span>
                  </div>
                </div>
 
                {/* Call Button */}
                <motion.button
                  onClick={handleCall}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg shadow-green-500/25 transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <Phone className="w-6 h-6" />
                  <span className="text-lg">Call Owner Now</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {dogData.owner.phone}
                  </span>
                </motion.button>
 
                <p className="text-center text-sm text-gray-400 mt-4">
                  Tap the button to open your phone dialer
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
 
        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-400 text-sm mt-8"
        >
          Scanned via PetTag QR • ID: {dogId || 'Unknown'}
        </motion.p>
      </main>
    </div>
  )
}