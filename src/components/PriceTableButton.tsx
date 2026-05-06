'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Euro, Clock, Sparkles, Star, Shield, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// Massage services data (same as in page.tsx)
const massageServices = [
  {
    id: 'tantric',
    name: 'Massagem Tântrica',
    description: 'Ritual erótico de sedução. A massagista utiliza técnicas milenares para despertar sua energia sexual através de toques provocantes no corpo inteiro.',
    price: 150,
    duration: 90,
    category: 'Sensual',
    color: 'from-red-600 to-rose-700',
  },
  {
    id: 'body-to-body',
    name: 'Massagem Body to Body',
    description: 'A massagista nua desliza seu corpo sensual sobre o seu. Contato pele com pele, curvas quentes e movimentos provocantes.',
    price: 180,
    duration: 60,
    category: 'Sensual',
    color: 'from-red-700 to-rose-600',
  },
  {
    id: 'lingam',
    name: 'Massagem Lingam',
    description: 'Prazer masculino em sua forma mais intensa. Toques exclusivos na região íntima com técnicas que prolongam o prazer.',
    price: 140,
    duration: 75,
    category: 'Sensual',
    color: 'from-rose-600 to-red-800',
  },
  {
    id: 'yoni',
    name: 'Massagem Yoni',
    description: 'Dedicação total ao prazer feminino. Massagem íntima que explora cada ponto de prazer, levando a múltiplas ondas de êxtase.',
    price: 140,
    duration: 75,
    category: 'Sensual',
    color: 'from-red-500 to-pink-700',
  },
  {
    id: 'relaxation',
    name: 'Massagem de Relaxamento Sensual',
    description: 'Toques provocantes por todo o corpo, terminando em áreas especiais. Relaxamento que se transforma em intenso prazer sexual.',
    price: 120,
    duration: 60,
    category: 'Sensual',
    color: 'from-red-600 to-orange-700',
  },
  {
    id: 'couples',
    name: 'Massagem para Casais',
    description: 'Experiência a três: você, seu parceiro e nossa massagista. Toques simultâneos, troca de carícias e prazer compartilhado.',
    price: 280,
    duration: 90,
    category: 'Sensual',
    color: 'from-red-700 to-rose-500',
  },
  {
    id: 'nuru',
    name: 'Massagem Nuru',
    description: 'Gel transparente, corpos escorregadios e deslizantes. A massagista usa cada centímetro do corpo para provocar.',
    price: 200,
    duration: 60,
    category: 'Sensual',
    color: 'from-red-600 to-rose-800',
  },
  {
    id: 'sensual',
    name: 'Massagem Sensual Premium',
    description: 'O ápice do prazer. Combinação de técnicas eróticas com toques exclusivos nas zonas mais sensíveis.',
    price: 220,
    duration: 90,
    category: 'Sensual',
    color: 'from-rose-700 to-red-900',
  },
]

const therapeuticServices = [
  {
    id: 'therapeutic-relax',
    name: 'Massagem Terapêutica Relaxante',
    description: 'Movimentos firmes e suaves que aliviam tensões musculares e promovem relaxamento profundo.',
    price: 95,
    duration: 60,
    category: 'Terapêutica',
    color: 'from-emerald-600 to-teal-700',
  },
  {
    id: 'anti-stress',
    name: 'Massagem Anti-Stress',
    description: 'Técnicas específicas para reduzir o stress acumulado. Pressões suaves e aromaterapia.',
    price: 110,
    duration: 75,
    category: 'Terapêutica',
    color: 'from-teal-600 to-cyan-700',
  },
  {
    id: 'pain-relief',
    name: 'Massagem Alívio de Dores',
    description: 'Focada em áreas com dores crónicas: costas, ombros e pescoço. Pressões mais intensas.',
    price: 100,
    duration: 60,
    category: 'Terapêutica',
    color: 'from-cyan-600 to-blue-700',
  },
]

const sportsServices = [
  {
    id: 'sports-deep',
    name: 'Massagem Desportiva Profunda',
    description: 'Para atletas e praticantes de exercício. Pressões intensas aliviam dores musculares.',
    price: 115,
    duration: 60,
    category: 'Desportiva',
    color: 'from-amber-600 to-orange-700',
  },
  {
    id: 'post-workout',
    name: 'Massagem Pós-Treino',
    description: 'Indicada após atividade física intensa. Alivia fadiga muscular, reduz cãibras.',
    price: 95,
    duration: 45,
    category: 'Desportiva',
    color: 'from-orange-600 to-red-700',
  },
]

export function PriceTableModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean
  onClose: () => void 
}) {
  const [activeTab, setActiveTab] = useState<'sensual' | 'therapeutic' | 'sports'>('sensual')

  const allServices = {
    sensual: massageServices,
    therapeutic: therapeuticServices,
    sports: sportsServices,
  }

  const tabs = [
    { id: 'sensual' as const, name: 'Sensuais 🔥', color: 'from-red-600 to-rose-600' },
    { id: 'therapeutic' as const, name: 'Terapêuticas 🌿', color: 'from-emerald-600 to-teal-600' },
    { id: 'sports' as const, name: 'Desportivas 💪', color: 'from-amber-600 to-orange-600' },
  ]

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-slate-900 rounded-3xl overflow-hidden z-50 border border-slate-800"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500">
                    <Euro className="w-6 h-6 text-white" />
                  </div>
                  Tabela de Preços
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-slate-800 transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 p-1 rounded-2xl bg-slate-800/50">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'px-4 py-2 rounded-xl font-medium transition-all text-sm',
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                        : 'text-slate-400 hover:text-white'
                    )}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="grid gap-4">
                {allServices[activeTab].map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                          <span className={cn(
                            'px-2 py-1 rounded-full text-xs font-medium text-white',
                            `bg-gradient-to-r ${service.color}`
                          )}>
                            {service.category}
                          </span>
                        </div>
                        
                        <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                          {service.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {service.duration} min
                          </div>
                          <div className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Premium
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-white">€{service.price}</div>
                        <a
                          href="https://wa.me/351912345678?text=Olá! Quero agendar a massagem: ${service.name}"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-medium hover:from-green-500 hover:to-emerald-500 transition-all"
                        >
                          Agendar
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-800 bg-slate-900/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>100% Discreto • Atendimento 24h</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-amber-300 text-sm ml-2">4.9/5</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function PriceTableButton() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setShowModal(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/30"
        title="Tabela de Preços"
      >
        <Euro className="w-5 h-5" />
      </motion.button>

      <PriceTableModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  )
}
