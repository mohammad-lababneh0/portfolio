
import { useEffect, useRef } from 'react'

function AnimatedBackground() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')

        if (!canvas || !ctx) return

        let width = 0
        let height = 0
        let animationId
        let particles = []

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)

            width = window.innerWidth
            height = window.innerHeight

            canvas.width = width * dpr
            canvas.height = height * dpr

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            const count = Math.min(
                65,
                Math.max(25, Math.floor((width * height) / 22000))
            )

            particles = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 1.7 + 0.5,
            }))
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height)

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]

                p.x += p.vx
                p.y += p.vy

                if (p.x <= 0 || p.x >= width) p.vx *= -1
                if (p.y <= 0 || p.y >= height) p.vy *= -1

                // Glowing particles
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(192, 132, 252, 0.9)'
                ctx.shadowBlur = 14
                ctx.shadowColor = '#a855f7'
                ctx.fill()
                ctx.shadowBlur = 0

                // Connections between nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const other = particles[j]
                    const dx = p.x - other.x
                    const dy = p.y - other.y
                    const distance = Math.hypot(dx, dy)

                    if (distance < 125) {
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(other.x, other.y)

                        ctx.strokeStyle = `rgba(129, 140, 248, ${
                            (1 - distance / 125) * 0.28
                        })`

                        ctx.lineWidth = 0.7
                        ctx.stroke()
                    }
                }
            }

            animationId = requestAnimationFrame(draw)
        }

        resize()
        draw()

        window.addEventListener('resize', resize)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="animated-background"
            aria-hidden="true"
        />
    )
}

export default AnimatedBackground
