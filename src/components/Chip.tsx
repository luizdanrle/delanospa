'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChipProps {
  label: string
  onRemove?: () => void
  onClick?: () => void
  selected?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  className?: string
}

export default function Chip({
  label,
  onRemove,
  onClick,
  selected = false,
  disabled = false,
  icon,
  className,
}: ChipProps) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
        selected
          ? 'bg-purple-500 text-white'
          : 'bg-slate-800 text-slate-300 hover:bg-slate-700',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {icon && <span className="text-current">{icon}</span>}
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="p-0.5 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </motion.button>
  )
}
