import { useNavigate } from "react-router-dom"



export default function HowQR() {
  const navigate = useNavigate()
  return (
    <section id="qr-steps" className="py-20 text-center">

      <h2 className="text-3xl font-bold mb-10">
        How It Works 🐾
      </h2>

      <div className="grid md:grid-cols-3 gap-6 px-10">
       
        <div className="p-6 bg-white shadow rounded-xl">
          <h3 className="font-bold">1. Scan QR</h3>
          <p>Scan the QR code on dog collar</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h3 className="font-bold">2. View Details</h3>
          <p>See dog & owner information instantly</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h3 className="font-bold">3. Contact Owner</h3>
          <p>Call owner and help return dog</p>
        </div>
      

      </div>
      <br/>
      <br/>
 <button
        onClick={() => navigate("/generate")}
        className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-xl shadow"
      >
        Customize QR CODE 🐶
      </button>
    </section>
  )
}