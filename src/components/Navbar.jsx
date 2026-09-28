import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, MessageCircle, MessageSquare, PhoneCall } from 'lucide-react'
import mainLogo from '../assets/img/3840x2160logo-optimized.png'
import LanguageSwitcher, { useLanguage } from './LanguageSwitcher'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false)
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false)
  const location = useLocation()
  // The navbar carries hand-written Thai labels (and translate="no"), so
  // Google Translate doesn't mangle menu items or product names.
  const isThai = useLanguage() === 'th'
  const t = (en, th) => (isThai ? th : en)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: t('Home', 'หน้าแรก') },
    { path: '/about', label: t('About', 'เกี่ยวกับเรา') },
    { path: '/services', label: t('Services', 'บริการ') },
    { path: '/portfolio', label: t('Case Studies', 'ผลงาน') }
  ]

  const resourcesSubmenu = [
    { path: '/resources/food-cost-calculator', label: t('Food Cost Calculator', 'คำนวณต้นทุนอาหาร') },
    { path: '/resources/profit-loss-calculator', label: t('Profit & Loss Calculator', 'คำนวณกำไรขาดทุน') },
  ]

  const softwareSubmenu = [
    { path: '/products/restaurant-pos', label: 'Restaurant POS' },
    { path: '/products/nightpulse', label: 'NightPulse' },
    { path: '/products/navigo', label: 'Navigo' },
    { path: '/products/erp-solution', label: 'ERP Solution' },
    { path: '/products/cloudscreen', label: 'CloudScreen' },
    { path: '/products/cloudeye', label: 'CloudEye' }
  ]

  const hardwareSubmenu = [
    { path: '/products/pos-machine', label: t('POS Machine', 'เครื่อง POS') },
    { path: '/products/kiosk-machine', label: t('Kiosk Machine', 'ตู้คีออสก์') },
    { path: '/products/access-gate-system', label: t('Access Gate System', 'ระบบประตูควบคุมการเข้าออก') },
    { path: '/products/printer', label: t('Printer', 'เครื่องพิมพ์') },
    { path: '/products/thermal-paper', label: t('Thermal Paper', 'กระดาษความร้อน') },
    { path: '/products/barcode-scanner', label: t('Barcode Scanner', 'เครื่องสแกนบาร์โค้ด') }
  ]

  return (
    <>
      <nav translate="no" className={`notranslate fixed w-full z-50 transition-all duration-300 ${
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
          <div className="hidden md:flex items-center space-x-5 lg:space-x-8 whitespace-nowrap">
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
                <span>{t('Products', 'สินค้า')}</span>
                <ChevronDown size={18} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-0 w-60 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-50">
                <span className="block px-4 pt-1 pb-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">{t('Software', 'ซอฟต์แวร์')}</span>
                {softwareSubmenu.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-2.5 hover:bg-orange-50 hover:text-primary transition-colors ${
                      location.pathname === item.path ? 'text-primary font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-gray-100 my-1.5" />
                <span className="block px-4 pt-1 pb-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">{t('Hardware', 'ฮาร์ดแวร์')}</span>
                {hardwareSubmenu.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-2.5 hover:bg-orange-50 hover:text-primary transition-colors ${
                      location.pathname === item.path ? 'text-primary font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/clario-ai"
              className={`font-medium transition-colors duration-300 ${
                location.pathname === '/clario-ai'
                  ? 'text-primary'
                  : 'text-white hover:text-primary'
              }`}
            >
              Clario AI
            </Link>

            {/* Resources Dropdown */}
            <div className="relative group">
              <button className={`font-medium transition-colors duration-300 flex items-center space-x-1 ${
                location.pathname.includes('/resources')
                  ? 'text-primary'
                  : 'text-white hover:text-primary'
              }`}>
                <span>{t('Resources', 'แหล่งข้อมูล')}</span>
                <ChevronDown size={18} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-50">
                {resourcesSubmenu.map((item) => (
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
              {t('Jobs/Vacancy', 'ร่วมงานกับเรา')}
            </Link>
            
            <Link
              to="/contact"
              className={`font-medium transition-colors duration-300 ${
                location.pathname === '/contact'
                  ? 'text-primary'
                  : 'text-white hover:text-primary'
              }`}
            >
              {t('Contact', 'ติดต่อเรา')}
            </Link>

            <LanguageSwitcher />

            <Link to="/contact" className="btn-primary">
              {t('Get Started', 'เริ่มต้นใช้งาน')}
            </Link>
          </div>

          {/* Mobile: language switcher + menu button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
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
              <span>{t('Products', 'สินค้า')}</span>
              <ChevronDown size={18} className={`transform transition-transform ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMobileProductsOpen && (
              <div className="bg-orange-50">
                <span className="block pt-2 pb-1 px-8 text-xs font-bold uppercase tracking-wider text-gray-400">{t('Software', 'ซอฟต์แวร์')}</span>
                {softwareSubmenu.map((item) => (
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
                <span className="block pt-2 pb-1 px-8 text-xs font-bold uppercase tracking-wider text-gray-400">{t('Hardware', 'ฮาร์ดแวร์')}</span>
                {hardwareSubmenu.map((item) => (
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
              to="/clario-ai"
              onClick={() => setIsOpen(false)}
              className={`block py-3 px-4 ${
                location.pathname === '/clario-ai'
                  ? 'text-primary bg-orange-50'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Clario AI
            </Link>

            {/* Mobile Resources Menu */}
            <button
              onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
              className="w-full text-left py-3 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center justify-between font-medium"
            >
              <span>{t('Resources', 'แหล่งข้อมูล')}</span>
              <ChevronDown size={18} className={`transform transition-transform ${isMobileResourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMobileResourcesOpen && (
              <div className="bg-orange-50">
                {resourcesSubmenu.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => { setIsOpen(false); setIsMobileResourcesOpen(false) }}
                    className={`block py-3 px-8 ${
                      location.pathname === item.path ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'
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
              {t('Jobs/Vacancy', 'ร่วมงานกับเรา')}
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
              {t('Contact', 'ติดต่อเรา')}
            </Link>
            
            <div className="px-4 pt-3">
              <Link to="/contact" className="btn-primary w-full text-center block" onClick={() => setIsOpen(false)}>
                {t('Get Started', 'เริ่มต้นใช้งาน')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>

    <div translate="no" className="notranslate fixed bottom-6 right-6 z-50 flex flex-col gap-3">
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
        className="hidden md:flex items-center gap-2 rounded-full bg-emerald-500 text-white shadow-lg px-4 py-3 hover:bg-emerald-600 transition-colors"
        aria-label="Chat on LINE"
        rel="noopener noreferrer"
        target="_blank"
      >
        <MessageSquare size={18} />
        <span className="text-sm font-semibold">LINE</span>
      </a>
      <a
        href="tel:+66948712350"
        className="hidden md:flex items-center gap-2 rounded-full bg-orange-600 text-white shadow-lg px-4 py-3 hover:bg-orange-700 transition-colors"
        aria-label="Call +66 9487 12350"
      >
        <PhoneCall size={18} />
        <span className="text-sm font-semibold">{t('Call', 'โทร')}</span>
      </a>
    </div>
    </>
  )
}

export default Navbar
