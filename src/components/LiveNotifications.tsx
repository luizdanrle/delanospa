'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, 
  Clock, 
  Star, 
  User,
  Sparkles,
  CheckCircle
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

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length)
        setIsVisible(true)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

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
              'flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm max-w-xs',
              colors
            )}
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {current.message}
              </p>
              <div className="flex items-center gap-2 text-xs opacity-80">
                <MapPin className="w-3 h-3" />
                <span>{current.location}</span>
                <span>•</span>
                <Clock className="w-3 h-3" />
                <span>{current.time}</span>
              </div>
            </div>
            {current.rating && (
              <div className="flex items-center gap-0.5">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Smaller version for mobile
export function LiveNotificationsMobile() {
  const [current, setCurrent] = useState(notifications[0])

  useEffect(() => {
    const interval = setInterval(() => {
      const random = notifications[Math.floor(Math.random() * notifications.length)]
      setCurrent(random)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const Icon = getIcon(current.type)

  return (
    <div className="lg:hidden fixed bottom-28 left-4 right-4 z-40">
      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 text-sm"
      >
        <Icon className="w-4 h-4 text-green-400" />
        <span className="text-slate-300 truncate">{current.message}</span>
        <span className="text-slate-500 text-xs">{current.time}</span>
      </motion.div>
    </div>
  )
}
