import { BrowserRouter as Router , Routes, Route, } from "react-router-dom"
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
 import DogProfile from './pages/DogProfile'
  import NearbyVets from './sections/NearbyVets'



function LandingPage() {
  return (
    <div className="min-h-screen bg-pastel-cream overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        
        <Features />
        <Innovation />
        <HowQR />
        <Impact />
        <FutureScope />
        <NearbyVets/>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pet/:dogId" element={<DogProfile />} /> 
        <Route path="/generate" element={<QRCodeGenerator />} />
        <Route path="/qr" element={<QRPage />} />
      </Routes>
    </Router>
  )
}

export default App 