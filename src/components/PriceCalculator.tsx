'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  Clock, 
  MapPin, 
  Sparkles, 
  Users,
  Gift,
  Check,
  ArrowRight,
  Info
} from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  { id: 'tantric', name: 'Massagem Tântrica', basePrice: 150, duration: 90, category: 'sensual' },
  { id: 'body', name: 'Body to Body', basePrice: 120, duration: 60, category: 'sensual' },
  { id: 'vip', name: 'Experiência VIP', basePrice: 250, duration: 120, category: 'sensual' },
  { id: 'fourhands', name: 'Quatro Mãos', basePrice: 220, duration: 60, category: 'sensual' },
  { id: 'couples', name: 'Para Casais', basePrice: 200, duration: 90, category: 'sensual' },
  { id: 'therapeutic', name: 'Terapêutica', basePrice: 80, duration: 60, category: 'therapeutic' },
  { id: 'relax', name: 'Relaxante', basePrice: 70, duration: 60, category: 'therapeutic' },
  { id: 'sports', name: 'Desportiva', basePrice: 85, duration: 60, category: 'sports' },
]

const locations = [
  { id: 'lx', name: 'Lisboa', multiplier: 1 },
  { id: 'pt', name: 'Porto', multiplier: 0.95 },
  { id: 'fr', name: 'Faro', multiplier: 0.9 },
  { id: 'lb', name: 'Leiria', multiplier: 0.85 },
]

const extras = [
  { id: 'aromatherapy', name: 'Aromaterapia', price: 15, description: 'Óleos essenciais premium' },
  { id: 'hotstones', name: 'Pedras Quentes', price: 25, description: 'Terapia de calor' },
  { id: 'scrub', name: 'Esfoliação', price: 20, description: 'Renovação da pele' },
  { id: 'champagne', name: 'Champagne & Fruta', price: 35, description: 'Experiência VIP' },
]

export default function PriceCalculator() {
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedLocation, setSelectedLocation] = useState<string>('lx')
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [isMember, setIsMember] = useState<boolean>(false)
  const [showResult, setShowResult] = useState<boolean>(false)

  const calculation = useMemo(() => {
    const service = services.find(s => s.id === selectedService)
    const location = locations.find(l => l.id === selectedLocation)
    
    if (!service || !location) return null

    const basePrice = service.basePrice * location.multiplier
    const extrasPrice = selectedExtras.reduce((sum, extraId) => {
      const extra = extras.find(e => e.id === extraId)
      return sum + (extra?.price || 0)
    }, 0)
    
    const subtotal = basePrice + extrasPrice
    const discount = isMember ? subtotal * 0.1 : 0
    const total = subtotal - discount

    return {
      service,
      location,
      basePrice,
      extrasPrice,
      subtotal,
      discount,
      total,
    }
  }, [selectedService, selectedLocation, selectedExtras, isMember])

  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    )
  }

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Simulador de Preços
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Calcule o seu <span className="text-emerald-400">Orçamento</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Selecione o serviço, localização e extras para saber o valor estimado.
            Preços podem variar conforme a massagista escolhida.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Selection */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                Escolha o serviço
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={cn(
                      'p-4 rounded-xl border text-left transition-all',
                      selectedService === service.id
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-slate-800 hover:border-slate-700'
                    )}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-white">{service.name}</span>
                      <span className="text-emerald-400 text-sm">desde €{service.basePrice}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      {service.duration} min
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                Localização
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(location.id)}
                    className={cn(
                      'p-3 rounded-xl border text-center transition-all',
                      selectedLocation === location.id
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-slate-800 hover:border-slate-700'
                    )}
                  >
                    <p className="font-medium text-white">{location.name}</p>
                    <p className="text-xs text-slate-400">
                      {location.multiplier === 1 ? 'Preço base' : `-${Math.round((1 - location.multiplier) * 100)}%`}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-emerald-400" />
                Extras (opcional)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {extras.map((extra) => (
                  <button
                    key={extra.id}
                    onClick={() => toggleExtra(extra.id)}
                    className={cn(
                      'p-4 rounded-xl border text-left transition-all flex items-center gap-3',
                      selectedExtras.includes(extra.id)
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-slate-800 hover:border-slate-700'
                    )}
                  >
                    <div className={cn(
                      'w-5 h-5 rounded border flex items-center justify-center',
                      selectedExtras.includes(extra.id)
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-slate-600'
                    )}>
                      {selectedExtras.includes(extra.id) && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">{extra.name}</p>
                      <p className="text-xs text-slate-400">{extra.description}</p>
                    </div>
                    <span className="text-emerald-400">+€{extra.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Member Discount */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <button
                onClick={() => setIsMember(!isMember)}
                className="flex items-center gap-3 w-full"
              >
                <div className={cn(
                  'w-5 h-5 rounded border flex items-center justify-center',
                  isMember ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600'
                )}>
                  {isMember && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-white">Sou membro do programa de fidelidade</p>
                  <p className="text-sm text-emerald-400">10% de desconto em todos os serviços</p>
                </div>
                <Users className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Resumo</h3>

              {calculation ? (
                <div className="space-y-4">
                  {/* Service */}
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">{calculation.service.name}</span>
                    <span className="text-white">€{calculation.basePrice.toFixed(0)}</span>
                  </div>

                  {/* Extras */}
                  {selectedExtras.length > 0 && (
                    <div className="space-y-2">
                      {selectedExtras.map(extraId => {
                        const extra = extras.find(e => e.id === extraId)
                        return extra ? (
                          <div key={extraId} className="flex justify-between text-sm">
                            <span className="text-slate-400">+ {extra.name}</span>
                            <span className="text-white">€{extra.price}</span>
                          </div>
                        ) : null
                      })}
                    </div>
                  )}

                  {/* Subtotal */}
                  <div className="pt-4 border-t border-slate-800">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Subtotal</span>
                      <span className="text-white">€{calculation.subtotal.toFixed(0)}</span>
                    </div>
                    
                    {isMember && (
                      <div className="flex justify-between text-sm text-emerald-400">
                        <span>Desconto membro (10%)</span>
                        <span>-€{calculation.discount.toFixed(0)}</span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="pt-4 border-t border-slate-800">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-white">Total estimado</span>
                      <span className="text-2xl font-bold text-emerald-400">
                        €{calculation.total.toFixed(0)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      * Preço pode variar conforme massagista escolhida
                    </p>
                  </div>

                  {/* CTA */}
                  <a
                    href={`https://wa.me/351912345678?text=Olá! Quero agendar ${calculation.service.name} em ${calculation.location.name}. Orçamento: €${calculation.total.toFixed(0)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                  >
                    Agendar Agora
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Info className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">
                    Selecione um serviço para ver o orçamento
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
