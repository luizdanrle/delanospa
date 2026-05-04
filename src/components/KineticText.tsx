'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface KineticTextProps {
  children: string
  className?: string
}

export default function KineticText({ children, className }: KineticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [chars, setChars] = useState<string[]>([])

  useEffect(() => {
    setChars(children.split(''))
  }, [children])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'start 0.1'],
  })

  return (
    <div ref={containerRef} className={cn('inline-block', className)}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{
            opacity: useTransform(
              scrollYProgress,
              [i / chars.length, (i + 1) / chars.length],
              [0.2, 1]
            ),
            y: useTransform(
              scrollYProgress,
              [i / chars.length, (i + 1) / chars.length],
              [20, 0]
            ),
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  )
}
