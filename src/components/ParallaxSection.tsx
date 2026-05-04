'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ReactNode } from 'react'

interface ParallaxSectionProps {
  children: ReactNode
  backgroundImage?: string
  speed?: number
  className?: string
  overlayOpacity?: number
}

export default function ParallaxSection({
  children,
  backgroundImage,
  speed = 0.5,
  className = '',
  overlayOpacity = 0.5,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Parallax Background */}
      {backgroundImage && (
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div 
            className="absolute inset-0 bg-slate-950"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>
      )}
      
      {/* Content with scale effect */}
      <motion.div 
        className="relative z-10"
        style={{ opacity, scale }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Floating elements that move at different speeds
export function FloatingElement({
  children,
  speed = 1,
  direction = 'up',
  className = '',
}: {
  children: ReactNode
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const directions = {
    up: { y: [`${speed * 50}%`, `${-speed * 50}%`], x: ['0%', '0%'] },
    down: { y: [`${-speed * 50}%`, `${speed * 50}%`], x: ['0%', '0%'] },
    left: { x: [`${speed * 50}%`, `${-speed * 50}%`], y: ['0%', '0%'] },
    right: { x: [`${-speed * 50}%`, `${speed * 50}%`], y: ['0%', '0%'] },
  }

  const x = useTransform(scrollYProgress, [0, 1], directions[direction].x)
  const y = useTransform(scrollYProgress, [0, 1], directions[direction].y)

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  )
}

// Text reveal animation
export function TextReveal({
  children,
  className = '',
}: {
  children: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.3'],
  })

  const words = children.split(' ')

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          style={{
            opacity: useTransform(
              scrollYProgress,
              [i / words.length, (i + 1) / words.length],
              [0.2, 1]
            ),
            y: useTransform(
              scrollYProgress,
              [i / words.length, (i + 1) / words.length],
              [20, 0]
            ),
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

// Horizontal scroll section
export function HorizontalScroll({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])

  return (
    <div ref={ref} className={`h-[200vh] ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div style={{ x }} className="flex gap-8 px-8">
          {children}
        </motion.div>
      </div>
    </div>
  )
}
