import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Cloud,
  ShoppingCart,
  Music2,
  Database,
  MonitorPlay,
  Sparkles,
  Lock,
  CreditCard
} from 'lucide-react'
import CloudNetworkBackground from './cloudnet/CloudNetworkBackground'
import clarioBadge from '../assets/img/clario-ai-badge.webp'

// One consistent template for every slide - each one answers "what does
// CloudNet actually do here?" in a single line, and links to the real
// page for that product so the slide isn't just decoration.
const HERO_SLIDES = [
  {
    kicker: 'Welcome to CloudNet Softwares',
    title: 'Connected Software for Every Business',
    description: 'We build cloud-based POS, ERP, access control, digital signage, and AI tools that run your business - and talk to each other.',
    points: ['POS & ERP systems', 'Access & hardware', 'AI-powered insights'],
    icon: Cloud,
    accent: 'from-blue-600 via-indigo-600 to-purple-600',
    to: '/products',
    cta: 'Explore All Products',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&h=1080&q=80'
  },
  {
    kicker: 'Restaurant POS',
    title: 'ChefMate POS Systems',
    description: 'Dine-in, takeaway, kitchen display, billing, and inventory - one fast POS platform built for restaurants and cafes.',
    points: ['Order & kitchen sync', 'Table management', '20+ live reports'],
    icon: ShoppingCart,
    accent: 'from-orange-600 via-amber-500 to-orange-700',
    to: '/products/restaurant-pos',
    cta: 'Explore Restaurant POS',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&h=1080&q=80'
  },
  {
    kicker: 'Cafes, Bars, Clubs & Karaoke',
    title: 'NightPulse POS Systems',
    description: 'From a single small cafe to a multi-location nightlife chain - billing, rooms, inventory, and Kayotee commissions in one platform.',
    points: ['Room & table management', 'Kayotee commissions', 'Manager & POS apps'],
    icon: Music2,
    accent: 'from-fuchsia-600 via-purple-600 to-indigo-700',
    to: '/products/nightpulse',
    cta: 'Explore NightPulse',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&h=1080&q=80'
  },
  {
    kicker: 'Enterprise Resource Planning',
    title: 'CloudNet ERP Solution',
    description: 'Unify inventory, finance, supply chain, and reporting into one cloud platform that scales from startup to enterprise.',
    points: ['Inventory & finance', 'Supply chain tools', 'Real-time analytics'],
    icon: Database,
    accent: 'from-blue-700 via-blue-600 to-cyan-600',
    to: '/products/erp-solution',
    cta: 'Explore CloudNet ERP',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&h=1080&q=80'
  },
  {
    kicker: 'New: Digital Advertising',
    title: 'CloudScreen Displays',
    description: 'Turn LED and digital screens into a managed ad network - sell time slots, run event packages, and manage every screen remotely.',
    points: ['Prime-time ad slots', 'Event & occasion packages', 'Remote screen management'],
    icon: MonitorPlay,
    accent: 'from-purple-700 via-fuchsia-600 to-orange-500',
    to: '/products/cloudscreen',
    cta: 'Explore CloudScreen',
    image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=1920&h=1080&q=80'
  },
  {
    kicker: 'Your AI Business Assistant',
    title: 'Clario AI',
    description: 'Ask about your business in plain language and get answers from your real data - plus automation that handles the busywork for you.',
    points: ['Voice & text AI assistant', 'Plain-language automation', 'Works across CloudNet apps'],
    icon: Sparkles,
    accent: 'from-slate-800 via-blue-700 to-orange-500',
    to: '/clario-ai',
    cta: 'Meet Clario AI',
    badgeImage: clarioBadge,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&h=1080&q=80'
  },
  {
    kicker: 'Access Control',
    title: 'Smart Gate Access System',
    description: 'Cloud-based, centralized entry and exit control with face recognition, RFID cards, and QR codes - manage every gate from anywhere.',
    points: ['Face recognition entry', 'RFID & QR access', 'One cloud dashboard'],
    icon: Lock,
    accent: 'from-teal-700 via-emerald-600 to-teal-500',
    to: '/products/access-gate-system',
    cta: 'Explore Access Gate System',
    image: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=1920&h=1080&q=80'
  },
  {
    kicker: 'POS Hardware',
    title: 'POS & Kiosk Terminals',
    description: 'Dual-screen, single-screen, handheld, and self-service kiosk hardware - built to run CloudNet software on your counter or on the move.',
    points: ['Dual & handheld POS', 'Self-order kiosks', 'Built-in thermal printing'],
    icon: CreditCard,
    accent: 'from-slate-700 via-slate-600 to-orange-600',
    to: '/products/pos-machine',
    cta: 'Explore POS Hardware',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&h=1080&q=80'
  }
]

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-950">
      {HERO_SLIDES.map((slide, index) => {
        const Icon = slide.icon
        const isActive = index === currentSlide
        return (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden={!isActive}
          >
            {/* Per-slide photo, dimmed + tinted, with the shared network overlay on top */}
            <div className="absolute inset-0 bg-slate-950">
              {slide.image && (
                <img
                  src={slide.image}
                  alt=""
                  className="w-full h-full object-cover opacity-30"
                />
              )}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.accent} opacity-60 mix-blend-multiply`} />
              <CloudNetworkBackground density="medium" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/60" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-center text-center px-4">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur text-white text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-6">
                  {slide.kicker}
                </span>

                <div className="flex justify-center mb-6">
                  {slide.badgeImage ? (
                    <img src={slide.badgeImage} alt="" className="w-20 h-20 md:w-24 md:h-24 rounded-2xl shadow-2xl" />
                  ) : (
                    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${slide.accent} flex items-center justify-center shadow-2xl`}>
                      <Icon className="text-white" size={36} />
                    </div>
                  )}
                </div>

                <h1 className="text-white text-4xl md:text-6xl font-bold mb-5">
                  {slide.title}
                </h1>
                <p className="text-slate-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                  {slide.description}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-9">
                  {slide.points.map((point) => (
                    <span
                      key={point}
                      className="bg-white/10 border border-white/15 text-white text-xs md:text-sm font-medium px-3 py-1.5 rounded-full"
                    >
                      {point}
                    </span>
                  ))}
                </div>

                <Link
                  to={slide.to}
                  className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-gray-100 font-semibold py-3.5 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  <span>{slide.cta}</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        )
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.title}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide: ${slide.title}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/40 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSlider
