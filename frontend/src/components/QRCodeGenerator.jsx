import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function QRCodeGenerator() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    breed: "",
    owner: "",
    phone: "",
    address: "",
    vaccinated: "",
    allergies: "",
    lastCheckup: ""
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-20 sm:pt-24">
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 sm:p-6">
        <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-800">
           FILL IT ONCE ,SCAT IT ANYTIME 
          </h2>

          <div className="space-y-3 sm:space-y-4">
            <input 
              name="name" 
              placeholder="Dog Name" 
              onChange={handleChange} 
              className="input"
            />
            <input 
              name="breed" 
              placeholder="Breed" 
              onChange={handleChange} 
              className="input"
            />
            <input 
              name="owner" 
              placeholder="Owner Name" 
              onChange={handleChange} 
              className="input"
            />
            <input 
              name="phone" 
              placeholder="Phone or Email" 
              onChange={handleChange} 
              className="input"
            />
            <input 
              name="address" 
              placeholder="Address" 
              onChange={handleChange} 
              className="input"
            />
            
            {/* VACCINATED FIELD */}
            <select 
              name="vaccinated" 
              onChange={handleChange} 
              className="input"
            >
              <option value="">Vaccinated?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            {/* ALLERGIES FIELD */}
            <textarea 
              name="allergies" 
              placeholder="Any allergies or medical conditions"
              onChange={handleChange} 
              className="input"
              style={{ height: '80px', resize: 'none' }}
            />
              <h2>Last Checkup Date:</h2>
            {/* LAST CHECKUP FIELD */}
            <input 
              name="lastCheckup" 
              placeholder="Last Checkup Date"
              type="date"
              onChange={handleChange} 
              className="input"
            />

            {/* UPLOAD BOX */}
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
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="upload-text">
                  Click to Upload your dog photo
                </div>
              )}
            </label>

          <button onClick={generateQR} className="btn">
            Generate QR 
          </button>

        </div>
      </div>
      {/* COMMON STYLES */}
      <style>{`
        .input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e7e7e7;
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.3s ease;
          background-color: #fafafa;
        }

        .input:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
          background-color: white;
        }

        .input::placeholder {
          color: #9ca3af;
        }

        .btn {
          width: 100%;
          background: linear-gradient(to right, #10b981, #059669);
          color: white;
          padding: 14px 20px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          box-shadow: 0 4px 6px rgba(16, 185, 129, 0.1);
        }

        .btn:hover {
          background: linear-gradient(to right, #059669, #047857);
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(16, 185, 129, 0.2);
        }

        .upload-box {
          width: 100%;
          height: 180px;
          border: 2px dashed #d1d5db;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background-color: #f9fafb;
          overflow: hidden;
          padding: 16px;
        }

        .upload-box:hover {
          border-color: #10b981;
          background-color: #f0fdf4;
          transform: scale(1.02);
        }

        .upload-text {
          color: #6b7280;
          font-weight: 500;
          text-align: center;
          font-size: 15px;
        }

        .file-preview-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
        }

        .small-img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 12px;
          border: 2px solid #e5e7eb;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
          font-weight: 500;
        }

        .remove-btn {
          background: none;
          border: none;
          color: #ef4444;
          font-size: 13px;
          cursor: pointer;
          margin-top: 4px;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .remove-btn:hover {
          text-decoration: underline;
          color: #dc2626;
        }

        @media (max-width: 640px) {
          .input {
            padding: 10px 14px;
            font-size: 15px;
            transition: all 0.3s ease;
            background-color: #fafafa;
          }

          .input:focus {
            outline: none;
            border-color: #10b981;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
            background-color: white;
          }

          .input::placeholder {
            color: #9ca3af;
          }

          .btn {
            width: 100%;
            background: linear-gradient(to right, #10b981, #059669);
            color: white;
            padding: 14px 20px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            box-shadow: 0 4px 6px rgba(16, 185, 129, 0.1);
          }

          .btn:hover {
            background: linear-gradient(to right, #059669, #047857);
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(16, 185, 129, 0.2);
          }

          .upload-box {
            width: 100%;
            height: 180px;
            border: 2px dashed #d1d5db;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            background-color: #f9fafb;
            overflow: hidden;
            padding: 16px;
          }

          .upload-box:hover {
            border-color: #10b981;
            background-color: #f0fdf4;
            transform: scale(1.02);
          }

          .upload-text {
            color: #6b7280;
            font-weight: 500;
            text-align: center;
            font-size: 15px;
          }

          .file-preview-center {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            width: 100%;
          }

          .small-img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 12px;
            border: 2px solid #e5e7eb;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
            font-weight: 500;
          }

          .remove-btn {
            background: none;
            border: none;
            color: #ef4444;
            font-size: 13px;
            cursor: pointer;
            margin-top: 4px;
            transition: all 0.2s ease;
            font-weight: 500;
          }

          .remove-btn:hover {
            text-decoration: underline;
            color: #dc2626;
          }

          @media (max-width: 640px) {
            .input {
              padding: 10px 14px;
              font-size: 15px;
            }
            
            .btn {
              padding: 12px 16px;
              font-size: 15px;
            }
            
            .upload-box {
              height: 160px;
              padding: 12px;
            }
            
            .small-img {
              width: 70px;
              height: 70px;
            }
          }
        `}</style>

      </div>
    </div>
  )
}