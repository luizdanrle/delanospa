'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X, Sparkles, Clock, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ServiceFavorite {
  id: string
  name: string
  price: number
  duration: number
  description: string
  category: string
}

export function useServiceFavorites() {
  const [favorites, setFavorites] = useState<ServiceFavorite[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('delirio-service-favorites')
    if (saved) {
      try {
        setFavorites(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading service favorites:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('delirio-service-favorites', JSON.stringify(favorites))
    }
  }, [favorites, isLoaded])

  const addFavorite = (service: ServiceFavorite) => {
    setFavorites(prev => {
      if (prev.some(f => f.id === service.id)) return prev
      return [...prev, service]
    })
  }

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id))
  }

  const isFavorite = (id: string) => favorites.some(f => f.id === id)

  const toggleFavorite = (service: ServiceFavorite) => {
    if (isFavorite(service.id)) {
      removeFavorite(service.id)
    } else {
      addFavorite(service)
    }
  }

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite, count: favorites.length }
}

export function ServiceFavoriteButton({ 
  service, 
  className 
}: { 
  service: ServiceFavorite
  className?: string 
}) {
  const { isFavorite, toggleFavorite } = useServiceFavorites()
  const active = isFavorite(service.id)

  return (
    <motion.button
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation()
        toggleFavorite(service)
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        'p-2 rounded-full transition-colors',
        active 
          ? 'bg-amber-500 text-white' 
          : 'bg-white/10 text-white hover:bg-white/20',
        className
      )}
    >
      <Heart className={cn('w-5 h-5', active && 'fill-current')} />
    </motion.button>
  )
}

export function ServiceFavoritesPanel({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean
  onClose: () => void 
}) {
  const { favorites, removeFavorite } = useServiceFavorites()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-800 z-50 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-amber-500" />
                Massagens Favoritas
                <span className="text-sm font-normal text-slate-400">({favorites.length})</span>
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto h-[calc(100vh-80px)]">
              {favorites.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-slate-600" />
                  </div>
                  <p className="text-slate-400">Nenhuma massagem favorita</p>
                  <p className="text-slate-500 text-sm mt-2">
                    Clique no coração para guardar suas massagens preferidas
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {favorites.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-white">{item.name}</h3>
                          <p className="text-amber-400 font-bold">€{item.price}</p>
                        </div>
                        <button
                          onClick={() => removeFavorite(item.id)}
                          className="p-2 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-slate-400 text-sm mb-3 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.duration} min
                        </div>
                        <div className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {item.category}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function ServiceFavoritesButton() {
  const [showPanel, setShowPanel] = useState(false)
  const { count } = useServiceFavorites()

  return (
    <>
      <motion.button
        onClick={() => setShowPanel(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
        title="Massagens Favoritas"
      >
        <Heart className="w-5 h-5 text-amber-400" />
        {count > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-medium"
          >
            {count}
          </motion.span>
        )}
      </motion.button>

      <ServiceFavoritesPanel 
        isOpen={showPanel} 
        onClose={() => setShowPanel(false)} 
      />
    </>
  )
}
