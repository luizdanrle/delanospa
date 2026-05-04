'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  progress: number
  total?: number
  current?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'gradient' | 'steps'
  showPercentage?: boolean
  className?: string
}

export default function ProgressBar({
  progress,
  total = 100,
  current,
  size = 'md',
  variant = 'default',
  showPercentage = true,
  className,
}: ProgressBarProps) {
  const percentage = current !== undefined ? (current / total) * 100 : progress
  const clampedPercentage = Math.min(100, Math.max(0, percentage))

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between mb-2">
        {showPercentage && (
          <span className="text-sm font-medium text-slate-400">
            {Math.round(clampedPercentage)}%
          </span>
        )}
        {current !== undefined && (
          <span className="text-sm text-slate-500">
            {current} / {total}
          </span>
        )}
      </div>

      <div className={cn('w-full bg-slate-800 rounded-full overflow-hidden', heights[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedPercentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn(
            'h-full rounded-full',
            variant === 'gradient' && 'bg-gradient-to-r from-purple-500 to-pink-500',
            variant === 'default' && 'bg-purple-500',
            variant === 'steps' && 'bg-amber-500'
          )}
        />
      </div>

      {variant === 'steps' && total > 0 && (
        <div className="flex justify-between mt-2">
          {[...Array(total)].map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-2 h-2 rounded-full',
                i < (current || 0) ? 'bg-amber-500' : 'bg-slate-800'
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
