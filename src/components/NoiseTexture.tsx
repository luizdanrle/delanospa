'use client'

import { cn } from '@/lib/utils'

interface NoiseTextureProps {
  className?: string
  opacity?: number
}

export default function NoiseTexture({ className, opacity = 0.03 }: NoiseTextureProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 pointer-events-none z-[9999]',
        className
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        opacity,
      }}
    />
  )
}
