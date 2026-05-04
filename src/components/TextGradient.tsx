'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextGradientProps {
  children: React.ReactNode
  className?: string
  animate?: boolean
  colors?: string[]
}

export default function TextGradient({
  children,
  className,
  animate = true,
  colors = ['#a855f7', '#ec4899', '#f43f5e', '#8b5cf6'],
}: TextGradientProps) {
  const gradientStyle = animate
    ? {
        backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
        backgroundSize: '300% 100%',
      }
    : {
        backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
      }

  return (
    <motion.span
      className={cn(
        'bg-clip-text text-transparent',
        className
      )}
      style={gradientStyle}
      animate={animate ? {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      } : undefined}
      transition={animate ? {
        duration: 5,
        repeat: Infinity,
        ease: 'linear',
      } : undefined}
    >
      {children}
    </motion.span>
  )
}
