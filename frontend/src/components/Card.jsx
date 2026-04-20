import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = true, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={
        hover
          ? {
              scale: 1.02,
              y: -4,
              boxShadow: '0 0 30px -4px rgba(34, 197, 94, 0.4), 0 12px 40px -8px rgba(0, 0, 0, 0.12)',
              borderColor: 'rgba(34, 197, 94, 0.5)',
              transition: { duration: 0.2, ease: 'easeOut' },
            }
          : undefined
      }
      className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-200 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  )
}
