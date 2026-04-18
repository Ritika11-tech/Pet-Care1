import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function QRCodeGenerator() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    breed: "",
    owner: "",
    phone: "",
    address: ""
  })

  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 📸 IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(URL.createObjectURL(file))
      setFileName(file.name)
    }
  }

  // 🔥 NAVIGATE TO QR PAGE
  const generateQR = () => {
    navigate("/qr", {
      state: {
        form,
        image
      }
    })
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50 p-6">

      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          GENERATE QR CODE🐾
        </h2>

        <div className="space-y-4">

          <input name="name" placeholder="Dog Name" onChange={handleChange} className="input"/>
          <input name="breed" placeholder="Breed" onChange={handleChange} className="input"/>
          <input name="owner" placeholder="Owner Name" onChange={handleChange} className="input"/>
          <input name="phone" placeholder="Phone" onChange={handleChange} className="input"/>
          <input name="address" placeholder="Address" onChange={handleChange} className="input"/>

          {/* 🔥 UPLOAD BOX */}
          <label className="upload-box">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
              hidden
            />

            {image ? (
              <div className="file-preview-center">
                <img src={image} alt="dog" className="small-img" />

                <div className="file-info">
                  <p className="file-name">{fileName}</p>
                  <button 
                    type="button"
                    className="remove-btn"
                    onClick={(e) => {
                      e.preventDefault()
                      setImage(null)
                      setFileName("")
                    }}
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="upload-text">
                Click to Upload your dog photo 🐶
              </div>
            )}
          </label>

          <button onClick={generateQR} className="btn">
            Generate QR 🐶
          </button>

        </div>
      </div>

      {/* 🔧 COMMON STYLES */}
      <style>{`
        .input {
          width: 100%;
          padding: 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .btn {
          width: 100%;
          background: linear-gradient(to right, #f472b6, #ec4899);
          color: white;
          padding: 12px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .upload-box {
          width: 100%;
          height: 160px;
          border: 2px dashed #d1d5db;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.3s;
          background-color: #f9fafb;
          overflow: hidden;
          padding: 10px;
        }

        .upload-box:hover {
          border-color: #ec4899;
          background-color: #fff1f2;
        }

        .upload-text {
          color: #6b7280;
          font-weight: 500;
          text-align: center;
        }

        .file-preview-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
        }

        .small-img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 10px;
          border: 1px solid #ddd;
        }

        .file-info {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .file-name {
          font-size: 14px;
          color: #374151;
          text-align: center;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .remove-btn {
          background: none;
          border: none;
          color: #ef4444;
          font-size: 13px;
          cursor: pointer;
          margin-top: 2px;
        }

        .remove-btn:hover {
          text-decoration: underline;
        }
      `}</style>

    </section>
  )
}