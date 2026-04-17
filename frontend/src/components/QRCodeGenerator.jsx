import { useState } from "react"
import { QRCodeCanvas } from "qrcode.react"

export default function QRCodeGenerator() {

  const [form, setForm] = useState({
    name: "",
    breed: "",
    owner: "",
    phone: ""
  })

  const [qrData, setQrData] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const generateQR = () => {
    setQrData(JSON.stringify(form))
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50 p-6">

      {/* 🔥 CARD */}
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md 
                      transition-all duration-500 hover:scale-105 hover:shadow-2xl">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Generate QR Code 🐾
        </h2>

        {/* FORM */}
        <div className="space-y-4">

          <input 
            name="name" 
            placeholder="Dog Name" 
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          />

          <input 
            name="breed" 
            placeholder="Breed" 
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          />

          <input 
            name="owner" 
            placeholder="Owner Name" 
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          />

          <input 
            name="phone" 
            placeholder="Phone" 
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          />

          {/* BUTTON */}
          <button 
            onClick={generateQR}
            className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-3 rounded-lg 
                       shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Generate QR 🐶
          </button>

          {/* QR OUTPUT */}
          {qrData && (
            <div className="mt-6 flex flex-col items-center">

              <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition">
                <QRCodeCanvas value={qrData} size={160} />
              </div>

              <p className="text-sm text-gray-600 mt-3">
                📌 Scan this QR to help me reach home 🏠
              </p>

            </div>
          )}

        </div>

      </div>

    </section>
  )
}