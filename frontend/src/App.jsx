import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import Solution from './sections/Solution'
import Features from './sections/Features'
import Innovation from './sections/Innovation'
import Impact from './sections/Impact'
import FutureScope from './sections/FutureScope'
import Footer from './sections/Footer'

import DogDetails from './components/DogDetails'
import HowQR from './components/howQR'

import QRCodeGenerator from "./components/QRCodeGenerator"
import HowItWorks from './components/HowItWorks'

import { BrowserRouter, Routes, Route } from "react-router-dom"

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
     
    </>
  )
}

function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen bg-pastel-cream overflow-x-hidden">
        <Navbar />

        <Routes>
          {/* ✅ HOME PAGE */}
          <Route path="/" element={<HomePage />} />

          {/* ✅ FORM PAGE */}
          <Route path="/generate" element={<QRCodeGenerator />} />

          {/* ✅ DOG DETAILS */}
          <Route path="/dog" element={<DogDetails />} />
        </Routes>

        <Footer />
      </div>

    </BrowserRouter>
  )
}

export default App