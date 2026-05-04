'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Shield, Clock, UserCheck, Sparkles, Lock, MapPin, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
  icon: React.ElementType
}

const faqs: FAQItem[] = [
  {
    question: 'A discrição é garantida?',
    answer: 'Absolutamente. Todos os nossos espaços são totalmente privados, sem câmaras, e as massagistas são profissionais treinadas para manter o mais absoluto sigilo. Não registamos dados dos clientes e o pagamento pode ser feito em dinheiro.',
    icon: Lock,
  },
  {
    question: 'Quanto tempo dura cada massagem?',
    answer: 'As nossas sessões padrão são de 60 minutos, mas oferecemos também experiências de 90 e 120 minutos para quem deseja um prazer mais prolongado. A Massagem VIP inclui 2 horas de experiência completa.',
    icon: Clock,
  },
  {
    question: 'As massagistas são profissionais?',
    answer: 'Sim, todas as nossas massagistas são certificadas em técnicas de massagem tântrica e sensual. Além da formação técnica, são selecionadas pela sua beleza, simpatia e capacidade de criar uma atmosfera de total relaxamento e prazer.',
    icon: UserCheck,
  },
  {
    question: 'Posso escolher a massagista?',
    answer: 'Claro! Podes ver todas as massagistas disponíveis no nosso site, com fotos reais, e escolher aquela que mais te atrai. Também podes pedir recomendações baseadas no tipo de experiência que procuras.',
    icon: Sparkles,
  },
  {
    question: 'Os espaços são limpos e seguros?',
    answer: 'Todos os nossos gabinetes seguem rigorosos protocolos de higiene. Lençóis e toalhas são de uso único ou esterilizados, e os espaços são desinfetados após cada sessão. A tua segurança é a nossa prioridade.',
    icon: Shield,
  },
  {
    question: 'Onde estão localizados?',
    answer: 'Temos 6 espaços exclusivos em Portugal: 2 em Lisboa (Saldanha e Chiado), 2 no Porto (Trindade e Clérigos), 1 no Algarve (Marina) e 1 em Leiria (Centro). Todos em localizações de fácil acesso e estacionamento discreto.',
    icon: MapPin,
  },
  {
    question: 'Como faço uma reserva?',
    answer: 'Podes agendar através do WhatsApp (+351 912 345 678), telefone ou preenchendo o formulário no site. O atendimento é 24h e as reservas podem ser feitas com poucas horas de antecedência. Para experiências VIP, recomendamos agendar com 24h de avanço.',
    icon: Phone,
  },
]

export default function SensualFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-red-950/5 to-slate-950" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Dúvidas Frequentes
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Tudo o que Precisas de <span className="text-red-400">Saber</span>
          </h2>
          <p className="text-rose-200/60 max-w-2xl mx-auto">
            Respostas às perguntas mais comuns para que possas reservar com total confiança
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            const Icon = faq.icon
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'rounded-2xl border transition-all duration-300',
                  isOpen 
                    ? 'bg-slate-900/80 border-red-500/30 shadow-lg shadow-red-500/10' 
                    : 'bg-slate-900/40 border-slate-800 hover:border-red-500/20'
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 flex items-center gap-4 text-left"
                >
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                    isOpen ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-400'
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <span className={cn(
                    'flex-1 font-semibold text-lg',
                    isOpen ? 'text-white' : 'text-slate-300'
                  )}>
                    {faq.question}
                  </span>
                  
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center',
                      isOpen ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400'
                    )}>
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pl-[5.5rem]">
                        <p className="text-rose-200/70 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-rose-300/60 mb-4">Ainda tens dúvidas?</p>
          <a
            href="https://wa.me/351912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold hover:from-red-500 hover:to-rose-500 transition-all shadow-lg shadow-red-500/30"
          >
            <Phone className="w-4 h-4" />
            Fala Connosco no WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
