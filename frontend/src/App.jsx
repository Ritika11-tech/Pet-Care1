import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

import Navbar from "./components/Navbar"
import Footer from "./sections/Footer"

import Hero from "./sections/Hero"
import Problem from "./sections/Problem"
import Solution from "./sections/Solution"
import Features from "./sections/Features"
import Innovation from "./sections/Innovation"
import Impact from "./sections/Impact"
import FutureScope from "./sections/FutureScope"
import HowItWorks from "./components/HowItWorks"
import HowQR from "./components/howQR"

import DogDetails from "./components/DogDetails"
import QRCodeGenerator from "./components/QRCodeGenerator"

import QRPage from "./components/QRPage"

// 🏠 HOME PAGE
function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <Innovation />
      <HowQR />
      <Impact />
      <FutureScope />
    </>
  )
}

// 🚀 APP
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-pastel-cream overflow-x-hidden">

        <Navbar />

        <Routes>

          {/* 🏠 HOME */}
          <Route path="/" element={<HomePage />} />

          {/* 🐶 FORM PAGE */}
          <Route path="/generate" element={<QRCodeGenerator />} />
          /* 🐾 QR RESULT PAGE */  
          
          <Route path="/qr" element={<QRPage />} />


        </Routes>

        <Footer />

      </div>
    </BrowserRouter>
  )
}

export default App