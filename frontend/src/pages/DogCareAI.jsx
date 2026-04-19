import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';

const DogCareAI = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [detectedDisease, setDetectedDisease] = useState("");
  const [diseaseContext, setDiseaseContext] = useState("");
  const [currentSeverity, setCurrentSeverity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", text: "Upload an image first. I'll answer based on the detected disease." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [diseaseData, setDiseaseData] = useState({
    diseaseName: "---",
    confidence: "---",
    symptoms: "---",
    precautions: "---",
    remedies: "---",
    recovery: "---",
    severity: ""
  });
  const [scanData, setScanData] = useState({
    detected: "---",
    confidence: "--",
    severity: "--"
  });

  const fileInputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const API_BASE = "http://127.0.0.1:5000";

  const showErrorMsg = (message) => {
    setErrorMessage(message);
    setShowError(true);
    setTimeout(() => setShowError(false), 5000);
  };

  const handleUploadBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewSrc(event.target.result);
        setShowPreview(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!selectedFile) {
      showErrorMsg("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setScanLoading(true);

      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        showErrorMsg(data.error || "Prediction failed");
        return;
      }

      setDetectedDisease(data.predicted_class);
      setDiseaseContext(data.ollama_context || "");
      setCurrentSeverity(data.severity);

      setDiseaseData({
        diseaseName: data.predicted_class,
        confidence: `${data.confidence}%`,
        symptoms: data.symptoms.join("\n"),
        precautions: data.precautions.join("\n"),
        remedies: data.remedies.join("\n"),
        recovery: data.recovery_time,
        severity: data.severity
      });

      setScanData({
        detected: data.predicted_class,
        confidence: `${data.confidence}% Confidence`,
        severity: `Severity: ${data.severity}`
      });

      addBotMsg(`Detected disease: ${data.predicted_class}. You can now ask questions about it.`);
    } catch (err) {
      showErrorMsg("Server error: " + err.message);
    } finally {
      setScanLoading(false);
    }
  };

  const addBotMsg = (text) => {
    setChatMessages(prev => [...prev, { type: "bot", text }]);
  };

  const handleSendMsg = async () => {
    const message = chatInput.trim();
    if (!message) return;

    setChatMessages(prev => [...prev, { type: "user", text: message }]);
    setChatInput("");

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          disease: detectedDisease,
          context: diseaseContext
        })
      });

      const data = await res.json();
      setChatMessages(prev => [...prev, { type: "bot", text: data.reply || "No response" }]);
    } catch (err) {
      addBotMsg("Chat server error: " + err.message);
    }
  };

  const handleAnalyzeSymptoms = async () => {
    const checkedBoxes = document.querySelectorAll(".symptom-check:checked");
    const checkedSymptoms = Array.from(checkedBoxes).map(checkbox => checkbox.value);

    if (checkedSymptoms.length === 0) {
      showErrorMsg("Please select at least one symptom");
      return;
    }

    const symptomMessage = `I have these symptoms: ${checkedSymptoms.join(", ")}. What diseases could this be and what medications and precautions should I take?`;

    setChatMessages(prev => [...prev, { type: "user", text: "Symptoms: " + checkedSymptoms.join(", ") }]);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: symptomMessage,
          disease: detectedDisease || "symptom_check",
          context: diseaseContext
        })
      });

      const data = await res.json();
      setChatMessages(prev => [...prev, { type: "bot", text: data.reply || "No response" }]);
    } catch (err) {
      addBotMsg("Chat server error: " + err.message);
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const getSeverityClass = (severity) => {
    if (severity.toLowerCase() === "high") return "severity-high";
    if (severity.toLowerCase() === "medium") return "severity-medium";
    return "severity-low";
  };

  const styles = `
    body {
      font-family: "Inter", sans-serif;
      background: #f8fafc;
      margin: 0;
    }

    .container {
      display: flex;
      gap: 20px;
      padding: 20px 40px;
      margin-top: 80px;
    }

    .main {
      flex: 2.5;
    }

    .sidebar {
      flex: 1.2;
    }

    .card {
      background: white;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .scan-grid {
      display: flex;
      gap: 20px;
    }

    .upload-box {
      flex: 1;
      border: 2px dashed #ccc;
      padding: 40px;
      text-align: center;
      cursor: pointer;
      min-height: 280px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .upload-box span {
      color: #2563eb;
    }

    .preview {
      flex: 1;
      display: none;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      border-radius: 10px;
      min-height: 280px;
    }

    .preview.show {
      display: flex;
    }

    .preview img {
      max-width: 100%;
      max-height: 280px;
      height: auto;
      border-radius: 8px;
      object-fit: contain;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .btn-primary {
      background: #2563eb;
      color: white;
      padding: 12px;
      border: none;
      border-radius: 8px;
      margin-top: 10px;
      cursor: pointer;
    }

    .btn-primary:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .report-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin-top: 15px;
    }

    .mini-card {
      background: #f1f5f9;
      padding: 18px;
      border-radius: 10px;
      min-height: 180px;
      display: flex;
      flex-direction: column;
      line-height: 1.6;
      font-size: 14px;
    }

    .mini-card.severity-high {
      background: #fecaca;
      color: #7f1d1d;
    }

    .mini-card.severity-medium {
      background: #fef08a;
      color: #713f12;
    }

    .mini-card.severity-low {
      background: #d1fae5;
      color: #065f46;
    }

    .badge {
      padding: 6px 10px;
      border-radius: 6px;
      margin-top: 5px;
      margin-right: 8px;
      display: inline-block;
    }

    .green {
      background: #dcfce7;
      color: #166534;
    }

    .red {
      background: #fee2e2;
      color: #991b1b;
    }

    .chat {
      display: flex;
      flex-direction: column;
    }

    .messages {
      height: 300px;
      overflow-y: auto;
    }

    .msg {
      padding: 8px;
      margin: 5px 0;
      border-radius: 8px;
      white-space: pre-wrap;
      word-wrap: break-word;
      line-height: 1.6;
    }

    .user {
      background: #e0f2fe;
      text-align: right;
    }

    .bot {
      background: #dcfce7;
    }

    .chat-input {
      display: flex;
      gap: 10px;
    }

    .chat-input input {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
    }

    .chat-input button {
      background: #2563eb;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
    }

    .chat-input button:hover {
      background: #1d4ed8;
    }

    .mini-card h4 {
      margin: 0 0 10px 0;
      color: #1e293b;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid rgba(0, 0, 0, 0.1);
      padding-bottom: 8px;
    }

    .mini-card p {
      margin: 8px 0 0 0;
      font-size: 15px;
      font-weight: 500;
      line-height: 1.5;
      color: #334155;
      flex-grow: 1;
      word-break: break-word;
      white-space: pre-wrap;
    }

    .card h3 {
      margin-top: 0;
      color: #1e293b;
      font-size: 18px;
      font-weight: 600;
    }

    #errorMessage {
      background: #fee2e2;
      color: #7f1d1d;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 10px;
      display: none;
      border-left: 4px solid #dc2626;
    }

    #errorMessage.show {
      display: block;
    }

    label {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px;
      cursor: pointer;
      border-radius: 6px;
      transition: background 0.2s;
    }

    label:hover {
      background: #f1f5f9;
    }

    label input[type="checkbox"] {
      cursor: pointer;
      width: 18px;
      height: 18px;
    }

    .symptom-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin-bottom: 15px;
    }

    @media (max-width: 1024px) {
      .container {
        flex-direction: column;
        padding: 15px 20px;
      }

      .main {
        flex: 1;
      }

      .sidebar {
        flex: 1;
      }

      .report-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .scan-grid {
        flex-direction: column;
      }
    }

    @media (max-width: 768px) {
      .container {
        padding: 10px 15px;
      }

      .card {
        padding: 15px;
      }

      .report-grid {
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .mini-card {
        padding: 12px;
      }

      .mini-card h4 {
        font-size: 13px;
      }

      .mini-card p {
        font-size: 14px;
      }

      .upload-box {
        padding: 20px;
      }

      .preview img {
        max-height: 200px;
      }

      .btn-primary {
        padding: 10px;
        font-size: 14px;
        width: 100%;
      }

      .messages {
        height: 250px;
      }

      label {
        padding: 8px;
        font-size: 14px;
      }
    }

    @media (max-width: 480px) {
      .container {
        padding: 8px 12px;
      }

      .card {
        padding: 12px;
        margin-bottom: 15px;
      }

      .card h3 {
        font-size: 16px;
        margin-bottom: 10px;
      }

      .report-grid {
        gap: 10px;
      }

      .mini-card {
        padding: 10px;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <Navbar />

      <div className="container">
        <div className="main">
          <div className="card">
            <h3>Infection Image Scan</h3>

            <div className="scan-grid">
              <div className="upload-box" onClick={handleUploadBoxClick}>
                <p className="upload-title">Upload Dog Image</p>
                <p className="upload-sub">Drag & drop or <span>Browse Image</span></p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  hidden 
                  onChange={handleFileChange}
                />
              </div>

              <div className={`preview ${showPreview ? 'show' : ''}`}>
                {showPreview && <img src={previewSrc} alt="Preview" />}
              </div>
            </div>

            <button 
              className="btn-primary" 
              onClick={handleScan}
              disabled={scanLoading}
            >
              {scanLoading ? "Scanning..." : "Scan for Infections"}
            </button>
          </div>

          {showError && (
            <div id="errorMessage" className={showError ? "show" : ""}>
              {errorMessage}
            </div>
          )}

          <div className="card">
            <h3>Infection Report</h3>

            <div className="report-grid">
              <div className={`mini-card ${getSeverityClass(diseaseData.severity)}`}>
                <h4>Disease Identified</h4>
                <p>{diseaseData.diseaseName}</p>
              </div>

              <div className={`mini-card ${getSeverityClass(diseaseData.severity)}`}>
                <h4>Confidence</h4>
                <p>{diseaseData.confidence}</p>
              </div>

              <div className={`mini-card ${getSeverityClass(diseaseData.severity)}`}>
                <h4>Symptoms Observed</h4>
                <p>{diseaseData.symptoms}</p>
              </div>

              <div className={`mini-card ${getSeverityClass(diseaseData.severity)}`}>
                <h4>Precautions</h4>
                <p>{diseaseData.precautions}</p>
              </div>

              <div className={`mini-card ${getSeverityClass(diseaseData.severity)}`}>
                <h4>Remedies</h4>
                <p>{diseaseData.remedies}</p>
              </div>

              <div className={`mini-card ${getSeverityClass(diseaseData.severity)}`}>
                <h4>Recovery Time</h4>
                <p>{diseaseData.recovery}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar">
          <div className="card">
            <h3>Scan Result</h3>
            <p><strong>Detected:</strong> <span>{scanData.detected}</span></p>
            <div className="badge green">{scanData.confidence}</div>
            <div className="badge red">{scanData.severity}</div>
          </div>

          <div className="card">
            <h3>Symptom Checker</h3>
            <div className="symptom-grid">
              <label><input type="checkbox" className="symptom-check" value="Hair Loss" /> Hair Loss</label>
              <label><input type="checkbox" className="symptom-check" value="Red Patches" /> Red Patches</label>
              <label><input type="checkbox" className="symptom-check" value="Itching" /> Itching</label>
              <label><input type="checkbox" className="symptom-check" value="Swelling" /> Swelling</label>
              <label><input type="checkbox" className="symptom-check" value="Scaling" /> Scaling/Scabs</label>
              <label><input type="checkbox" className="symptom-check" value="Pus" /> Pus/Discharge</label>
              <label><input type="checkbox" className="symptom-check" value="Inflammation" /> Inflammation/Redness</label>
              <label><input type="checkbox" className="symptom-check" value="Bald Patches" /> Bald Patches</label>
            </div>
            <button className="btn-primary" onClick={handleAnalyzeSymptoms}>Analyze Symptoms</button>
          </div>

          <div className="card chat">
            <div className="messages" ref={chatBoxRef}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`msg ${msg.type}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="chat-input">
              <input 
                type="text" 
                placeholder="Ask anything..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMsg()}
              />
              <button onClick={handleSendMsg}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DogCareAI;
