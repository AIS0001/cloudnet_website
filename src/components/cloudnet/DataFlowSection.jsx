import { motion, useReducedMotion } from 'framer-motion'
import { ShoppingCart, Music2, Database, Lock, Server } from 'lucide-react'
import AnimatedCounter from '../animations/AnimatedCounter'

const SOURCES = [
  { icon: ShoppingCart, label: 'Restaurant POS', data: 'Sales & order data' },
  { icon: Music2, label: 'NightPulse', data: 'Venue & Kayotee data' },
  { icon: Database, label: 'ERP Solution', data: 'Inventory & finance data' },
  { icon: Lock, label: 'Access Gate System', data: 'Access & entry data' }
]

const STATS = [
  { value: '99.9%', label: 'Platform uptime' },
  { value: '20+', label: 'Report types unified' },
  { value: '24/7', label: 'Real-time sync' }
]

/**
 * DataFlowSection
 * Shows data streaming from each CloudNet product into one central
 * data layer - "your business generates data every day, CloudNet
 * brings it together."
 */
const DataFlowSection = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {SOURCES.map((source, i) => {
          const Icon = source.icon
          return (
            <motion.div
              key={source.label}
              className="relative flex items-center gap-4 bg-slate-900/70 border border-white/10 rounded-xl px-5 py-4 overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : i * 0.1 }}
            >
              <span className="flex-shrink-0 w-11 h-11 rounded-lg bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-300">
                <Icon size={20} />
              </span>
              <span>
                <span className="block text-white font-semibold text-sm">{source.label}</span>
                <span className="block text-slate-400 text-xs">{source.data}</span>
              </span>
              {!prefersReducedMotion && (
                <motion.span
                  className="absolute right-4 w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Convergence point */}
      <motion.div
        className="flex flex-col items-center mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-0.5 h-8 bg-gradient-to-b from-blue-400/60 to-purple-400/60" />
        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-primary/20 border border-white/15 rounded-full px-6 py-3 shadow-lg">
          <Server className="text-purple-300" size={22} />
          <span className="text-white font-bold">CloudNet Data Layer</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : i * 0.1 }}
          >
            <AnimatedCounter value={stat.value} className="block text-2xl md:text-3xl font-bold text-white" />
            <span className="block text-xs md:text-sm text-slate-400 mt-1">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default DataFlowSection
