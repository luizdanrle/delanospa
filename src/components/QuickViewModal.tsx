'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Star, Clock, Phone, ChevronRight, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

interface QuickViewData {
  id: string
  name: string
  image?: string
  specialty: string
  location: string
  rating: number
  reviews: number
  price: number
  duration: number
  description: string
  services: string[]
  phone: string
}

interface QuickViewModalProps {
  isOpen: boolean
  onClose: () => void
  data: QuickViewData | null
  onFavorite?: () => void
  isFavorite?: boolean
}

export default function QuickViewModal({ 
  isOpen, 
  onClose, 
  data, 
  onFavorite,
  isFavorite = false
}: QuickViewModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'services'>('info')

  if (!data) return null

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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden z-50 flex flex-col"
          >
            {/* Header Image */}
            <div className="relative h-48 md:h-56 flex-shrink-0">
              {data.image ? (
                <Image
                  src={data.image}
                  alt={data.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Favorite Button */}
              {onFavorite && (
                <button
                  onClick={onFavorite}
                  className={cn(
                    'absolute top-4 left-4 p-2 rounded-full transition-colors',
                    isFavorite ? 'bg-rose-500 text-white' : 'bg-black/30 text-white hover:bg-black/50'
                  )}
                >
                  <Heart className={cn('w-5 h-5', isFavorite && 'fill-current')} />
                </button>
              )}
              
              {/* Title */}
              <div className="absolute bottom-4 left-6 right-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">{data.name}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm">
                    {data.specialty}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="text-white font-medium">{data.rating}</span>
                    <span className="text-white/60 text-sm">({data.reviews} avaliações)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-800">
              {(['info', 'services'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'flex-1 py-3 text-sm font-medium capitalize transition-colors',
                    activeTab === tab 
                      ? 'text-purple-400 border-b-2 border-purple-400' 
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  {tab === 'info' ? 'Informações' : 'Serviços'}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'info' ? (
                <div className="space-y-6">
                  {/* Description */}
                  <p className="text-slate-300">{data.description}</p>
                  
                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-800/50">
                      <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Localização</span>
                      </div>
                      <p className="text-white font-medium">{data.location}</p>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-slate-800/50">
                      <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Duração</span>
                      </div>
                      <p className="text-white font-medium">{data.duration} minutos</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">A partir de</p>
                        <p className="text-3xl font-bold text-white">€{data.price}</p>
                      </div>
                      <a
                        href={`https://wa.me/${data.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all"
                      >
                        <Phone className="w-4 h-4" />
                        Reservar
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-slate-800/50 flex items-center justify-between group cursor-pointer hover:bg-slate-800 transition-colors"
                    >
                      <span className="text-white">{service}</span>
                      <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 transition-colors" />
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
