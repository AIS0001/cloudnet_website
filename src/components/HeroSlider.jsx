import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import aiEngineBanner from '../assets/img/cloudnet-ai-engine-banner.webp'

const HERO_SLIDES = [
  {
    title: 'CloudNet AI Engine',
    subtitle: 'One Smart Engine for All Your Software',
    gradient: 'from-slate-900 to-slate-700',
    image: aiEngineBanner,
    comingSoon: true
  },
  {
    title: 'VPS Hosting Solutions',
    subtitle: 'Fast, Secure, and Scalable Infrastructure',
    description: 'Cloudnet delivers high-performance VPS hosting with strong uptime, security, and flexible resources for growing businesses.',
    gradient: 'from-sky-700 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&h=1080&blend=000000&bm=multiply&balph=40'
  },
  {
    title: 'Restaurant POS System',
    subtitle: 'Faster Orders, Smoother Service',
    description: 'Manage dine-in, takeaway, billing, and kitchen workflows with a complete restaurant POS platform built for speed.',
    gradient: 'from-orange-700 to-amber-500',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1920&h=1080&blend=000000&bm=multiply&balph=40'
  },
  {
    title: 'Hotel PMS System',
    subtitle: 'Complete Front Desk Control',
    description: 'Handle reservations, check-ins, room status, and reporting through a reliable property management system for hotels.',
    gradient: 'from-emerald-700 to-teal-500',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&h=1080&blend=000000&bm=multiply&balph=40'
  },
  {
    title: 'Entertainment Venue Software',
    subtitle: 'Ticketing, Operations, and Customer Flow',
    description: 'Streamline venue operations with software for ticket sales, access control, and performance analytics.',
    gradient: 'from-fuchsia-700 to-rose-500',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&h=1080&blend=000000&bm=multiply&balph=40'
  },
  {
    title: 'Mobile App Development',
    subtitle: 'Tour & Travel, CRM, and More',
    description: 'We design and develop powerful mobile apps including Tour & Travel booking apps, CRM apps, on-demand service apps, and custom business apps for Android and iOS.',
    gradient: 'from-violet-700 to-purple-500',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1920&h=1080&blend=000000&bm=multiply&balph=40'
  },
  {
    title: 'Custom Software Solutions',
    subtitle: 'Built Around Your Business',
    description: 'From internal tools to enterprise apps, Cloudnet builds custom software tailored to your exact workflow and goals.',
    gradient: 'from-indigo-700 to-blue-500',
    image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1920&h=1080&blend=000000&bm=multiply&balph=40'
  },
  {
    title: 'Digital Marketing Services',
    subtitle: 'Reach More Customers Online',
    description: 'Grow visibility and leads through SEO, paid campaigns, social media strategy, and conversion-focused digital marketing.',
    gradient: 'from-red-700 to-orange-500',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&h=1080&blend=000000&bm=multiply&balph=40'
  },
  {
    title: 'GT81EZ Pro Mobile Terminal POS',
    subtitle: 'Handheld POS, Anywhere You Do Business',
    description: 'A compact mobile terminal with built-in printer, Android 13, 4G/WiFi, and long-lasting battery - perfect for order taking and billing on the move.',
    gradient: 'from-orange-700 to-amber-600',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&h=1080&blend=000000&bm=multiply&balph=40'
  },
  {
    title: 'GT90EZ Pro Tablet POS',
    subtitle: 'Complete POS Solution for Your Business',
    description: 'An 8" Android 13 tablet POS with built-in printer, NFC payments, and 4G/WiFi connectivity - everything you need for fast, smart checkout.',
    gradient: 'from-violet-700 to-blue-600',
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=1920&h=1080&blend=000000&bm=multiply&balph=40'
  },
  {
    title: 'Smart Gate Access System',
    subtitle: 'Secure. Smart. Connected.',
    description: 'Cloud-based centralised access control with face recognition, RFID card access, and QR code entry - manage every gate from one dashboard, anywhere.',
    gradient: 'from-teal-700 to-emerald-500',
    image: 'https://images.unsplash.com/photo-1565514020179-026b92b2d70b?auto=format&fit=crop&w=1920&h=1080&blend=000000&bm=multiply&balph=40'
  }
]

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {slide.comingSoon ? (
            <>
              {/* Full infographic banner, shown uncropped */}
              <div className="absolute inset-0 bg-slate-950 flex items-center justify-center">
                <img
                  src={slide.image}
                  alt="CloudNet AI Engine - one smart engine for all your software, coming soon"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Coming Soon ribbon + CTA, kept out of the infographic's own content */}
              <div className="relative h-full flex flex-col items-center justify-between py-8 px-4">
                <span className="inline-flex items-center gap-2 bg-primary text-white text-sm md:text-base font-bold uppercase tracking-wide px-5 py-2 rounded-full shadow-xl animate-fade-in">
                  <Sparkles size={18} />
                  Coming Soon
                </span>
                <Link
                  to="/contact"
                  className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl animate-slide-up"
                >
                  Get Notified When It Launches
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover brightness-75"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-20`}></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center justify-center text-center px-4">
                <div className="max-w-4xl">
                  <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 animate-fade-in">
                    {slide.subtitle}
                  </h2>
                  <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
                    {slide.title}
                  </h1>
                  <p className="text-white text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-slide-up">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                    <button className="bg-white text-primary hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                      Get Started
                    </button>
                    <button className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-4 px-8 rounded-lg transition-all duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSlider
