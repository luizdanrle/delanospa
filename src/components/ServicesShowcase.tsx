'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, Euro, Check, ChevronRight, Star, 
  Sparkles, Flame, Heart, Users, X
} from 'lucide-react'
import { MASSAGE_SERVICES } from '@/data/siteData'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { BookingButtons } from '@/components/BookingButtons'

export default function ServicesShowcase() {
  const [selectedService, setSelectedService] = useState<typeof MASSAGE_SERVICES[0] | null>(null)
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', name: 'Todas', icon: Sparkles },
    { id: 'sensual', name: 'Sensuais', icon: Heart },
    { id: 'terapeutica', name: 'Terapêuticas', icon: Flame },
    { id: 'premium', name: 'Premium', icon: Star },
    { id: 'especial', name: 'Especiais', icon: Users },
  ]

  const filteredServices = activeFilter === 'all' 
    ? MASSAGE_SERVICES 
    : MASSAGE_SERVICES.filter(s => s.category === activeFilter)

  return (
    <section id="servicos" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-slate-950 to-slate-950" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 font-medium tracking-wider uppercase text-sm">
            Nossos Serviços
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Massagens Exclusivas
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Experiências únicas de relaxamento e bem-estar, realizadas por terapeutas 
            profissionais em ambiente discreto e sofisticado.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all',
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              )}
            >
              <filter.icon className="w-4 h-4" />
              {filter.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedService(service)}
                className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10" />
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-20 flex gap-2">
                    {service.isNew && (
                      <span className="px-2 py-1 rounded-full bg-green-500/90 text-white text-xs font-medium">
                        Novo
                      </span>
                    )}
                    {service.isFeatured && (
                      <span className="px-2 py-1 rounded-full bg-amber-500/90 text-white text-xs font-medium">
                        ★ Popular
                      </span>
                    )}
                  </div>
                  
                  {/* Price Badge */}
                  <div className="absolute bottom-3 right-3 z-20">
                    <span className="px-3 py-1.5 rounded-full bg-purple-600 text-white font-bold">
                      €{service.price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {service.shortDescription}
                  </p>
                  
                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {service.duration}min
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500" />
                        {service.rating}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-purple-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedService && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-slate-900 rounded-3xl overflow-hidden z-50 max-h-[90vh] overflow-y-auto"
              >
                {/* Header Image */}
                <div className="relative h-64">
                  <Image
                    src={selectedService.image}
                    alt={selectedService.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  
                  <button
                    onClick={() => setSelectedService(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedService.name}</h2>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-sm">
                        {selectedService.category}
                      </span>
                      <span className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        {selectedService.rating} ({selectedService.reviews} avaliações)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Descrição</h3>
                      <p className="text-slate-400 leading-relaxed mb-6">
                        {selectedService.fullDescription}
                      </p>

                      <h3 className="text-lg font-semibold text-white mb-3">Benefícios</h3>
                      <ul className="space-y-2 mb-6">
                        {selectedService.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-400">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right Column */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Inclui</h3>
                      <ul className="space-y-2 mb-6">
                        {selectedService.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-400">
                            <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* Pricing */}
                      <div className="bg-slate-800/50 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Preços</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800">
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-purple-500" />
                              <span className="text-white">{selectedService.duration} minutos</span>
                            </div>
                            <span className="text-xl font-bold text-white">€{selectedService.price}</span>
                          </div>
                          {selectedService.extendedDuration && (
                            <div className="flex items-center justify-between p-3 rounded-xl bg-purple-600/20 border border-purple-500/30">
                              <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-purple-500" />
                                <span className="text-white">{selectedService.extendedDuration} minutos</span>
                                <span className="px-2 py-0.5 rounded-full bg-purple-500 text-white text-xs">
                                  Recomendado
                                </span>
                              </div>
                              <span className="text-xl font-bold text-white">€{selectedService.extendedPrice}</span>
                            </div>
                          )}
                        </div>
                        
                        <BookingButtons 
                          serviceName={selectedService.name}
                          size="md"
                          variant="vertical"
                          className="w-full mt-6"
                        />
                      </div>
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
