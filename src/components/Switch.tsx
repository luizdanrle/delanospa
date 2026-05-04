'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 'w-8 h-4',
  md: 'w-11 h-6',
  lg: 'w-14 h-8',
}

const thumbSizes = {
  sm: 'w-3 h-3',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
}

const thumbPositions = {
  sm: 4,
  md: 6,
  lg: 8,
}

export default function Switch({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  className,
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={cn(
        'relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-950',
        sizes[size],
        checked ? 'bg-purple-500' : 'bg-slate-700',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={cn(
          'absolute left-0.5 bg-white rounded-full shadow-sm',
          thumbSizes[size]
        )}
        animate={{
          x: checked ? thumbPositions[size] : 0,
        }}
      />
    </button>
  )
}
