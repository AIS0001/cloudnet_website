import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronLeft, ChevronRight, X, ShoppingCart, BookOpen, Building2, ExternalLink } from 'lucide-react'

const SECTIONS = [
  {
    title: 'Products',
    icon: ShoppingCart,
    color: 'text-orange-400',
    links: [
      { to: '/products/restaurant-pos', label: 'Restaurant POS' },
      { to: '/products/nightpulse', label: 'NightPulse (Bar & Club)' },
      { to: '/products/erp-solution', label: 'ERP Solution' },
      { to: '/products/pos-machine', label: 'POS Machine' },
      { to: '/products/kiosk-machine', label: 'Kiosk Machine' },
      { to: '/products/access-gate-system', label: 'Access Gate System' },
      { to: '/products/printer', label: 'Printer' },
      { to: '/products/thermal-paper', label: 'Thermal Paper' },
    ],
  },
  {
    title: 'Resources',
    icon: BookOpen,
    color: 'text-emerald-400',
    links: [
      { to: '/resources/food-cost-calculator', label: 'Food Cost Calculator' },
      { to: '/resources/profit-loss-calculator', label: 'Profit & Loss Calculator' },
    ],
  },
  {
    title: 'Company',
    icon: Building2,
    color: 'text-blue-400',
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/services', label: 'Services' },
      { to: '/portfolio', label: 'Case Studies' },
      { to: '/jobs-vacancy', label: 'Jobs & Vacancy' },
      { to: '/freelancer-reseller-program', label: 'Reseller Program' },
      { to: '/contact', label: 'Contact Us' },
    ],
  },
]

const QuickLinksWidget = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center">
      {/* Slide-out panel */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? 'w-56 opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <div className="bg-white rounded-l-2xl shadow-2xl border border-gray-100 w-56 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-tl-2xl">
            <span className="text-sm font-bold text-gray-800">Quick Navigate</span>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Close quick links"
            >
              <X size={16} />
            </button>
          </div>
          <div className="py-2">
            {SECTIONS.map((section) => {
              const Icon = section.icon
              return (
                <div key={section.title} className="mb-1">
                  <div className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider ${section.color}`}>
                    <Icon size={12} />
                    <span>{section.title}</span>
                  </div>
                  {section.links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                        location.pathname === link.to
                          ? 'text-primary bg-orange-50 font-semibold'
                          : 'text-gray-600 hover:text-primary hover:bg-orange-50'
                      }`}
                    >
                      <span>{link.label}</span>
                      {location.pathname === link.to && (
                        <ExternalLink size={11} className="text-primary" />
                      )}
                    </Link>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tab handle */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close quick links' : 'Open quick links'}
        className="flex flex-col items-center justify-center gap-1 bg-primary text-white px-1.5 py-5 rounded-l-xl shadow-lg hover:bg-primary/90 transition-colors"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="text-xs font-bold tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.15em' }}>
          QUICK LINKS
        </span>
        <span className="mt-2" style={{ writingMode: 'horizontal-tb' }}>
          {open ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </span>
      </button>
    </div>
  )
}

export default QuickLinksWidget
