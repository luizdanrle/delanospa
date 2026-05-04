'use client'

import { motion } from 'framer-motion'
import { Check, Clock, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineItem {
  id: string
  title: string
  description: string
  time: string
  status: 'completed' | 'current' | 'pending'
  icon?: React.ReactNode
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

const statusColors = {
  completed: 'bg-green-500 border-green-500',
  current: 'bg-purple-500 border-purple-500 animate-pulse',
  pending: 'bg-slate-800 border-slate-700',
}

const statusIcons = {
  completed: <Check className="w-4 h-4 text-white" />,
  current: <Clock className="w-4 h-4 text-white" />,
  pending: <Star className="w-4 h-4 text-slate-500" />,
}

export default function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Vertical Line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative flex gap-4"
          >
            {/* Icon */}
            <div
              className={cn(
                'relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                statusColors[item.status]
              )}
            >
              {item.icon || statusIcons[item.status]}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className={cn(
                  'font-medium',
                  item.status === 'pending' ? 'text-slate-500' : 'text-white'
                )}>
                  {item.title}
                </h4>
                <span className="text-xs text-slate-500">{item.time}</span>
              </div>
              <p className={cn(
                'text-sm',
                item.status === 'pending' ? 'text-slate-600' : 'text-slate-400'
              )}>
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
