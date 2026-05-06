'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Scale, 
  Check, 
  X, 
  Sparkles,
  ArrowRight,
  HelpCircle
} from 'lucide-react'
import { BookingButtons } from '@/components/BookingButtons'
import { cn } from '@/lib/utils'

const services = [
  {
    id: 'tantric',
    name: 'Massagem Tântrica',
    price: '€150',
    duration: '90 min',
    sensualLevel: 5,
    relaxationLevel: 4,
    therapeuticLevel: 3,
    intensity: 'Média',
    bestFor: ['Relaxamento profundo', 'Conexão corporal', 'Experiência sensorial'],
    includes: ['Óleos quentes', 'Música ambiente', 'Chuveiro disponível', 'Toalhas premium'],
    extras: ['Aromaterapia +€15', 'Pedras quentes +€25'],
  },
  {
    id: 'body',
    name: 'Body to Body',
    price: '€120',
    duration: '60 min',
    sensualLevel: 5,
    relaxationLevel: 4,
    therapeuticLevel: 2,
    intensity: 'Alta',
    bestFor: ['Contato pele a pele', 'Estimulação sensorial', 'Intimidade'],
    includes: ['Óleo premium', 'Ambiente climatizado', 'Bebida welcome', 'Chuveiro'],
    extras: ['Nuru gel +€20', 'Dupla terapeuta +€100'],
  },
  {
    id: 'therapeutic',
    name: 'Terapêutica',
    price: '€80',
    duration: '60 min',
    sensualLevel: 1,
    relaxationLevel: 4,
    therapeuticLevel: 5,
    intensity: 'Alta',
    bestFor: ['Dores musculares', 'Recuperação', 'Bem-estar físico'],
    includes: ['Avaliação inicial', 'Óleos medicinais', 'Orientação pós-massagem'],
    extras: ['Ventosa +€15', 'Kinesio tape +€10'],
  },
  {
    id: 'relax',
    name: 'Relaxante',
    price: '€70',
    duration: '60 min',
    sensualLevel: 2,
    relaxationLevel: 5,
    therapeuticLevel: 2,
    intensity: 'Suave',
    bestFor: ['Stress', 'Insónia', 'Ansiedade'],
    includes: ['Óleos aromáticos', 'Música relaxante', 'Chá pós-massagem'],
    extras: ['Aromaterapia +€15', 'Escalda-pés +€10'],
  },
  {
    id: 'vip',
    name: 'Experiência VIP',
    price: '€250',
    duration: '120 min',
    sensualLevel: 5,
    relaxationLevel: 5,
    therapeuticLevel: 4,
    intensity: 'Personalizada',
    bestFor: ['Ocasião especial', 'Presente único', 'Dia completo'],
    includes: ['2 horas exclusivas', 'Champagne', 'Banho de ofurô', 'Massagem corporal completa'],
    extras: ['Jantar romântico +€80', 'Pernoite +€150'],
  },
]

function LevelBar({ level, max = 5, color = 'bg-amber-400' }: { level: number; max?: number; color?: string }) {
  return (
    <div className="flex gap-1">
      {[...Array(max)].map((_, i) => (
        <div
          key={i}
          className={cn(
            'w-4 h-1.5 rounded-full',
            i < level ? color : 'bg-slate-800'
          )}
        />
      ))}
    </div>
  )
}

export default function ServiceComparison() {
  const [selectedServices, setSelectedServices] = useState<string[]>(['tantric', 'body'])
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(prev => prev.filter(s => s !== id))
      }
    } else {
      if (selectedServices.length < 3) {
        setSelectedServices(prev => [...prev, id])
      }
    }
  }

  const selectedData = services.filter(s => selectedServices.includes(s.id))

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
            <Scale className="w-4 h-4" />
            Comparador de Serviços
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Compare e <span className="text-amber-400">Escolha</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Selecione até 3 serviços para comparar lado a lado. 
            Encontre a experiência perfeita para você.
          </p>
        </motion.div>

        {/* Service Selection */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => toggleService(service.id)}
              disabled={!selectedServices.includes(service.id) && selectedServices.length >= 3}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                selectedServices.includes(service.id)
                  ? 'bg-amber-600 text-white'
                  : selectedServices.length >= 3
                    ? 'bg-slate-900 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              )}
            >
              {selectedServices.includes(service.id) && (
                <Check className="w-3.5 h-3.5 inline mr-1" />
              )}
              {service.name}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header Row */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="p-4" /> {/* Empty corner */}
              {selectedData.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'p-4 rounded-xl text-center',
                    hoveredService === service.id
                      ? 'bg-amber-500/10 border border-amber-500/30'
                      : 'bg-slate-900 border border-slate-800'
                  )}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <h3 className="font-semibold text-white">{service.name}</h3>
                  <p className="text-amber-400 text-lg font-bold mt-1">{service.price}</p>
                  <p className="text-slate-500 text-sm">{service.duration}</p>
                </motion.div>
              ))}
            </div>

            {/* Comparison Rows */}
            <div className="space-y-2">
              {/* Sensual Level */}
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 flex items-center text-slate-400 text-sm font-medium">
                  Nível Sensual
                </div>
                {selectedData.map((service) => (
                  <div
                    key={service.id}
                    className={cn(
                      'p-4 rounded-xl flex items-center justify-center',
                      hoveredService === service.id ? 'bg-slate-900/80' : 'bg-slate-900/50'
                    )}
                  >
                    <LevelBar level={service.sensualLevel} color="bg-rose-400" />
                  </div>
                ))}
              </div>

              {/* Relaxation Level */}
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 flex items-center text-slate-400 text-sm font-medium">
                  Relaxamento
                </div>
                {selectedData.map((service) => (
                  <div
                    key={service.id}
                    className={cn(
                      'p-4 rounded-xl flex items-center justify-center',
                      hoveredService === service.id ? 'bg-slate-900/80' : 'bg-slate-900/50'
                    )}
                  >
                    <LevelBar level={service.relaxationLevel} color="bg-blue-400" />
                  </div>
                ))}
              </div>

              {/* Therapeutic Level */}
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 flex items-center text-slate-400 text-sm font-medium">
                  Terapêutico
                </div>
                {selectedData.map((service) => (
                  <div
                    key={service.id}
                    className={cn(
                      'p-4 rounded-xl flex items-center justify-center',
                      hoveredService === service.id ? 'bg-slate-900/80' : 'bg-slate-900/50'
                    )}
                  >
                    <LevelBar level={service.therapeuticLevel} color="bg-emerald-400" />
                  </div>
                ))}
              </div>

              {/* Intensity */}
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 flex items-center text-slate-400 text-sm font-medium">
                  Intensidade
                </div>
                {selectedData.map((service) => (
                  <div
                    key={service.id}
                    className={cn(
                      'p-4 rounded-xl text-center text-sm',
                      hoveredService === service.id ? 'bg-slate-900/80' : 'bg-slate-900/50',
                      service.intensity === 'Alta' && 'text-rose-400',
                      service.intensity === 'Média' && 'text-amber-400',
                      service.intensity === 'Suave' && 'text-emerald-400',
                    )}
                  >
                    {service.intensity}
                  </div>
                ))}
              </div>

              {/* Best For */}
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 flex items-center text-slate-400 text-sm font-medium">
                  Ideal Para
                </div>
                {selectedData.map((service) => (
                  <div
                    key={service.id}
                    className={cn(
                      'p-4 rounded-xl',
                      hoveredService === service.id ? 'bg-slate-900/80' : 'bg-slate-900/50'
                    )}
                  >
                    <ul className="space-y-1">
                      {service.bestFor.map((item, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-1.5">
                          <Sparkles className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Includes */}
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 flex items-center text-slate-400 text-sm font-medium">
                  Inclui
                </div>
                {selectedData.map((service) => (
                  <div
                    key={service.id}
                    className={cn(
                      'p-4 rounded-xl',
                      hoveredService === service.id ? 'bg-slate-900/80' : 'bg-slate-900/50'
                    )}
                  >
                    <ul className="space-y-1">
                      {service.includes.map((item, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-1.5">
                          <Check className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Extras */}
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 flex items-center text-slate-400 text-sm font-medium">
                  Extras Disponíveis
                </div>
                {selectedData.map((service) => (
                  <div
                    key={service.id}
                    className={cn(
                      'p-4 rounded-xl',
                      hoveredService === service.id ? 'bg-slate-900/80' : 'bg-slate-900/50'
                    )}
                  >
                    <ul className="space-y-1">
                      {service.extras.map((item, i) => (
                        <li key={i} className="text-sm text-amber-400">+ {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Row */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="p-4" />
              {selectedData.map((service) => (
                <div key={service.id} className="p-4">
                  <BookingButtons 
                    serviceName={service.name}
                    size="sm"
                    variant="vertical"
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Ainda indeciso?</h4>
              <p className="text-slate-400 text-sm">
                Cada pessoa tem preferências diferentes. Se não tem certeza qual escolher, 
                fale connosco pelo WhatsApp que ajudamos a encontrar a experiência perfeita para você.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
