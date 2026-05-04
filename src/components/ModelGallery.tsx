'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MapPin, Star, ArrowRight, Filter, ChevronLeft, ChevronRight, Play, Image as ImageIcon, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Therapist } from '@/lib/supabase'
import Image from 'next/image'
import { getRandomTherapistImage, sensualImages } from '@/lib/sensualAssets'

interface ModelGalleryProps {
  therapists: Therapist[]
  onSelectModel: (therapist: Therapist) => void
}

export default function ModelGallery({ therapists, onSelectModel }: ModelGalleryProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'female' | 'male' | 'vip'>('all')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [bgImage, setBgImage] = useState(0)
  
  // Background images slideshow
  const bgImages = [
    sensualImages.tantricBg.massage1,
    sensualImages.tantricBg.massage2,
    sensualImages.tantricBg.massage3,
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage((prev) => (prev + 1) % bgImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [bgImages.length])

  const filteredTherapists = therapists.filter(t => {
    if (selectedFilter === 'all') return t.is_active
    if (selectedFilter === 'vip') return t.is_active && t.experience_years && t.experience_years >= 5
    return t.is_active && t.gender === selectedFilter
  })

  const filters = [
    { id: 'all', label: 'Todas', count: therapists.filter(t => t.is_active).length },
    { id: 'female', label: 'Femininas', count: therapists.filter(t => t.is_active && t.gender === 'female').length },
    { id: 'male', label: 'Masculinas', count: therapists.filter(t => t.is_active && t.gender === 'male').length },
    { id: 'vip', label: 'VIP', count: therapists.filter(t => t.is_active && t.experience_years && t.experience_years >= 5).length },
  ]

  return (
    <section id="massagistas" className="py-24 relative overflow-hidden">
      {/* Animated Background with sensual massage images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image
              src={bgImages[bgImage]}
              alt="Massagem sensual"
              fill
              className="object-cover opacity-20"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-rose-950/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6"
          >
            <Heart className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-sm font-medium">Nossas Especialistas</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Escolha sua{' '}
            <span className="bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
              Massagista
            </span>
          </h2>
          <p className="text-rose-200/60 text-lg max-w-2xl mx-auto">
            Cada massagista possui técnicas únicas de sedução para proporcionar momentos de intenso prazer
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id as any)}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all',
                selectedFilter === filter.id
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/25'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-red-500/30 hover:text-white'
              )}
            >
              <Filter className="w-4 h-4" />
              {filter.label}
              <span className={cn(
                'px-2 py-0.5 rounded-full text-xs',
                selectedFilter === filter.id ? 'bg-white/20' : 'bg-slate-800'
              )}>
                {filter.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid - Masonry Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTherapists.map((therapist, index) => {
              // Usar imagem do Supabase ou fallback para imagem sensual
              const imageUrl = therapist.image_url && therapist.image_url.trim() !== ''
                ? therapist.image_url
                : getRandomTherapistImage(therapist.gender)
              const hasImage = true // Sempre teremos uma imagem agora
              const isHovered = hoveredId === therapist.id
              
              return (
                <motion.div
                  key={therapist.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredId(therapist.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onSelectModel(therapist)}
                  className="group relative cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 transition-all duration-500 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/10 aspect-[3/4]">
                    {/* Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={imageUrl}
                        alt={therapist.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    </div>

                    {/* VIP Badge */}
                    {therapist.experience_years && therapist.experience_years >= 5 && (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        VIP
                      </div>
                    )}

                    {/* Online Status */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-green-400 text-xs">Online</span>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      {/* Quick Info - Shows on hover */}
                      <motion.div
                        initial={false}
                        animate={{ 
                          opacity: isHovered ? 1 : 0,
                          y: isHovered ? 0 : 20 
                        }}
                        transition={{ duration: 0.3 }}
                        className="mb-3 space-y-2"
                      >
                        {therapist.specialty && (
                          <p className="text-pink-300 text-sm font-medium">
                            Especialista em {therapist.specialty}
                          </p>
                        )}
                        {therapist.services && therapist.services.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {therapist.services.slice(0, 3).map((service, i) => (
                              <span 
                                key={i}
                                className="px-2 py-0.5 rounded-full bg-white/10 text-white/80 text-xs"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>

                      {/* Name & Location */}
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className={cn(
                            'font-bold text-white mb-1',
                            index === 0 ? 'text-2xl' : 'text-xl'
                          )}>
                            {therapist.name}
                          </h3>
                          {therapist.location && (
                            <div className="flex items-center gap-1 text-slate-400 text-sm">
                              <MapPin className="w-3 h-3" />
                              {therapist.location}
                            </div>
                          )}
                        </div>

                        {/* Action Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 rounded-full bg-pink-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Hover Stats */}
                    <motion.div
                      initial={false}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white text-xs">Fotos</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white text-xs">Vídeo</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Info className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white text-xs">Perfil</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredTherapists.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-800 flex items-center justify-center">
              <Filter className="w-10 h-10 text-slate-600" />
            </div>
            <p className="text-slate-400 text-lg">Nenhuma massagista encontrada com este filtro</p>
            <button
              onClick={() => setSelectedFilter('all')}
              className="mt-4 px-6 py-3 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
            >
              Ver Todas
            </button>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 mb-6">
            Não encontrou o que procura? Temos mais opções disponíveis
          </p>
          <a
            href="https://wa.me/351912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold hover:from-pink-500 hover:to-purple-500 transition-all shadow-lg shadow-pink-500/25"
          >
            <Heart className="w-5 h-5" />
            Falar com Atendente
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
