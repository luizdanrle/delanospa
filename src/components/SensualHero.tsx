'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Heart, MapPin, Play, ArrowRight, ChevronLeft, ChevronRight, Phone, Star, Shield, Clock } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Therapist } from '@/lib/supabase'
import { sensualImages } from '@/lib/sensualAssets'
import LiveStats from './LiveStats'

interface SensualHeroProps {
  featuredTherapists: Therapist[]
}

// Imagens de fundo para slideshow de massagem tântrica
const HERO_BACKGROUND_SLIDESHOW = [
  sensualImages.tantricBg.hero1,
  sensualImages.tantricBg.hero2,
  sensualImages.tantricBg.hero3,
  sensualImages.tantricBg.hero4,
]

// Partículas predefinidas para evitar erro de hidratação
const PRESET_PARTICLES = [
  { left: '10%', top: '80%', duration: 8, delay: 0 },
  { left: '20%', top: '60%', duration: 10, delay: 1 },
  { left: '30%', top: '70%', duration: 9, delay: 2 },
  { left: '40%', top: '50%', duration: 11, delay: 0.5 },
  { left: '50%', top: '80%', duration: 7, delay: 1.5 },
  { left: '60%', top: '40%', duration: 12, delay: 2.5 },
  { left: '70%', top: '75%', duration: 8, delay: 0.8 },
  { left: '80%', top: '55%', duration: 10, delay: 1.8 },
  { left: '90%', top: '85%', duration: 9, delay: 2.8 },
  { left: '15%', top: '30%', duration: 11, delay: 3 },
  { left: '25%', top: '45%', duration: 8, delay: 3.5 },
  { left: '35%', top: '65%', duration: 10, delay: 4 },
  { left: '45%', top: '35%', duration: 9, delay: 1.2 },
  { left: '55%', top: '55%', duration: 11, delay: 2.2 },
  { left: '65%', top: '25%', duration: 8, delay: 3.2 },
  { left: '75%', top: '45%', duration: 10, delay: 0.3 },
  { left: '85%', top: '70%', duration: 9, delay: 1.3 },
  { left: '5%', top: '50%', duration: 12, delay: 2.3 },
  { left: '95%', top: '40%', delay: 1.7, duration: 5 },
  { left: '50%', top: '90%', delay: 2.3, duration: 8 },
]

export default function SensualHero({ featuredTherapists }: SensualHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Background slideshow - tantric massage images
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % HERO_BACKGROUND_SLIDESHOW.length)
    }, 5000) // Change every 5 seconds
    
    return () => clearInterval(bgTimer)
  }, [])

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying || featuredTherapists.length <= 1) return
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredTherapists.length)
    }, 6000)
    
    return () => clearInterval(timer)
  }, [isAutoPlaying, featuredTherapists.length])

  const currentTherapist = featuredTherapists[currentIndex]
  
  // Fallback therapist with sensual images
  const displayTherapist = currentTherapist || {
    id: '0',
    name: 'Nossa Equipe',
    gender: 'female' as const,
    bio: 'Massagistas profissionais prontas para proporcionar momentos únicos de prazer e relaxamento.',
    image_url: sensualImages.hero.female1,
    is_active: true,
    location: 'Lisboa & Porto',
    specialty: 'Sensual',
    services: [],
    order_index: 0,
    created_at: '',
    updated_at: ''
  }

  const hasImage = displayTherapist.image_url && displayTherapist.image_url.trim() !== ''

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % featuredTherapists.length)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + featuredTherapists.length) % featuredTherapists.length)
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background Effects - Slideshow Massagem Tântrica */}
      <div className="absolute inset-0">
        {/* Slideshow de imagens de massagem */}
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_BACKGROUND_SLIDESHOW[bgIndex]}
              alt="Massagem Tântrica"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* Overlay escuro para legibilidade do texto */}
            <div className="absolute inset-0 bg-slate-950/70" />
            {/* Gradiente sensual vermelho */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-transparent to-rose-950/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
          </motion.div>
        </AnimatePresence>
        
        {/* Partículas animadas */}
        <div className="absolute top-0 left-0 w-full h-full">
          {mounted && PRESET_PARTICLES.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-[1px]"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                y: [0, -150, 0],
                x: [0, 50, 0],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
        
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* URGENCY Badge - Premium */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600/30 to-rose-600/30 border border-red-500/50 shadow-lg shadow-red-500/20"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2.5 h-2.5 rounded-full bg-red-500"
                />
                <span className="text-red-200 text-sm font-bold tracking-wide">APENAS 3 VAGAS HOJE</span>
              </motion.div>

              {/* EXCLUSIVE Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300 text-sm font-medium">EXCLUSIVO • MEMBROS VIP</span>
              </motion.div>

              {/* Main Title - Mais Provocante */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                >
                  <span className="bg-gradient-to-r from-rose-300 via-red-300 to-rose-300 bg-clip-text text-transparent">
                    Prazer sem
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent">
                    Limites
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-rose-200/80 max-w-lg"
                >
                  Massagistas exclusivas que dominam o arte da sedução. 
                  Corpos sensuais, toques provocantes e finalizações que você nunca esquecerá.
                </motion.p>
              </div>

              {/* SOCIAL PROOF - Client Counter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4"
              >
                {/* Client Avatars */}
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-rose-600 border-2 border-slate-950 flex items-center justify-center text-white text-xs font-bold">
                      {i === 4 ? '+' : 'H'}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-white font-bold">+2.847 Homens Satisfeitos</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="text-rose-300/60 text-sm ml-1">4.9/5</span>
                  </div>
                </div>
              </motion.div>

              {/* AO VIVO - Live indicator */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
              >
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <p className="text-green-400 text-sm font-semibold">AO VIVO AGORA</p>
                  <p className="text-green-300/60 text-xs">{featuredTherapists.length} massagistas disponíveis</p>
                </div>
              </motion.div>

              {/* Featured Model Info - Premium Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-red-500/30 backdrop-blur-sm shadow-lg shadow-red-500/10"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/30">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">{displayTherapist.name}</p>
                      <p className="text-red-400 text-sm font-medium">🔥 Disponível para Você</p>
                    </div>
                    {displayTherapist.experience_years && displayTherapist.experience_years >= 5 && (
                      <div className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/30 to-yellow-500/30 text-amber-300 text-xs font-bold border border-amber-500/30">
                        <Star className="w-3 h-3 fill-amber-300" />
                        VIP EXCLUSIVE
                      </div>
                    )}
                  </div>
                  <p className="text-rose-200/80 text-sm line-clamp-2 italic">&ldquo;{displayTherapist.bio}&rdquo;</p>
                  {displayTherapist.location && (
                    <div className="mt-3 flex items-center gap-2 text-rose-300/70 text-sm">
                      <MapPin className="w-4 h-4 text-red-400" />
                      {displayTherapist.location} • Atendimento Imediato
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* PREMIUM CTAs - Mais chamativos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#massagistas"
                  className="group relative flex items-center gap-3 px-8 py-5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-bold text-lg hover:from-red-500 hover:via-rose-500 hover:to-red-600 transition-all shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 overflow-hidden"
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <Play className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Escolher sua Massagista</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
                </a>
                <a
                  href="https://wa.me/351912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-5 rounded-full bg-slate-800 text-white font-semibold hover:bg-red-900/50 transition-all border border-slate-700 hover:border-red-500/50 shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  WhatsApp Direto
                </a>
              </motion.div>

              {/* PREMIUM Trust Badges Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800"
              >
                {[
                  { icon: Shield, text: '100% Discreto' },
                  { icon: Clock, text: 'Atendimento 24h' },
                  { icon: Star, text: 'Certificadas' },
                  { icon: MapPin, text: '6 Locais' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 text-rose-300/80 text-xs font-medium">
                    <badge.icon className="w-3.5 h-3.5 text-red-400" />
                    {badge.text}
                  </div>
                ))}
              </motion.div>

              {/* Navigation Dots */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {featuredTherapists.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAutoPlaying(false)
                        setCurrentIndex(index)
                      }}
                      className={cn(
                        'w-2 h-2 rounded-full transition-all',
                        index === currentIndex
                          ? 'w-8 bg-gradient-to-r from-pink-500 to-purple-500'
                          : 'bg-slate-600 hover:bg-slate-500'
                      )}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Right Content - Featured Model Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                  >
                    {hasImage ? (
                      <Image
                        src={displayTherapist.image_url!}
                        alt={displayTherapist.name}
                        fill
                        className="object-cover object-top"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className={cn(
                        'w-full h-full flex items-center justify-center',
                        displayTherapist.gender === 'female'
                          ? 'bg-gradient-to-br from-rose-500/30 via-pink-500/30 to-purple-600/30'
                          : 'bg-gradient-to-br from-rose-500/30 via-pink-500/30 to-purple-600/30'
                      )}>
                        <div className="text-center">
                          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-slate-900/50 backdrop-blur-sm flex items-center justify-center border border-rose-500/30">
                            <Heart className="w-16 h-16 text-rose-400" />
                          </div>
                          <p className="text-rose-200">{displayTherapist.name}</p>
                        </div>
                      </div>
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">{featuredTherapists.length}+</p>
                        <p className="text-xs text-slate-400">Massagistas</p>
                      </div>
                      <div className="w-px h-10 bg-slate-700" />
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">4</p>
                        <p className="text-xs text-slate-400">Locais</p>
                      </div>
                      <div className="w-px h-10 bg-slate-700" />
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">15+</p>
                        <p className="text-xs text-slate-400">Serviços</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Online Indicator */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute top-6 right-6 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-400 text-sm font-medium">Disponível Agora</span>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
            </motion.div>
          </div>

          {/* LIVE STATS - Real-time activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-12"
          >
            <LiveStats />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-xs uppercase tracking-wider">Explorar</span>
          <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-pink-500"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
