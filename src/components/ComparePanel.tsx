'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Scale, Check, XCircle, MapPin, Star, Clock, ChevronRight, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface CompareItem {
  id: string
  name: string
  image?: string
  specialty: string
  location: string
  rating: number
  reviews: number
  price: number
  duration: number
  experience: number
  services: string[]
  languages: string[]
  availability: string
}

export function useCompare() {
  const [items, setItems] = useState<CompareItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('delirio-compare')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading compare:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('delirio-compare', JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addItem = (item: CompareItem) => {
    setItems(prev => {
      if (prev.some(i => i.id === item.id)) return prev
      if (prev.length >= 3) return prev // Max 3 items
      return [...prev, item]
    })
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const clearAll = () => setItems([])

  const isInCompare = (id: string) => items.some(i => i.id === id)

  return { items, addItem, removeItem, clearAll, isInCompare, count: items.length }
}

export function CompareButton({ 
  item, 
  className 
}: { 
  item: CompareItem
  className?: string 
}) {
  const { isInCompare, addItem, removeItem, count } = useCompare()
  const active = isInCompare(item.id)
  const disabled = !active && count >= 3

  return (
    <motion.button
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation()
        if (active) {
          removeItem(item.id)
        } else if (!disabled) {
          addItem(item)
        }
      }}
      whileHover={!disabled ? { scale: 1.1 } : undefined}
      whileTap={!disabled ? { scale: 0.9 } : undefined}
      disabled={disabled}
      className={cn(
        'p-2 rounded-full transition-colors',
        active 
          ? 'bg-purple-500 text-white' 
          : disabled
            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
            : 'bg-white/10 text-white hover:bg-white/20',
        className
      )}
      title={disabled ? 'Máximo 3 itens' : active ? 'Remover comparação' : 'Adicionar à comparação'}
    >
      <Scale className="w-5 h-5" />
    </motion.button>
  )
}

export function ComparePanel({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean
  onClose: () => void 
}) {
  const { items, removeItem, clearAll } = useCompare()
  const [showFullCompare, setShowFullCompare] = useState(false)

  return (
    <>
      {/* Mini floating panel when items exist */}
      {!isOpen && items.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40"
        >
          <button
            onClick={() => setShowFullCompare(true)}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-purple-600 text-white shadow-lg shadow-purple-500/30 hover:bg-purple-500 transition-colors"
          >
            <Scale className="w-5 h-5" />
            <span className="font-medium">Comparar ({items.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Full Compare Modal */}
      <AnimatePresence>
        {(isOpen || showFullCompare) && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                onClose()
                setShowFullCompare(false)
              }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-5xl bg-slate-900 rounded-3xl overflow-hidden z-50"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Scale className="w-5 h-5 text-purple-500" />
                  Comparar Massagistas
                </h2>
                <div className="flex items-center gap-3">
                  {items.length > 0 && (
                    <button
                      onClick={clearAll}
                      className="text-sm text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      Limpar tudo
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onClose()
                      setShowFullCompare(false)
                    }}
                    className="p-2 rounded-full hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-x-auto">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                      <Scale className="w-8 h-8 text-slate-600" />
                    </div>
                    <p className="text-slate-400">Nenhuma massagista selecionada</p>
                    <p className="text-slate-500 text-sm mt-2">
                      Clique no ícone de balança para comparar até 3 massagistas
                    </p>
                  </div>
                ) : (
                  <div className="min-w-[600px]">
                    {/* Table Header */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="text-slate-400 text-sm">Característica</div>
                      {items.map((item) => (
                        <div key={item.id} className="text-center">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <div className="relative w-20 h-20 mx-auto rounded-xl overflow-hidden mb-2">
                            {item.image ? (
                              <Image src={item.image} alt={item.name} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
                            )}
                          </div>
                          <h3 className="font-semibold text-white text-sm">{item.name}</h3>
                          <p className="text-xs text-slate-400">{item.specialty}</p>
                        </div>
                      ))}
                    </div>

                    {/* Comparison Rows */}
                    {[
                      { label: 'Preço', key: 'price', format: (v: number | string) => `€${v}`, better: 'lower' as const },
                      { label: 'Avaliação', key: 'rating', format: (v: number | string) => `${v}★`, better: 'higher' as const },
                      { label: 'Experiência', key: 'experience', format: (v: number | string) => `${v} anos`, better: 'higher' as const },
                      { label: 'Duração', key: 'duration', format: (v: number | string) => `${v} min`, better: 'higher' as const },
                      { label: 'Localização', key: 'location', format: (v: number | string) => String(v), better: null },
                      { label: 'Disponibilidade', key: 'availability', format: (v: number | string) => String(v), better: null },
                    ].map((row) => (
                      <div key={row.label} className="grid grid-cols-4 gap-4 py-3 border-t border-slate-800">
                        <div className="text-slate-400 text-sm flex items-center">{row.label}</div>
                        {items.map((item) => {
                          const value = item[row.key as keyof CompareItem]
                          const numValue = typeof value === 'number' ? value : 0
                          const isBest = row.better && items.length > 1 && (
                            row.better === 'lower' 
                              ? numValue === Math.min(...items.map(i => Number(i[row.key as keyof CompareItem]) || 0))
                              : numValue === Math.max(...items.map(i => Number(i[row.key as keyof CompareItem]) || 0))
                          )
                          
                          return (
                            <div key={item.id} className="text-center">
                              <span className={cn(
                                'text-sm',
                                isBest ? 'text-green-400 font-medium' : 'text-white'
                              )}>
                                {row.format(value as number | string)}
                              </span>
                              {isBest && (
                                <span className="ml-1 text-green-400">✓</span>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ))}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t border-slate-800">
                      <div />
                      {items.map((item) => (
                        <a
                          key={item.id}
                          href={`https://wa.me/${item.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium text-center hover:from-purple-500 hover:to-pink-500 transition-all"
                        >
                          Reservar
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export function CompareButtonWithCount({ onClick }: { onClick: () => void }) {
  const { count } = useCompare()
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
      title="Comparar Massagistas"
    >
      <Scale className="w-5 h-5" />
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
  )
}
