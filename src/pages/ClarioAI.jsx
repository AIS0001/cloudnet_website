import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Mic,
  Zap,
  Wallet,
  Globe2,
  MessageSquareText,
  ArrowRight,
  ShoppingCart,
  Music2,
  Database,
  Lock,
  MonitorPlay,
  CheckCircle2
} from 'lucide-react'
import ScrollReveal from '../components/animations/ScrollReveal'
import AnimatedCounter from '../components/animations/AnimatedCounter'
import CloudNetworkBackground from '../components/cloudnet/CloudNetworkBackground'
import PhoneMockup from '../components/cloudnet/PhoneMockup'
import clarioBadge from '../assets/img/clario-ai-badge.webp'
import screenWelcome from '../assets/img/clario/screen-1.webp'
import screenLogin from '../assets/img/clario/screen-2.webp'
import screenVoiceSettings from '../assets/img/clario/screen-3.webp'
import screenListening from '../assets/img/clario/screen-4.webp'
import screenUsage from '../assets/img/clario/screen-6.webp'

const CONNECTED_PRODUCTS = [
  { icon: ShoppingCart, label: 'Restaurant POS', to: '/products/restaurant-pos' },
  { icon: Music2, label: 'NightPulse', to: '/products/nightpulse' },
  { icon: Database, label: 'ERP Solution', to: '/products/erp-solution' },
  { icon: Lock, label: 'Access Gate System', to: '/products/access-gate-system' },
  { icon: MonitorPlay, label: 'CloudScreen', to: '/products/cloudscreen' }
]

const VOICES = [
  { name: 'Mature Woman', tier: 'On this phone - free', desc: 'A calmer, measured female voice.' },
  { name: 'Casual Male', tier: 'On this phone - free', desc: 'A relaxed, friendly male voice.' },
  { name: 'Calm Deep Male', tier: 'On this phone - free', desc: 'A heavy, bass-toned, unhurried male voice.' },
  { name: 'Nova (Cloud)', tier: 'Uses AI credits', desc: 'Higher-quality listening and speech.' },
  { name: 'George (ElevenLabs Cloud)', tier: 'Uses AI credits', desc: 'Premium studio-quality voice.' }
]

const ClarioAI = () => {
  return (
    <div className="bg-slate-950">
      <Helmet>
        <title>Clario AI - The Intelligence Engine Behind CloudNet</title>
        <meta name="description" content="Clario AI is your business's AI assistant - ask about your business by voice or text and get answers from your real data, plus automation that handles the busywork. Built by CloudNet Softwares." />
        <meta name="keywords" content="Clario AI, AI assistant, business AI, voice assistant, automation, CloudNet AI" />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/clario-ai" />
        <meta property="og:title" content="Clario AI - The Intelligence Engine Behind CloudNet" />
        <meta property="og:description" content="Your business's AI assistant - watches, tracks, and automates so you spend less time checking dashboards and more time running things." />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/clario-ai" />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-950">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          src="/videos/clario-ai-reveal.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        />
        <CloudNetworkBackground density="low" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/70 to-slate-950" />
        <div className="container mx-auto px-4 relative py-32 text-center">
          <motion.div
            className="relative mx-auto mb-8"
            style={{ width: 160 }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-500/25 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <img src={clarioBadge} alt="Clario AI" className="relative w-full rounded-3xl shadow-2xl" />
          </motion.div>
          <motion.span
            className="inline-flex items-center gap-2 bg-primary text-white text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles size={14} />
            The Intelligence Engine Behind CloudNet
          </motion.span>
          <motion.h1
            className="text-white text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Clario <span className="text-primary">AI</span>
          </motion.h1>
          <motion.p
            className="text-slate-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Your business's AI assistant. It watches, tracks, and automates - so you spend less time
            checking dashboards and more time running things.
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
              <span>Get Clario AI For Your Business</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What is Clario */}
      <section className="py-24 bg-slate-950 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              <span className="text-primary text-sm font-bold uppercase tracking-wide">Welcome, gigi 👋</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-5">
                Meet Your Business's <span className="text-primary">AI Assistant</span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Clario is your business's AI assistant - it watches, tracks, and automates so you spend
                less time checking dashboards and more time running things. It's built into the CloudNet
                ecosystem, so it already understands your POS, ERP, and access data.
              </p>
              <ul className="space-y-3">
                {['AI Assistant - ask in plain language, by voice or text', 'Automation - describe a rule, Clario handles the rest', 'Usage - track your AI credit balance and spend'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal direction="right" className="order-1 lg:order-2">
              <PhoneMockup src={screenWelcome} alt="Clario AI welcome screen showing AI Assistant, Automation, and Usage" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* AI Assistant */}
      <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <ScrollReveal direction="left">
              <PhoneMockup src={screenListening} alt="Clario AI listening for a voice question" />
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-6">
                <Mic className="text-primary" size={26} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                Ask About Your Business, <span className="text-primary">In Plain Language</span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Tap the mic and ask a question - by voice or text - and get answers from your real
                business data. No dashboards to dig through, no reports to export. Just ask.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Automation */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6">
                <Zap className="text-emerald-400" size={26} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                Automation That <span className="text-primary">Just Works</span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Describe a rule in plain language and Clario handles the schedule, the task, and the
                delivery. No workflow builder, no automation platform to learn - just tell it what you want.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-slate-300 italic">
                "Email me a sales summary every Monday morning."
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="order-1 lg:order-2 flex justify-center">
              <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <MessageSquareText className="text-emerald-400 mx-auto mb-4" size={48} />
                <p className="text-white font-semibold mb-2">Automation</p>
                <p className="text-slate-400 text-sm">
                  Describe a rule in plain language and Clario handles the schedule, the task, and the delivery.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Multi-language & voice */}
      <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <ScrollReveal direction="left">
              <PhoneMockup src={screenVoiceSettings} alt="Clario AI voice settings with multiple language and voice options" />
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-6">
                <Globe2 className="text-blue-400" size={26} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                Your Language, <span className="text-primary">Your Voice</span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Clario speaks English, Hindi, and Thai, with a choice of voices - from free on-device
                voices to premium cloud voices for higher-quality listening and speech.
              </p>
              <div className="space-y-2">
                {VOICES.map((voice) => (
                  <div key={voice.name} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-2.5">
                    <div>
                      <p className="text-white text-sm font-semibold">{voice.name}</p>
                      <p className="text-slate-400 text-xs">{voice.desc}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ml-3 ${voice.tier === 'Uses AI credits' ? 'bg-primary/20 text-primary' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {voice.tier}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Usage & Credits */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mb-6">
                <Wallet className="text-primary" size={26} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                Full Transparency on <span className="text-primary">Usage</span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Your own AI credit balance - separate from every other user's, not a shared pool. Track
                what you've used today, this week, and this month, down to the question.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <AnimatedCounter value="1" className="block text-2xl font-bold text-white" />
                  <span className="block text-xs text-slate-400 mt-1">Question tracked</span>
                </div>
                <div>
                  <AnimatedCounter value="3" className="block text-2xl font-bold text-white" />
                  <span className="block text-xs text-slate-400 mt-1">Languages supported</span>
                </div>
                <div>
                  <AnimatedCounter value="5" className="block text-2xl font-bold text-white" />
                  <span className="block text-xs text-slate-400 mt-1">Voice options</span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="order-1 lg:order-2">
              <PhoneMockup src={screenUsage} alt="Clario AI credit balance and usage screen" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Works across CloudNet */}
      <section className="relative py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        <CloudNetworkBackground density="low" />
        <div className="container mx-auto px-4 relative">
          <ScrollReveal className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Works Across <span className="text-primary">Every CloudNet Product</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Clario AI is built as a shared layer across the CloudNet product line - the same assistant,
              connected to whichever products your business runs.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {CONNECTED_PRODUCTS.map((product, i) => {
              const Icon = product.icon
              return (
                <ScrollReveal key={product.label} delay={i * 0.08}>
                  <Link
                    to={product.to}
                    className="flex flex-col items-center text-center gap-3 bg-white/5 border border-white/10 rounded-xl p-5 hover:border-primary/50 transition-all duration-300 h-full"
                  >
                    <span className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-blue-300">
                      <Icon size={22} />
                    </span>
                    <span className="text-white text-sm font-semibold">{product.label}</span>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-950 border-t border-white/5">
        <div className="container mx-auto px-4">
          <ScrollReveal className="max-w-3xl mx-auto text-center">
            <PhoneMockup src={screenLogin} alt="Clario AI sign-in screen" className="mb-10 max-w-[200px]" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Put Clario AI to Work?
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Designed and developed by CloudNet Softwares Co., Ltd. Talk to our team about adding Clario
              AI to your CloudNet products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white font-semibold py-3.5 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <span>Talk to Our Team</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white hover:bg-white hover:text-slate-900 font-semibold py-3.5 px-8 rounded-lg transition-all duration-300"
              >
                Explore CloudNet Products
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

export default ClarioAI
