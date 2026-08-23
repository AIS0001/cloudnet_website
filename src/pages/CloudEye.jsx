import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ScanEye,
  Camera,
  Users,
  Car,
  Layers,
  BellRing,
  MapPin,
  TrendingUp,
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
import PhoneMockup from '../components/cloudnet/PhoneMockup'
import AIEngineConnect from '../components/cloudnet/AIEngineConnect'
import screenDashboard from '../assets/img/cloudeye-app/screen-dashboard.webp'
import screenLiveView from '../assets/img/cloudeye-app/screen-liveview.webp'
import screenReports from '../assets/img/cloudeye-app/screen-reports.webp'

const DETECTION_TYPES = [
  { icon: Users, label: 'People', desc: 'Person-class detection events, de-duplicated into unique visitor counts.' },
  { icon: Car, label: 'Vehicles', desc: 'Cars, trucks, buses, motorcycles, and bicycles - classified automatically.' },
  { icon: Layers, label: 'Other', desc: 'Everything outside those two categories, still tracked and reported.' }
]

const CAPABILITIES = [
  { icon: Camera, title: 'Multi-Camera, Multi-Site', desc: 'Connect every camera across every location into one dashboard.' },
  { icon: ScanEye, title: 'Live Monitoring', desc: 'Watch every camera feed live, with real-time occupancy counts overlaid.' },
  { icon: BellRing, title: 'Real-Time Alerts', desc: 'Get notified the moment an alert rule triggers on any camera.' },
  { icon: TrendingUp, title: 'Marketing-Ready Reports', desc: 'Footfall and vehicle trends you can act on - by hour, camera, or site.' }
]

const AI_BENEFITS = [
  { icon: LineChart, title: 'Footfall Forecasting', desc: 'Predict busy hours and staff or promote accordingly.' },
  { icon: BrainCircuit, title: 'Smart Marketing Insights', desc: 'AI turns raw counts into plain-language traffic patterns.' },
  { icon: ShieldAlert, title: 'Anomaly Alerts', desc: 'Flags unusual traffic spikes or drops the moment they happen.' },
  { icon: MessagesSquare, title: 'AI Chat Insights', desc: 'Ask about foot traffic trends, get instant plain-language answers.' }
]

const CloudEye = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div>
      <Helmet>
        <title>CloudEye - AI People & Vehicle Traffic Counting | CloudNet</title>
        <meta name="description" content="CloudEye by CloudNet - AI-powered people and vehicle traffic counting from your live camera streams. Turn footfall into marketing analysis with real-time detection, unique visitor tracking, and reports." />
        <meta name="keywords" content="CloudEye, foot traffic counting, people counting, vehicle counting, camera analytics, footfall analysis, marketing analytics, AI camera detection" />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/products/cloudeye" />
        <meta property="og:title" content="CloudEye - AI People & Vehicle Traffic Counting" />
        <meta property="og:description" content="Detect. Count. Insight. Turn your existing cameras into a live footfall and traffic analytics platform." />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/products/cloudeye" />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-slate-950">
        <CloudNetworkBackground density="medium" />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-slate-950 to-emerald-900/30" />
        <div className="container mx-auto px-4 relative py-28 text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            {!prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400 to-emerald-400 blur-2xl"
                animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <motion.div
              className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-emerald-500 flex items-center justify-center shadow-2xl"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <ScanEye className="text-white" size={36} />
            </motion.div>
          </div>
          <motion.span
            className="inline-flex items-center gap-2 bg-primary text-white text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Detect &bull; Count &bull; Insight
          </motion.span>
          <motion.h1
            className="text-white text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Cloud<span className="text-primary">Eye</span>
          </motion.h1>
          <motion.p
            className="text-slate-200 text-2xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Turn Your Cameras Into Foot Traffic Intelligence
          </motion.p>
          <motion.p
            className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            CloudEye counts people and vehicles live from your existing camera streams - so you know
            exactly how much footfall your location gets, for real marketing and business decisions.
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
              <span>Talk to Our Team</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Product Journey Strip */}
      <section className="py-8 bg-slate-950">
        <div className="container mx-auto px-4">
          <ProductJourney stages={['Camera Feed', 'CloudEye AI', 'Detection', 'De-duplication', 'Reports', 'Marketing Insight']} />
        </div>
      </section>

      {/* Live View */}
      <section className="relative py-24 bg-gradient-to-br from-orange-50 via-white to-amber-50 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              <motion.div
                className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center mb-6"
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <ScanEye className="text-primary" size={26} />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-5">
                Watch Every Camera, <span className="text-primary">Live</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                See every connected camera in one place, with live occupancy counts overlaid on each feed
                and an online/offline status dot so you always know what's actually reachable right now.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="right" className="order-1 lg:order-2">
              <PhoneMockup src={screenLiveView} alt="CloudEye live camera view with live people counts" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Detection totals */}
      <section className="relative py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-10 w-72 h-72 bg-teal-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <ScrollReveal direction="left">
              <PhoneMockup src={screenReports} alt="CloudEye detection reports - people, vehicles, and unique tracked counts" />
            </ScrollReveal>
            <ScrollReveal direction="right">
              <motion.div
                className="w-14 h-14 rounded-2xl bg-emerald-600/15 flex items-center justify-center mb-6"
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Layers className="text-emerald-600" size={26} />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-5">
                Every Detection, <span className="text-emerald-600">Classified</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                CloudEye separates raw detection events from de-duplicated unique counts - so if the same
                person briefly leaves view and reappears nearby, they're counted once, not repeatedly.
                That's the number that actually reflects real footfall.
              </p>
              <div className="space-y-3">
                {DETECTION_TYPES.map((type, i) => {
                  const Icon = type.icon
                  return (
                    <motion.div
                      key={type.label}
                      className="flex items-start gap-3 bg-white/80 backdrop-blur border border-emerald-100 rounded-lg px-4 py-3 shadow-sm"
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.4, delay: i * 0.12 }}
                    >
                      <Icon className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="font-semibold text-gray-900">{type.label}</p>
                        <p className="text-gray-500 text-sm">{type.desc}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="relative py-24 bg-gradient-to-br from-indigo-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute top-10 -left-16 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              <motion.div
                className="w-14 h-14 rounded-2xl bg-indigo-600/15 flex items-center justify-center mb-6"
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <MapPin className="text-indigo-600" size={26} />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-5">
                One Dashboard, <span className="text-indigo-600">Every Site</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Total and online cameras, today's detections, open alerts, and de-duplicated unique
                visitors - across every physical location you manage, all in one screen.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <AnimatedCounter value="4" className="block text-2xl font-bold text-gray-900" />
                  <span className="block text-xs text-gray-500 mt-1">Dashboard metrics</span>
                </div>
                <div>
                  <AnimatedCounter value="2" className="block text-2xl font-bold text-gray-900" />
                  <span className="block text-xs text-gray-500 mt-1">Detection classes</span>
                </div>
                <div>
                  <AnimatedCounter value="24" className="block text-2xl font-bold text-gray-900" />
                  <span className="block text-xs text-gray-500 mt-1">Hourly breakdowns</span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="order-1 lg:order-2">
              <PhoneMockup src={screenDashboard} alt="CloudEye dashboard - cameras, detections, alerts, and sites" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-orange-50/40 to-emerald-50/40 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Built for <span className="text-primary">Marketing & Operations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Know exactly how many people and vehicles pass through, so every marketing and staffing
              decision is backed by real numbers.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon
              return (
                <ScrollReveal key={cap.title} delay={i * 0.1}>
                  <motion.div
                    className="bg-white rounded-xl border-2 border-gray-100 p-6 h-full shadow-sm"
                    whileHover={{ y: -6, borderColor: '#f97316', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    transition={{ duration: 0.25 }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-orange-100 text-primary flex items-center justify-center mb-4"
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.4, delay: i * 0.1 + 0.15, ease: 'backOut' }}
                    >
                      <Icon size={22} />
                    </motion.div>
                    <h3 className="font-bold text-gray-900 mb-2">{cap.title}</h3>
                    <p className="text-gray-600 text-sm">{cap.desc}</p>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pairs with CloudScreen */}
      <section className="relative py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <ScrollReveal className="max-w-3xl mx-auto">
            <motion.div
              className="relative text-center bg-gradient-to-br from-orange-100 via-purple-50 to-emerald-100 rounded-2xl border-2 border-orange-200 p-10 overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-300/30 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-300/30 rounded-full blur-2xl pointer-events-none" />
              <h3 className="relative text-2xl md:text-3xl font-bold mb-3">
                Pairs Perfectly with <Link to="/products/cloudscreen" className="text-primary hover:underline">CloudScreen</Link>
              </h3>
              <p className="relative text-gray-600 text-lg mb-6">
                Know exactly how many people pass your digital screens with CloudEye, then use that
                footfall data to prove reach and plan your CloudScreen advertising slots.
              </p>
              <Link
                to="/products/cloudscreen"
                className="relative inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                <span>Explore CloudScreen</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Clario AI Integration Section */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <CloudNetworkBackground density="low" />
        <div className="container mx-auto px-4 relative">
          <AIEngineConnect product="CloudEye" benefits={AI_BENEFITS} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Count What Matters?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Talk to our team about connecting your cameras to CloudEye.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            <span>Contact Sales</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default CloudEye
