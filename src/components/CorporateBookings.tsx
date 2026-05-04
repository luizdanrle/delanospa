'use client'

import { motion } from 'framer-motion'
import { Building2, Users, Briefcase, PartyPopper, CheckCircle, ArrowRight, Calendar, Clock, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const corporateServices = [
  {
    id: 'team-building',
    name: 'Team Building Exclusivo',
    icon: Users,
    description: 'Experiência única para equipas. Massagens de relaxamento em ambiente privado para 5-20 pessoas.',
    features: ['Privacidade garantida', 'Horários flexíveis', 'Catering opcional', 'Facturação empresarial'],
    minPeople: 5,
    color: 'from-blue-600 to-cyan-600',
  },
  {
    id: 'executive',
    name: 'Programa Executivo',
    icon: Briefcase,
    description: 'Para executivos stressados. Pacotes mensais com massagens terapêuticas e desportivas.',
    features: ['Atendimento prioritário', 'Horários 7h-23h', 'Quartos VIP reservados', 'Relatórios de bem-estar'],
    minPeople: 1,
    color: 'from-amber-600 to-yellow-600',
  },
  {
    id: 'events',
    name: 'Festas & Eventos',
    icon: PartyPopper,
    description: 'Despedidas de solteiro, aniversários ou eventos privados. Experiência personalizada.',
    features: ['Animação exclusiva', 'Decoração temática', 'Fotografia opcional', 'Transporte disponível'],
    minPeople: 3,
    color: 'from-purple-600 to-pink-600',
  },
]

const benefits = [
  { icon: Building2, title: 'Empresas', value: '150+', desc: 'Empresas parceiras' },
  { icon: Users, title: 'Funcionários', value: '2.500+', desc: 'Atendidos mensalmente' },
  { icon: Star, title: 'Satisfação', value: '99%', desc: 'Taxa de aprovação' },
  { icon: Calendar, title: 'Disponibilidade', value: '24/7', desc: 'Todos os dias' },
]

export default function CorporateBookings() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/5 to-slate-950" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            <Building2 className="w-4 h-4" />
            Reservas Empresariais
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Para <span className="text-blue-400">Empresas</span> e Grupos
          </h2>
          <p className="text-blue-200/60 max-w-2xl mx-auto">
            Oferecemos soluções corporativas personalizadas para empresas que valorizam 
            o bem-estar dos seus colaboradores ou querem organizar eventos especiais.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {benefits.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
                <Icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.title}</p>
                <p className="text-xs text-slate-600">{stat.desc}</p>
              </div>
            )
          })}
        </motion.div>

        {/* Services */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {corporateServices.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-all group"
              >
                <div className={cn(
                  'w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg',
                  service.color
                )}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{service.description}</p>

                <div className="flex items-center gap-2 mb-4 text-sm text-blue-400">
                  <Users className="w-4 h-4" />
                  Mínimo {service.minPeople} {service.minPeople === 1 ? 'pessoa' : 'pessoas'}
                </div>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/351912345678?text=Quero informações sobre ${service.name} para empresas`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-800 text-white font-medium hover:bg-blue-600 transition-colors group-hover:bg-blue-600"
                >
                  Solicitar Orçamento
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Orçamento Personalizado em 24h
          </h3>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            Contacta-nos para receber uma proposta adaptada às necessidades da tua empresa. 
            Facturação com NIF e condições especiais para grupos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/351912345678?text=Olá! Represento uma empresa e gostaria de um orçamento corporativo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/30"
            >
              <Building2 className="w-5 h-5" />
              Falar com Departamento Corporativo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
