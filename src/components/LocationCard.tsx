'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Location } from '@/lib/supabase'
import { sensualImages } from '@/lib/sensualAssets'

interface LocationCardProps {
  location: Location
  index: number
}

// Map location names to image keys
const locationImageMap: Record<string, string[]> = {
  'DelirioSpa Saldanha': sensualImages.locations.lisboa1.roomImages,
  'DelirioSpa Chiado': sensualImages.locations.lisboa2.roomImages,
  'DelirioSpa Trindade': sensualImages.locations.porto1.roomImages,
  'DelirioSpa Clérigos': sensualImages.locations.porto2.roomImages,
  'DelirioSpa Marina': sensualImages.locations.algarve.roomImages,
  'DelirioSpa Centro': sensualImages.locations.leiria.roomImages,
}

export default function LocationCard({ location, index }: LocationCardProps) {
  const [currentImage, setCurrentImage] = useState(0)
  
  // Todas cidades vermelhas
  const color = 'from-red-600 to-rose-600'
  
  // Get room images for this location
  const roomImages = locationImageMap[location.name] || [
    'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop',
  ]
  
  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % roomImages.length)
    }, 4000) // Change every 4 seconds
    
    return () => clearInterval(interval)
  }, [roomImages.length])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-red-500/30 transition-all duration-500 h-full">
        {/* Room Image Slideshow */}
        <div className="relative aspect-video w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={roomImages[currentImage]}
                alt={`Gabinete ${location.name}`}
                fill
                className="object-cover"
              />
              {/* Sensual red overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-red-950/30 to-rose-950/20" />
            </motion.div>
          </AnimatePresence>
          
          {/* Image navigation dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {roomImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  currentImage === i ? 'bg-red-500 w-4' : 'bg-white/50 hover:bg-white/70'
                )}
              />
            ))}
          </div>
          
          {/* City Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className={cn(
              'px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r shadow-lg',
              color
            )}>
              {location.city}
            </span>
          </div>
          
          {/* Map pin */}
          <div className={cn(
            'absolute top-3 right-3 w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg z-10',
            color
          )}>
            <MapPin className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-white mb-2">{location.name}</h3>
          <p className="text-rose-200/60 mb-4">{location.address}</p>
          
          {/* Room preview text */}
          <p className="text-xs text-rose-300/50 mb-4 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Gabinete intimista com iluminação sensual
          </p>

          {/* CTA */}
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(location.address + ', ' + location.city)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium text-white bg-slate-800 hover:bg-red-900/50 transition-all border border-slate-700 hover:border-red-500/50 group/btn"
          >
            Ver no Mapa
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}
