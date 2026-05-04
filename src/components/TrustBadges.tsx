'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Award, 
  Clock,
  CheckCircle,
  Heart
} from 'lucide-react'

const badges = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Privacidade Garantida',
    description: 'Ambientes 100% discretos sem sinalização externa',
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: 'Pagamento Seguro',
    description: 'MB Way, transferência ou dinheiro no local',
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Profissionais Certificadas',
    description: 'Todas as terapeutas são treinadas e experientes',
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: 'Pontualidade',
    description: 'Respeitamos seu horário agendado',
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Higiene Premium',
    description: 'Toalhas, lençóis e óleos de alta qualidade',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Satisfação Garantida',
    description: 'Ou devolvemos seu dinheiro integralmente',
  },
]

export default function TrustBadges() {
  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            Por que nos <span className="text-amber-400">Escolher</span>?
          </h2>
          <p className="text-slate-400">Compromisso com excelência em cada detalhe</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 text-center hover:bg-slate-800 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 mx-auto mb-4">
                {badge.icon}
              </div>
              <h3 className="font-semibold text-white mb-2">{badge.title}</h3>
              <p className="text-slate-400 text-sm">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
