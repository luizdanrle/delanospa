'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ArrowRight, DollarSign, Flame, Heart, Sparkles, Droplets, Shield, Users, Gem, Video, Info, ChevronDown, Play, X, Star } from 'lucide-react'
import { cn, formatCurrency, formatDuration } from '@/lib/utils'
import { Service } from '@/lib/supabase'
import ServiceVideo3D from './ServiceVideo3D'

// Icon mapping based on service name or category
const iconMap: Record<string, React.ElementType> = {
  'tantric': Flame,
  'tântrica': Flame,
  'body-to-body': Heart,
  'body': Heart,
  'lingam': Droplets,
  'yoni': Sparkles,
  'relaxation': Shield,
  'relaxamento': Shield,
  'couples': Users,
  'casais': Users,
  'nuru': Droplets,
  'sport': Gem,
  'desportiva': Gem,
  'holistic': Sparkles,
  'holística': Sparkles,
  'reflexology': Heart,
  'reflexologia': Heart,
  'reiki': Sparkles,
  'massotherapy': Gem,
  'massage': Flame,
  'default': Sparkles
}

// Color mapping - RED TONES for sexy/erotic theme
const colorMap: Record<string, string> = {
  'massage': 'from-red-600 to-rose-700',
  'therapy': 'from-rose-600 to-red-700',
  'tantric': 'from-red-500 to-rose-600',
  'body-to-body': 'from-rose-500 to-red-600',
  'lingam': 'from-red-600 to-orange-600',
  'yoni': 'from-rose-500 to-pink-600',
  'relaxation': 'from-red-500 to-rose-600',
  'couples': 'from-red-600 to-pink-600',
  'nuru': 'from-rose-600 to-red-700',
  'sport': 'from-red-500 to-orange-600',
  'default': 'from-red-600 to-rose-600'
}

interface ServiceCardProps {
  service: Service
  index: number
  isPopular?: boolean
  isNew?: boolean
}

export default function ServiceCard({ service, index, isPopular, isNew }: ServiceCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  // Get icon based on service name or category
  const serviceKey = service.name?.toLowerCase() || ''
  const categoryKey = service.category || 'default'
  const Icon = iconMap[serviceKey] || iconMap[categoryKey] || iconMap['default']
  
  // Get color based on service color field or category
  const color = service.color || colorMap[categoryKey] || colorMap['default']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div 
        onClick={() => setShowDetails(true)}
        className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-red-900/30 overflow-hidden hover:border-red-500/50 transition-all duration-500 cursor-pointer group/card"
      >
        {/* Gradient background on hover */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500',
          color
        )} />

        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {isPopular && (
            <span className="px-2 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400" />
              TOP
            </span>
          )}
          {isNew && (
            <span className="px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold">
              NOVA
            </span>
          )}
        </div>

        {/* Icon */}
        <div className={cn(
          'w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-5 shadow-lg transition-transform duration-500 group-hover:scale-110',
          color
        )}>
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover/card:text-rose-300 transition-colors">
          {service.name}
        </h3>
        
        <p className="text-slate-400 text-sm mb-5 line-clamp-3">
          {service.description}
        </p>

        {/* Duration + Price Display */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-rose-300/60 text-sm">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(service.duration)}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-300 text-sm font-bold border border-green-500/30">
            <DollarSign className="w-4 h-4" />
            €{service.price}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <a
            href={`https://wa.me/351912345678?text=Olá! Gostaria de reservar ${service.name}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium text-white transition-all duration-300',
              'bg-gradient-to-r opacity-90 hover:opacity-100 shadow-lg shadow-red-500/20 hover:shadow-red-500/40',
              color
            )}
          >
            Reservar Agora
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowVideo(true)}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-950/50 border border-red-900/30 text-rose-300 hover:bg-red-900/50 hover:text-white transition-all text-sm"
            >
              <Play className="w-4 h-4" />
              Ver Vídeo
            </button>
            <button
              onClick={() => setShowDetails(true)}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-950/50 border border-red-900/30 text-rose-300 hover:bg-red-900/50 hover:text-white transition-all text-sm"
            >
              <Info className="w-4 h-4" />
              Detalhes
            </button>
          </div>
        </div>
      </div>

      {/* Video 3D Modal */}
      <ServiceVideo3D 
        service={service} 
        isOpen={showVideo} 
        onClose={() => setShowVideo(false)} 
      />

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetails(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-slate-900 rounded-2xl overflow-hidden z-50 border border-slate-700 shadow-2xl"
            >
              {/* Header */}
              <div className={cn(
                'relative p-6 bg-gradient-to-r',
                service.color
              )}>
                <button
                  onClick={() => setShowDetails(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{service.name}</h3>
                    <p className="text-white/80">{service.category === 'massage' ? 'Massagem' : 'Terapia'}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Description */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <Info className="w-5 h-5 text-pink-400" />
                    Descrição
                  </h4>
                  <p className="text-slate-300 leading-relaxed">{service.description}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-800">
                    <p className="text-sm text-slate-400 mb-1">Duração</p>
                    <p className="text-xl font-bold text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-purple-400" />
                      {service.duration} min
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800">
                    <p className="text-sm text-slate-400 mb-1">Preço</p>
                    <p className="text-xl font-bold text-white flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      €{service.price}
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                {service.benefits && service.benefits.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      Benefícios
                    </h4>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Includes */}
                {service.includes && service.includes.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-400" />
                      Inclui
                    </h4>
                    <ul className="space-y-2">
                      {service.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <a
                  href={`https://wa.me/351912345678?text=Olá! Gostaria de reservar ${service.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-white transition-all',
                    'bg-gradient-to-r',
                    service.color
                  )}
                >
                  Reservar Agora
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
