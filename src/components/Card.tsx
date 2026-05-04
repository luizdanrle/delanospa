'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  clickable?: boolean
  onClick?: () => void
}

export default function Card({
  children,
  className,
  hover = true,
  clickable = false,
  onClick,
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      onClick={onClick}
      className={cn(
        'rounded-2xl bg-slate-900 border border-slate-800 p-6',
        hover && 'transition-all hover:shadow-xl hover:shadow-purple-500/5 hover:border-slate-700',
        clickable && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

// Card Header
export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-start justify-between mb-4', className)}>
      {children}
    </div>
  )
}

// Card Title
export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h3 className={cn('text-lg font-semibold text-white', className)}>
      {children}
    </h3>
  )
}

// Card Description
export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn('text-sm text-slate-400', className)}>
      {children}
    </p>
  )
}

// Card Content
export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn('', className)}>{children}</div>
}

// Card Footer
export function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center justify-between mt-4 pt-4 border-t border-slate-800', className)}>
      {children}
    </div>
  )
}
