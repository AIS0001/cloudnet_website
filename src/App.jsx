import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import Products from './pages/Products'
import RestaurantPOS from './pages/RestaurantPOS'
import NightPulse from './pages/NightPulse'
import ERPSolution from './pages/ERPSolution'
import ThermalPaper from './pages/ThermalPaper'
import PrinterCatalog from './pages/PrinterCatalog'
import POSMachine from './pages/POSMachine'
import KioskMachine from './pages/KioskMachine'
import JobsVacancy from './pages/JobsVacancy'
import FreelancerResellerProgram from './pages/FreelancerResellerProgram'
import PrivacyPolicy from './pages/PrivacyPolicy'
import AccessGateSystem from './pages/AccessGateSystem'
import FoodCostCalculator from './pages/FoodCostCalculator'
import ProfitLossCalculator from './pages/ProfitLossCalculator'
import QuickLinksWidget from './components/QuickLinksWidget'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/jobs-vacancy" element={<JobsVacancy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/restaurant-pos" element={<RestaurantPOS />} />
              <Route path="/products/nightpulse" element={<NightPulse />} />
              <Route path="/products/erp-solution" element={<ERPSolution />} />
              <Route path="/products/thermal-paper" element={<ThermalPaper />} />
              <Route path="/products/printer" element={<PrinterCatalog />} />
              <Route path="/products/pos-machine" element={<POSMachine />} />
              <Route path="/products/kiosk-machine" element={<KioskMachine />} />
              <Route path="/products/access-gate-system" element={<AccessGateSystem />} />
              <Route path="/resources/food-cost-calculator" element={<FoodCostCalculator />} />
              <Route path="/resources/profit-loss-calculator" element={<ProfitLossCalculator />} />
              <Route path="/freelancer-reseller-program" element={<FreelancerResellerProgram />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </main>
          <Footer />
          <QuickLinksWidget />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App
