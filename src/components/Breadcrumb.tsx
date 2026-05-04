'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumb({ 
  items,
  className 
}: { 
  items: BreadcrumbItem[]
  className?: string 
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        'fixed top-16 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 py-2',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <a 
              href="#" 
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only">Início</span>
            </a>
          </li>
          
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-slate-600" />
              {item.href ? (
                <a
                  href={item.href}
                  className="text-slate-400 hover:text-red-400 transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-white font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </motion.nav>
  )
}
