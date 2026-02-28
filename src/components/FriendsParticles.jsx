import { useEffect, useRef } from 'react'

function makeBubble(width, height) {
  return {
    x: Math.random() * width,
    y: height + Math.random() * 60,
    size: Math.random() * 2.5 + 1.5,       // start small
    targetSize: Math.random() * 5 + 4,      // expand as it rises
    speedY: Math.random() * 0.5 + 0.25,
    wobblePhase: Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 0.018 + 0.008,
    wobbleAmount: Math.random() * 1.2 + 0.4,
    life: 0,                                // 0 → 1
    lifeSpeed: Math.random() * 0.0025 + 0.001,
  }
}

function bubbleOpacity(life) {
  // fade in fast, hold, fade out slowly
  if (life < 0.15) return life / 0.15
  if (life < 0.7)  return 1
  return 1 - (life - 0.7) / 0.3
}

export default function FriendsParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const bubbles = Array.from({ length: 55 }, () =>
      makeBubble(canvas.width, canvas.height)
    )

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const b of bubbles) {
        // advance life
        b.life += b.lifeSpeed
        if (b.life >= 1) {
          Object.assign(b, makeBubble(canvas.width, canvas.height))
          b.life = 0
          continue
        }

        // wobble side to side
        b.wobblePhase += b.wobbleSpeed
        const dx = Math.sin(b.wobblePhase) * b.wobbleAmount

        // gentle mouse repulsion
        const mdx = mouse.x - b.x
        const mdy = mouse.y - b.y
        const dist = Math.sqrt(mdx * mdx + mdy * mdy)
        let repelX = 0
        if (dist < 100 && dist > 0) {
          const force = (100 - dist) / 100
          repelX = -(mdx / dist) * force * 1.2
        }

        b.x += dx + repelX
        b.y -= b.speedY

        // grow as it rises
        const currentSize = b.size + (b.targetSize - b.size) * b.life

        const opacity = bubbleOpacity(b.life) * 0.28

        // draw hollow circle (steam bubble)
        ctx.beginPath()
        ctx.arc(b.x, b.y, currentSize, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 230, 200, ${opacity})`
        ctx.lineWidth = 0.8
        ctx.stroke()

        // subtle inner fill
        ctx.beginPath()
        ctx.arc(b.x, b.y, currentSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 220, 180, ${opacity * 0.35})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999 }

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
