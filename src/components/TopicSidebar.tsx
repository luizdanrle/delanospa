'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, Info, Scale, Sparkles, Users, MapPin, Phone, 
  Gift, HelpCircle, ChevronRight, ChevronDown, Menu, X,
  Heart, Clock, Star, Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Topic {
  id: string
  title: string
  icon: React.ElementType
  description: string
  subItems?: { id: string; title: string }[]
}

const topics: Topic[] = [
  {
    id: 'inicio',
    title: 'Início',
    icon: Home,
    description: 'Página principal e destaques'
  },
  {
    id: 'sobre',
    title: 'Quem Somos',
    icon: Info,
    description: 'Nossa história e valores',
    subItems: [
      { id: 'historia', title: 'História' },
      { id: 'valores', title: 'Nossos Valores' },
      { id: 'estatisticas', title: 'Números' }
    ]
  },
  {
    id: 'regras',
    title: 'O que Oferecemos',
    icon: Scale,
    description: 'Limites e respeito mútuo',
    subItems: [
      { id: 'permitido', title: '✓ Nossos Serviços' },
      { id: 'limites', title: '⚠ Limites Importantes' },
      { id: 'respeito', title: '❤️ Respeito à Massagista' }
    ]
  },
  {
    id: 'massagens',
    title: 'Massagens',
    icon: Sparkles,
    description: 'Todos os tipos de massagens',
    subItems: [
      { id: 'sensuais', title: '🔥 Sensuais' },
      { id: 'terapeuticas', title: '🌿 Terapêuticas' },
      { id: 'desportivas', title: '💪 Desportivas' },
      { id: 'precos', title: '💰 Preços' }
    ]
  },
  {
    id: 'massagistas',
    title: 'Massagistas',
    icon: Users,
    description: 'Conheça nossas profissionais',
    subItems: [
      { id: 'mulheres', title: 'Mulheres' },
      { id: 'homens', title: 'Homens' },
      { id: 'especialidades', title: 'Especialidades' }
    ]
  },
  {
    id: 'locais',
    title: 'Onde Estamos',
    icon: MapPin,
    description: 'Nossas 6 unidades em Portugal',
    subItems: [
      { id: 'lisboa', title: 'Lisboa' },
      { id: 'porto', title: 'Porto' },
      { id: 'algarve', title: 'Algarve' },
      { id: 'leiria', title: 'Leiria' },
      { id: 'coimbra', title: 'Coimbra' },
      { id: 'funchal', title: 'Funchal' }
    ]
  },
  {
    id: 'pacotes',
    title: 'Pacotes & Gift Cards',
    icon: Gift,
    description: 'Ofertas especiais e vouchers',
    subItems: [
      { id: 'romance', title: 'Pacote Romance' },
      { id: 'spaday', title: 'Spa Day' },
      { id: 'fidelidade', title: 'Programa Fidelidade' },
      { id: 'corporativo', title: 'Corporativo' }
    ]
  },
  {
    id: 'duvidas',
    title: 'Dúvidas Frequentes',
    icon: HelpCircle,
    description: 'Respostas para perguntas comuns'
  },
  {
    id: 'contactos',
    title: 'Contactos',
    icon: Phone,
    description: 'Fale connosco',
    subItems: [
      { id: 'whatsapp', title: 'WhatsApp' },
      { id: 'telefone', title: 'Telefone' },
      { id: 'email', title: 'Email' },
      { id: 'horario', title: 'Horário' }
    ]
  }
]

interface TopicSidebarProps {
  activeSection: string
  onNavigate: (id: string) => void
}

export default function TopicSidebar({ activeSection, onNavigate }: TopicSidebarProps) {
  const [expanded, setExpanded] = useState<string[]>(['massagens', 'locais'])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  const toggleExpand = (id: string) => {
    setExpanded(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleClick = (topicId: string) => {
    onNavigate(topicId)
    setMobileOpen(false)
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-20 left-4 z-50 lg:hidden p-3 rounded-xl bg-slate-900 border border-slate-700 text-white shadow-lg"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={isDesktop ? { x: 0, opacity: 1 } : {
          x: mobileOpen ? 0 : -100 + '%',
          opacity: mobileOpen ? 1 : 0
        }}
        className={cn(
          'fixed left-0 top-0 h-screen w-80 bg-slate-950 border-r border-slate-800 z-40',
          'lg:relative lg:translate-x-0 lg:opacity-100 lg:block overflow-hidden'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg">DelanoSpa</h1>
              <p className="text-slate-400 text-xs">Menu de Tópicos</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-4 py-3 grid grid-cols-3 gap-2 border-b border-slate-800 bg-slate-900/50">
          <div className="text-center">
            <Clock className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <p className="text-xs text-slate-400">10h-22h</p>
          </div>
          <div className="text-center">
            <Star className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <p className="text-xs text-slate-400">4.9★</p>
          </div>
          <div className="text-center">
            <Shield className="w-4 h-4 text-green-400 mx-auto mb-1" />
            <p className="text-xs text-slate-400">VIP</p>
          </div>
        </div>

        {/* Topics List */}
        <div className="flex-1 overflow-y-auto h-[calc(100vh-180px)] p-4 space-y-2">
          {topics.map((topic) => {
            const isExpanded = expanded.includes(topic.id)
            const isActive = activeSection === topic.id
            const hasSubItems = topic.subItems && topic.subItems.length > 0

            return (
              <div key={topic.id} className="space-y-1">
                {/* Main Topic Button */}
                <button
                  onClick={() => {
                    if (hasSubItems) {
                      toggleExpand(topic.id)
                    }
                    handleClick(topic.id)
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left',
                    isActive 
                      ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30' 
                      : 'hover:bg-slate-900 border border-transparent'
                  )}
                >
                  <div className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
                    isActive ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-400'
                  )}>
                    <topic.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      'font-medium text-sm',
                      isActive ? 'text-white' : 'text-slate-300'
                    )}>
                      {topic.title}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{topic.description}</p>
                  </div>
                  {hasSubItems && (
                    <ChevronDown className={cn(
                      'w-4 h-4 text-slate-500 transition-transform',
                      isExpanded && 'rotate-180'
                    )} />
                  )}
                </button>

                {/* Sub Items */}
                <AnimatePresence>
                  {hasSubItems && isExpanded && topic.subItems && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-4 pl-4 border-l border-slate-800 space-y-1 overflow-hidden"
                    >
                      {topic.subItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => {
                            // Navegar para o tópico principal, não para o subitem
                            handleClick(topic.id)
                          }}
                          className={cn(
                            'w-full flex items-center gap-2 p-2 rounded-lg text-sm transition-all text-left',
                            activeSection === topic.id
                              ? 'text-purple-400 bg-purple-500/10'
                              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-900/50'
                          )}
                        >
                          <ChevronRight className="w-3 h-3" />
                          {subItem.title}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Footer CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 bg-slate-950">
          <a
            href="https://wa.me/351912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold text-sm hover:from-green-500 hover:to-emerald-500 transition-all"
          >
            <Phone className="w-4 h-4" />
            Agendar Agora
          </a>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  )
}
