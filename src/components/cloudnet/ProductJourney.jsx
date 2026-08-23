import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/**
 * ProductJourney
 * Compact "how this product turns activity into growth" flow strip,
 * used near the top of each product page. Wraps on mobile instead of
 * scrolling horizontally.
 *
 * Usage: <ProductJourney stages={['Orders', 'KOT', 'Billing', 'Inventory', 'Sales', 'Insights']} />
 */
const ProductJourney = ({ stages = [], className = '' }) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 md:gap-3 ${className}`}>
      {stages.map((stage, i) => (
        <motion.div
          key={stage}
          className="flex items-center gap-2 md:gap-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : i * 0.08 }}
        >
          <span className="bg-white/10 border border-white/15 text-white text-xs md:text-sm font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-full whitespace-nowrap">
            {stage}
          </span>
          {i < stages.length - 1 && (
            <ArrowRight size={16} className="text-primary flex-shrink-0" />
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default ProductJourney
