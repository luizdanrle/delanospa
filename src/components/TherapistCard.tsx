'use client'

import { motion } from 'framer-motion'
import { MapPin, Heart, User, Sparkles, Calendar, Star, Scale } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Therapist } from '@/lib/supabase'
import Image from 'next/image'
import { FavoriteButton } from '@/components/FavoritesSystem'
import { CompareButton } from '@/components/ComparePanel'
import { BookingButtons } from '@/components/BookingButtons'

interface TherapistCardProps {
  therapist: Therapist
  index: number
  onClick?: (therapist: Therapist) => void
}

export default function TherapistCard({ therapist, index, onClick }: TherapistCardProps) {
  const hasImage = therapist.image_url && therapist.image_url.trim() !== ''
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={() => onClick?.(therapist)}
    >
      <div className="relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-pink-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10">
        {/* Photo Header */}
        <div className="relative h-64 overflow-hidden">
          {hasImage ? (
            <Image
              src={therapist.image_url!}
              alt={therapist.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className={cn(
              'w-full h-full flex items-center justify-center',
              therapist.gender === 'female'
                ? 'bg-gradient-to-br from-pink-500/20 to-rose-600/20'
                : 'bg-gradient-to-br from-blue-500/20 to-cyan-600/20'
            )}>
              <div className={cn(
                'w-32 h-32 rounded-full flex items-center justify-center shadow-2xl',
                therapist.gender === 'female'
                  ? 'bg-gradient-to-br from-pink-500 to-rose-600'
                  : 'bg-gradient-to-br from-blue-500 to-cyan-600'
              )}>
                {therapist.gender === 'female' ? <Heart className="w-16 h-16 text-white" /> : <User className="w-16 h-16 text-white" />}
              </div>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            {/* VIP Badge */}
            {therapist.experience_years && therapist.experience_years >= 5 && (
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold flex items-center gap-1">
                <Star className="w-3 h-3" />
                VIP
              </div>
            )}
            
            {/* Favorite Button */}
            <FavoriteButton 
              item={{
                id: therapist.id,
                name: therapist.name,
                image: therapist.image_url || undefined,
                specialty: therapist.specialty || 'Massagista',
                location: therapist.location || 'Local',
                rating: 4.8
              }}
              className="bg-slate-900/80 backdrop-blur-sm border border-slate-700"
            />
            
            {/* Compare Button */}
            <CompareButton 
              item={{
                id: therapist.id,
                name: therapist.name,
                image: therapist.image_url || undefined,
                specialty: therapist.specialty || 'Massagista',
                location: therapist.location || 'Local',
                rating: 4.8,
                reviews: 150,
                price: 120,
                duration: 60,
                experience: therapist.experience_years || 0,
                services: therapist.services || [],
                languages: ['Português'],
                availability: 'Disponível'
              }}
              className="bg-slate-900/80 backdrop-blur-sm border border-slate-700"
            />
          </div>
          
          {/* Name Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-2xl font-bold text-white mb-1">{therapist.name}</h3>
            <span className={cn(
              'text-sm font-medium',
              therapist.gender === 'female' ? 'text-pink-400' : 'text-blue-400'
            )}>
              Massagista {therapist.gender === 'female' ? 'Feminina' : 'Masculino'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Bio Preview */}
          {therapist.bio && (
            <p className="text-slate-400 text-sm mb-4 line-clamp-2">
              {therapist.bio}
            </p>
          )}

          {/* Experience */}
          {therapist.experience_years && (
            <div className="flex items-center gap-2 text-slate-400 mb-3">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span className="text-sm">{therapist.experience_years} anos de experiência</span>
            </div>
          )}

          {/* Details */}
          <div className="space-y-3">
            {therapist.location && (
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-sm">{therapist.location}</span>
              </div>
            )}
            {therapist.specialty && (
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm">
                  Especialidade: {therapist.specialty}
                </span>
              </div>
            )}
            {therapist.services && therapist.services.length > 0 && (
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span className="text-sm text-slate-400">
                  {therapist.services.slice(0, 2).join(', ')}
                  {therapist.services.length > 2 && ` +${therapist.services.length - 2}`}
                </span>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-5" onClick={(e) => e.stopPropagation()}>
            <BookingButtons 
              therapistName={therapist.name}
              size="md"
              variant="vertical"
              className="w-full"
            />
          </div>
          
          {/* View Details Hint */}
          <p className="text-center text-xs text-slate-500 mt-2">
            Clique no card para ver detalhes
          </p>
        </div>
      </div>
    </motion.div>
  )
}
