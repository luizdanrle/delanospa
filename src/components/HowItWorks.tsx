'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Calendar, 
  MessageCircle, 
  Heart,
  ChevronRight,
  ChevronLeft,
  Check
} from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  {
    id: 1,
    title: 'Escolha',
    subtitle: 'Encontre a massagem ideal',
    description: 'Use nosso quiz inteligente ou explore as categorias. Compare serviços lado a lado e veja qual combina com você.',
    icon: <Search className="w-8 h-8" />,
    details: [
      'Quiz de 4 perguntas para recomendação personalizada',
      'Comparador de até 3 serviços simultâneos',
      'Simulador de preços com extras',
      'Catálogo completo com 22 massagens'
    ]
  },
  {
    id: 2,
    title: 'Agende',
    subtitle: 'Verifique disponibilidade real',
    description: 'Cada massagista gere sua própria agenda. Veja o status em tempo real e escolha data/hora disponíveis.',
    icon: <Calendar className="w-8 h-8" />,
    details: [
      '5 massagistas com horários independentes',
      'Status atualiza conforme horário de Lisboa',
      'Mostra apenas horários futuros possíveis',
      'Respeita férias, folgas e feriados'
    ]
  },
  {
    id: 3,
    title: 'Confirme',
    subtitle: 'WhatsApp direto com a profissional',
    description: 'O agendamento é enviado diretamente para o WhatsApp da massagista escolhida. Ela confirma manualmente em minutos.',
    icon: <MessageCircle className="w-8 h-8" />,
    details: [
      'Cada massagista tem WhatsApp próprio',
      'Mensagem pré-preenchida com todos os detalhes',
      'Confirmação humana em 2-5 minutos',
      'Conversa direta para ajustes'
    ]
  },
  {
    id: 4,
    title: 'Desfrute',
    subtitle: 'Experiência única garantida',
    description: 'Chegue no horário marcado e aproveite. Ambiente exclusivo, total privacidade e profissionais de excelência.',
    icon: <Heart className="w-8 h-8" />,
    details: [
      '6 locais discretos em Portugal',
      'Ambientes climatizados e higienizados',
      'Toalhas premium e amenities',
      'Garantia de satisfação ou reembolso'
    ]
  },
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1)

  const currentStep = steps.find(s => s.id === activeStep) || steps[0]

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            <Check className="w-4 h-4" />
            Como Funciona
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simples em <span className="text-indigo-400">4 Passos</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Do descobrimento à experiência, facilitamos cada etapa para você.
          </p>
        </motion.div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={cn(
                  'relative flex items-center gap-3 px-6 py-4 rounded-xl transition-all',
                  activeStep === step.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-bold',
                  activeStep === step.id ? 'bg-white/20' : 'bg-slate-800'
                )}>
                  {step.id}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="font-medium">{step.title}</p>
                  <p className="text-xs opacity-70">{step.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Icon */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
              {currentStep.icon}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {currentStep.title}: {currentStep.subtitle}
              </h3>
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                {currentStep.description}
              </p>

              {/* Details List */}
              <div className="grid sm:grid-cols-2 gap-4">
                {currentStep.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <p className="text-slate-300 text-sm">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between mt-8 pt-8 border-t border-slate-800">
            <button
              onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
              disabled={activeStep === 1}
              className="flex items-center gap-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Anterior
            </button>
            <button
              onClick={() => setActiveStep(prev => Math.min(4, prev + 1))}
              disabled={activeStep === 4}
              className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Próximo
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { label: 'Minutos', value: '4', desc: 'Quiz de recomendação' },
            { label: 'Horas', value: '24/7', desc: 'Disponibilidade online' },
            { label: 'Minutos', value: '2-5', desc: 'Tempo de resposta' },
            { label: 'Garantia', value: '100%', desc: 'Satisfação ou reembolso' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <p className="text-2xl md:text-3xl font-bold text-indigo-400">{stat.value}</p>
              <p className="text-slate-400 text-sm">{stat.label}</p>
              <p className="text-slate-500 text-xs mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
