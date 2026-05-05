'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, Info, Scale, Sparkles, Users, MapPin, Phone, 
  Gift, HelpCircle, ChevronRight, ChevronDown, Menu, X,
  Heart, Clock, Star, Shield, Minimize2, Maximize2
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
      { id: 'telegram', title: 'Telegram' },
      { id: 'telefone', title: 'Telefone' },
      { id: 'email', title: 'Email' },
      { id: 'horario', title: 'Horário' }
    ]
  }
]

interface TopicSidebarProps {
  activeSection: string
  onNavigate: (id: string) => void
  onMinimizeChange?: (isMinimized: boolean) => void
}

export default function TopicSidebar({ activeSection, onNavigate, onMinimizeChange }: TopicSidebarProps) {
  const [expanded, setExpanded] = useState<string[]>(['massagens', 'locais'])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  // Notificar pai quando minimizado mudar
  useEffect(() => {
    onMinimizeChange?.(isMinimized)
  }, [isMinimized, onMinimizeChange])

  // Encontrar tópico atual para mostrar no botão flutuante
  const currentTopic = topics.find(t => t.id === activeSection) || topics[0]
  const CurrentIcon = currentTopic.icon

  const toggleExpand = (id: string) => {
    setExpanded(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleClick = (topicId: string) => {
    onNavigate(topicId)
    setMobileOpen(false)
    // Não minimizar automaticamente ao clicar, apenas em mobile
    if (!isDesktop) {
      setMobileOpen(false)
    }
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

      {/* Floating Indicator Button - Desktop Only (quando minimizado) */}
      <AnimatePresence>
        {isMinimized && isDesktop && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={() => setIsMinimized(false)}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-900/95 border border-purple-500/30 shadow-2xl backdrop-blur-sm hover:bg-slate-800 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <CurrentIcon className="w-5 h-5 text-white" />
            </div>
            <div className="writing-vertical text-xs text-slate-400 font-medium" style={{ writingMode: 'vertical-rl' }}>
              {currentTopic.title}
            </div>
            <Maximize2 className="w-4 h-4 text-slate-500" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={isDesktop ? { 
          x: isMinimized ? -100 + '%' : 0, 
          opacity: isMinimized ? 0 : 1 
        } : {
          x: mobileOpen ? 0 : -100 + '%',
          opacity: mobileOpen ? 1 : 0
        }}
        className={cn(
          'fixed left-0 top-0 h-screen w-80 bg-slate-950 border-r border-slate-800 z-40',
          'lg:relative lg:translate-x-0 lg:opacity-100 lg:block overflow-hidden',
          isMinimized && 'lg:hidden'
        )}
      >
        {/* Logo com botão Minimizar */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-white text-lg">DelanoSpa</h1>
                <p className="text-slate-400 text-xs">Menu de Tópicos</p>
              </div>
            </div>
            {/* Minimize Button - Desktop Only */}
            <button
              onClick={() => setIsMinimized(true)}
              className="hidden lg:flex p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Minimizar menu"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
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

        {/* Footer CTA - WhatsApp e Telegram */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 bg-slate-950 space-y-2">
          <a
            href="https://wa.me/351912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold text-sm hover:from-green-500 hover:to-emerald-500 transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
          <a
            href="https://t.me/deliriospa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-sm hover:from-sky-400 hover:to-blue-500 transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036 306.306.02.472-.18 1.898-.962 6.174-1.35 8.244-.168.898-.497 1.198-1.152 1.198-.173 0-.333-.025-.522-.074-.316-.075-.799-.255-1.123-.398-.5-.211-2.25-.968-3.281-1.412-2.084-.899-2.867-1.206-3.212-1.27-.017-.003-.03.007-.03.024 0 .016.03.13.15.306.222.319.557.71.96 1.144 1.08 1.188 2.207 2.735 2.525 3.437.057.126.107.26.107.39 0 .23-.12.447-.333.576-.22.133-.54.171-.872.106-.433-.082-1.695-.738-3.396-1.968-1.204-.874-2.38-1.89-3.234-2.813-.445-.49-.737-.913-.858-1.244-.122-.332-.062-.514.18-.62.178-.074.456-.088.747-.026.28.06 1.168.352 2.623.868 1.227.435 2.19.75 2.876.937.684.186 1.193.26 1.53.22.335-.04.588-.16.755-.357.17-.2.275-.497.32-.895.05-.42.072-1.048.078-1.885.003-.418-.017-.796-.06-1.135a2.22 2.22 0 0 0-.1-.493c-.044-.114-.095-.183-.156-.207-.062-.024-.156-.024-.283.003-.128.027-.29.09-.486.19a7.36 7.36 0 0 0-.665.363c-.426.27-.877.6-1.35.99a.5.5 0 0 1-.355.132.485.485 0 0 1-.312-.1c-.096-.065-.164-.17-.195-.308-.032-.14-.048-.32-.048-.544 0-.302.014-.564.042-.79.028-.223.075-.407.14-.548.066-.142.16-.26.283-.356.124-.095.282-.17.476-.222.618-.16 1.38-.242 2.286-.248.552-.003 1.168.023 1.848.078z"/>
            </svg>
            Telegram
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
