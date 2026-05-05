'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Clock, MapPin, Star, X } from 'lucide-react'

interface Activity {
  id: number
  name: string
  action: string
  location: string
  time: string
  avatar: string
}

const activities: Activity[] = [
  { id: 1, name: 'Ricardo', action: 'agendou Massagem Tântrica', location: 'Lisboa', time: 'agora', avatar: 'R' },
  { id: 2, name: 'João', action: 'reservou com Mariana', location: 'Porto', time: '2 min', avatar: 'J' },
  { id: 3, name: 'Miguel', action: 'agendou Experiência VIP', location: 'Algarve', time: '5 min', avatar: 'M' },
  { id: 4, name: 'António', action: 'marcou Massagem Quatro Mãos', location: 'Leiria', time: '8 min', avatar: 'A' },
  { id: 5, name: 'Pedro', action: 'agendou Body to Body', location: 'Lisboa', time: '12 min', avatar: 'P' },
  { id: 6, name: 'Carlos', action: 'reservou com Sofia', location: 'Porto', time: '15 min', avatar: 'C' },
]

export default function RecentActivity() {
  const [currentActivity, setCurrentActivity] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  useEffect(() => {
    if (isClosed) return
    
    // Show after 5 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 5000)

    // Rotate activities
    const rotateTimer = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length)
    }, 4000)

    return () => {
      clearTimeout(showTimer)
      clearInterval(rotateTimer)
    }
  }, [isClosed])

  const handleClose = () => {
    setIsClosed(true)
    setIsVisible(false)
  }

  if (!isVisible || isClosed) return null

  const activity = activities[currentActivity]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -100 }}
        className="fixed bottom-24 left-4 z-40 max-w-[200px]"
      >
        <div className="relative p-2 rounded-lg bg-slate-900/95 border border-red-500/30 shadow-lg backdrop-blur-sm">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute -top-2 -right-2 p-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white z-10"
            aria-label="Fechar"
          >
            <X className="w-2.5 h-2.5" />
          </button>

          {/* Pulse effect */}
          <motion.div
            className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-green-500"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <div className="flex items-center gap-2">
            {/* Avatar - menor */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white font-bold text-xs border border-red-500/30 flex-shrink-0">
              {activity.avatar}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium leading-tight">
                <span className="text-red-400">{activity.name}</span> {activity.action}
              </p>
              <div className="flex items-center gap-2 mt-0.5 text-[10px] text-rose-300/60">
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-2.5 h-2.5" />
                  {activity.location}
                </span>
                <span className="flex items-center gap-0.5">
                  <Clock className="w-2.5 h-2.5" />
                  {activity.time}
                </span>
              </div>
            </div>
            
            {/* Verified badge - menor */}
            <div className="flex items-center text-amber-400 flex-shrink-0">
              <Star className="w-2.5 h-2.5 fill-amber-400" />
            </div>
          </div>
          
          {/* Progress bar - mais fino */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-800 rounded-b-lg overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-rose-500"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 4, ease: 'linear' }}
              key={currentActivity}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
