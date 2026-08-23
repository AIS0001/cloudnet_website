import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

/**
 * JourneyProgress
 * A thin, fixed progress line reflecting scroll position through the
 * page's journey (Cloud -> Software -> Data -> AI -> Intelligence ->
 * Growth). Purely decorative/orientational - never required to
 * understand the page, so it stays simple under reduced motion.
 */
const JourneyProgress = () => {
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = useReducedMotion()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 1000 : 120,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-primary origin-left"
        style={{ scaleX }}
      />
    </div>
  )
}

export default JourneyProgress
