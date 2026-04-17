import { motion } from 'framer-motion'
import { QrCode, Dog, Users , Phone, Heart } from 'lucide-react'

export default function QRPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      className="relative bg-white rounded-3xl p-6 shadow-soft-lg max-w-sm mx-auto"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-pastel-blue-dark via-pastel-lavender-dark to-pastel-green-dark rounded-3xl blur-lg opacity-30 animate-pulse" />
      
      <div className="relative bg-white rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-pastel-blue to-pastel-lavender p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
              <Heart className="w-6 h-6 text-pastel-blue-dark" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-pastel-text">Buddy</h4>
              <p className="text-xs text-pastel-text-light">Golden Retriever • 3 years</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="w-40 h-40 bg-pastel-gray rounded-2xl flex items-center justify-center">
              <QrCode className="w-28 h-28 text-pastel-text" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-pastel-blue/50">
              <Dog className="w-5 h-5 text-pastel-blue-dark" />
              <div className="flex-1">
                <p className="text-xs text-pastel-text-light">Breed</p>
                 
                <p className="text-sm font-medium text-pastel-text">Golden Retriever</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-pastel-green/50">
              <Users className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="text-xs text-pastel-text-light">Pet Owner Name</p>
                <p className="text-sm font-medium text-pastel-text">John Doe</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-pastel-lavender/50">
              <Phone className="w-5 h-5 text-pastel-lavender-dark" />
              <div className="flex-1">
                <p className="text-xs text-pastel-text-light">Owner Contact</p>
                <p className="text-sm font-medium text-pastel-text"> +1 234 567</p>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-pastel-text-light mt-4">
            Scan to reunite the pet to their owner   🐾
          </p>
        </div>
      </div>
    </motion.div>
  )
}
