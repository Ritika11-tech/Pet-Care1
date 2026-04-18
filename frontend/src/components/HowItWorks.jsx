import { motion } from 'framer-motion'
import { Upload, Brain, BarChart3, HeartPulse } from 'lucide-react'

const steps = [
  {
    title: "Upload Image",
    desc: "Upload your dog’s image or video easily",
    icon: <Upload className="w-8 h-8" />
  },
  {
    title: "AI Analysis",
    desc: "Our AI analyzes symptoms instantly",
    icon: <Brain className="w-8 h-8" />
  },
  {
    title: "Prediction",
    desc: "Get accurate disease prediction",
    icon: <BarChart3 className="w-8 h-8" />
  },
  {
    title: "Remedies",
    desc: "Get precautions & treatment tips",
    icon: <HeartPulse className="w-8 h-8" />
  }
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 px-6 bg-gray-50">
      
      <h2 className="text-3xl font-bold text-center mb-12">
        How It Works
      </h2>

      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">

        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            whileHover={{ y: -10, scale: 1.03 }}
          >
            {/* Step Number */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold mb-4">
              {i + 1}
            </div>

            {/* Icon */}
            <div className="text-blue-500 mb-4">
              {step.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm">
              {step.desc}
            </p>
          </motion.div>
        ))}

      </div>
    </section>
  )
}