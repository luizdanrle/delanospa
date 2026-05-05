'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, 
  Clock, 
  Star, 
  User,
  Sparkles,
  CheckCircle,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Notification {
  id: string
  type: 'booking' | 'review' | 'viewing'
  message: string
  location: string
  time: string
  rating?: number
}

const notifications: Notification[] = [
  { id: '1', type: 'booking', message: 'Ricardo agendou Massagem Tântrica', location: 'Lisboa', time: 'agora', rating: 5 },
  { id: '2', type: 'viewing', message: 'Alguém está a ver Massagem VIP', location: 'Porto', time: 'agora' },
  { id: '3', type: 'review', message: 'João deixou uma avaliação 5 estrelas', location: 'Lisboa', time: 'há 2 min', rating: 5 },
  { id: '4', type: 'booking', message: 'Miguel agendou Quatro Mãos', location: 'Faro', time: 'há 3 min' },
  { id: '5', type: 'viewing', message: '3 pessoas a verem Body to Body', location: 'Porto', time: 'agora' },
  { id: '6', type: 'review', message: 'António recomenda a Sofia', location: 'Leiria', time: 'há 5 min', rating: 5 },
  { id: '7', type: 'booking', message: 'Bruno reservou para Casais', location: 'Lisboa', time: 'há 7 min' },
  { id: '8', type: 'viewing', message: 'Alguém de Coimbra a explorar', location: 'Online', time: 'agora' },
]

const getIcon = (type: string) => {
  switch (type) {
    case 'booking': return CheckCircle
    case 'review': return Star
    case 'viewing': return User
    default: return Sparkles
  }
}

const getColors = (type: string) => {
  switch (type) {
    case 'booking': return 'bg-green-500/10 border-green-500/20 text-green-400'
    case 'review': return 'bg-amber-500/10 border-amber-500/20 text-amber-400'
    case 'viewing': return 'bg-blue-500/10 border-blue-500/20 text-blue-400'
    default: return 'bg-slate-800 text-slate-400'
  }
}

export default function LiveNotifications() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isClosed, setIsClosed] = useState(false)

  useEffect(() => {
    if (isClosed) return
    
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length)
        setIsVisible(true)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [isClosed])

  const handleClose = () => {
    setIsClosed(true)
    setIsVisible(false)
  }

  if (isClosed) return null

  const current = notifications[currentIndex]
  const Icon = getIcon(current.type)
  const colors = getColors(current.type)

  return (
    <div className="fixed bottom-36 left-4 z-40 hidden lg:block">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg border backdrop-blur-sm max-w-[240px] text-xs',
              colors
            )}
          >
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate leading-tight">
                {current.message}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] opacity-80 mt-0.5">
                <MapPin className="w-2.5 h-2.5" />
                <span>{current.location}</span>
                <span>•</span>
                <span>{current.time}</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1 rounded hover:bg-white/10 transition-colors flex-shrink-0"
              aria-label="Fechar notificação"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Smaller version for mobile
export function LiveNotificationsMobile() {
  const [current, setCurrent] = useState(notifications[0])
  const [isClosed, setIsClosed] = useState(false)

  useEffect(() => {
    if (isClosed) return
    
    const interval = setInterval(() => {
      const random = notifications[Math.floor(Math.random() * notifications.length)]
      setCurrent(random)
    }, 5000)
    return () => clearInterval(interval)
  }, [isClosed])

  const handleClose = () => {
    setIsClosed(true)
  }

  if (isClosed) return null

  const Icon = getIcon(current.type)

  return (
    <div className="lg:hidden fixed bottom-28 left-4 right-4 z-40">
      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900/90 border border-slate-800 text-xs"
      >
        <Icon className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
        <span className="text-slate-300 truncate flex-1">{current.message}</span>
        <span className="text-slate-500 text-[10px] flex-shrink-0">{current.time}</span>
        <button
          onClick={handleClose}
          className="p-1 rounded hover:bg-white/10 transition-colors flex-shrink-0 ml-1"
          aria-label="Fechar"
        >
          <X className="w-3 h-3 text-slate-400" />
        </button>
      </motion.div>
    </div>
  )
}
