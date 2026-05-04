'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface AuroraBackgroundProps {
  className?: string
}

export default function AuroraBackground({ className }: AuroraBackgroundProps) {
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
      time += 0.003

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

      // Animated aurora colors
      const hue1 = (time * 20) % 360
      const hue2 = (time * 20 + 60) % 360
      const hue3 = (time * 20 + 120) % 360

      gradient.addColorStop(0, `hsla(${hue1}, 70%, 50%, 0.15)`)
      gradient.addColorStop(0.3, `hsla(${hue2}, 60%, 45%, 0.1)`)
      gradient.addColorStop(0.6, `hsla(${hue3}, 70%, 55%, 0.08)`)
      gradient.addColorStop(1, `hsla(${(hue1 + 180) % 360}, 60%, 40%, 0.05)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add noise/grain
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 8
        data[i] = Math.max(0, Math.min(255, data[i] + noise))
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise))
      }
      ctx.putImageData(imageData, 0, 0)

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
      className={cn(
        'fixed inset-0 pointer-events-none -z-10',
        className
      )}
    />
  )
}
