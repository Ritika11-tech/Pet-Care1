import { motion } from 'framer-motion'
import { AlertCircle, Clock, Stethoscope, HeartCrack } from 'lucide-react'
import Card from '../components/Card'

const problems = [
  {
    icon: HeartCrack,
    title: 'Silent Suffering',
    description: 'Dogs cannot verbally communicate their pain or discomfort, making early detection difficult.',
    color: 'from-green-500 to-green-600',
    iconColor: 'text-white',
  },
  {
    icon: Clock,
    title: 'Delayed Diagnosis',
    description: 'Symptoms often go unnoticed until conditions become severe and harder to treat.',
    color: 'from-green-500 to-green-600',
    iconColor: 'text-white',
  },
  {
    icon: Stethoscope,
    title: 'Limited Access',
    description: 'Rural areas lack veterinary infrastructure, leaving pets without proper healthcare.',
    color: 'from-green-500 to-green-600',
    iconColor: 'text-white',
  },
  {
    icon: AlertCircle,
    title: 'High Costs',
    description: 'Regular vet checkups and diagnostic tests can be financially burdening for pet owners.',
    color: 'from-green-500 to-green-600',
    iconColor: 'text-white',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 border border-green-300 text-sm font-medium mb-4">
            The Challenge
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Why Early Detection Matters
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Millions of dogs suffer from preventable diseases simply because symptoms 
            go unnoticed. Pet owners often realize health issues only when conditions 
            become severe, leading to costly treatments and unnecessary suffering.
          </p>
        </motion.div>

        <div className="grid   bg-green-50  sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <Card
              key={problem.title}
              delay={index * 0.1}
              className="group relative bg-gradient-to-br from-white to-green-50/50 border-2 border-green-200/60 shadow-md hover:shadow-green-200/50 hover:shadow-2xl hover:-translate-y-3 hover:border-green-300 transition-all duration-300"
            >
              <div className="flex justify-center mb-5">
                <div className={`p-3.5 bg-gradient-to-br ${problem.color} rounded-2xl shadow-lg shadow-green-200 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <problem.icon className={`w-7 h-7 ${problem.iconColor}`} />
                </div>
              </div>
              <span className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xs font-bold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display font-semibold text-lg text-gray-800 text-center mb-3">
                {problem.title}
              </h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">
                {problem.description}
              </p>
            </Card>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 p-10 rounded-3xl bg-gradient-to-r from-green-500 to-green-600 text-white text-center shadow-xl shadow-green-200 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <p className="font-display text-3xl sm:text-4xl font-bold mb-3">
              60% of dog diseases
            </p>
            <p className="text-green-100 text-lg">
              could be treated more effectively if detected early
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
