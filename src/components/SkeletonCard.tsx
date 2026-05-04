'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SkeletonCardProps {
  className?: string
  rows?: number
}

export default function SkeletonCard({ className, rows = 3 }: SkeletonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn('rounded-2xl bg-slate-900 border border-slate-800 p-6', className)}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-slate-800 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 bg-slate-800 rounded animate-pulse" />
          <div className="h-3 w-1/4 bg-slate-800 rounded animate-pulse" />
        </div>
      </div>

      {/* Content rows */}
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="h-3 bg-slate-800 rounded animate-pulse"
            style={{
              width: `${100 - (i % 3) * 15}%`,
              animationDelay: `${i * 100}ms`,
            }}
          />
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-6">
        <div className="h-9 w-24 bg-slate-800 rounded-lg animate-pulse" />
        <div className="h-9 w-20 bg-slate-800 rounded-lg animate-pulse" />
      </div>
    </motion.div>
  )
}
