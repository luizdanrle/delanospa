'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Clock, Mail, Navigation, Car, Train } from 'lucide-react'
import { LOCATIONS } from '@/data/siteData'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function LocationsMap() {
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0])
  const [activeTab, setActiveTab] = useState<'info' | 'photos' | 'directions'>('info')

  const cities = Array.from(new Set(LOCATIONS.map(l => l.city)))

  return (
    <section id="locais" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 via-slate-950 to-slate-950" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-emerald-400 font-medium tracking-wider uppercase text-sm">
            Onde Estamos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            As Nossas Unidades
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Presentes em Lisboa, Porto e Algarve. Escolha a unidade mais conveniente 
            e agende a sua experiência de bem-estar.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Locations List */}
          <div className="lg:col-span-1 space-y-4">
            {/* City Filter */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setSelectedLocation(LOCATIONS[0])}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  selectedLocation.id === LOCATIONS[0].id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                )}
              >
                Todas
              </button>
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => {
                    const loc = LOCATIONS.find(l => l.city === city)
                    if (loc) setSelectedLocation(loc)
                  }}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    selectedLocation.city === city
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  )}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* Location Cards */}
            <div className="space-y-3">
              {LOCATIONS.map((location) => (
                <motion.button
                  key={location.id}
                  onClick={() => {
                    setSelectedLocation(location)
                    setActiveTab('info')
                  }}
                  whileHover={{ x: 4 }}
                  className={cn(
                    'w-full p-4 rounded-xl text-left transition-all border',
                    selectedLocation.id === location.id
                      ? 'bg-emerald-600/20 border-emerald-500/50'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      'p-2 rounded-lg',
                      selectedLocation.id === location.id ? 'bg-emerald-500/20' : 'bg-slate-800'
                    )}>
                      <MapPin className={cn(
                        'w-5 h-5',
                        selectedLocation.id === location.id ? 'text-emerald-400' : 'text-slate-400'
                      )} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{location.name}</h3>
                      <p className="text-sm text-slate-400 mt-1">{location.neighborhood}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {location.hours.weekday}
                        </span>
                      </div>
                    </div>
                    {location.isMain && (
                      <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs">
                        Sede
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-2">
            <motion.div
              key={selectedLocation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-64">
                <Image
                  src={selectedLocation.images[0]}
                  alt={selectedLocation.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedLocation.name}</h3>
                  <p className="text-slate-300">{selectedLocation.address}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedLocation.features.map(feature => (
                      <span key={feature} className="px-2 py-1 rounded-full bg-white/20 text-white text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-800">
                {(['info', 'photos', 'directions'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      'flex-1 py-3 text-sm font-medium capitalize transition-colors',
                      activeTab === tab 
                        ? 'text-emerald-400 border-b-2 border-emerald-400' 
                        : 'text-slate-400 hover:text-white'
                    )}
                  >
                    {tab === 'info' ? 'Informações' : tab === 'photos' ? 'Fotos' : 'Como Chegar'}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'info' && (
                    <motion.div
                      key="info"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* Contact Info */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <a 
                          href={`tel:${selectedLocation.phone}`}
                          className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-blue-500/20">
                            <Phone className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Telefone</p>
                            <p className="text-white font-medium">{selectedLocation.phone}</p>
                          </div>
                        </a>

                        <a 
                          href={`https://wa.me/${selectedLocation.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-green-500/20">
                            <Navigation className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">WhatsApp</p>
                            <p className="text-white font-medium">{selectedLocation.whatsapp}</p>
                          </div>
                        </a>

                        <a 
                          href={`mailto:${selectedLocation.email}`}
                          className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-amber-500/20">
                            <Mail className="w-5 h-5 text-amber-400" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Email</p>
                            <p className="text-white font-medium text-sm">{selectedLocation.email}</p>
                          </div>
                        </a>

                        <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50">
                          <div className="p-2 rounded-lg bg-purple-500/20">
                            <Clock className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Horário</p>
                            <p className="text-white font-medium text-sm">
                              Seg-Sab: {selectedLocation.hours.weekday}
                            </p>
                            {selectedLocation.hours.sunday && (
                              <p className="text-slate-400 text-xs">
                                Dom: {selectedLocation.hours.sunday}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-400 leading-relaxed">
                        {selectedLocation.description}
                      </p>

                      {/* Map Placeholder */}
                      <div className="aspect-video rounded-xl bg-slate-800 flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                          <p className="text-slate-500">Mapa Interativo</p>
                          <p className="text-slate-600 text-sm">
                            {selectedLocation.coordinates.lat}, {selectedLocation.coordinates.lng}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'photos' && (
                    <motion.div
                      key="photos"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      {selectedLocation.images.map((img, i) => (
                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                          <Image
                            src={img}
                            alt={`${selectedLocation.name} - Foto ${i + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'directions' && (
                    <motion.div
                      key="directions"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="p-4 rounded-xl bg-slate-800/50">
                        <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                          <Car className="w-5 h-5 text-blue-400" />
                          De Carro
                        </h4>
                        <ul className="space-y-2 text-slate-400 text-sm">
                          <li>• GPS: {selectedLocation.address}</li>
                          <li>• Estacionamento disponível na rua ou parques próximos</li>
                          <li>• Acesso fácil desde a principal via rápida</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-800/50">
                        <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                          <Train className="w-5 h-5 text-green-400" />
                          Transportes Públicos
                        </h4>
                        <ul className="space-y-2 text-slate-400 text-sm">
                          <li>• Metro: Linha mais próxima (consultar mapa)</li>
                          <li>• Autocarros: Várias linhas na zona</li>
                          <li>• Comboio: Estação a 10 min a pé (quando aplicável)</li>
                        </ul>
                      </div>

                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.coordinates.lat},${selectedLocation.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center font-medium hover:from-emerald-500 hover:to-teal-500 transition-all"
                      >
                        Abrir no Google Maps
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
