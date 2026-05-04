'use client'

import { motion } from 'framer-motion'
import { Gift, Star, Crown, Sparkles, ChevronRight, CheckCircle, Trophy, Gem } from 'lucide-react'
import { cn } from '@/lib/utils'

const tiers = [
  {
    name: 'Bronze',
    visits: 1,
    color: 'from-amber-700 to-amber-600',
    benefits: ['5% OFF em todas as massagens', 'Acesso ao catálogo completo'],
    icon: Star,
  },
  {
    name: 'Prata',
    visits: 3,
    color: 'from-slate-400 to-slate-300',
    benefits: ['10% OFF em todas as massagens', 'Upgrade de 60min para 75min', 'Prioridade no agendamento'],
    icon: Gem,
  },
  {
    name: 'Ouro',
    visits: 5,
    color: 'from-yellow-500 to-amber-400',
    benefits: ['15% OFF em todas as massagens', 'Massagem de 90min pelo preço de 60min', 'Acesso a massagistas VIP', 'Bebida de boas-vindas grátis'],
    icon: Crown,
  },
  {
    name: 'Black',
    visits: 10,
    color: 'from-red-600 to-rose-600',
    benefits: ['20% OFF permanente', 'Qualquer massagem com 2 massagistas pelo preço de 1', 'Acesso exclusivo a novas massagistas', 'Horários preferenciais', 'Champanhe grátis'],
    icon: Trophy,
    popular: true,
  },
]

const rewards = [
  { points: 100, reward: '10% OFF na próxima massagem' },
  { points: 250, reward: 'Upgrade de tempo grátis (+30min)' },
  { points: 500, reward: 'Massagem grátis (valor até €150)' },
  { points: 1000, reward: 'Experiência VIP completa grátis' },
]

export default function LoyaltyProgram() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-amber-950/5 to-slate-950" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
            <Gift className="w-4 h-4" />
            Programa de Fidelidade
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Quanto Mais Vieres, <span className="text-amber-400">Mais Ganhas</span>
          </h2>
          <p className="text-amber-200/60 max-w-2xl mx-auto">
            Acumula pontos a cada visita e desbloqueia benefícios exclusivos. 
            O teu prazer merece ser recompensado.
          </p>
        </motion.div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Agenda', desc: 'Marca a tua massagem e acumula pontos automaticamente' },
              { step: '2', title: 'Acumula', desc: 'Ganhas 10 pontos por cada euro gasto em massagens' },
              { step: '3', title: 'Desfruta', desc: 'Usa os teus pontos para descontos e experiências exclusivas' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
                
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-red-600/50 to-rose-600/50" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tiers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {tiers.map((tier, i) => {
            const Icon = tier.icon
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  'relative p-6 rounded-2xl border transition-all',
                  tier.popular
                    ? 'bg-gradient-to-br from-slate-900 to-red-950/20 border-red-500/30 scale-105 shadow-xl shadow-red-500/10'
                    : 'bg-slate-900/50 border-slate-800 hover:border-amber-500/20'
                )}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-bold">
                    MAIS POPULAR
                  </div>
                )}
                
                {/* Icon */}
                <div className={cn(
                  'w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4',
                  tier.color
                )}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                {/* Name */}
                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-amber-400 text-sm mb-4">
                  {tier.visits} {tier.visits === 1 ? 'visita' : 'visitas'}
                </p>
                
                {/* Benefits */}
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Points Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Troca de Pontos</h3>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rewards.map((reward, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-amber-500/30 transition-colors group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-amber-400">{reward.points}</span>
                  <span className="text-xs text-slate-500">pontos</span>
                </div>
                <p className="text-sm text-slate-300 group-hover:text-white transition-colors">
                  {reward.reward}
                </p>
              </motion.div>
            ))}
          </div>
          
          <p className="mt-6 text-center text-slate-500 text-sm">
            Os pontos são acumulados automaticamente e nunca expiram
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://wa.me/351912345678?text=Quero aderir ao programa de fidelidade"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/30"
          >
            <Gift className="w-5 h-5" />
            Começar a Acumular Pontos
            <ChevronRight className="w-5 h-5" />
          </a>
          <p className="mt-4 text-slate-500 text-sm">
            Adesão gratuita e automática na primeira visita
          </p>
        </motion.div>
      </div>
    </section>
  )
}
