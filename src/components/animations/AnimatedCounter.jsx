import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion, animate } from 'framer-motion'

/**
 * AnimatedCounter
 * Counts up to a target value once it scrolls into view. Accepts values
 * like "150+", "99.9%", "10+" - the numeric part is parsed out and
 * animated, the prefix/suffix (like "+" or "%") is preserved as-is.
 */
const parseValue = (raw) => {
  const match = String(raw).match(/^([^\d.]*)([\d,]*\.?\d*)(.*)$/)
  if (!match) return { prefix: '', number: 0, suffix: String(raw), decimals: 0 }
  const [, prefix, numberStr, suffix] = match
  const cleanNumber = numberStr.replace(/,/g, '')
  const decimals = cleanNumber.includes('.') ? cleanNumber.split('.')[1].length : 0
  return { prefix, number: parseFloat(cleanNumber) || 0, suffix, decimals }
}

const AnimatedCounter = ({ value, duration = 1.6, className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const prefersReducedMotion = useReducedMotion()
  const { prefix, number, suffix, decimals } = parseValue(value)
  const [display, setDisplay] = useState(prefersReducedMotion ? number : 0)

  useEffect(() => {
    if (!isInView) return
    if (prefersReducedMotion) {
      setDisplay(number)
      return
    }
    const controls = animate(0, number, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v)
    })
    return () => controls.stop()
  }, [isInView, number, duration, prefersReducedMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString()}
      {suffix}
    </span>
  )
}

export default AnimatedCounter
