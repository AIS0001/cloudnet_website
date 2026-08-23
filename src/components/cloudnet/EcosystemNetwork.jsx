import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingCart, Music2, Database, Lock, MonitorSmartphone, CreditCard, Cloud, MonitorPlay, Sparkles, ScanEye } from 'lucide-react'

const PRODUCTS = [
  { icon: ShoppingCart, label: 'Restaurant POS', sub: 'Dine-in, KOT & billing', link: '/products/restaurant-pos' },
  { icon: Music2, label: 'NightPulse', sub: 'Cafes, bars, clubs & karaoke', link: '/products/nightpulse' },
  { icon: Database, label: 'ERP Solution', sub: 'Business operations', link: '/products/erp-solution' },
  { icon: MonitorPlay, label: 'CloudScreen', sub: 'Digital advertising displays', link: '/products/cloudscreen' },
  { icon: ScanEye, label: 'CloudEye', sub: 'AI people & vehicle counting', link: '/products/cloudeye' },
  { icon: Sparkles, label: 'Clario AI', sub: 'Your AI business assistant', link: '/clario-ai' },
  { icon: Lock, label: 'Access Gate System', sub: 'Face, RFID & QR entry', link: '/products/access-gate-system' },
  { icon: MonitorSmartphone, label: 'Kiosk Machine', sub: 'Self-order & check-in', link: '/products/kiosk-machine' },
  { icon: CreditCard, label: 'POS Machine', sub: 'Handheld & counter POS', link: '/products/pos-machine' }
]

// Evenly spaced around a circle, starting at the top (-90deg).
const nodePosition = (index, total, radius = 40) => {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  return {
    left: `${50 + radius * Math.cos(angle)}%`,
    top: `${50 + radius * Math.sin(angle)}%`
  }
}

const NodeCard = ({ product, index, delay }) => {
  const Icon = product.icon
  return (
    <Link
      to={product.link}
      className="group flex items-center gap-3 bg-slate-900/80 backdrop-blur border border-white/10 rounded-xl px-4 py-3 shadow-lg hover:border-primary/60 hover:shadow-primary/20 transition-all duration-300"
    >
      <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-blue-300 group-hover:text-primary group-hover:scale-110 transition-all duration-300">
        <Icon size={20} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-white truncate">{product.label}</span>
        <span className="block text-xs text-slate-400 truncate">{product.sub}</span>
      </span>
    </Link>
  )
}

/**
 * EcosystemNetwork
 * Desktop: a central "CloudNet Core" node with product nodes arranged
 * radially, connected by animated SVG lines that draw in on scroll.
 * Mobile: the connecting-line layout is dropped in favor of a simple
 * stacked grid (per spec: "stack ecosystem nodes" on small screens).
 */
const EcosystemNetwork = () => {
  const prefersReducedMotion = useReducedMotion()
  const total = PRODUCTS.length

  return (
    <div>
      {/* Desktop / tablet: radial network */}
      <div className="hidden md:block relative mx-auto" style={{ width: '100%', maxWidth: 780, height: 560 }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {PRODUCTS.map((_, i) => {
            const pos = nodePosition(i, total, 40)
            const x2 = parseFloat(pos.left)
            const y2 = parseFloat(pos.top)
            return (
              <motion.line
                key={i}
                x1="50"
                y1="50"
                x2={x2}
                y2={y2}
                stroke="url(#ecosystemLineGradient)"
                strokeWidth="0.35"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.3 }
                    : { duration: 0.8, delay: 0.15 * i, ease: 'easeOut' }
                }
              />
            )
          })}
          <defs>
            <linearGradient id="ecosystemLineGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>

        {/* Central node */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-2xl shadow-purple-900/50 border border-white/20 z-10"
          style={{ left: '50%', top: '50%' }}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <Cloud className="text-white mb-1" size={28} />
          <span className="text-white font-bold text-sm leading-tight text-center">CloudNet<br />Core</span>
        </motion.div>

        {/* Product nodes */}
        {PRODUCTS.map((product, i) => {
          const pos = nodePosition(i, total, 40)
          return (
            <motion.div
              key={product.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-56"
              style={pos}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.3 }
                  : { duration: 0.5, delay: 0.15 * i + 0.3, ease: 'easeOut' }
              }
            >
              <NodeCard product={product} index={i} />
            </motion.div>
          )
        })}
      </div>

      {/* Mobile: stacked grid, no absolute positioning */}
      <div className="md:hidden">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-xl border border-white/20 flex flex-col items-center justify-center">
            <Cloud className="text-white" size={22} />
          </div>
          <span className="text-white font-bold text-sm mt-2">CloudNet Core</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.06 * i }}
            >
              <NodeCard product={product} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EcosystemNetwork
