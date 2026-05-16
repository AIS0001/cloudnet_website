import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const HERO_SLIDES = [
  {
    title: 'VPS Hosting Solutions',
    subtitle: 'Fast, Secure, and Scalable Infrastructure',
    description: 'Cloudnet delivers high-performance VPS hosting with strong uptime, security, and flexible resources for growing businesses.',
    gradient: 'from-sky-700 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&h=1080&blend=000000&bm=multiply&balph=40'
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
