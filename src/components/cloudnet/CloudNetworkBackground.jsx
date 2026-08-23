import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * CloudNetworkBackground
 * A lightweight, ambient node/particle network rendered on a single
 * <canvas>. Deliberately avoids per-particle DOM nodes for performance.
 *
 * - Pauses its animation loop via IntersectionObserver when scrolled
 *   out of view, and on document.hidden (tab switch).
 * - Respects prefers-reduced-motion by drawing one static frame only.
 * - Particle count scales down on small viewports.
 * - Cleans up rAF, observers and listeners on unmount.
 *
 * Colors default to CloudNet's dark-journey palette (blue/purple with
 * orange accent nodes) but can be overridden.
 */
const CloudNetworkBackground = ({
  className = '',
  density = 'medium',
  colors = {
    node: 'rgba(96, 165, 250, 0.9)', // blue-400
    accentNode: 'rgba(249, 115, 22, 0.9)', // primary orange
    line: 'rgba(129, 140, 248, 0.25)', // indigo-400
    glow: 'rgba(168, 85, 247, 0.25)' // purple-500
  }
}) => {
  const canvasRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let particles = []
    let rafId = null
    let running = false
    let visible = true

    const densityDivisor = { low: 22000, medium: 14000, high: 9000 }[density] || 14000

    const countForSize = (w, h) => {
      const base = Math.round((w * h) / densityDivisor)
      const cap = w < 768 ? 22 : 60
      return Math.max(12, Math.min(base, cap))
    }

    const buildParticles = () => {
      const count = countForSize(width, height)
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() < 0.12 ? 2.4 : 1.4,
        accent: Math.random() < 0.12
      }))
    }

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildParticles()
    }

    const linkDistance = 130

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height)

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < linkDistance) {
            ctx.globalAlpha = 1 - dist / linkDistance
            ctx.strokeStyle = colors.line
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      // Nodes
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.fillStyle = p.accent ? colors.accentNode : colors.node
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const step = () => {
      if (!running) return
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      })
      drawFrame()
      rafId = requestAnimationFrame(step)
    }

    const start = () => {
      if (running) return
      running = true
      rafId = requestAnimationFrame(step)
    }

    const stop = () => {
      running = false
      if (rafId) cancelAnimationFrame(rafId)
      rafId = null
    }

    resize()

    if (prefersReducedMotion) {
      drawFrame()
    } else {
      start()
    }

    const handleResize = () => {
      resize()
      if (prefersReducedMotion) drawFrame()
    }
    window.addEventListener('resize', handleResize)

    const handleVisibility = () => {
      if (document.hidden) {
        stop()
      } else if (visible && !prefersReducedMotion) {
        start()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    let observer = null
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting
          if (prefersReducedMotion) return
          if (visible) start()
          else stop()
        },
        { threshold: 0.01 }
      )
      observer.observe(canvas)
    }

    return () => {
      stop()
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      if (observer) observer.disconnect()
    }
  }, [density, colors, prefersReducedMotion])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

export default CloudNetworkBackground
