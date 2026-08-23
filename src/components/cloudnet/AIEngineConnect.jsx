import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import clarioBadge from '../../assets/img/clario-ai-badge.webp'
import ScrollReveal from '../animations/ScrollReveal'

/**
 * AIEngineConnect
 * Reusable "this product connects with Clario AI" section for product
 * pages. Pass `product` (display name) and `benefits` (array of
 * { icon: LucideIcon, title, desc }, ideally 4 items).
 */
const AIEngineConnect = ({ product, benefits = [] }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
      <ScrollReveal direction="left">
        <motion.img
          src={clarioBadge}
          alt="Clario AI"
          className="w-56 md:w-72 mx-auto lg:mx-0 rounded-3xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </ScrollReveal>
      <ScrollReveal direction="right" className="text-center lg:text-left">
        <span className="inline-flex items-center gap-2 bg-primary text-white text-sm font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5">
          <Sparkles size={16} />
          The Intelligence Engine Behind CloudNet
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {product} Connects with <span className="text-primary">Clario AI</span>
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          Clario AI is your business's AI assistant - it watches, tracks, and automates so you spend less
          time checking dashboards and more time running things. Ask it about {product} in plain language,
          by voice or text, and get answers straight from your real data.
        </p>
        <div className="grid sm:grid-cols-2 gap-5 text-left mb-8">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon
            return (
              <div key={benefit.title} className="flex items-start gap-3">
                <Icon className="text-primary flex-shrink-0 mt-1" size={22} />
                <div>
                  <h4 className="text-white font-semibold mb-1">{benefit.title}</h4>
                  <p className="text-gray-400 text-sm">{benefit.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
        <Link
          to="/clario-ai"
          className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          <span>Meet Clario AI</span>
          <ArrowRight size={18} />
        </Link>
      </ScrollReveal>
    </div>
  )
}

export default AIEngineConnect
