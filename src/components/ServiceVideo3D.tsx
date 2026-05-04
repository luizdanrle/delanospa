'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Info, X, Sparkles, Video, Film, Heart } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Service } from '@/lib/supabase'
import { sensualImages } from '@/lib/sensualAssets'

interface ServiceVideo3DProps {
  service: Service
  isOpen: boolean
  onClose: () => void
}

// Sequência de imagens para simular vídeo de massagem
const massageVideoFrames = [
  sensualImages.tantricBg.massage1,
  sensualImages.tantricBg.massage2,
  sensualImages.tantricBg.massage3,
  sensualImages.tantricBg.hands,
  sensualImages.services.tantric,
  sensualImages.services.body,
  sensualImages.hero.hands,
  sensualImages.hero.candles,
]

export default function ServiceVideo3D({ service, isOpen, onClose }: ServiceVideo3DProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)

  // Auto-play frames to simulate video
  useEffect(() => {
    if (!isOpen || !isPlaying) return
    
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % massageVideoFrames.length)
    }, 2000) // Change frame every 2 seconds
    
    return () => clearInterval(interval)
  }, [isOpen, isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Info Toggle */}
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="absolute top-4 left-4 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <Info className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <div className="relative w-full max-w-6xl mx-4">
        {/* Video Container - Simulated with Image Sequence */}
        <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
          {/* Animated Image Sequence - Simulating Video */}
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFrame}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={massageVideoFrames[currentFrame]}
                  alt={`Demonstração ${service.name} - Frame ${currentFrame + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
                {/* Warm sensual overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-950/60 via-transparent to-red-950/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600/10 to-red-600/10 mix-blend-overlay" />
              </motion.div>
            </AnimatePresence>
            
            {/* Playing indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-red-500"
              />
              <span className="text-white/80 text-xs font-medium">AO VIVO</span>
            </div>

            {/* Frame counter */}
            <div className="absolute top-4 right-16 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
              <span className="text-white/60 text-xs">
                {currentFrame + 1} / {massageVideoFrames.length}
              </span>
            </div>
          </div>
          
          {/* Video Controls Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={togglePlay}
              className="p-6 rounded-full bg-red-600/80 backdrop-blur-sm text-white hover:bg-red-500 transition-all shadow-lg shadow-red-500/30"
            >
              {isPlaying ? <Pause className="w-12 h-12" /> : <Play className="w-12 h-12" />}
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-white/20 text-white hover:bg-red-500/80 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-white/20 text-white hover:bg-red-500/80 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-red-400" />
                <span className="text-white/80 text-sm">Demonstração • {service.name}</span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-red-500 to-rose-500"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentFrame + 1) / massageVideoFrames.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: showInfo ? 0 : -100, opacity: showInfo ? 1 : 0 }}
          className={cn(
            "absolute left-0 top-0 bottom-0 w-96 bg-slate-950/95 backdrop-blur-md border-r border-red-900/30 p-6 overflow-y-auto",
            !showInfo && "pointer-events-none"
          )}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-rose-400 to-red-400 bg-clip-text text-transparent">
              {service.name}
            </span>
          </h2>
          <p className="text-rose-200/70 mb-6 leading-relaxed">{service.description}</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-red-950/50 border border-red-900/20">
              <span className="text-rose-300/60">Duração</span>
              <span className="text-rose-400 font-semibold">{service.duration} min</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-red-950/50 border border-red-900/20">
              <span className="text-rose-300/60">Preço</span>
              <span className="text-rose-400 font-semibold">€{service.price}</span>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-red-600/10 to-rose-600/10 border border-red-500/20">
            <h4 className="text-rose-400 font-semibold mb-2 flex items-center gap-2">
              <Video className="w-4 h-4" />
              Vídeo Gerado por IA
            </h4>
            <p className="text-sm text-rose-200/50">
              Demonstração sensual 3D criada por Inteligência Artificial, 
              mostrando os movimentos da {service.name} com realismo cinematográfico.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
