'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, MapPin, Star, ArrowLeft, Calendar, Clock, 
  DollarSign, Phone, MessageCircle, Share2, Bookmark,
  ChevronLeft, ChevronRight, Play, Pause, Image as ImageIcon,
  Info, Sparkles, CheckCircle, X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Therapist } from '@/lib/supabase'
import Image from 'next/image'
import { getRandomTherapistImage } from '@/lib/sensualAssets'

interface ModelProfileProps {
  therapist: Therapist | null
  allTherapists: Therapist[]
  isOpen: boolean
  onClose: () => void
  onSelectOther: (therapist: Therapist) => void
}

// Componente para simular vídeo/GIF com slideshow de imagens
function TherapistVideoShow({ therapistImage, therapistName }: { therapistImage: string, therapistName: string }) {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  
  // Frames do "vídeo" - usando a mesma imagem com diferentes filtros/posições para simular movimento
  const frames = [
    { filter: 'brightness(1) contrast(1)', scale: 1 },
    { filter: 'brightness(1.1) contrast(1.05)', scale: 1.02 },
    { filter: 'brightness(0.95) contrast(1.1)', scale: 1 },
    { filter: 'brightness(1.05) contrast(0.95)', scale: 1.01 },
  ]
  
  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length)
    }, 800) // Mudar frame a cada 800ms
    
    return () => clearInterval(interval)
  }, [isPlaying, frames.length])
  
  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-red-950/50 to-rose-950/50">
      {/* Simulated Video Frame */}
      <motion.div
        className="absolute inset-0"
        animate={{ 
          scale: frames[currentFrame].scale,
        }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={therapistImage}
          alt={therapistName}
          fill
          className="object-cover"
          style={{ filter: frames[currentFrame].filter }}
        />
        {/* Sensual overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/60 via-transparent to-red-950/40" />
      </motion.div>
      
      {/* Recording indicator */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-red-500"
        />
        <span className="text-white/80 text-xs font-medium">REC</span>
      </div>
      
      {/* Play/Pause button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors group"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-4 rounded-full bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
        </motion.div>
      </button>
      
      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white font-medium">Vídeo de Apresentação • {therapistName}</p>
        <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-red-500"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentFrame + 1) / frames.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
      
      {/* GIF badge */}
      <div className="absolute top-4 right-4 px-2 py-1 rounded bg-red-600/80 text-white text-xs font-bold">
        GIF
      </div>
    </div>
  )
}

export default function ModelProfile({ 
  therapist, 
  allTherapists, 
  isOpen, 
  onClose,
  onSelectOther 
}: ModelProfileProps) {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos' | 'services' | 'about'>('photos')
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Early return if no therapist
  if (!therapist) return null

  // Get recommended therapists (same location or specialty, excluding current)
  const recommendations = allTherapists
    .filter(t => 
      t.id !== therapist?.id && 
      t.is_active && 
      (t.location === therapist?.location || 
       t.specialty === therapist?.specialty ||
       t.gender === therapist?.gender)
    )
    .slice(0, 4)

  // Usar imagem do Supabase ou fallback sensual
  const mainImage = therapist?.image_url && therapist.image_url.trim() !== ''
    ? therapist.image_url
    : getRandomTherapistImage(therapist?.gender || 'female')
  
  const hasImage = true // Sempre temos imagem agora

  // Galeria de fotos (usar a mesma imagem principal para mock)
  const photos = [mainImage, mainImage, mainImage]

  const tabs = [
    { id: 'photos', label: 'Fotos', icon: ImageIcon },
    { id: 'videos', label: 'Vídeos', icon: Play },
    { id: 'services', label: 'Serviços', icon: Sparkles },
    { id: 'about', label: 'Sobre', icon: Info },
  ]

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto"
      >
        <div className="min-h-screen py-8 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header Actions */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-6"
            >
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={cn(
                    'p-3 rounded-full transition-all',
                    isLiked ? 'bg-pink-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                  )}
                >
                  <Heart className={cn('w-5 h-5', isLiked && 'fill-current')} />
                </button>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={cn(
                    'p-3 rounded-full transition-all',
                    isBookmarked ? 'bg-amber-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                  )}
                >
                  <Bookmark className={cn('w-5 h-5', isBookmarked && 'fill-current')} />
                </button>
                <button className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left - Photo Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                {/* Main Photo */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-slate-900">
                  {photos.length > 0 ? (
                    <>
                      <Image
                        src={photos[selectedPhoto] || therapist.image_url || '/placeholder.jpg'}
                        alt={therapist.name}
                        fill
                        className="object-cover"
                      />
                      {/* Photo Navigation */}
                      {photos.length > 1 && (
                        <>
                          <button
                            onClick={() => setSelectedPhoto(prev => prev > 0 ? prev - 1 : photos.length - 1)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button
                            onClick={() => setSelectedPhoto(prev => (prev + 1) % photos.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                          {/* Photo Indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {photos.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setSelectedPhoto(i)}
                                className={cn(
                                  'w-2 h-2 rounded-full transition-all',
                                  i === selectedPhoto ? 'w-8 bg-white' : 'bg-white/50'
                                )}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className={cn(
                      'w-full h-full flex items-center justify-center',
                      therapist.gender === 'female'
                        ? 'bg-gradient-to-br from-pink-500/20 to-purple-600/20'
                        : 'bg-gradient-to-br from-blue-500/20 to-cyan-600/20'
                    )}>
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
                          <Heart className="w-16 h-16 text-pink-400" />
                        </div>
                        <p className="text-slate-400">Fotos em breve</p>
                      </div>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {therapist.experience_years && therapist.experience_years >= 5 && (
                      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        VIP
                      </div>
                    )}
                    <div className="px-3 py-1 rounded-full bg-green-500/80 text-white text-xs font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Disponível
                    </div>
                  </div>
                </div>

                {/* Photo Thumbnails */}
                <div className="flex gap-3">
                  {photos.map((photo, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedPhoto(i)}
                      className={cn(
                        'relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all',
                        selectedPhoto === i ? 'border-pink-500' : 'border-transparent'
                      )}
                    >
                      <Image
                        src={photo || '/placeholder.jpg'}
                        alt={`${therapist.name} ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                  {/* Video Thumbnail */}
                  <button className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-transparent bg-slate-800 flex items-center justify-center group">
                    <Play className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-white">Vídeo</span>
                  </button>
                </div>
              </motion.div>

              {/* Right - Info & Actions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {/* Basic Info */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h1 className="text-4xl font-bold text-white mb-2">{therapist.name}</h1>
                      <p className="text-pink-400 text-lg">
                        Massagista {therapist.gender === 'female' ? 'Feminina' : 'Masculina'}
                        {therapist.experience_years && ` • ${therapist.experience_years} anos exp.`}
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                        <Heart className="w-6 h-6 text-pink-400" />
                      </div>
                      <span className="text-slate-400 text-xs mt-1">2.4k</span>
                    </div>
                  </div>

                  {therapist.location && (
                    <div className="flex items-center gap-2 text-slate-400 mb-4">
                      <MapPin className="w-4 h-4" />
                      {therapist.location}
                    </div>
                  )}

                  {therapist.specialty && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">
                      <Star className="w-4 h-4" />
                      Especialista em {therapist.specialty}
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
                    <Clock className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">60-90min</p>
                    <p className="text-slate-400 text-xs">Sessões</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
                    <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">€100+</p>
                    <p className="text-slate-400 text-xs">A partir</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
                    <Calendar className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">Hoje</p>
                    <p className="text-slate-400 text-xs">Disponível</p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 p-1 rounded-xl bg-slate-900/50 border border-slate-800">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all',
                        activeTab === tab.id
                          ? 'bg-pink-500 text-white'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      )}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[200px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'photos' && (
                      <motion.div
                        key="photos"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-6 rounded-xl bg-slate-900/50 border border-slate-800"
                      >
                        <p className="text-slate-400 text-center">
                          Galeria de fotos profissionais disponível em breve
                        </p>
                      </motion.div>
                    )}

                    {activeTab === 'videos' && (
                      <motion.div
                        key="videos"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-6 rounded-xl bg-slate-900/50 border border-slate-800"
                      >
                        {/* Simulated Video/GIF - Image Slideshow */}
                        <TherapistVideoShow therapistImage={mainImage} therapistName={therapist.name} />
                      </motion.div>
                    )}

                    {activeTab === 'services' && (
                      <motion.div
                        key="services"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-3"
                      >
                        {therapist.services?.map((service, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800"
                          >
                            <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-pink-400" />
                            </div>
                            <span className="text-white">{service}</span>
                          </div>
                        )) || (
                          <p className="text-slate-400 text-center p-6">
                            Serviços disponíveis em breve
                          </p>
                        )}
                      </motion.div>
                    )}

                    {activeTab === 'about' && (
                      <motion.div
                        key="about"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-6 rounded-xl bg-slate-900/50 border border-slate-800"
                      >
                        <p className="text-slate-300 leading-relaxed">
                          {therapist.bio || `${therapist.name} é uma massagista especializada 
                          em proporcionar momentos de intenso relaxamento e prazer. Com técnicas 
                          únicas e um toque especial, ela garante uma experiência inesquecível 
                          em cada sessão.`}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/351912345678?text=Olá! Gostaria de agendar com ${therapist.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold hover:from-pink-500 hover:to-purple-500 transition-all shadow-lg shadow-pink-500/25"
                  >
                    <Phone className="w-5 h-5" />
                    Agendar com {therapist.name}
                  </a>
                  <button className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-all border border-slate-700">
                    <MessageCircle className="w-5 h-5" />
                    Enviar Mensagem
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-16"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-white">
                    Você também pode gostar
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Baseado em {therapist.location || 'sua preferência'}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recommendations.map((rec, i) => {
                    const recHasImage = rec.image_url && rec.image_url.trim() !== ''
                    return (
                      <motion.button
                        key={rec.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        onClick={() => onSelectOther(rec)}
                        className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-pink-500/50 transition-all"
                      >
                        {recHasImage ? (
                          <Image
                            src={rec.image_url!}
                            alt={rec.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className={cn(
                            'w-full h-full flex items-center justify-center',
                            rec.gender === 'female'
                              ? 'bg-gradient-to-br from-pink-500/20 to-purple-600/20'
                              : 'bg-gradient-to-br from-blue-500/20 to-cyan-600/20'
                          )}>
                            <Heart className="w-12 h-12 text-pink-400" />
                          </div>
                        )}
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white font-semibold">{rec.name}</p>
                          {rec.specialty && (
                            <p className="text-pink-400 text-xs">{rec.specialty}</p>
                          )}
                        </div>

                        {rec.experience_years && rec.experience_years >= 5 && (
                          <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-amber-500 text-white text-xs font-bold">
                            VIP
                          </div>
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
