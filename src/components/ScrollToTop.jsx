import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop
 * React Router doesn't reset scroll position on navigation by default.
 * Needed now more than ever with animated page transitions - without
 * it, a crossfade can land on a new page still scrolled halfway down.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
