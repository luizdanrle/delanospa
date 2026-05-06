'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X, User, MapPin, Star, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Favorite {
  id: string
  name: string
  image?: string
  specialty: string
  location: string
  rating: number
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('delirio-favorites')
    if (saved) {
      try {
        setFavorites(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading favorites:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('delirio-favorites', JSON.stringify(favorites))
    }
  }, [favorites, isLoaded])

  const addFavorite = (item: Favorite) => {
    setFavorites(prev => {
      if (prev.some(f => f.id === item.id)) return prev
      return [...prev, item]
    })
  }

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id))
  }

  const isFavorite = (id: string) => favorites.some(f => f.id === id)

  const toggleFavorite = (item: Favorite) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id)
    } else {
      addFavorite(item)
    }
  }

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite, count: favorites.length }
}

export function FavoriteButton({ 
  item, 
  className 
}: { 
  item: Favorite
  className?: string 
}) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(item.id)

  return (
    <motion.button
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation()
        toggleFavorite(item)
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        'p-2 rounded-full transition-colors',
        active 
          ? 'bg-rose-500 text-white' 
          : 'bg-white/10 text-white hover:bg-white/20',
        className
      )}
    >
      <Heart className={cn('w-5 h-5', active && 'fill-current')} />
    </motion.button>
  )
}

export function FavoritesPanel({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean
  onClose: () => void 
}) {
  const { favorites, removeFavorite } = useFavorites()

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
                <Heart className="w-5 h-5 text-rose-500" />
                Favoritos
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
                  <p className="text-slate-400">Nenhuma massagista favorita</p>
                  <p className="text-slate-500 text-sm mt-2">
                    Clique no coração para guardar suas favoritas
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
                      className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 flex items-center gap-4"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                            <User className="w-6 h-6 text-slate-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">{item.name}</h3>
                        <p className="text-sm text-slate-400">{item.specialty}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span className="text-xs text-slate-500">{item.location}</span>
                          <Star className="w-3 h-3 text-amber-500" />
                          <span className="text-xs text-slate-500">{item.rating}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeFavorite(item.id)}
                        className="p-2 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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

export function FavoritesButton({ onClick, count }: { onClick: () => void, count: number }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
    >
      <Heart className="w-5 h-5" />
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center font-medium"
        >
          {count}
        </motion.span>
      )}
    </motion.button>
  )
}

export function FavoritesButtonWithCount({ onClick }: { onClick: () => void }) {
  const { count } = useFavorites()
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
      title="Massagistas Favoritas"
    >
      <Heart className="w-5 h-5" />
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center font-medium"
        >
          {count}
        </motion.span>
      )}
    </motion.button>
  )
}
