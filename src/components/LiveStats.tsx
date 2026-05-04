'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Calendar, Star, Clock, TrendingUp, Eye } from 'lucide-react'

interface Stat {
  icon: React.ElementType
  label: string
  value: number
  suffix: string
  color: string
}

const initialStats: Stat[] = [
  { icon: Users, label: 'Clientes Hoje', value: 47, suffix: '', color: 'text-blue-400' },
  { icon: Calendar, label: 'Agendamentos', value: 23, suffix: '', color: 'text-green-400' },
  { icon: Eye, label: 'A Ver Agora', value: 156, suffix: '', color: 'text-purple-400' },
  { icon: Star, label: 'Avaliação', value: 4.9, suffix: '/5', color: 'text-amber-400' },
]

export default function LiveStats() {
  const [stats, setStats] = useState(initialStats)
  const [lastBooking, setLastBooking] = useState('Ricardo agendou há 2 min')

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((stat) => {
          if (stat.label === 'A Ver Agora') {
            // Random fluctuation between 150-180
            return { ...stat, value: Math.floor(Math.random() * 30) + 150 }
          }
          if (stat.label === 'Clientes Hoje') {
            // Slowly increase
            return Math.random() > 0.7 ? { ...stat, value: stat.value + 1 } : stat
          }
          return stat
        })
      )
    }, 3000)

    // Rotate booking messages
    const messages = [
      'Ricardo agendou há 2 min',
      'João reservou há 5 min',
      'Miguel marcou há 1 min',
      'Ana confirmou há 3 min',
      'Pedro agendou há 30 seg',
    ]
    let msgIndex = 0
    const msgInterval = setInterval(() => {
      msgIndex = (msgIndex + 1) % messages.length
      setLastBooking(messages[msgIndex])
    }, 8000)

    return () => {
      clearInterval(interval)
      clearInterval(msgInterval)
    }
  }, [])

  return (
    <div className="w-full">
      {/* Live Activity Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex items-center justify-center gap-2 text-sm"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-green-400 font-medium">{lastBooking}</span>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-xs text-slate-400">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-white">
                  {typeof stat.value === 'number' && stat.value % 1 !== 0
                    ? stat.value.toFixed(1)
                    : stat.value}
                </span>
                <span className={`text-sm ${stat.color}`}>{stat.suffix}</span>
              </div>
              {stat.label === 'A Ver Agora' && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[10px] text-purple-400 mt-1"
                >
                  em tempo real
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Trending Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500"
      >
        <TrendingUp className="w-3 h-3 text-green-400" />
        <span>+23% agendamentos esta semana</span>
      </motion.div>
    </div>
  )
}
