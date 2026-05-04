'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Phone, 
  Calendar, 
  MessageCircle, 
  X,
  Sparkles,
  Clock,
  MapPin
} from 'lucide-react'

const actions = [
  {
    id: 'call',
    icon: Phone,
    label: 'Ligar Agora',
    color: 'bg-green-500',
    href: 'tel:+351912345678',
    external: false,
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    label: 'WhatsApp',
    color: 'bg-green-600',
    href: 'https://wa.me/351912345678?text=Olá! Gostaria de agendar uma massagem.',
    external: true,
  },
  {
    id: 'booking',
    icon: Calendar,
    label: 'Ver Disponibilidade',
    color: 'bg-gradient-to-r from-red-600 to-rose-600',
    action: 'scrollToCalendar',
  },
  {
    id: 'locations',
    icon: MapPin,
    label: 'Nossos Locais',
    color: 'bg-purple-500',
    href: '#locais',
    external: false,
  },
]

export default function QuickActions() {
  const [isOpen, setIsOpen] = useState(false)

  const handleAction = (action: typeof actions[0]) => {
    if (action.action === 'scrollToCalendar') {
      // Find calendar section and scroll to it
      const calendarSection = document.querySelector('[data-section="calendar"]') || 
                              document.getElementById('calendar') ||
                              document.querySelector('.availability-calendar') ||
                              document.querySelector('section:has(.availability-calendar)')
      
      if (calendarSection) {
        calendarSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else {
        // Fallback: scroll to middle of page where calendar usually is
        window.scrollTo({ top: window.innerHeight * 2.5, behavior: 'smooth' })
      }
      setIsOpen(false)
      return
    }
    
    if (action.href) {
      if (action.external) {
        window.open(action.href, '_blank', 'noopener,noreferrer')
      } else if (action.href.startsWith('#')) {
        const element = document.querySelector(action.href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        } else {
          // Fallback for hash links
          const targetId = action.href.replace('#', '')
          const target = document.getElementById(targetId) || 
                        document.querySelector(`[data-section="${targetId}"]`)
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
          }
        }
      } else {
        window.location.href = action.href
      }
      setIsOpen(false)
    }
  }

  return (
    <div className="fixed bottom-28 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.button
                  key={action.id}
                  onClick={() => handleAction(action)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 group"
                >
                  <span className="px-3 py-1 rounded-lg bg-slate-800 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {action.label}
                  </span>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center shadow-lg cursor-pointer`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </motion.div>
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-colors ${
          isOpen ? 'bg-slate-800' : 'bg-gradient-to-r from-red-600 to-rose-600'
        }`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Plus className="w-6 h-6 text-white" />
          )}
        </motion.div>
      </motion.button>

      {/* Notification Badge */}
      {!isOpen && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-slate-950 flex items-center justify-center"
        >
          <Sparkles className="w-2.5 h-2.5 text-white" />
        </motion.span>
      )}
    </div>
  )
}

// Quick stats floating widget
export function QuickStats() {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
    >
      <motion.div
        onHoverStart={() => setExpanded(true)}
        onHoverEnd={() => setExpanded(false)}
        className={`bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 p-3 transition-all ${
          expanded ? 'w-48' : 'w-14'
        }`}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm"
              >
                <p className="text-white font-medium">8 online</p>
                <p className="text-slate-500 text-xs">Massagistas</p>
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm"
              >
                <p className="text-white font-medium">Aberto</p>
                <p className="text-slate-500 text-xs">10h - 22h</p>
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-red-500" />
            </div>
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm"
              >
                <p className="text-white font-medium">6 Locais</p>
                <p className="text-slate-500 text-xs">Portugal</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
