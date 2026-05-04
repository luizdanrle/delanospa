'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  intensity?: 'low' | 'medium' | 'high'
}

export default function GlassCard({
  children,
  className,
  hover = true,
  intensity = 'medium',
}: GlassCardProps) {
  const intensityClasses = {
    low: 'bg-white/5 backdrop-blur-sm border-white/10',
    medium: 'bg-white/10 backdrop-blur-md border-white/20',
    high: 'bg-white/20 backdrop-blur-xl border-white/30',
  }

  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.02 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'relative rounded-3xl overflow-hidden',
        intensityClasses[intensity],
        'shadow-2xl shadow-black/20',
        className
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />
      
      {/* Shine effect */}
      <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/20 to-transparent rotate-45 transform translate-y-full animate-shine pointer-events-none" />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
