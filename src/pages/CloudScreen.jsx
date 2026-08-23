import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MonitorPlay,
  MapPin,
  Target,
  UploadCloud,
  Megaphone,
  Percent,
  Clock,
  Calendar,
  Heart,
  Cake,
  Mail,
  Phone,
  ArrowRight,
  LineChart,
  BrainCircuit,
  ShieldAlert,
  MessagesSquare
} from 'lucide-react'
import ScrollReveal from '../components/animations/ScrollReveal'
import AnimatedCounter from '../components/animations/AnimatedCounter'
import CloudNetworkBackground from '../components/cloudnet/CloudNetworkBackground'
import ProductJourney from '../components/cloudnet/ProductJourney'
import AIEngineConnect from '../components/cloudnet/AIEngineConnect'

const AD_SLOTS = [
  { time: '3:00 PM – 5:00 PM', label: 'Off-Peak Slot', plays: '10 Plays Total', price: '12,000' },
  { time: '5:00 PM – 10:00 PM', label: 'Prime Time Slot', plays: '25 Plays Total', price: '20,000' },
  { time: '10:00 PM – 02:00 AM', label: 'Late Night Slot', plays: '20 Plays Total', price: '15,000' }
]

const EVENT_PACKAGES = [
  {
    icon: Calendar,
    title: 'One Day Package',
    items: ['Birthday', 'Wedding', 'Special Occasion'],
    window: '5:00 PM - 10:00 PM',
    price: '3,500'
  },
  {
    icon: Heart,
    title: 'Wedding Package',
    items: ['Wedding Ceremony', 'Reception'],
    window: 'Full Day (up to 8 hours)',
    price: '7,000'
  },
  {
    icon: Cake,
    title: 'Birthday Package',
    items: ['Birthday Party', 'Celebration'],
    window: '5:00 PM - 10:00 PM',
    price: '3,500'
  }
]

const FEATURES = [
  { icon: MapPin, label: 'High Visibility in Prime Locations' },
  { icon: Target, label: 'Targeted Audience Reach' },
  { icon: UploadCloud, label: 'Easy & Remote Management' },
  { icon: Megaphone, label: 'Boost Brand Awareness' },
  { icon: Percent, label: 'Affordable & Flexible Packages' }
]

const AI_BENEFITS = [
  { icon: LineChart, title: 'Best-Performing Slots', desc: 'See which time slots and packages drive the most engagement.' },
  { icon: BrainCircuit, title: 'Smart Scheduling', desc: 'AI suggests which slots to book based on audience patterns.' },
  { icon: ShieldAlert, title: 'Campaign Alerts', desc: 'Flags underperforming campaigns or scheduling conflicts.' },
  { icon: MessagesSquare, title: 'AI Chat Insights', desc: 'Ask about your ad performance, get instant plain-language answers.' }
]

const CloudScreen = () => {
  return (
    <div>
      <Helmet>
        <title>CloudScreen - Digital Advertising & LED Screen Management | CloudNet</title>
        <meta name="description" content="CloudScreen by CloudNet - digital advertising display network with standard time slots and event packages. Advertise smarter, reach better with remote-managed LED screens." />
        <meta name="keywords" content="CloudScreen, digital advertising, LED display, digital signage, advertising slots, event advertising, Pattaya digital ads" />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/products/cloudscreen" />
        <meta property="og:title" content="CloudScreen - Digital Advertising Display Network" />
        <meta property="og:description" content="Advertise smarter, reach better. Premium time slots and event packages on CloudNet's managed digital screen network." />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/products/cloudscreen" />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-slate-950">
        <CloudNetworkBackground density="medium" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-slate-950 to-orange-900/30" />
        <div className="container mx-auto px-4 relative py-28 text-center">
          <motion.div
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 flex items-center justify-center shadow-2xl mx-auto mb-6"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <MonitorPlay className="text-white" size={36} />
          </motion.div>
          <motion.span
            className="inline-flex items-center gap-2 bg-primary text-white text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Display. Manage. Inspire.
          </motion.span>
          <motion.h1
            className="text-white text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Cloud<span className="text-primary">Screen</span>
          </motion.h1>
          <motion.p
            className="text-slate-200 text-2xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Advertise Smarter, Reach Better
          </motion.p>
          <motion.p
            className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Premium time slots on digital LED screens to maximize your brand visibility and audience
            engagement - managed entirely from the cloud.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-gray-100 font-semibold py-3.5 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <span>Book Your Ad Slot</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Product Journey Strip */}
      <section className="py-8 bg-slate-950">
        <div className="container mx-auto px-4">
          <ProductJourney stages={['Your Ad', 'CloudScreen', 'Time Slot', 'Plays', 'Audience', 'Brand Growth']} />
        </div>
      </section>

      {/* Feature highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon
              return (
                <ScrollReveal key={feature.label} delay={i * 0.08} className="flex flex-col items-center text-center gap-3">
                  <span className="w-14 h-14 rounded-full bg-orange-100 text-primary flex items-center justify-center">
                    <Icon size={26} />
                  </span>
                  <span className="text-sm font-semibold text-gray-800">{feature.label}</span>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Standard Advertising Slots */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Standard Advertising <span className="text-primary">Slots</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Monthly advertising packages, priced by time slot</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {AD_SLOTS.map((slot, i) => (
              <ScrollReveal key={slot.time} delay={i * 0.1}>
                <div className="bg-white rounded-2xl border-2 border-gray-100 hover:border-primary shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div className="bg-gradient-to-r from-purple-600 to-orange-500 px-6 py-3">
                    <span className="text-white text-xs font-bold uppercase tracking-wide">{slot.label}</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <Clock size={16} />
                      <span className="text-sm font-medium">Time Slot</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900 mb-4">{slot.time}</p>
                    <p className="text-gray-600 mb-6">{slot.plays}</p>
                    <div className="mt-auto pt-4 border-t border-gray-100 text-center">
                      <div className="text-3xl font-extrabold text-primary">
                        ฿<AnimatedCounter value={slot.price} />
                        <span className="text-base text-gray-500 font-semibold"> / Month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Event & Special Occasion Packages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Event & Special Occasion <span className="text-primary">Packages</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Celebrate on the big screen</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {EVENT_PACKAGES.map((pkg, i) => {
              const Icon = pkg.icon
              return (
                <ScrollReveal key={pkg.title} delay={i * 0.1}>
                  <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl border-2 border-orange-100 p-6 h-full flex flex-col hover:shadow-xl transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Icon size={26} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{pkg.title}</h3>
                    <ul className="space-y-1 mb-4 flex-1">
                      {pkg.items.map((item) => (
                        <li key={item} className="text-gray-600 text-sm">• {item}</li>
                      ))}
                    </ul>
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-3">{pkg.window}</p>
                    <div className="text-2xl font-extrabold text-primary">
                      ฿<AnimatedCounter value={pkg.price} />
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pairs with CloudEye */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal className="max-w-3xl mx-auto text-center bg-gradient-to-br from-orange-50 to-emerald-50 rounded-2xl border-2 border-orange-100 p-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Pairs Perfectly with <Link to="/products/cloudeye" className="text-primary hover:underline">CloudEye</Link>
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Prove the reach of your CloudScreen ad slots with real numbers - CloudEye counts exactly how
              many people and vehicles pass your screens, live from your existing cameras.
            </p>
            <Link
              to="/products/cloudeye"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              <span>Explore CloudEye</span>
              <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Clario AI Integration Section */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <CloudNetworkBackground density="low" />
        <div className="container mx-auto px-4 relative">
          <AIEngineConnect product="CloudScreen" benefits={AI_BENEFITS} />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Advertise Smarter?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Reach out to our team to book your advertising slot or event package.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:marketing@cloudnetsoftwares.com"
              className="bg-white hover:bg-gray-100 text-primary font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              <span>marketing@cloudnetsoftwares.com</span>
            </a>
            <a
              href="tel:+66948712350"
              className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              <span>+66-948712350</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CloudScreen
