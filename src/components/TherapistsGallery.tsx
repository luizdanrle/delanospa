'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, Star, Clock, Globe, Check, X,
  Filter, Search, ChevronRight, Award, Sparkles
} from 'lucide-react'
import { THERAPISTS, MASSAGE_SERVICES } from '@/data/siteData'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { FavoriteButton, useFavorites } from './FavoritesSystem'
import { CompareButton, useCompare } from './ComparePanel'

export default function TherapistsGallery() {
  const [selectedTherapist, setSelectedTherapist] = useState<typeof THERAPISTS[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    location: 'all',
    specialty: 'all',
    available: false
  })
  const [showFilters, setShowFilters] = useState(false)

  const { toggleFavorite, isFavorite } = useFavorites()
  const { isInCompare } = useCompare()

  // Get unique locations and specialties
  const locations = ['all', ...Array.from(new Set(THERAPISTS.map(t => t.location.split(' - ')[0])))]
  const specialties = ['all', ...Array.from(new Set(THERAPISTS.flatMap(t => t.specialties)))]

  const filteredTherapists = THERAPISTS.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapist.bio.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = filters.location === 'all' || therapist.location.includes(filters.location)
    const matchesSpecialty = filters.specialty === 'all' || therapist.specialties.includes(filters.specialty)
    const matchesAvailable = !filters.available || therapist.isAvailable
    
    return matchesSearch && matchesLocation && matchesSpecialty && matchesAvailable
  })

  const getSpecialtyName = (id: string) => {
    const service = MASSAGE_SERVICES.find(s => s.id === id)
    return service?.name || id
  }

  return (
    <section id="terapeutas" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-pink-900/10 via-slate-950 to-slate-950" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-pink-400 font-medium tracking-wider uppercase text-sm">
            Nossa Equipa
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Massagistas Profissionais
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Terapeutas certificadas e experientes, prontas para proporcionar 
            momentos únicos de relaxamento e bem-estar.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Procurar massagista ou especialidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
                showFilters 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              )}
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>
            
            {/* Quick filters */}
            {['all', 'Lisboa', 'Porto', 'Algarve'].map((city) => (
              <button
                key={city}
                onClick={() => setFilters(prev => ({ ...prev, location: city }))}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  filters.location === city
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                )}
              >
                {city === 'all' ? 'Todas as cidades' : city}
              </button>
            ))}
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Location Filter */}
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Localização</label>
                      <select
                        value={filters.location}
                        onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-purple-500 outline-none"
                      >
                        <option value="all">Todas as cidades</option>
                        {locations.filter(l => l !== 'all').map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>

                    {/* Specialty Filter */}
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Especialidade</label>
                      <select
                        value={filters.specialty}
                        onChange={(e) => setFilters(prev => ({ ...prev, specialty: e.target.value }))}
                        className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-purple-500 outline-none"
                      >
                        <option value="all">Todas as especialidades</option>
                        {specialties.filter(s => s !== 'all').map(spec => (
                          <option key={spec} value={spec}>{getSpecialtyName(spec)}</option>
                        ))}
                      </select>
                    </div>

                    {/* Available Toggle */}
                    <div className="flex items-end">
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, available: !prev.available }))}
                        className={cn(
                          'flex items-center gap-3 p-3 rounded-xl border transition-all w-full',
                          filters.available
                            ? 'bg-green-500/20 border-green-500/50 text-green-400'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        )}
                      >
                        <div className={cn(
                          'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                          filters.available ? 'border-green-500 bg-green-500' : 'border-slate-500'
                        )}>
                          {filters.available && <Check className="w-3 h-3 text-white" />}
                        </div>
                        Apenas disponíveis agora
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count */}
        <p className="text-slate-400 text-sm mb-6">
          {filteredTherapists.length} massagista{filteredTherapists.length !== 1 ? 's' : ''} encontrado{filteredTherapists.length !== 1 ? 's' : ''}
        </p>

        {/* Therapists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTherapists.map((therapist, index) => (
              <motion.div
                key={therapist.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-800 hover:border-pink-500/50 transition-all"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={therapist.images[0]}
                    alt={therapist.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                  
                  {/* Top Actions */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between z-10">
                    <div className="flex gap-2">
                      {therapist.isFeatured && (
                        <span className="px-2 py-1 rounded-full bg-amber-500/90 text-white text-xs font-medium flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          Top
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <FavoriteButton 
                        item={{
                          id: therapist.id,
                          name: therapist.name,
                          specialty: therapist.specialties.map(getSpecialtyName).join(', '),
                          location: therapist.location,
                          rating: therapist.rating,
                          image: therapist.images[0]
                        }}
                        className="bg-black/30 backdrop-blur-sm"
                      />
                      <CompareButton
                        item={{
                          id: therapist.id,
                          name: therapist.name,
                          image: therapist.images[0],
                          specialty: therapist.specialties.map(getSpecialtyName).join(', '),
                          location: therapist.location,
                          rating: therapist.rating,
                          reviews: therapist.reviews,
                          price: 120,
                          duration: 60,
                          experience: therapist.experience,
                          services: therapist.specialties.map(getSpecialtyName),
                          languages: therapist.languages,
                          availability: therapist.availability
                        }}
                        className="bg-black/30 backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-semibold text-white mb-1">{therapist.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <MapPin className="w-4 h-4" />
                      {therapist.location}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  {/* Rating */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      <span className="text-white font-medium">{therapist.rating}</span>
                    </div>
                    <span className="text-slate-500 text-sm">({therapist.reviews} avaliações)</span>
                    <span className="ml-auto text-slate-400 text-sm">{therapist.experience} anos exp.</span>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1">
                    {therapist.specialties.slice(0, 3).map(spec => (
                      <span key={spec} className="px-2 py-1 rounded-full bg-slate-800 text-slate-300 text-xs">
                        {getSpecialtyName(spec)}
                      </span>
                    ))}
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className={cn(
                      therapist.isAvailable ? 'text-green-400' : 'text-slate-500'
                    )}>
                      {therapist.availability}
                    </span>
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => setSelectedTherapist(therapist)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-400 font-medium hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    Ver Perfil
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedTherapist && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedTherapist(null)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-slate-900 rounded-3xl overflow-hidden z-50 max-h-[90vh] overflow-y-auto"
              >
                <div className="grid md:grid-cols-2">
                  {/* Image Side */}
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={selectedTherapist.images[0]}
                      alt={selectedTherapist.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent md:bg-gradient-to-l" />
                    
                    <button
                      onClick={() => setSelectedTherapist(null)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors md:hidden"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Content Side */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">{selectedTherapist.name}</h2>
                        <div className="flex items-center gap-4 text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {selectedTherapist.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            {selectedTherapist.nationality}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedTherapist(null)}
                        className="hidden md:block p-2 rounded-full hover:bg-slate-800 transition-colors"
                      >
                        <X className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 rounded-xl bg-slate-800/50">
                        <Star className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                        <p className="text-white font-bold">{selectedTherapist.rating}</p>
                        <p className="text-slate-500 text-xs">{selectedTherapist.reviews} reviews</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-slate-800/50">
                        <Clock className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                        <p className="text-white font-bold">{selectedTherapist.experience}</p>
                        <p className="text-slate-500 text-xs">anos exp.</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-slate-800/50">
                        <Sparkles className="w-5 h-5 text-pink-500 mx-auto mb-1" />
                        <p className="text-white font-bold">{selectedTherapist.specialties.length}</p>
                        <p className="text-slate-500 text-xs">especialidades</p>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-slate-300 leading-relaxed mb-6">
                      {selectedTherapist.bio}
                    </p>

                    {/* Details */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="text-sm text-slate-500 mb-2">Idiomas</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTherapist.languages.map(lang => (
                            <span key={lang} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm text-slate-500 mb-2">Especialidades</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTherapist.specialties.map(spec => (
                            <span key={spec} className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">
                              {getSpecialtyName(spec)}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm text-slate-500 mb-2">Disponibilidade</h4>
                        <p className="text-white">{selectedTherapist.availability}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Idade:</span>
                          <span className="text-white ml-2">{selectedTherapist.age} anos</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Altura:</span>
                          <span className="text-white ml-2">{selectedTherapist.height}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Cabelo:</span>
                          <span className="text-white ml-2">{selectedTherapist.hair}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Olhos:</span>
                          <span className="text-white ml-2">{selectedTherapist.eyes}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <a
                        href={`https://wa.me/351912345678?text=Olá! Gostaria de agendar com ${selectedTherapist.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-center hover:from-purple-500 hover:to-pink-500 transition-all"
                      >
                        Agendar Agora
                      </a>
                      <FavoriteButton
                        item={{
                          id: selectedTherapist.id,
                          name: selectedTherapist.name,
                          specialty: selectedTherapist.specialties.map(getSpecialtyName).join(', '),
                          location: selectedTherapist.location,
                          rating: selectedTherapist.rating,
                          image: selectedTherapist.images[0]
                        }}
                        className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
