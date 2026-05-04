'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Accessibility, 
  Type, 
  Contrast, 
  Eye,
  X,
  Plus,
  Minus
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`
    
    if (highContrast) {
      document.body.classList.add('high-contrast')
    } else {
      document.body.classList.remove('high-contrast')
    }
    
    if (reducedMotion) {
      document.body.classList.add('reduce-motion')
    } else {
      document.body.classList.remove('reduce-motion')
    }
  }, [fontSize, highContrast, reducedMotion])

  return (
    <div className="fixed left-4 bottom-24 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 p-4 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl w-64"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-white">Acessibilidade</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Font Size */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400 flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Tamanho do texto
                </span>
                <span className="text-sm text-slate-300">{fontSize}%</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFontSize(prev => Math.max(80, prev - 10))}
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 h-2 bg-slate-800 rounded-full">
                  <div 
                    className="h-full bg-purple-500 rounded-full transition-all"
                    style={{ width: `${(fontSize - 80) / 0.8}%` }}
                  />
                </div>
                <button
                  onClick={() => setFontSize(prev => Math.min(150, prev + 10))}
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* High Contrast */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={cn(
                'w-full flex items-center justify-between p-3 rounded-xl mb-2 transition-colors',
                highContrast ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-slate-800'
              )}
            >
              <span className="text-sm text-slate-300 flex items-center gap-2">
                <Contrast className="w-4 h-4" />
                Alto contraste
              </span>
              <div className={cn(
                'w-10 h-5 rounded-full relative transition-colors',
                highContrast ? 'bg-purple-500' : 'bg-slate-700'
              )}>
                <div className={cn(
                  'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all',
                  highContrast ? 'left-5' : 'left-0.5'
                )} />
              </div>
            </button>

            {/* Reduced Motion */}
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={cn(
                'w-full flex items-center justify-between p-3 rounded-xl transition-colors',
                reducedMotion ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-slate-800'
              )}
            >
              <span className="text-sm text-slate-300 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Reduzir animações
              </span>
              <div className={cn(
                'w-10 h-5 rounded-full relative transition-colors',
                reducedMotion ? 'bg-purple-500' : 'bg-slate-700'
              )}>
                <div className={cn(
                  'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all',
                  reducedMotion ? 'left-5' : 'left-0.5'
                )} />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all',
          isOpen 
            ? 'bg-purple-600 text-white' 
            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
        )}
      >
        <Accessibility className="w-6 h-6" />
      </button>
    </div>
  )
}
