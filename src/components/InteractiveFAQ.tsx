'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  HelpCircle, 
  Search,
  MessageCircle,
  Phone,
  ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  isPopular?: boolean
}

const faqs: FAQItem[] = [
  {
    id: '1',
    category: 'Agendamento',
    question: 'Como posso agendar uma massagem?',
    answer: 'Pode agendar de 3 formas: 1) Pelo WhatsApp clicando em qualquer botão "Agendar" - resposta em até 2 minutos. 2) Pelo formulário de agendamento no site - escolha massagista, serviço e horário. 3) Ligando diretamente para o número de telefone. O agendamento é confirmado via WhatsApp com todos os detalhes.',
    isPopular: true,
  },
  {
    id: '2',
    category: 'Pagamento',
    question: 'Quais são as formas de pagamento aceites?',
    answer: 'Aceitamos: Dinheiro (preferencial), MB Way, transferência bancária, e cartões de débito/crédito. Para reservas com antecedência, pode ser solicitado um sinal de 30% via MB Way. O pagamento é feito no local, após o serviço.',
  },
  {
    id: '3',
    category: 'Serviços',
    question: 'Qual a diferença entre as massagens?',
    answer: 'Cada massagem tem um foco diferente: Tântrica - energia sexual e conexão; Body to Body - contacto pele a pele; Nuru - gel especial japonês; Terapêutica - alívio de dores musculares; Desportiva - recuperação muscular. Cada massagista tem especialidades - consulte o perfil delas para saber mais.',
    isPopular: true,
  },
  {
    id: '4',
    category: 'Privacidade',
    question: 'A minha privacidade está garantida?',
    answer: 'Absolutamente. Todos os nossos espaços são completamente discretos, sem sinalização externa. A entrada é privada, não partilhada com outros clientes. Não guardamos dados pessoais além do necessário para o agendamento. Os terapeutas assinam acordos de confidencialidade.',
    isPopular: true,
  },
  {
    id: '5',
    category: 'Agendamento',
    question: 'Posso escolher a massagista?',
    answer: 'Sim! No sistema de agendamento pode ver todas as massagistas disponíveis, as especialidades de cada uma, fotos, avaliações e horários específicos. Cada uma tem horários diferentes e dias de folga. O sistema mostra apenas horários disponíveis para a massagista escolhida.',
  },
  {
    id: '6',
    category: 'Serviços',
    question: 'Posso fazer uma massagem para casais?',
    answer: 'Sim, temos sessões especiais para casais. Duas massagistas simultâneas num ambiente preparado para dois. É uma experiência de conexão e partilha. Recomendamos agendar com antecedência pois requer preparação especial do espaço e sincronização de duas profissionais.',
  },
  {
    id: '7',
    category: 'Preços',
    question: 'Os preços são os mesmos para todas as massagistas?',
    answer: 'Os preços base são standard, mas massagistas com mais experiência ou especializações específicas podem ter valores ligeiramente diferentes. O simulador de preços no site dá uma estimativa. Para saber o valor exato com uma massagista específica, consulte pelo WhatsApp.',
  },
  {
    id: '8',
    category: 'Cancelamento',
    question: 'Qual é a política de cancelamento?',
    answer: 'Cancelamentos até 24h antes do agendamento: reembolso total ou remarcar sem custo. Cancelamentos entre 24h e 4h antes: remarcar com taxa de €20. Cancelamentos menos de 4h antes ou no-show: perda do sinal (se aplicável) ou 50% do valor. Entendemos imprevistos - contacte-nos!',
  },
  {
    id: '9',
    category: 'Preparação',
    question: 'Como devo me preparar para a massagem?',
    answer: 'Tome um banho antes de vir (temos chuveiros disponíveis se necessário). Evite refeições pesadas 2h antes. Não consuma álcool excessivo. Traga roupa interior confortável ou use as toalhas que fornecemos. Chegue 5-10 minutos antes para se acalmar e preencher a ficha rápida de preferências.',
  },
  {
    id: '10',
    category: 'Duração',
    question: 'Posso prolongar a massagem durante a sessão?',
    answer: 'Depende da disponibilidade da massagista e do horário seguinte. Se houver disponibilidade, pode prolongar pagando a diferença. Recomendamos discutir isso no início da sessão ou agendar logo a duração desejada para garantir o tempo.',
  },
]

const categories = ['Todas', 'Agendamento', 'Serviços', 'Preços', 'Privacidade', 'Preparação', 'Cancelamento']

export default function InteractiveFAQ() {
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [searchQuery, setSearchQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'Todas' || faq.category === selectedCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Perguntas Frequentes
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tudo o que precisa de <span className="text-blue-400">saber</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Respostas às dúvidas mais comuns. Não encontrou o que procura? Fale connosco!
          </p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Pesquisar perguntas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'bg-slate-900/50 border rounded-xl overflow-hidden transition-all',
                openId === faq.id ? 'border-blue-500/50' : 'border-slate-800 hover:border-slate-700'
              )}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full p-6 text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {faq.isPopular && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium">
                      Popular
                    </span>
                  )}
                  <span className="font-medium text-white">{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6">
                      <div className="pt-2 border-t border-slate-800">
                        <p className="text-slate-300 leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
                          <span>Categoria: {faq.category}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">Nenhuma pergunta encontrada</p>
            <p className="text-slate-500 text-sm mt-1">Tente outra pesquisa ou categoria</p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Ainda tem dúvidas?</h3>
              <p className="text-slate-400 text-sm">Estamos disponíveis para ajudar via WhatsApp ou telefone</p>
            </div>
            <div className="flex gap-3">
              <a
                href="https://wa.me/351912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-500 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href="tel:+351912345678"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Ligar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
