'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Clock, MapPin, Star } from 'lucide-react'

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

  useEffect(() => {
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
  }, [])

  if (!isVisible) return null

  const activity = activities[currentActivity]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -100 }}
        className="fixed bottom-24 left-4 z-40 max-w-sm"
      >
        <div className="relative p-4 rounded-xl bg-slate-900/95 border border-red-500/30 shadow-2xl backdrop-blur-sm">
          {/* Pulse effect */}
          <motion.div
            className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-green-500"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white font-bold text-sm border-2 border-red-500/30">
              {activity.avatar}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">
                <span className="text-red-400">{activity.name}</span> {activity.action}
              </p>
              <div className="flex items-center gap-3 mt-1 text-xs text-rose-300/60">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {activity.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </span>
              </div>
            </div>
            
            {/* Verified badge */}
            <div className="flex items-center gap-0.5 text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
              <span className="text-xs">★</span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-800 rounded-b-xl overflow-hidden">
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
