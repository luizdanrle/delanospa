'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, MapPin, ChevronLeft, ChevronRight, 
  Expand, RotateCw, Info, Maximize, Minimize
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Location } from '@/lib/supabase'
import Image from 'next/image'

interface VirtualTour360Props {
  location: Location | null
  isOpen: boolean
  onClose: () => void
}

export default function VirtualTour360({ location, isOpen, onClose }: VirtualTour360Props) {
  const [currentView, setCurrentView] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [rotation, setRotation] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Real spa environment images
  const views = [
    { 
      name: 'Recepção', 
      description: 'Ambiente acolhedor e discreto',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=800&fit=crop'
    },
    { 
      name: 'Sala de Massagem', 
      description: 'Suíte principal com decoração oriental',
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&h=800&fit=crop'
    },
    { 
      name: 'Spa & Relaxamento', 
      description: 'Área de hidromassagem e relaxamento',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=800&fit=crop'
    },
    { 
      name: 'Área de Descanso', 
      description: 'Espaço para relaxamento pós-massagem',
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&h=800&fit=crop'
    },
    { 
      name: 'Gabinete VIP', 
      description: 'Suíte exclusiva com amenities premium',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&h=800&fit=crop'
    },
  ]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0))
    setScrollLeft(containerRef.current?.scrollLeft || 0)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (containerRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const nextView = () => {
    setCurrentView((prev) => (prev + 1) % views.length)
    setRotation((prev) => prev + 72)
  }

  const prevView = () => {
    setCurrentView((prev) => (prev - 1 + views.length) % views.length)
    setRotation((prev) => prev - 72)
  }

  if (!isOpen || !location) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          'fixed inset-0 bg-black z-50 overflow-hidden',
          isFullscreen ? 'fullscreen' : ''
        )}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 left-0 right-0 z-20 p-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-white">{location.name}</h2>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4" />
                {location.city}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setRotation((prev) => prev + 90)}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              <RotateCw className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Main 360 View Area */}
        <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
          {/* 360 Viewer Container */}
          <div
            ref={containerRef}
            className={cn(
              'relative overflow-hidden cursor-grab active:cursor-grabbing',
              isFullscreen ? 'w-full h-full' : 'w-full h-full'
            )}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {/* Placeholder 360 View */}
            <motion.div
              animate={{ rotateY: rotation }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ perspective: '1000px' }}
            >
              {/* Central Room View */}
              <div className="relative w-full max-w-5xl aspect-video">
                {/* Room Visualization with Real Image */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-slate-700">
                  {/* Real Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={views[currentView].image}
                      alt={views[currentView].name}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
                  </div>
                  
                  {/* 360 Grid Lines Effect */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '50px 50px'
                    }} />
                  </div>

                  {/* Room Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.div
                      key={currentView}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-4xl font-bold text-white mb-2">
                        {views[currentView].name}
                      </h3>
                      <p className="text-slate-300 text-xl">
                        {views[currentView].description}
                      </p>
                    </motion.div>
                  </div>

                  {/* 360 Badge */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
                      <RotateCw className="w-4 h-4 text-pink-400 animate-spin" />
                      <span className="text-pink-300 text-sm font-medium">Vista 360° • Arraste para explorar</span>
                    </div>
                  </div>

                  {/* Navigation Hotspots */}
                  <button 
                    onClick={nextView}
                    className="absolute top-1/2 right-6 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/25 transition-all group shadow-lg"
                  >
                    <ChevronRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={prevView}
                    className="absolute top-1/2 left-6 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/25 transition-all group shadow-lg"
                  >
                    <ChevronLeft className="w-7 h-7 group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* View Navigation Dots */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-3">
                  {views.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentView(index)
                        setRotation(index * 72)
                      }}
                      className={cn(
                        'w-3 h-3 rounded-full transition-all',
                        index === currentView
                          ? 'w-12 bg-gradient-to-r from-pink-500 to-purple-500'
                          : 'bg-white/30 hover:bg-white/50'
                      )}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Instructions Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-32 left-1/2 -translate-x-1/2 pointer-events-none"
            >
              <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-black/50 backdrop-blur-sm text-white/80 text-sm">
                <span>Clique e arraste para explorar</span>
                <span className="w-px h-4 bg-white/30" />
                <span>Use as setas para navegar</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Info Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              {/* Current View Info */}
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                  {location.image_url ? (
                    <Image
                      src={location.image_url}
                      alt={location.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  ) : (
                    <MapPin className="w-8 h-8 text-slate-500" />
                  )}
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{location.name}</h4>
                  <p className="text-slate-400 text-sm">{location.address}</p>
                  <p className="text-slate-500 text-sm">{location.city}</p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prevView}
                  className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="text-center">
                  <p className="text-white font-medium">{currentView + 1} / {views.length}</p>
                  <p className="text-slate-400 text-xs">{views[currentView].name}</p>
                </div>
                <button
                  onClick={nextView}
                  className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/351912345678?text=Olá! Gostaria de visitar o ${location.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold hover:from-pink-500 hover:to-purple-500 transition-all"
              >
                Agendar Visita
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
