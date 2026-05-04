'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setIsDark(false)
    }
  }, [])

  const toggle = () => {
    setIsDark(!isDark)
    // In a real app, this would toggle a class on document.documentElement
    // For this SPA which is already dark-themed, we'll just animate
  }

  if (!mounted) {
    return <div className="w-12 h-12 rounded-full bg-slate-800" />
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        'relative w-14 h-14 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500',
        isDark 
          ? 'bg-slate-800 text-yellow-400 border border-slate-700' 
          : 'bg-sky-100 text-orange-500 border border-sky-200'
      )}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDark ? 0 : 180,
          scale: isDark ? 1 : 0
        }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="absolute"
      >
        <Moon className="w-6 h-6" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDark ? -180 : 0,
          scale: isDark ? 0 : 1
        }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="absolute"
      >
        <Sun className="w-6 h-6" />
      </motion.div>

      {/* Glow effect */}
      <div className={cn(
        'absolute inset-0 rounded-full opacity-0 transition-opacity duration-500',
        isDark ? 'bg-yellow-400/10' : 'bg-orange-400/10',
        !isDark && 'opacity-100'
      )} />
    </button>
  )
}
