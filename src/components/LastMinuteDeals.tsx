'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Zap, Percent, ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Deal {
  id: string
  service: string
  originalPrice: number
  discountPrice: number
  discount: number
  timeSlot: string
  location: string
  spots: number
}

const mockDeals: Deal[] = [
  {
    id: '1',
    service: 'Massagem Tântrica VIP',
    originalPrice: 200,
    discountPrice: 140,
    discount: 30,
    timeSlot: 'Hoje, 18:30',
    location: 'Lisboa - Saldanha',
    spots: 2,
  },
  {
    id: '2',
    service: 'Body to Body',
    originalPrice: 120,
    discountPrice: 90,
    discount: 25,
    timeSlot: 'Amanhã, 14:00',
    location: 'Porto - Trindade',
    spots: 1,
  },
  {
    id: '3',
    service: 'Quatro Mãos',
    originalPrice: 250,
    discountPrice: 175,
    discount: 30,
    timeSlot: 'Hoje, 20:00',
    location: 'Faro - Centro',
    spots: 3,
  },
]

function CountdownTimer({ targetMinutes = 30 }: { targetMinutes?: number }) {
  const [timeLeft, setTimeLeft] = useState(targetMinutes * 60)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetMinutes])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="flex items-center gap-1 text-amber-400 font-mono">
      <Clock className="w-4 h-4" />
      <span className="text-sm">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  )
}

export default function LastMinuteDeals() {
  const [deals, setDeals] = useState<Deal[]>(mockDeals)
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const claimDeal = (dealId: string) => {
    setSelectedDeal(dealId)
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
      setSelectedDeal(null)
    }, 2000)
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-slate-950 to-orange-950/20" />
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(251, 191, 36, 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-semibold">Ofertas Relâmpago</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Last Minute <span className="text-amber-400">Deals</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Horários disponíveis para hoje e amanhã com descontos exclusivos. 
            Só aparecem aqui quando há cancelamentos de última hora.
          </p>
        </motion.div>

        {/* Countdown Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 rounded-2xl p-4 mb-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-white font-semibold">Novas ofertas a cada 30 minutos</p>
              <p className="text-amber-200/60 text-sm">Atualização automática</p>
            </div>
          </div>
          <CountdownTimer />
        </motion.div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'relative rounded-2xl overflow-hidden group',
                selectedDeal === deal.id && 'ring-2 ring-green-500'
              )}
            >
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-600 text-white text-sm font-bold shadow-lg">
                  <Percent className="w-3 h-3" />
                  -{deal.discount}%
                </div>
              </div>

              {/* Spots Counter */}
              <div className="absolute top-4 right-4 z-10">
                <div className="px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-xs font-medium">
                  {deal.spots} vaga{deal.spots > 1 ? 's' : ''}
                </div>
              </div>

              {/* Card Content */}
              <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 h-full">
                <h3 className="text-xl font-semibold text-white mb-2">{deal.service}</h3>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-amber-400">
                    €{deal.discountPrice}
                  </span>
                  <span className="text-lg text-slate-500 line-through">
                    €{deal.originalPrice}
                  </span>
                  <span className="text-sm text-green-400">
                    Poupa €{deal.originalPrice - deal.discountPrice}
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-amber-300">{deal.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="w-4 h-4 rounded-full bg-slate-700" />
                    <span>{deal.location}</span>
                  </div>
                </div>

                <motion.a
                  href={`https://wa.me/351912345678?text=Quero a oferta ${deal.service} para ${deal.timeSlot}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => claimDeal(deal.id)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-500/25 transition-all"
                >
                  Reservar Agora
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                {/* Progress bar showing urgency - deterministic values based on string length */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Procura alta</span>
                    <span>{Math.floor((deal.id.charCodeAt(0) + deal.id.length * 7) % 20 + 5)} pessoas a verem</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      whileInView={{ width: `${((deal.id.charCodeAt(0) + deal.id.length * 5) % 40) + 60}%` }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: Clock, title: 'Atualização em Tempo Real', desc: 'Novas vagas aparecem automaticamente quando há cancelamentos' },
            { icon: Percent, title: 'Descontos Exclusivos', desc: 'Até 40% OFF em horários premium de última hora' },
            { icon: Zap, title: 'Reserva Imediata', desc: 'Confirmação instantânea via WhatsApp, sem espera' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="font-medium text-white">{item.title}</p>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
