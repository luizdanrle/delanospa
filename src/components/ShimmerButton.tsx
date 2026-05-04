'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ShimmerButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function ShimmerButton({ children, className, onClick }: ShimmerButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative overflow-hidden rounded-full px-8 py-4',
        'bg-slate-900 border border-slate-700',
        'text-white font-semibold',
        'group',
        className
      )}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'linear',
        }}
      />
      
      {/* Border shimmer */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
