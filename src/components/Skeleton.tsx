'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  count?: number
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 rounded-2xl bg-slate-900/50 border border-slate-800', className)}>
      {/* Icon skeleton */}
      <div className="w-14 h-14 rounded-xl bg-slate-800 mb-5 animate-pulse" />
      
      {/* Title skeleton */}
      <div className="h-6 w-3/4 bg-slate-800 rounded mb-3 animate-pulse" />
      
      {/* Description skeleton */}
      <div className="space-y-2 mb-5">
        <div className="h-4 w-full bg-slate-800 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-slate-800 rounded animate-pulse" />
      </div>
      
      {/* Footer skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-4 w-20 bg-slate-800 rounded animate-pulse" />
        <div className="h-10 w-32 bg-slate-800 rounded-xl animate-pulse" />
      </div>
    </div>
  )
}

export function SkeletonHero({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-8', className)}>
      {/* Title skeleton */}
      <div className="space-y-4">
        <div className="h-4 w-32 bg-slate-800 rounded-full animate-pulse" />
        <div className="h-12 w-3/4 bg-slate-800 rounded animate-pulse" />
        <div className="h-12 w-1/2 bg-slate-800 rounded animate-pulse" />
      </div>
      
      {/* Description skeleton */}
      <div className="space-y-2 max-w-xl">
        <div className="h-4 w-full bg-slate-800 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-slate-800 rounded animate-pulse" />
        <div className="h-4 w-4/6 bg-slate-800 rounded animate-pulse" />
      </div>
      
      {/* Buttons skeleton */}
      <div className="flex gap-4">
        <div className="h-14 w-40 bg-slate-800 rounded-full animate-pulse" />
        <div className="h-14 w-40 bg-slate-800 rounded-full animate-pulse" />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 4, className }: SkeletonProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <SkeletonCard />
        </motion.div>
      ))}
    </div>
  )
}

export function SkeletonTherapist({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-2xl overflow-hidden bg-slate-900/50', className)}>
      {/* Image skeleton */}
      <div className="aspect-[3/4] bg-slate-800 animate-pulse" />
      
      {/* Info skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-6 w-2/3 bg-slate-800 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-slate-800 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-slate-800 rounded-full animate-pulse" />
          <div className="h-6 w-16 bg-slate-800 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-slate-800 rounded animate-pulse"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  )
}

export function Shimmer({ className }: { className?: string }) {
  return (
    <div className={cn('relative overflow-hidden bg-slate-800', className)}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
      />
    </div>
  )
}
