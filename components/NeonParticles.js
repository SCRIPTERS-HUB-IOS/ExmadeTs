import React, { useEffect, useRef } from 'react'

/**
 * NeonParticles
 * - Lightweight particle system using requestAnimationFrame
 * - Accepts props for color theme and intensity
 *
 * Edge cases handled:
 * - Resizes canvas on container resize / DPR changes
 * - Cancels animation on unmount
 * - Limits particle count by screen size for performance
 */

export default function NeonParticles({
  color = '255,0,0',       // RGB string
  particleCount = 80,     // base particle count
  maxSize = 2.6,          // max particle radius
  speed = 0.6,            // base speed multiplier
  opacity = 0.9
}) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const particlesRef = useRef([])
  const lastTimeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let dpr = Math.max(1, window.devicePixelRatio || 1)

    function resize() {
      dpr = Math.max(1, window.devicePixelRatio || 1)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParticles()
    }

    function rand(min, max) {
      return Math.random() * (max - min) + min
    }

    function initParticles() {
      const rect = canvas.getBoundingClientRect()
      const areaFactor = (rect.width * rect.height) / (1280 * 720)
      const count = Math.max(12, Math.round(particleCount * Math.min(2.2, Math.max(0.6, areaFactor))))
      particlesRef.current = []
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: rand(0, rect.width),
          y: rand(0, rect.height),
          r: rand(0.4, maxSize),
          vx: rand(-speed, speed),
          vy: rand(-speed, speed),
          hue: rand(0, 360),
          life: rand(0.6, 1),
          blink: Math.random() > 0.8 ? rand(0.05, 0.2) : 0
        })
      }
    }

    function drawParticles(delta) {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)
      // subtle background glow to simulate neon fog
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      particlesRef.current.forEach(p => {
        // move
        p.x += p.vx * (delta * 0.06)
        p.y += p.vy * (delta * 0.06)

        // bounce edges
        if (p.x < -10) p.x = rect.width + 10
        if (p.x > rect.width + 10) p.x = -10
        if (p.y < -10) p.y = rect.height + 10
        if (p.y > rect.height + 10) p.y = -10

        // blink pulse
        const pulse = p.blink ? (Math.sin(Date.now() * p.blink) * 0.5 + 0.5) : 1
        const alpha = opacity * p.life * pulse

        // neon glow: draw multiple blur rings
        for (let i = 0; i < 3; i++) {
          const factor = 1 + i * 1.8
          ctx.beginPath()
          ctx.fillStyle = `rgba(${color},${alpha * (0.18 / (i + 1))})`
          ctx.shadowBlur = 12 * factor
          ctx.shadowColor = `rgba(${color},${alpha * 0.8})`
          ctx.arc(p.x, p.y, p.r * factor, 0, Math.PI * 2)
          ctx.fill()
        }
      })
      ctx.restore()
    }

    function animate(t) {
      const last = lastTimeRef.current || t
      const delta = Math.min(60, t - last)
      lastTimeRef.current = t
      drawParticles(delta)
      rafRef.current = requestAnimationFrame(animate)
    }

    // init
    resize()
    window.addEventListener('resize', resize)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, particleCount, maxSize, speed, opacity])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none' // important: click-through
      }}
      aria-hidden="true"
    />
  )
}
