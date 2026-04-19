import { useNavigate } from "react-router-dom"
import { QrCode, User, Phone, FileText, Download, Link, Scan, Heart } from "lucide-react"
import dog1 from '../assets/dog4.png'
import dog2 from '../assets/dog5.png'
import dog3 from '../assets/dog7.png'

export default function HowQR() {
  const navigate = useNavigate()
  return (
       <section id="howQR" className="py-16 px-4">
      
      {/* Problem Statement Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-gradient-to-r from-green-50 to-white rounded-2xl p-8 shadow-lg border border-green-100">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent flex items-center justify-center">
            Keep Your Pet Safe, Always Connected <Heart className="w-6 h-6 ml-2 text-red-500" />
          </h2>
          <p className="text-center text-gray-700 text-lg">
            Many pets get lost every day. With this smart QR tag, anyone can scan and help them reach home safely.
          </p>
        </div>
      </div>

      {/* Dog Images Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h3 className="text-2xl text-green-600 font-bold text-center mb-8">Meet Our Protected Pups</h3>
        <div className="grid md:grid-cols-3 gap-8 px-4">
          {/* Dog 1 */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border border-green-100">
            <div className="h-80 overflow-hidden">
              <img src={dog1} alt="Golden Retriever Max" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
            </div>
          </div>

          {/* Dog 2 */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border border-green-100">
            <div className="h-80 overflow-hidden">
              <img src={dog2} alt="German Shepherd Luna" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
            </div>
          </div>

          {/* Dog 3 */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border border-green-100">
            <div className="h-80 overflow-hidden">
              <img src={dog3} alt="Poodle Bella" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-center mb-12">Your Pet’s Digital ID Journey</h2>
        <div className="grid md:grid-cols-4 gap-8 px-4">
          
          <div className="group bg-green-50 border-2 border-green-200 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 hover:scale-105">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-100 rounded-full">
                <FileText className="w-10 h-10 text-green-500" />
              </div>
            </div>
            <h3 className="font-bold text-xl mb-2 text-center text-gray-800">Step 1: Fill Details</h3>
            <p className="text-gray-600 text-center text-sm">Enter your pet's information and contact details</p>
          </div>

          <div className="group bg-green-50 border-2 border-green-200 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 hover:scale-105">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-100 rounded-full">
                <QrCode className="w-10 h-10 text-green-500" />
              </div>
            </div>
            <h3 className="font-bold text-xl mb-2 text-center text-gray-800">Step 2: Generate QR</h3>
            <p className="text-gray-600 text-center text-sm">Create your unique QR code instantly</p>
          </div>

          <div className="group bg-green-50 border-2 border-green-200 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 hover:scale-105">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-100 rounded-full">
                <Link className="w-10 h-10 text-green-500" />
              </div>
            </div>
            <h3 className="font-bold text-xl mb-2 text-center text-gray-800">Step 3: Attach QR</h3>
            <p className="text-gray-600 text-center text-sm">Put the QR tag on your pet's collar</p>
          </div>

          <div className="group bg-green-50 border-2 border-green-200 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 hover:scale-105">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-100 rounded-full">
                <Phone className="w-10 h-10 text-green-500" />
              </div>
            </div>
            <h3 className="font-bold text-xl mb-2 text-center text-gray-800">Step 4: Scan & Help</h3>
            <p className="text-gray-600 text-center text-sm">Anyone can scan and contact you</p>
          </div>
        </div>
      </div>

      {/* Customize Button */}
      <div className="text-center">
        <button
          onClick={() => navigate("/generate")}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-bold text-lg"
        >
          Customize for Your Dog
          
        </button>
      </div>
    </section>
  )
}