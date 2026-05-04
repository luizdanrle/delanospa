'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// URLs de imagens em IA (geradas por IA - relaxamento, spa, massagens)
const AI_IMAGES = {
  // Imagens do Hero - Massagistas sensuais em ambiente luxuoso
  hero: [
    {
      url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920&q=80',
      alt: 'Massagista profissional em ambiente de luxo',
      caption: 'Experiência Única de Relaxamento'
    },
    {
      url: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=1920&q=80',
      alt: 'Ambiente intimista com velas',
      caption: 'Atmosfera de Sedução e Mistério'
    },
    {
      url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80',
      alt: 'Massagem terapêutica sensual',
      caption: 'Toques que Despertam os Sentidos'
    },
    {
      url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1920&q=80',
      alt: 'Spa de luxo com iluminação suave',
      caption: 'Luxo e Discrição Garantidos'
    }
  ],
  
  // Galeria de Massagistas - Fotos estilo IA/realistas
  therapists: [
    {
      url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&q=80',
      name: 'Sofia',
      specialty: 'Massagem Tântrica',
      age: 26,
      rating: 4.9
    },
    {
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
      name: 'Isabela',
      specialty: 'Body to Body',
      age: 24,
      rating: 5.0
    },
    {
      url: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&q=80',
      name: 'Valentina',
      specialty: 'Nuru Gel',
      age: 27,
      rating: 4.8
    },
    {
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
      name: 'Carolina',
      specialty: 'Sensual Relax',
      age: 25,
      rating: 4.9
    },
    {
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
      name: 'Mariana',
      specialty: 'Tantric Special',
      age: 28,
      rating: 5.0
    },
    {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      name: 'Lucas',
      specialty: 'Massagem Terapêutica',
      age: 30,
      rating: 4.7
    }
  ],
  
  // Ambientes/Locais do SPA
  locations: [
    {
      url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
      name: 'Suíte Premium Lisboa',
      description: 'Ambiente climatizado com jacuzzi privativa'
    },
    {
      url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&q=80',
      name: 'Deluxe Spa Suite',
      description: 'Iluminação sensual e sons relaxantes'
    },
    {
      url: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=1200&q=80',
      name: 'Vip Room Porto',
      description: 'Vista panorâmica e total privacidade'
    },
    {
      url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80',
      name: 'Garden Spa',
      description: 'Conexão com a natureza em ambiente fechado'
    }
  ]
}

// Componente de Slider Principal (Hero)
export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [direction, setDirection] = useState(0)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % AI_IMAGES.hero.length)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + AI_IMAGES.hero.length) % AI_IMAGES.hero.length)
  }, [])

  // Auto-play
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isPlaying, nextSlide])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    })
  }

  return (
    <div className="relative w-full h-[600px] lg:h-[700px] overflow-hidden rounded-3xl">
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 }
          }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${AI_IMAGES.hero[currentIndex].url})`,
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/60" />
          
          {/* Caption */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-20 left-8 right-8 lg:left-20 lg:right-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium mb-4">
              IA Generated
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-2">
              {AI_IMAGES.hero[currentIndex].caption}
            </h2>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Play/Pause */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {AI_IMAGES.hero.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              index === currentIndex 
                ? 'w-8 bg-purple-500' 
                : 'bg-white/40 hover:bg-white/60'
            )}
          />
        ))}
      </div>
    </div>
  )
}

// Componente de Grid de Massagistas com Hover Zoom
export function TherapistAIGrid() {
  const [selectedTherapist, setSelectedTherapist] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {AI_IMAGES.therapists.map((therapist, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
          onClick={() => setSelectedTherapist(index)}
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${therapist.url})` }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          
          {/* Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-lg">{therapist.name}</h3>
            <p className="text-purple-300 text-sm">{therapist.specialty}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-white/80 text-xs">{therapist.age} anos</span>
              <span className="text-amber-400 text-xs flex items-center gap-1">
                ★ {therapist.rating}
              </span>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Maximize2 className="w-8 h-8 text-white" />
          </div>
        </motion.div>
      ))}

      {/* Modal */}
      <AnimatePresence>
        {selectedTherapist !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedTherapist(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full aspect-[4/3] rounded-3xl overflow-hidden"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${AI_IMAGES.therapists[selectedTherapist].url})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h2 className="text-4xl font-bold text-white mb-2">
                  {AI_IMAGES.therapists[selectedTherapist].name}
                </h2>
                <p className="text-purple-300 text-xl">{AI_IMAGES.therapists[selectedTherapist].specialty}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Componente de Slider de Locais
export function LocationSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((prev) => (prev + 1) % AI_IMAGES.locations.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + AI_IMAGES.locations.length) % AI_IMAGES.locations.length)

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {AI_IMAGES.locations.map((location, index) => (
            <div key={index} className="w-full flex-shrink-0 relative aspect-video">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${location.url})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-bold text-white mb-1">{location.name}</h3>
                <p className="text-slate-300 text-sm">{location.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button onClick={prev} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        {AI_IMAGES.locations.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all',
              index === currentIndex ? 'w-6 bg-purple-500' : 'bg-slate-600'
            )}
          />
        ))}
        <button onClick={next} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  )
}

export default { HeroSlider, TherapistAIGrid, LocationSlider }
