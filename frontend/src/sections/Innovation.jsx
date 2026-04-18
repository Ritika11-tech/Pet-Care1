import { motion } from 'framer-motion'
import {Heart,  Sparkles, QrCode, History, Syringe, Phone, Shield } from 'lucide-react'
import QRPreview from '../components/QRPreview'

const features = [
  { icon: History, title: 'Lost Dog Alert 🚨', description: 'This dog might be lost or needs help finding home' },
  { icon: Syringe, title: 'Instant Owner Details', description: 'Get owner name & phone in one scan' },
  { icon: Phone, title: 'Quick Rescue Action', description: 'Call the owner and help reunite instantly' },
]

export default function Innovation() {
  return (
    <section id="innovation" className="py-24 bg-gradient-to-b from-pastel-cream to-pastel-lavender/20">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pastel-lavender text-pastel-lavender-dark text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Unique Innovation
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-pastel-text mb-4">
          “Scan. Connect. Reunite.”
          </h2>
          <p className="text-pastel-text-light leading-relaxed">
            Every dog deserves to find their way home. 
Scan this QR code to instantly view the dog's details and contact the owner.
Your one small action can reunite a family ❤️
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-pastel-lavender flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-pastel-lavender-dark" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-pastel-text">{feature.title}</h4>
                    <p className="text-sm text-pastel-text-light">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-pastel-blue/20 to-pastel-lavender/20"
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <Heart className="w-5 h-5 text-pastel-pink-dark" />
              </div>
              <div>
                <p className="font-medium text-pastel-text">Be a Hero</p>
                <p className="text-sm text-pastel-text-light">Your small help can save a life</p>
              </div>
            </motion.div>
          </div>

          <QRPreview />
        </div>
      </div>
    </section>
  )
}
