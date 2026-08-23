import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, Mic, Zap, Wallet, Globe2 } from 'lucide-react'
import clarioBadge from '../../assets/img/clario-ai-badge.webp'

const FEATURES = [
  { icon: Mic, title: 'AI Assistant', desc: 'Ask about your business by voice or text, get answers from your real data.' },
  { icon: Zap, title: 'Automation', desc: 'Describe a rule in plain language - Clario handles the schedule, task, and delivery.' },
  { icon: Wallet, title: 'Usage & Credits', desc: 'Track your own AI credit balance and spend - daily, weekly, or monthly.' },
  { icon: Globe2, title: 'Multi-Language', desc: 'Talk to Clario in English, Hindi, or Thai, with multiple voice options.' }
]

/**
 * AIEngineReveal
 * The "data becomes intelligence" moment - Clario AI, the intelligence
 * engine behind CloudNet, built into every CloudNet product.
 */
const AIEngineReveal = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="max-w-5xl mx-auto text-center">
      <motion.span
        className="inline-flex items-center gap-2 bg-primary text-white text-sm font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-8"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4 }}
      >
        <Sparkles size={16} />
        The Intelligence Engine Behind CloudNet
      </motion.span>

      <motion.div
        className="relative mx-auto mb-10"
        style={{ width: 220 }}
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        <img src={clarioBadge} alt="Clario AI" className="relative w-full rounded-3xl shadow-2xl" />
      </motion.div>

      <motion.h2
        className="text-3xl md:text-5xl font-bold text-white mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        Meet <span className="text-primary">Clario AI</span>
      </motion.h2>
      <motion.p
        className="text-slate-300 text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Clario is your business's AI assistant - it watches, tracks, and automates so you spend less time
        checking dashboards and more time running things. Built by CloudNet to connect directly with every
        CloudNet product.
      </motion.p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left mb-12">
        {FEATURES.map((feature, i) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              className="bg-white/5 border border-white/10 rounded-xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : i * 0.1 }}
            >
              <Icon className="text-primary mb-3" size={22} />
              <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </motion.div>
          )
        })}
      </div>

      <Link
        to="/clario-ai"
        className="inline-flex bg-white text-slate-900 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
      >
        Meet Clario AI
      </Link>
    </div>
  )
}

export default AIEngineReveal
