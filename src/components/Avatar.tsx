'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface AvatarProps {
  src?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  status?: 'online' | 'offline' | 'busy' | 'away'
  bordered?: boolean
  className?: string
}

const sizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-xl',
}

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-slate-500',
  busy: 'bg-red-500',
  away: 'bg-amber-500',
}

export default function Avatar({
  src,
  name = '?',
  size = 'md',
  status,
  bordered = false,
  className,
}: AvatarProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className={cn('relative inline-block', className)}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={cn(
          'rounded-full overflow-hidden flex items-center justify-center font-medium text-white',
          sizes[size],
          bordered && 'ring-2 ring-purple-500 ring-offset-2 ring-offset-slate-950',
          !src && 'bg-gradient-to-br from-purple-500 to-pink-500'
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={name}
            width={size === 'xl' ? 80 : size === 'lg' ? 56 : 40}
            height={size === 'xl' ? 80 : size === 'lg' ? 56 : 40}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </motion.div>
      
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-slate-950',
            size === 'xs' || size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5',
            statusColors[status]
          )}
        />
      )}
    </div>
  )
}
