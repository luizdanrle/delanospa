'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FloatingElementsProps {
  className?: string
  count?: number
}

// Deterministic pseudo-random generator for SSR consistency
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

export default function FloatingElements({ className, count = 15 }: FloatingElementsProps) {
  // Use useMemo with deterministic values based on index
  const elements = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.floor(seededRandom(i * 1) * 200) + 50,
      x: Math.floor(seededRandom(i * 2) * 100),
      y: Math.floor(seededRandom(i * 3) * 100),
      duration: Math.floor(seededRandom(i * 4) * 20) + 20,
      delay: Math.floor(seededRandom(i * 5) * 5),
      opacity: seededRandom(i * 6) * 0.08 + 0.03,
    }))
  }, [count])

  return (
    <div className={cn('fixed inset-0 overflow-hidden pointer-events-none -z-5', className)}>
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute rounded-full blur-3xl"
          style={{
            width: el.size,
            height: el.size,
            left: `${el.x}%`,
            top: `${el.y}%`,
            background: `radial-gradient(circle, rgba(168, 85, 247, ${el.opacity}) 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
