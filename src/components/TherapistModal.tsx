'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Heart, User, Calendar, Sparkles, Star, Phone, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Therapist } from '@/lib/supabase'
import Image from 'next/image'

interface TherapistModalProps {
  therapist: Therapist | null
  isOpen: boolean
  onClose: () => void
}

export default function TherapistModal({ therapist, isOpen, onClose }: TherapistModalProps) {
  if (!therapist) return null

  const hasImage = therapist.image_url && therapist.image_url.trim() !== ''

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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden z-50 border border-slate-700 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="overflow-y-auto h-full">
              {/* Hero Section with Photo */}
              <div className="relative h-80">
                {hasImage ? (
                  <Image
                    src={therapist.image_url!}
                    alt={therapist.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className={cn(
                    'w-full h-full flex items-center justify-center',
                    therapist.gender === 'female'
                      ? 'bg-gradient-to-br from-pink-500/30 to-rose-600/30'
                      : 'bg-gradient-to-br from-blue-500/30 to-cyan-600/30'
                  )}>
                    <div className={cn(
                      'w-40 h-40 rounded-full flex items-center justify-center shadow-2xl',
                      therapist.gender === 'female'
                        ? 'bg-gradient-to-br from-pink-500 to-rose-600'
                        : 'bg-gradient-to-br from-blue-500 to-cyan-600'
                    )}>
                      {therapist.gender === 'female' ? (
                        <Heart className="w-20 h-20 text-white" />
                      ) : (
                        <User className="w-20 h-20 text-white" />
                      )}
                    </div>
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                {/* VIP Badge */}
                {therapist.experience_years && therapist.experience_years >= 5 && (
                  <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm font-bold flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Massagista VIP
                  </div>
                )}

                {/* Name & Title */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-4xl font-bold text-white mb-2">{therapist.name}</h2>
                  <p className={cn(
                    'text-lg',
                    therapist.gender === 'female' ? 'text-pink-400' : 'text-blue-400'
                  )}>
                    Massagista {therapist.gender === 'female' ? 'Feminina' : 'Masculino'} 
                    {therapist.experience_years && ` • ${therapist.experience_years} anos exp.`}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4">
                  {therapist.location && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                      <div className="p-2 rounded-lg bg-purple-500/20">
                        <MapPin className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Localização</p>
                        <p className="text-white font-medium">{therapist.location}</p>
                      </div>
                    </div>
                  )}
                  {therapist.specialty && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                      <div className="p-2 rounded-lg bg-pink-500/20">
                        <Star className="w-5 h-5 text-pink-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Especialidade</p>
                        <p className="text-white font-medium">{therapist.specialty}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bio */}
                {therapist.bio && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-pink-400" />
                      Sobre
                    </h3>
                    <p className="text-slate-300 leading-relaxed">{therapist.bio}</p>
                  </div>
                )}

                {/* Services */}
                {therapist.services && therapist.services.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Serviços Oferecidos
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {therapist.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="pt-4">
                  <a
                    href={`https://wa.me/351912345678?text=Olá! Gostaria de reservar com ${therapist.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 transition-all shadow-lg shadow-pink-500/25"
                  >
                    <Phone className="w-5 h-5" />
                    Reservar com {therapist.name}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
