'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, MapPin, Star, ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface SearchResult {
  id: string
  type: 'service' | 'therapist' | 'location'
  title: string
  subtitle: string
  image?: string
  url: string
  rating?: number
  price?: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

// Mock search data
const searchData: SearchResult[] = [
  { id: '1', type: 'service', title: 'Massagem Tântrica', subtitle: '90 min • A partir de €150', url: '#massagens', rating: 4.9 },
  { id: '2', type: 'service', title: 'Massagem Body to Body', subtitle: '60 min • Experiência única', url: '#massagens', rating: 4.8 },
  { id: '3', type: 'service', title: 'Massagem VIP', subtitle: '120 min • Premium', url: '#massagens', rating: 5.0 },
  { id: '4', type: 'therapist', title: 'Sofia', subtitle: 'Especialista Tântrica • Lisboa', url: '#massagistas', rating: 4.9, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
  { id: '5', type: 'therapist', title: 'Mariana', subtitle: 'Body to Body • Porto', url: '#massagistas', rating: 4.8, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop' },
  { id: '6', type: 'location', title: 'Lisboa - Saldanha', subtitle: 'Avenida da República, 15', url: '#locais' },
  { id: '7', type: 'location', title: 'Porto - Trindade', subtitle: 'Rua de Cedofeita, 45', url: '#locais' },
]

const recentSearches = ['Massagem Tântrica', 'Sofia', 'Lisboa', 'VIP', 'Body to Body']

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filteredResults = useMemo(() => {
    if (!query.trim()) return []
    return searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => 
          Math.min(prev + 1, filteredResults.length - 1)
        )
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      }
      if (e.key === 'Enter' && filteredResults[selectedIndex]) {
        window.location.href = filteredResults[selectedIndex].url
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, filteredResults, selectedIndex])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-start justify-center pt-20 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          className="w-full max-w-2xl bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden"
        >
          {/* Search Input */}
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                placeholder="Procurar massagens, massagistas ou locais..."
                className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-lg"
                autoFocus
              />
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query.trim() === '' ? (
              <div className="p-4">
                <p className="text-xs text-slate-500 mb-3 uppercase tracking-wider">
                  Pesquisas recentes
                </p>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition-colors"
                    >
                      <Clock className="w-3 h-3 inline mr-1" />
                      {term}
                    </button>
                  ))}
                </div>

                <p className="text-xs text-slate-500 mb-3 mt-6 uppercase tracking-wider">
                  Populares agora
                </p>
                <div className="space-y-2">
                  {searchData.slice(0, 3).map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      onClick={onClose}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium group-hover:text-red-400 transition-colors">
                          {item.title}
                        </p>
                        <p className="text-slate-500 text-sm">{item.subtitle}</p>
                      </div>
                      {item.rating && (
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-4 h-4 fill-amber-400" />
                          <span className="text-sm">{item.rating}</span>
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="p-2">
                {filteredResults.map((result, index) => (
                  <a
                    key={result.id}
                    href={result.url}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-xl transition-colors group',
                      selectedIndex === index ? 'bg-slate-800' : 'hover:bg-slate-800/50'
                    )}
                  >
                    {result.image ? (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          src={result.image}
                          alt={result.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                        {result.type === 'service' && <Sparkles className="w-6 h-6 text-red-400" />}
                        {result.type === 'location' && <MapPin className="w-6 h-6 text-blue-400" />}
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <p className={cn(
                        'font-medium transition-colors',
                        selectedIndex === index ? 'text-red-400' : 'text-white group-hover:text-red-400'
                      )}>
                        {result.title}
                      </p>
                      <p className="text-slate-500 text-sm">{result.subtitle}</p>
                    </div>
                    
                    {result.rating && (
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span className="text-sm">{result.rating}</span>
                      </div>
                    )}
                    
                    <ArrowRight className={cn(
                      'w-4 h-4 transition-all',
                      selectedIndex === index ? 'text-red-400 translate-x-1' : 'text-slate-600'
                    )} />
                  </a>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                  <Search className="w-8 h-8 text-slate-500" />
                </div>
                <p className="text-slate-400">Nenhum resultado para &quot;{query}&quot;</p>
                <p className="text-slate-600 text-sm mt-1">
                  Tenta procurar por &quot;Massagem&quot;, &quot;Lisboa&quot; ou &quot;Sofia&quot;
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-slate-800 bg-slate-900/50">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-800">↑↓</kbd>
                  navegar
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-800">↵</kbd>
                  selecionar
                </span>
              </div>
              <span>{filteredResults.length} resultados</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
