'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingStarsProps {
  rating?: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onRate?: (rating: number) => void
  showValue?: boolean
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
}

export default function RatingStars({
  rating = 0,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRate,
  showValue = false,
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0)
  const [currentRating, setCurrentRating] = useState(rating)

  const displayRating = hoverRating || currentRating

  const handleClick = (index: number) => {
    if (!interactive) return
    const newRating = index + 1
    setCurrentRating(newRating)
    onRate?.(newRating)
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[...Array(maxRating)].map((_, index) => {
          const filled = index < displayRating
          const isHalf = displayRating % 1 !== 0 && index === Math.floor(displayRating)

          return (
            <motion.button
              key={index}
              type="button"
              disabled={!interactive}
              whileHover={interactive ? { scale: 1.2 } : undefined}
              whileTap={interactive ? { scale: 0.9 } : undefined}
              onClick={() => handleClick(index)}
              onMouseEnter={() => interactive && setHoverRating(index + 1)}
              onMouseLeave={() => interactive && setHoverRating(0)}
              className={cn(
                'transition-colors',
                interactive ? 'cursor-pointer' : 'cursor-default',
                filled ? 'text-amber-400' : 'text-slate-700'
              )}
            >
              <Star
                className={cn(sizes[size], filled && 'fill-current')}
                strokeWidth={1.5}
              />
            </motion.button>
          )
        })}
      </div>
      {showValue && (
        <span className="ml-2 text-sm font-medium text-slate-400">
          {currentRating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
