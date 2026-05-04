'use client'

import { motion } from 'framer-motion'
import { 
  Info, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  children: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

const variants = {
  info: {
    bg: 'bg-sky-500/10 border-sky-500/30',
    icon: 'text-sky-400',
    Icon: Info,
  },
  success: {
    bg: 'bg-green-500/10 border-green-500/30',
    icon: 'text-green-400',
    Icon: CheckCircle,
  },
  warning: {
    bg: 'bg-amber-500/10 border-amber-500/30',
    icon: 'text-amber-400',
    Icon: AlertTriangle,
  },
  error: {
    bg: 'bg-red-500/10 border-red-500/30',
    icon: 'text-red-400',
    Icon: XCircle,
  },
}

export default function Alert({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) {
  const { bg, icon, Icon } = variants[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        'p-4 rounded-xl border flex gap-3',
        bg,
        className
      )}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', icon)} />
      
      <div className="flex-1">
        {title && (
          <h4 className="font-medium text-white mb-1">{title}</h4>
        )}
        <div className="text-slate-300 text-sm">{children}</div>
      </div>

      {dismissible && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-slate-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </motion.div>
  )
}
