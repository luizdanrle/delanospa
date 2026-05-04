'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: 'purple' | 'pink' | 'rose' | 'amber'
}

const variants = {
  purple: 'from-purple-600 to-violet-600 shadow-purple-500/50',
  pink: 'from-pink-600 to-rose-600 shadow-pink-500/50',
  rose: 'from-rose-600 to-red-600 shadow-rose-500/50',
  amber: 'from-amber-600 to-orange-600 shadow-amber-500/50',
}

export default function GlowButton({
  children,
  className,
  onClick,
  variant = 'purple',
}: GlowButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden',
        'bg-gradient-to-r',
        variants[variant],
        'transition-shadow duration-300',
        isHovered ? 'shadow-lg shadow-current' : 'shadow-md shadow-current/50',
        className
      )}
    >
      {/* Animated glow background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
        animate={{
          x: isHovered ? ['-100%', '100%'] : '-100%',
        }}
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
        }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
