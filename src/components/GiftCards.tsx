'use client'

import { motion } from 'framer-motion'
import { Gift, Heart, Sparkles, Crown, CheckCircle, ArrowRight, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const giftCards = [
  {
    id: 'romantic',
    name: 'Pacote Romântico',
    price: 250,
    description: 'Massagem para casais + champanhe + velas aromáticas',
    icon: Heart,
    color: 'from-pink-500 to-rose-500',
    features: ['Massagem para 2 pessoas', 'Champanhe premium', 'Ambiente romântico', 'Válido 6 meses'],
    popular: false,
  },
  {
    id: 'vip',
    name: 'Experiência VIP',
    price: 500,
    description: 'Massagem VIP exclusiva + 2 massagistas + óleos importados',
    icon: Crown,
    color: 'from-amber-500 to-yellow-500',
    features: ['2 massagistas simultâneas', 'Óleos importados', '120 minutos', 'Válido 12 meses', 'Upgrade de quarto'],
    popular: true,
  },
  {
    id: 'explore',
    name: 'Pack Exploração',
    price: 350,
    description: '3 massagens diferentes para experimentar tudo',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-500',
    features: ['3 massagens à escolha', 'Desconto 20%', 'Válido 6 meses', 'Transferível'],
    popular: false,
  },
]

export default function GiftCards() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-pink-950/5 to-slate-950" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-4">
            <Gift className="w-4 h-4" />
            Vouchers de Oferta
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            O Presente Perfeito <span className="text-pink-400">Existe</span>
          </h2>
          <p className="text-rose-200/60 max-w-2xl mx-auto">
            Surpreende alguém especial com uma experiência única de prazer e relaxamento. 
            Vouchers válidos por 6 a 12 meses.
          </p>
        </motion.div>

        {/* Gift Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {giftCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'relative p-6 rounded-3xl border transition-all hover:scale-105',
                  card.popular
                    ? 'bg-gradient-to-br from-slate-900 to-pink-950/20 border-pink-500/30 scale-105 shadow-xl shadow-pink-500/10'
                    : 'bg-slate-900/50 border-slate-800 hover:border-pink-500/20'
                )}
              >
                {/* Popular Badge */}
                {card.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-xs font-bold">
                    MAIS POPULAR
                  </div>
                )}

                {/* Icon */}
                <div className={cn(
                  'w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg',
                  card.color
                )}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">{card.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{card.description}</p>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">€{card.price}</span>
                  <span className="text-slate-500 text-sm ml-2">voucher</span>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {card.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`https://wa.me/351912345678?text=Quero comprar o voucher ${card.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium text-white transition-all',
                    'bg-gradient-to-r hover:shadow-lg',
                    card.color
                  )}
                >
                  Comprar Voucher
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            )
          })}
        </div>

        {/* Promo Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Tens um código de voucher?
          </h3>
          <p className="text-slate-400 mb-6">
            Reserva diretamente pelo WhatsApp com o teu código
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {['GIFT-2024', 'ROMANTIC-LOVE', 'VIP-GOLD'].map((code) => (
              <button
                key={code}
                onClick={() => copyCode(code)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition-colors border border-slate-700"
              >
                {copiedCode === code ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {code}
                  </>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
