'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface WarpBackgroundProps {
  className?: string
}

export default function WarpBackground({ className }: WarpBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const draw = () => {
      time += 0.005

      // Create warp effect
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      )

      gradient.addColorStop(0, 'rgba(15, 23, 42, 1)')
      gradient.addColorStop(0.5, `rgba(88, 28, 135, ${0.1 + Math.sin(time) * 0.05})`)
      gradient.addColorStop(1, 'rgba(15, 23, 42, 1)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw warp lines
      ctx.strokeStyle = `rgba(168, 85, 247, ${0.1 + Math.sin(time * 2) * 0.05})`
      ctx.lineWidth = 1

      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2 + time
        const x1 = canvas.width / 2 + Math.cos(angle) * 50
        const y1 = canvas.height / 2 + Math.sin(angle) * 50
        const x2 = canvas.width / 2 + Math.cos(angle) * (300 + Math.sin(time + i) * 100)
        const y2 = canvas.height / 2 + Math.sin(angle) * (300 + Math.sin(time + i) * 100)

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={cn('fixed inset-0 pointer-events-none -z-20', className)}
    />
  )
}
