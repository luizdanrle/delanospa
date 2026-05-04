'use client'

import { cn } from '@/lib/utils'

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
  label?: string
}

export default function Divider({
  orientation = 'horizontal',
  className,
  label,
}: DividerProps) {
  if (label) {
    return (
      <div className={cn('relative flex items-center', className)}>
        <div className="flex-1 border-t border-slate-800" />
        <span className="mx-4 text-sm text-slate-500">{label}</span>
        <div className="flex-1 border-t border-slate-800" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'bg-slate-800',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
        className
      )}
    />
  )
}
