'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NeonBorderProps {
  children: React.ReactNode
  className?: string
  color?: 'purple' | 'pink' | 'rose' | 'amber' | 'cyan'
  pulse?: boolean
}

const colorClasses = {
  purple: 'from-purple-500 via-violet-500 to-purple-500 shadow-purple-500/50',
  pink: 'from-pink-500 via-rose-500 to-pink-500 shadow-pink-500/50',
  rose: 'from-rose-500 via-red-500 to-rose-500 shadow-rose-500/50',
  amber: 'from-amber-500 via-orange-500 to-amber-500 shadow-amber-500/50',
  cyan: 'from-cyan-500 via-blue-500 to-cyan-500 shadow-cyan-500/50',
}

export default function NeonBorder({
  children,
  className,
  color = 'purple',
  pulse = true,
}: NeonBorderProps) {
  return (
    <div className={cn('relative group', className)}>
      {/* Animated border */}
      <motion.div
        className={cn(
          'absolute -inset-[1px] rounded-3xl bg-gradient-to-r',
          colorClasses[color],
          'opacity-75 group-hover:opacity-100 transition-opacity'
        )}
        animate={pulse ? {
          opacity: [0.5, 0.8, 0.5],
        } : undefined}
        transition={pulse ? {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        } : undefined}
      />
      
      {/* Glow effect */}
      <motion.div
        className={cn(
          'absolute -inset-4 rounded-3xl bg-gradient-to-r blur-xl',
          colorClasses[color],
          'opacity-0 group-hover:opacity-30 transition-opacity -z-10'
        )}
      />
      
      {/* Content */}
      <div className="relative rounded-3xl bg-slate-950 p-1">
        {children}
      </div>
    </div>
  )
}
