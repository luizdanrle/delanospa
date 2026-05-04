'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Check, Star, Users, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimeSlot {
  time: string
  available: boolean
  therapist: string
  isVIP: boolean
}

interface DaySchedule {
  date: string
  dayName: string
  slots: TimeSlot[]
}

const generateSchedule = (): DaySchedule[] => {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  const therapists = ['Mariana', 'Sofia', 'Ana', 'Carolina', 'Joana', 'Inês']
  const schedule: DaySchedule[] = []
  
  const today = new Date()
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    const slots: TimeSlot[] = []
    const times = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00']
    
    times.forEach((time, idx) => {
      // Use deterministic pseudo-random based on index for SSR consistency
      const seed = (i * 10 + idx) % 10
      const available = seed > 2
      const therapist = therapists[seed % therapists.length]
      const isVIP = seed === 0
      
      slots.push({ time, available, therapist, isVIP })
    })
    
    schedule.push({
      date: date.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' }),
      dayName: i === 0 ? 'Hoje' : days[date.getDay()],
      slots,
    })
  }
  
  return schedule
}

const locations = [
  { id: 'lisboa', name: 'Lisboa - Saldanha', color: 'from-red-500 to-rose-500' },
  { id: 'porto', name: 'Porto - Trindade', color: 'from-rose-500 to-red-500' },
  { id: 'algarve', name: 'Algarve - Marina', color: 'from-red-600 to-rose-600' },
  { id: 'leiria', name: 'Leiria - Centro', color: 'from-rose-600 to-red-600' },
]

export default function AvailabilityCalendar() {
  const [schedule, setSchedule] = useState<DaySchedule[]>([])
  const [selectedDay, setSelectedDay] = useState(0)
  const [selectedLocation, setSelectedLocation] = useState('lisboa')
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setSchedule(generateSchedule())
  }, [])

  const currentDay = schedule[selectedDay] || { date: '', dayName: '', slots: [] }
  const availableSlots = currentDay.slots.filter(s => s.available).length

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-red-950/5 to-slate-950" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            Disponibilidade em Tempo Real
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Escolha o seu <span className="text-red-400">Momento</span>
          </h2>
          <p className="text-rose-200/60 max-w-2xl mx-auto">
            Veja os horários disponíveis e reserve instantaneamente. 
            Atualizado em tempo real conforme as reservas acontecem.
          </p>
        </motion.div>

        {/* Location Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-slate-400 text-sm mb-3 text-center">Selecione o local:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all',
                  selectedLocation === loc.id
                    ? `bg-gradient-to-r ${loc.color} text-white shadow-lg`
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-red-500/30'
                )}
              >
                <MapPin className="w-4 h-4" />
                {loc.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Calendar Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900/50 rounded-3xl border border-slate-800 overflow-hidden"
        >
          {/* Day Navigation */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <button
              onClick={() => setSelectedDay(Math.max(0, selectedDay - 1))}
              disabled={selectedDay === 0}
              className="p-2 rounded-full bg-slate-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <h3 className="text-xl font-bold text-white">
                {currentDay.dayName}, {currentDay.date}
              </h3>
              <p className="text-rose-400 text-sm">
                {availableSlots} vagas disponíveis
              </p>
            </div>
            
            <button
              onClick={() => setSelectedDay(Math.min(6, selectedDay + 1))}
              disabled={selectedDay === 6}
              className="p-2 rounded-full bg-slate-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Time Slots Grid */}
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {currentDay.slots.map((slot, idx) => (
                <motion.button
                  key={slot.time}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  disabled={!slot.available}
                  onMouseEnter={() => setHoveredSlot(slot.time)}
                  onMouseLeave={() => setHoveredSlot(null)}
                  onClick={() => {
                    window.open(`https://wa.me/351912345678?text=Quero agendar para ${currentDay.dayName} às ${slot.time} com ${slot.therapist}`, '_blank')
                  }}
                  className={cn(
                    'relative p-4 rounded-xl transition-all text-left',
                    slot.available
                      ? 'bg-slate-800 hover:bg-red-600/20 border border-slate-700 hover:border-red-500/50 cursor-pointer'
                      : 'bg-slate-900/50 border border-slate-800 opacity-50 cursor-not-allowed'
                  )}
                >
                  {/* VIP Badge */}
                  {slot.isVIP && slot.available && (
                    <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[10px] font-bold flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-white" />
                      VIP
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className={cn(
                      'w-4 h-4',
                      slot.available ? 'text-red-400' : 'text-slate-600'
                    )} />
                    <span className={cn(
                      'font-bold',
                      slot.available ? 'text-white' : 'text-slate-600'
                    )}>
                      {slot.time}
                    </span>
                  </div>
                  
                  {slot.available ? (
                    <>
                      <p className="text-xs text-rose-300/70">{slot.therapist}</p>
                      {hoveredSlot === slot.time && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 flex items-center gap-1 text-xs text-green-400"
                        >
                          <Check className="w-3 h-3" />
                          Reservar
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <p className="text-xs text-slate-600">Ocupado</p>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="px-6 py-4 bg-slate-900/80 border-t border-slate-800 flex flex-wrap justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-slate-800 border border-slate-700" />
              <span className="text-slate-400">Disponível</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-slate-900/50 border border-slate-800 opacity-50" />
              <span className="text-slate-500">Reservado</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-amber-400">Sessão VIP</span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-rose-300/60 mb-4">Não encontrou o horário ideal?</p>
          <a
            href="https://wa.me/351912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold hover:from-red-500 hover:to-rose-500 transition-all shadow-lg shadow-red-500/30"
          >
            <Sparkles className="w-4 h-4" />
            Falar com Atendimento
          </a>
        </motion.div>
      </div>
    </section>
  )
}
