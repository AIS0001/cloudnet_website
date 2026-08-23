import { motion, useReducedMotion } from 'framer-motion'

/**
 * PageTransition
 * Wraps a route's page content so navigating between routes crossfades
 * instead of hard-cutting. Paired with AnimatePresence + a
 * location.pathname key in App.jsx.
 *
 * Respects prefers-reduced-motion by rendering children unwrapped.
 */
const PageTransition = ({ children }) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return children
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
