import { motion, useReducedMotion } from 'framer-motion'

/**
 * ScrollReveal
 * Lightweight, reusable "reveal on scroll into view" wrapper built on
 * Framer Motion's `whileInView` (which uses IntersectionObserver under
 * the hood, so nothing animates or re-renders while off-screen).
 *
 * Respects prefers-reduced-motion: falls back to a simple opacity fade
 * with no movement.
 */
const DIRECTION_OFFSETS = {
  up: { y: 32, x: 0 },
  down: { y: -32, x: 0 },
  left: { y: 0, x: 32 },
  right: { y: 0, x: -32 },
  none: { y: 0, x: 0 }
}

const ScrollReveal = ({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  amount = 0.25,
  once = true,
  className = ''
}) => {
  const prefersReducedMotion = useReducedMotion()
  const MotionTag = motion[as] || motion.div
  const offset = DIRECTION_OFFSETS[direction] || DIRECTION_OFFSETS.up

  if (prefersReducedMotion) {
    return (
      <MotionTag
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, amount }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

export default ScrollReveal
