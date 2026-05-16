import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, MessageCircle, MessageSquare, PhoneCall } from 'lucide-react'
import mainLogo from '../assets/img/3840x2160logo-optimized.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Case Studies' }
  ]

  const productSubmenu = [
    { path: '/products/restaurant-pos', label: 'Restaurant POS' },
    { path: '/products/erp-solution', label: 'ERP Solution' },
    { path: '/products/thermal-paper', label: 'Thermal Paper' },
    { path: '/products/printer', label: 'Printer' },
    { path: '/products/pos-machine', label: 'POS Machine' },
    { path: '/products/kiosk-machine', label: 'Kiosk Machine' },
    { path: '/products/barcode-scanner', label: 'Barcode Scanner' }
  ]

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black shadow-lg py-4' : 'bg-black py-6'
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={mainLogo}
              alt="CloudNet Softwares"
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-white hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Products Dropdown */}
            <div className="relative group">
              <button className={`font-medium transition-colors duration-300 flex items-center space-x-1 ${
                location.pathname.includes('/products')
                  ? 'text-primary'
                  : 'text-white hover:text-primary'
              }`}>
                <span>Products</span>
                <ChevronDown size={18} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-50">
                {productSubmenu.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-3 hover:bg-orange-50 hover:text-primary transition-colors ${
                      location.pathname === item.path ? 'text-primary font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/jobs-vacancy"
              className={`font-medium transition-colors duration-300 ${
                location.pathname === '/jobs-vacancy'
                  ? 'text-primary'
                  : 'text-white hover:text-primary'
              }`}
            >
              Jobs/Vacancy
            </Link>
            
            <Link
              to="/contact"
              className={`font-medium transition-colors duration-300 ${
                location.pathname === '/contact'
                  ? 'text-primary'
                  : 'text-white hover:text-primary'
              }`}
            >
              Contact
            </Link>

            <Link to="/contact" className="btn-primary">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 ${
                  location.pathname === link.path
                    ? 'text-primary bg-orange-50'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile Products Menu */}
            <button
              onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
              className="w-full text-left py-3 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center justify-between font-medium"
            >
              <span>Products</span>
              <ChevronDown size={18} className={`transform transition-transform ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMobileProductsOpen && (
              <div className="bg-orange-50">
                {productSubmenu.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      setIsOpen(false)
                      setIsMobileProductsOpen(false)
                    }}
                    className={`block py-3 px-8 ${
                      location.pathname === item.path
                        ? 'text-primary font-semibold'
                        : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            <Link
              to="/jobs-vacancy"
              onClick={() => setIsOpen(false)}
              className={`block py-3 px-4 ${
                location.pathname === '/jobs-vacancy'
                  ? 'text-primary bg-orange-50'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Jobs/Vacancy
            </Link>
            
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={`block py-3 px-4 ${
                location.pathname === '/contact'
                  ? 'text-primary bg-orange-50'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Contact
            </Link>
            
            <div className="px-4 pt-3">
              <Link to="/contact" className="btn-primary w-full text-center block" onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>

    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href="https://wa.me/66948712350"
        className="flex items-center gap-2 rounded-full bg-green-600 text-white shadow-lg px-4 py-3 hover:bg-green-700 transition-colors"
        aria-label="Chat on WhatsApp"
        rel="noopener noreferrer"
        target="_blank"
      >
        <MessageCircle size={18} />
        <span className="text-sm font-semibold">WhatsApp</span>
      </a>
      <a
        href="https://line.me/R/ti/p/@540krqkm"
        className="flex items-center gap-2 rounded-full bg-emerald-500 text-white shadow-lg px-4 py-3 hover:bg-emerald-600 transition-colors"
        aria-label="Chat on LINE"
        rel="noopener noreferrer"
        target="_blank"
      >
        <MessageSquare size={18} />
        <span className="text-sm font-semibold">LINE</span>
      </a>
      <a
        href="tel:+66948712350"
        className="flex items-center gap-2 rounded-full bg-orange-600 text-white shadow-lg px-4 py-3 hover:bg-orange-700 transition-colors"
        aria-label="Call +66 9487 12350"
      >
        <PhoneCall size={18} />
        <span className="text-sm font-semibold">Call</span>
      </a>
    </div>
    </>
  )
}

export default Navbar
