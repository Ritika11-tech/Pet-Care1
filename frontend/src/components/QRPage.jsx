import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

export default function QRPage() {
  const location = useLocation();
  const { form, image } = location.state || {};

  const qrRef = useRef();

  // Build URL for online access
  const onlineUrl = form
    ? `${window.location.origin}/pet/${encodeURIComponent(form.name)}?breed=${encodeURIComponent(form.breed)}&owner=${encodeURIComponent(form.owner)}&phone=${encodeURIComponent(form.phone)}&address=${encodeURIComponent(form.address)}&photo=${encodeURIComponent(image || "")}&vaccinated=${encodeURIComponent(form.vaccinated || "")}&lastCheckup=${encodeURIComponent(form.lastCheckup || "")}&allergies=${encodeURIComponent(form.allergies || "")}`
    : "";

  // Build offline text fallback
  const offlineText = form
    ? `
🐾 PET INFORMATION

Name: ${form.name}
Breed: ${form.breed || "N/A"}
Owner: ${form.owner || "N/A"}
Phone: ${form.phone || "N/A"}
Address: ${form.address || "N/A"}
Vaccinated: ${form.vaccinated || "N/A"}
Last Checkup: ${form.lastCheckup || "N/A"}
Allergies: ${form.allergies || "None"}

Tap URL above if online`
    : "";

  // Combine URL + text for QR (online-first, offline fallback)
  const qrData = onlineUrl + offlineText;

  // Print generated link in console for debugging
  console.log("Generated QR Link:", qrData);

  // 📥 DOWNLOAD FUNCTION (UPDATED 🔥)
  const downloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");

    const finalCanvas = document.createElement("canvas");
    const size = 320;
    finalCanvas.width = size;
    finalCanvas.height = size;

    const ctx = finalCanvas.getContext("2d");

    // WHITE BACKGROUND
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    // DRAW QR
    ctx.drawImage(canvas, 40, 20, 240, 240);

    const drawAndDownload = () => {
      // 🐶 NAME ADD
      ctx.fillStyle = "black";
      ctx.font = "bold 18px Arial";
      ctx.textAlign = "center";
      ctx.fillText(form.name.toUpperCase(), 160, 300);

      const link = document.createElement("a");
      link.href = finalCanvas.toDataURL("image/png");
      link.download = "dog-qr.png";
      link.click();
    };

    if (image) {
      const img = new Image();
      img.src = image;

      img.onload = () => {
        // DRAW IMAGE CENTER
        ctx.save();
        ctx.beginPath();
        ctx.arc(160, 140, 30, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(img, 130, 110, 60, 60);
        ctx.restore();

        drawAndDownload();
      };
    } else {
      drawAndDownload();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50 p-6">
      <h2 className="text-2xl font-bold mb-6">Your Dog QR 🐾</h2>

      <div ref={qrRef} className="relative bg-white p-6 rounded-xl shadow-md">
        <QRCodeCanvas value={qrData} size={240} level="H" />

        {image && (
          <img
            src={image}
            alt="dog"
            className="absolute top-1/2 left-1/2 w-10 h-10 rounded-full border-4 border-white bg-white
                       transform -translate-x-1/2 -translate-y-1/2"
          />
        )}
      </div>

      {/* 🐶 NAME ON SCREEN */}
      {form?.name && (
        <p className="mt-4 text-lg font-bold uppercase text-gray-800 tracking-wide">
          {form.name}
        </p>
      )}

      {/* DOWNLOAD BUTTON */}
      <button
        onClick={downloadQR}
        className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:scale-105"
      >
        Download QR 📥
      </button>
    </div>
  );
}
