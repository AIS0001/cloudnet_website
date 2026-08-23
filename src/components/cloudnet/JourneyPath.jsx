import { motion, useReducedMotion } from 'framer-motion'
import { Database, SearchCheck, Lightbulb, Compass, TrendingUp } from 'lucide-react'

const STAGES = [
  { icon: Database, title: 'Data', desc: 'Your business creates thousands of data points every day.' },
  { icon: SearchCheck, title: 'Analysis', desc: 'Clario AI understands the patterns behind them.' },
  { icon: Lightbulb, title: 'Insight', desc: 'Important business information becomes clear.' },
  { icon: Compass, title: 'Advisory', desc: 'Opportunities and problems are identified early.' },
  { icon: TrendingUp, title: 'Growth', desc: 'You make better decisions, backed by data.' }
]

/**
 * JourneyPath
 * Sequential "From Data to Decisions" stepper. A connecting line draws
 * in as each stage reveals - horizontal on desktop, vertical on mobile.
 */
const JourneyPath = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="max-w-6xl mx-auto">
      {/* Connecting line */}
      <div className="relative">
        <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-white/10" />
        <motion.div
          className="hidden md:block absolute top-8 left-0 h-px bg-gradient-to-r from-blue-400 via-purple-400 to-primary origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 1.4, ease: 'easeOut' }}
          style={{ width: '100%' }}
        />

        <div className="grid md:grid-cols-5 gap-8 md:gap-4">
          {STAGES.map((stage, i) => {
            const Icon = stage.icon
            return (
              <motion.div
                key={stage.title}
                className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : i * 0.15 }}
              >
                <span className="flex-shrink-0 w-16 h-16 rounded-full bg-slate-900 border-2 border-blue-400/40 flex items-center justify-center text-blue-300 md:mb-4 z-10 shadow-lg shadow-blue-900/30">
                  <Icon size={26} />
                </span>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">{stage.title}</h4>
                  <p className="text-slate-400 text-sm max-w-[200px]">{stage.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default JourneyPath
