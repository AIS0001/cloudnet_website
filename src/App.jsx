import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/animations/PageTransition'
import Home from './pages/Home'
import QuickLinksWidget from './components/QuickLinksWidget'
import MusicToggle from './components/MusicToggle'
import { StaffAuthProvider } from './context/StaffAuthContext'
import ProtectedStaffRoute from './components/staff/ProtectedStaffRoute'

// Route-level code splitting: only the homepage (and its animation
// components) load eagerly. Every other page is fetched on demand,
// so visitors browsing a single product page never pay for the rest
// of the site's JS.
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Contact = lazy(() => import('./pages/Contact'))
const Products = lazy(() => import('./pages/Products'))
const RestaurantPOS = lazy(() => import('./pages/RestaurantPOS'))
const NightPulse = lazy(() => import('./pages/NightPulse'))
const Navigo = lazy(() => import('./pages/Navigo'))
const ERPSolution = lazy(() => import('./pages/ERPSolution'))
const ThermalPaper = lazy(() => import('./pages/ThermalPaper'))
const PrinterCatalog = lazy(() => import('./pages/PrinterCatalog'))
const POSMachine = lazy(() => import('./pages/POSMachine'))
const KioskMachine = lazy(() => import('./pages/KioskMachine'))
const JobsVacancy = lazy(() => import('./pages/JobsVacancy'))
const FreelancerResellerProgram = lazy(() => import('./pages/FreelancerResellerProgram'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const AccessGateSystem = lazy(() => import('./pages/AccessGateSystem'))
const FoodCostCalculator = lazy(() => import('./pages/FoodCostCalculator'))
const ProfitLossCalculator = lazy(() => import('./pages/ProfitLossCalculator'))
const CloudScreen = lazy(() => import('./pages/CloudScreen'))
const ClarioAI = lazy(() => import('./pages/ClarioAI'))
const CloudEye = lazy(() => import('./pages/CloudEye'))

const StaffLogin = lazy(() => import('./pages/staff/StaffLogin'))
const StaffDashboard = lazy(() => import('./pages/staff/StaffDashboard'))
const CustomerForm = lazy(() => import('./pages/staff/CustomerForm'))
const CustomersList = lazy(() => import('./pages/staff/CustomersList'))
const FollowUps = lazy(() => import('./pages/staff/FollowUps'))
const FollowUpReports = lazy(() => import('./pages/staff/FollowUpReports'))
const PlaceOrder = lazy(() => import('./pages/staff/PlaceOrder'))
const OrdersList = lazy(() => import('./pages/staff/OrdersList'))
const TeamManagement = lazy(() => import('./pages/staff/TeamManagement'))
const ChangePassword = lazy(() => import('./pages/staff/ChangePassword'))

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
  </div>
)

// Wraps every route element so navigating between pages crossfades
// instead of hard-cutting. Keying <Routes> by pathname is what lets
// AnimatePresence tell one page apart from the next.
const page = (element) => <PageTransition>{element}</PageTransition>

const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={page(<Home />)} />
        <Route path="/about" element={page(<About />)} />
        <Route path="/services" element={page(<Services />)} />
        <Route path="/portfolio" element={page(<Portfolio />)} />
        <Route path="/jobs-vacancy" element={page(<JobsVacancy />)} />
        <Route path="/contact" element={page(<Contact />)} />
        <Route path="/products" element={page(<Products />)} />
        <Route path="/products/restaurant-pos" element={page(<RestaurantPOS />)} />
        <Route path="/products/nightpulse" element={page(<NightPulse />)} />
        <Route path="/products/navigo" element={page(<Navigo />)} />
        <Route path="/products/erp-solution" element={page(<ERPSolution />)} />
        <Route path="/products/thermal-paper" element={page(<ThermalPaper />)} />
        <Route path="/products/printer" element={page(<PrinterCatalog />)} />
        <Route path="/products/pos-machine" element={page(<POSMachine />)} />
        <Route path="/products/kiosk-machine" element={page(<KioskMachine />)} />
        <Route path="/products/access-gate-system" element={page(<AccessGateSystem />)} />
        <Route path="/products/cloudscreen" element={page(<CloudScreen />)} />
        <Route path="/products/cloudeye" element={page(<CloudEye />)} />
        <Route path="/clario-ai" element={page(<ClarioAI />)} />
        <Route path="/resources/food-cost-calculator" element={page(<FoodCostCalculator />)} />
        <Route path="/resources/profit-loss-calculator" element={page(<ProfitLossCalculator />)} />
        <Route path="/freelancer-reseller-program" element={page(<FreelancerResellerProgram />)} />
        <Route path="/privacy-policy" element={page(<PrivacyPolicy />)} />

        <Route path="/staff/login" element={page(<StaffLogin />)} />
        <Route path="/staff" element={page(<ProtectedStaffRoute><StaffDashboard /></ProtectedStaffRoute>)} />
        <Route path="/staff/customers/new" element={page(<ProtectedStaffRoute><CustomerForm /></ProtectedStaffRoute>)} />
        <Route path="/staff/follow-ups" element={page(<ProtectedStaffRoute><FollowUps /></ProtectedStaffRoute>)} />
        <Route path="/staff/customers" element={page(<ProtectedStaffRoute><CustomersList /></ProtectedStaffRoute>)} />
        <Route path="/staff/orders/new" element={page(<ProtectedStaffRoute><PlaceOrder /></ProtectedStaffRoute>)} />
        <Route path="/staff/orders" element={page(<ProtectedStaffRoute><OrdersList /></ProtectedStaffRoute>)} />
        <Route path="/staff/reports/follow-ups" element={page(<ProtectedStaffRoute adminOnly><FollowUpReports /></ProtectedStaffRoute>)} />
        <Route path="/staff/team" element={page(<ProtectedStaffRoute adminOnly><TeamManagement /></ProtectedStaffRoute>)} />
        <Route path="/staff/change-password" element={page(<ProtectedStaffRoute><ChangePassword /></ProtectedStaffRoute>)} />
      </Routes>
    </AnimatePresence>
  )
}

// The staff field app has its own top bar/nav (StaffLayout) — the public
// marketing Navbar is `fixed` and overlaps it, so it's hidden on /staff/*.
const AppChrome = () => {
  const location = useLocation()
  const isStaffArea = location.pathname.startsWith('/staff')

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      {!isStaffArea && <Navbar />}
      <main className="flex-grow">
        <Suspense fallback={<RouteFallback />}>
          <AnimatedRoutes />
        </Suspense>
      </main>
      {!isStaffArea && <Footer />}
      {!isStaffArea && <QuickLinksWidget />}
      {!isStaffArea && <MusicToggle />}
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <StaffAuthProvider>
        <Router>
          <AppChrome />
        </Router>
      </StaffAuthProvider>
    </HelmetProvider>
  )
}

export default App
