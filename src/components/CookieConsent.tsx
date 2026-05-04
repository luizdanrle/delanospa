'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookie-consent')
    if (!hasConsented) {
      // Show after 2 seconds
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all')
    setIsVisible(false)
  }

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential')
    setIsVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-6 h-6 text-amber-400" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      Valorizamos sua privacidade
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego. 
                      Você pode escolher quais cookies aceitar.
                    </p>
                  </div>
                  <button 
                    onClick={decline}
                    className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-4 space-y-3"
                  >
                    {[
                      { name: 'Essenciais', desc: 'Necessários para o funcionamento do site', required: true },
                      { name: 'Preferências', desc: 'Lembram suas escolhas (idioma, região)', required: false },
                      { name: 'Analíticos', desc: 'Ajudam a melhorar o site', required: false },
                      { name: 'Marketing', desc: 'Personalizam anúncios', required: false },
                    ].map((cookie) => (
                      <div key={cookie.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                        <div>
                          <p className="text-sm font-medium text-white">{cookie.name}</p>
                          <p className="text-xs text-slate-500">{cookie.desc}</p>
                        </div>
                        <div className={cn(
                          'w-10 h-5 rounded-full relative',
                          cookie.required ? 'bg-green-500/30' : 'bg-slate-700'
                        )}>
                          <div className={cn(
                            'absolute top-0.5 w-4 h-4 rounded-full transition-all',
                            cookie.required ? 'bg-green-500 left-5' : 'bg-slate-500 left-0.5'
                          )} />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <button
                    onClick={acceptAll}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                  >
                    Aceitar Todos
                  </button>
                  <button
                    onClick={acceptEssential}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 text-white font-medium text-sm hover:bg-slate-700 transition-all"
                  >
                    Apenas Essenciais
                  </button>
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="px-4 py-2.5 rounded-xl text-slate-400 text-sm hover:text-white flex items-center gap-1 transition-all"
                  >
                    {showDetails ? 'Menos detalhes' : 'Ver detalhes'}
                    <ChevronRight className={cn('w-4 h-4 transition-transform', showDetails && 'rotate-90')} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
