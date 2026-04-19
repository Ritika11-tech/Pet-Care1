import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Upload, Scan, FileText, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Upload',
    description: 'Upload an image or video of your dog',
  },
  {
    icon: Scan,
    title: 'AI Scan',
    description: 'Our AI analyzes visual symptoms instantly',
  },
  {
    icon: FileText,
    title: 'Report',
    description: 'Get detailed health assessment report',
  },
  {
    icon: CheckCircle,
    title: 'Action',
    description: 'Follow recommended next steps',
  },
]

export default function Solution() {
  const navigate = useNavigate()

  return (
    <section id="solution" className="py-24 bg-pastel-cream">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-pastel-green text-green-700 text-sm font-medium mb-4">
                Our Solution
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-pastel-text mb-4">
                Simple, Fast & Accurate Detection
              </h2>
              <p className="text-pastel-text-light leading-relaxed">
                Using advanced computer vision and machine learning, our system 
                analyzes images and videos of your dog to detect potential health 
                issues early. No appointments, no waiting—just instant insights.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pastel-blue to-pastel-lavender flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-pastel-text">{step.title}</h4>
                    <p className="text-sm text-pastel-text-light">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <button
              onClick={() => navigate('/detection')}
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-lg"
            >
              Try Detection
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
