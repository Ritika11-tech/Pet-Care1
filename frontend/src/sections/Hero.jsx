import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pastel-blue rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pastel-lavender rounded-full blur-3xl opacity-40" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pastel-green rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto w-full section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-soft"
            >
           
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-pastel-text leading-tight"
              >
               PET-CARE
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl sm:text-2xl text-pastel-text-light font-light"
              >
                AI-Based Dog Disease Detection System
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg font-bold text-pastel-text/80 max-w-md italic"
            >
              "Giving a voice to the voiceless"
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#try"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pastel-blue-dark to-pastel-lavender-dark text-white font-semibold rounded-2xl shadow-soft-lg hover:shadow-glow transition-all duration-300"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Try Detection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#solution"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pastel-text font-semibold rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-soft-lg">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-pastel-blue via-pastel-lavender to-pastel-green flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <defs>
                    <linearGradient id="dogGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#90CAF9" />
                      <stop offset="100%" stopColor="#CE93D8" />
                    </linearGradient>
                  </defs>
                  
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <ellipse cx="200" cy="220" rx="80" ry="70" fill="url(#dogGrad)" opacity="0.9" />
                    
                    <ellipse cx="140" cy="180" rx="35" ry="45" fill="#90CAF9" opacity="0.8" />
                    <ellipse cx="260" cy="180" rx="35" ry="45" fill="#90CAF9" opacity="0.8" />
                    
                    <ellipse cx="200" cy="250" rx="25" ry="20" fill="#F3E5F5" opacity="0.9" />
                    <ellipse cx="200" cy="270" rx="15" ry="10" fill="#E3F2FD" opacity="0.9" />
                    
                    <circle cx="175" cy="210" r="8" fill="#2D3748" />
                    <circle cx="225" cy="210" r="8" fill="#2D3748" />
                    <circle cx="177" cy="208" r="3" fill="white" />
                    <circle cx="227" cy="208" r="3" fill="white" />
                    
                    <ellipse cx="200" cy="230" rx="12" ry="8" fill="#2D3748" opacity="0.8" />
                    <circle cx="200" cy="228" r="3" fill="#A5D6A7" />
                    
                    <path d="M185 240 Q200 250 215 240" stroke="#2D3748" strokeWidth="2" fill="none" opacity="0.5" />
                  </motion.g>
                  
                  <motion.g
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <rect x="50" y="50" width="100" height="60" rx="12" fill="white" opacity="0.9" />
                    <text x="100" y="75" textAnchor="middle" fontSize="12" fill="#718096" fontFamily="Inter">AI Analysis</text>
                    <rect x="60" y="85" width="80" height="6" rx="3" fill="#E3F2FD" />
                    <rect x="60" y="95" width="60" height="6" rx="3" fill="#E8F5E9" />
                    
                    <rect x="250" y="280" width="100" height="80" rx="12" fill="white" opacity="0.9" />
                    <circle cx="300" cy="310" r="20" fill="#F3E5F5" />
                    <text x="300" y="345" textAnchor="middle" fontSize="10" fill="#718096" fontFamily="Inter">Scanning...</text>
                    <circle cx="300" cy="310" r="12" fill="none" stroke="#CE93D8" strokeWidth="3" strokeDasharray="60" strokeLinecap="round">
                      <animateTransform attributeName="transform" type="rotate" from="0 300 310" to="360 300 310" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </motion.g>
                  
                  <motion.circle
                    cx="320"
                    cy="100"
                    r="8"
                    fill="#A5D6A7"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ delay: 1.2, duration: 1, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="80"
                    cy="150"
                    r="5"
                    fill="#90CAF9"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ delay: 1.4, duration: 1.5, repeat: Infinity }}
                  />
                </svg>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-soft-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pastel-green flex items-center justify-center">
                    <span className="text-green-600 text-lg">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-pastel-text">AI Powered</p>
                    <p className="text-xs text-pastel-text-light">98% Accuracy</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
