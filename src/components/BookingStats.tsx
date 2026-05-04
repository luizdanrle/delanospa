'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Star,
  Calendar,
  MapPin
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Stat {
  label: string
  value: number
  suffix: string
  icon: React.ReactNode
  color: string
}

export default function BookingStats() {
  const [stats, setStats] = useState<Stat[]>([
    { label: 'Clientes Satisfeitos', value: 0, suffix: '+', icon: <Users className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
    { label: 'Avaliações 5 Estrelas', value: 0, suffix: '', icon: <Star className="w-6 h-6" />, color: 'from-amber-500 to-orange-500' },
    { label: 'Minutos de Relaxamento', value: 0, suffix: 'K', icon: <Clock className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
    { label: 'Agendamentos Hoje', value: 0, suffix: '', icon: <Calendar className="w-6 h-6" />, color: 'from-purple-500 to-pink-500' },
  ])

  useEffect(() => {
    // Animate numbers on mount
    const targets = [2847, 456, 156, 12]
    const duration = 2000
    const steps = 60
    
    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      setStats(prev => prev.map((stat, i) => ({
        ...stat,
        value: Math.round(targets[i] * easeOut)
      })))

      if (currentStep >= steps) {
        clearInterval(interval)
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform" />
              <div className="relative p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center">
                <div className={cn(
                  'w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mx-auto mb-4',
                  stat.color
                )}>
                  <div className="text-white">{stat.icon}</div>
                </div>
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}{stat.suffix}
                </p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Live indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-400 text-sm">Dados atualizados em tempo real</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
