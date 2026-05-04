'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HolographicCardProps {
  children: React.ReactNode
  className?: string
}

export default function HolographicCard({ children, className }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [shinePosition, setShinePosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    
    setRotation({
      x: (y - 0.5) * 20,
      y: (x - 0.5) * -20,
    })
    
    setShinePosition({
      x: x * 100,
      y: y * 100,
    })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setShinePosition({ x: 50, y: 50 })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={cn(
        'relative rounded-3xl overflow-hidden',
        className
      )}
    >
      {/* Holographic shine */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${shinePosition.x}% ${shinePosition.y}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
          mixBlendMode: 'overlay',
        }}
      />
      
      {/* Rainbow gradient overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `linear-gradient(${135 + rotation.y}deg, 
            rgba(168,85,247,0.4) 0%, 
            rgba(236,72,153,0.4) 25%, 
            rgba(244,63,94,0.4) 50%, 
            rgba(139,92,246,0.4) 75%, 
            rgba(168,85,247,0.4) 100%)`,
          mixBlendMode: 'color-dodge',
        }}
      />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
