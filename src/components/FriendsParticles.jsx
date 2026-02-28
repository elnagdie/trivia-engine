import { useEffect, useRef } from 'react'

const COLORS = [
  [232, 168, 48],  // warm gold
  [244, 200, 96],  // soft yellow
  [212, 120, 20],  // amber
  [200, 140, 40],  // dark gold
  [248, 180, 80],  // light amber
]

function makeParticle(width, height) {
  const [r, g, b] = COLORS[Math.floor(Math.random() * COLORS.length)]
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.8 + 0.4,
    speedY: -(Math.random() * 0.35 + 0.08),
    speedX: (Math.random() - 0.5) * 0.18,
    opacity: Math.random() * 0.45 + 0.15,
    opacityDir: Math.random() > 0.5 ? 1 : -1,
    opacitySpeed: Math.random() * 0.003 + 0.001,
    r, g, b,
  }
}

export default function FriendsParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const mouse = { x: -999, y: -999 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const particles = Array.from({ length: 70 }, () =>
      makeParticle(canvas.width, canvas.height)
    )

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        // gentle mouse repulsion
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 130) {
          const force = (130 - dist) / 130
          p.x -= dx * force * 0.018
          p.y -= dy * force * 0.018
        }

        p.x += p.speedX
        p.y += p.speedY

        // breathe opacity
        p.opacity += p.opacitySpeed * p.opacityDir
        if (p.opacity > 0.65 || p.opacity < 0.1) p.opacityDir *= -1

        // wrap
        if (p.y < -8) { p.y = canvas.height + 8; p.x = Math.random() * canvas.width }
        if (p.x < -8) p.x = canvas.width + 8
        if (p.x > canvas.width + 8) p.x = -8

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.opacity})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onMouseLeave = () => { mouse.x = -999; mouse.y = -999 }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  )
}
