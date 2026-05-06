'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Info, X, Sparkles, Video, Film, Heart } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Therapist } from '@/lib/supabase'
import { getRandomTherapistImage } from '@/lib/sensualAssets'

interface TherapistVideoProps {
  therapist: Therapist
  isOpen: boolean
  onClose: () => void
}

export default function TherapistVideo({ therapist, isOpen, onClose }: TherapistVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)

  // Frames do "vídeo" - usando diferentes imagens da massagista para simular movimento
  const therapistImage = getRandomTherapistImage()
  const videoFrames = [
    therapistImage,
    therapistImage + '?auto=format&fit=crop&w=800&h=600&q=80',
    therapistImage + '?auto=format&fit=crop&w=800&h=600&q=85&sat=1.1',
    therapistImage + '?auto=format&fit=crop&w=800&h=600&q=75&con=1.05',
    therapistImage + '?auto=format&fit=crop&w=800&h=600&q=80&sat=0.9',
    therapistImage + '?auto=format&fit=crop&w=800&h=600&q=85',
  ]

  // Auto-play frames to simulate video
  useEffect(() => {
    if (!isOpen || !isPlaying) return
    
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % videoFrames.length)
    }, 2500) // Change frame every 2.5 seconds
    
    return () => clearInterval(interval)
  }, [isOpen, isPlaying, videoFrames.length])

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
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={videoFrames[currentFrame]}
                  alt={`Vídeo de ${therapist.name} - Frame ${currentFrame + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
                {/* Warm sensual overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-950/60 via-transparent to-pink-950/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600/10 to-pink-600/10 mix-blend-overlay" />
              </motion.div>
            </AnimatePresence>
            
            {/* Playing indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-pink-500"
              />
              <span className="text-white/80 text-xs font-medium">AO VIVO</span>
            </div>

            {/* Frame counter */}
            <div className="absolute top-4 right-16 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
              <span className="text-white/60 text-xs">
                {currentFrame + 1} / {videoFrames.length}
              </span>
            </div>

            {/* Therapist name overlay */}
            <div className="absolute bottom-4 left-4">
              <h3 className="text-2xl font-bold text-white mb-1">
                {therapist.name}
              </h3>
              <p className="text-pink-200/80 text-sm">
                {therapist.specialty || 'Massagista Profissional'}
              </p>
            </div>
          </div>
          
          {/* Video Controls Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={togglePlay}
              className="p-6 rounded-full bg-pink-600/80 backdrop-blur-sm text-white hover:bg-pink-500 transition-all shadow-lg shadow-pink-500/30"
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
                  className="p-2 rounded-full bg-white/20 text-white hover:bg-pink-500/80 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-white/20 text-white hover:bg-pink-500/80 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-400" />
                <span className="text-white/80 text-sm">Vídeo Apaixonante • {therapist.name}</span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentFrame + 1) / videoFrames.length) * 100}%` }}
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
            "absolute left-0 top-0 bottom-0 w-96 bg-slate-950/95 backdrop-blur-md border-r border-pink-900/30 p-6 overflow-y-auto",
            !showInfo && "pointer-events-none"
          )}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              {therapist.name}
            </span>
          </h2>
          <p className="text-pink-200/70 mb-6 leading-relaxed">
            {therapist.bio || 'Massagista profissional dedicada a proporcionar momentos únicos de relaxamento e prazer.'}
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-pink-950/50 border border-pink-900/20">
              <span className="text-pink-300/60">Especialidade</span>
              <span className="text-pink-400 font-semibold">{therapist.specialty || 'Massagem'}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-pink-950/50 border border-pink-900/20">
              <span className="text-pink-300/60">Experiência</span>
              <span className="text-pink-400 font-semibold">{therapist.experience_years || 5} anos</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-pink-950/50 border border-pink-900/20">
              <span className="text-pink-300/60">Localização</span>
              <span className="text-pink-400 font-semibold">{therapist.location || 'Lisboa'}</span>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-pink-600/10 to-rose-600/10 border border-pink-500/20">
            <h4 className="text-pink-400 font-semibold mb-2 flex items-center gap-2">
              <Video className="w-4 h-4" />
              Vídeo Sensual
            </h4>
            <p className="text-sm text-pink-200/50">
              Apresentação sensual e profissional da massagista {therapist.name}, 
              mostrando suas técnicas e movimentos com elegância e sedução.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
