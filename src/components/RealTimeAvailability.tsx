'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Star,
  MapPin,
  Sparkles,
  User,
  ArrowRight,
  AlertCircle,
  Phone,
  MessageCircle,
  ChevronRight,
  RefreshCw,
  Info
} from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Therapist {
  id: string
  name: string
  age: number
  location: string
  phone: string
  specialties: string[]
  rating: number
  reviews: number
  image: string
  isAvailable: boolean
  isOnVacation?: boolean
  vacationUntil?: string
  schedule: {
    [key: string]: { open: string; close: string; slots: string[] }
  }
  services: {
    id: string
    name: string
    duration: number
    price: string
  }[]
}

// Generate 5-minute interval slots between open and close time
const generateFiveMinuteSlots = (open: string, close: string): string[] => {
  if (open === 'Fechado' || close === 'Fechado') return []
  
  const slots: string[] = []
  const [openHour, openMin] = open.split(':').map(Number)
  const [closeHour, closeMin] = close.split(':').map(Number)
  
  let currentHour = openHour
  let currentMin = openMin
  
  while (currentHour < closeHour || (currentHour === closeHour && currentMin < closeMin)) {
    slots.push(`${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`)
    
    currentMin += 5
    if (currentMin >= 60) {
      currentMin = 0
      currentHour += 1
    }
  }
  
  return slots
}

const therapists: Therapist[] = [
  {
    id: '1',
    name: 'Sofia',
    age: 26,
    location: 'Lisboa - Saldanha',
    phone: '351910000001',
    specialties: ['Tântrica', 'Body to Body', 'Nuru'],
    rating: 4.9,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop',
    isAvailable: true,
    schedule: {
      '1': { open: '10:00', close: '21:00', slots: generateFiveMinuteSlots('10:00', '21:00') },
      '2': { open: '10:00', close: '21:00', slots: generateFiveMinuteSlots('10:00', '21:00') },
      '3': { open: '10:00', close: '21:00', slots: generateFiveMinuteSlots('10:00', '21:00') },
      '4': { open: '10:00', close: '21:00', slots: generateFiveMinuteSlots('10:00', '21:00') },
      '5': { open: '10:00', close: '22:00', slots: generateFiveMinuteSlots('10:00', '22:00') },
      '6': { open: '11:00', close: '20:00', slots: generateFiveMinuteSlots('11:00', '20:00') },
      '0': { open: '14:00', close: '20:00', slots: generateFiveMinuteSlots('14:00', '20:00') },
    },
    services: [
      { id: 'tantric', name: 'Massagem Tântrica', duration: 90, price: 'Desde €150' },
      { id: 'body', name: 'Body to Body', duration: 60, price: 'Desde €120' },
      { id: 'nuru', name: 'Nuru Gel', duration: 60, price: 'Desde €140' },
    ]
  },
  {
    id: '2',
    name: 'Mariana',
    age: 28,
    location: 'Lisboa - Saldanha',
    phone: '351910000002',
    specialties: ['Terapêutica', 'Relaxante', 'Tântrica'],
    rating: 4.8,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=400&fit=crop',
    isAvailable: true,
    schedule: {
      '1': { open: '09:00', close: '20:00', slots: generateFiveMinuteSlots('09:00', '20:00') },
      '2': { open: '09:00', close: '20:00', slots: generateFiveMinuteSlots('09:00', '20:00') },
      '3': { open: '09:00', close: '20:00', slots: generateFiveMinuteSlots('09:00', '20:00') },
      '4': { open: '09:00', close: '20:00', slots: generateFiveMinuteSlots('09:00', '20:00') },
      '5': { open: '09:00', close: '21:00', slots: generateFiveMinuteSlots('09:00', '21:00') },
      '6': { open: '10:00', close: '18:00', slots: generateFiveMinuteSlots('10:00', '18:00') },
      '0': { open: 'Fechado', close: 'Fechado', slots: [] },
    },
    services: [
      { id: 'therapeutic', name: 'Massagem Terapêutica', duration: 60, price: 'Desde €80' },
      { id: 'relax', name: 'Relaxante', duration: 60, price: 'Desde €70' },
      { id: 'tantric', name: 'Tântrica', duration: 90, price: 'Desde €140' },
    ]
  },
  {
    id: '3',
    name: 'Carolina',
    age: 24,
    location: 'Porto - Trindade',
    phone: '351910000003',
    specialties: ['VIP', 'Quatro Mãos', 'Tântrica'],
    rating: 5.0,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop',
    isAvailable: true,
    schedule: {
      '1': { open: '11:00', close: '21:00', slots: generateFiveMinuteSlots('11:00', '21:00') },
      '2': { open: '11:00', close: '21:00', slots: generateFiveMinuteSlots('11:00', '21:00') },
      '3': { open: '11:00', close: '21:00', slots: generateFiveMinuteSlots('11:00', '21:00') },
      '4': { open: '11:00', close: '21:00', slots: generateFiveMinuteSlots('11:00', '21:00') },
      '5': { open: '11:00', close: '22:00', slots: generateFiveMinuteSlots('11:00', '22:00') },
      '6': { open: '12:00', close: '21:00', slots: generateFiveMinuteSlots('12:00', '21:00') },
      '0': { open: '14:00', close: '19:00', slots: generateFiveMinuteSlots('14:00', '19:00') },
    },
    services: [
      { id: 'vip', name: 'Experiência VIP', duration: 120, price: 'Desde €300' },
      { id: 'fourhands', name: 'Quatro Mãos', duration: 60, price: 'Desde €220' },
      { id: 'tantric', name: 'Tântrica Premium', duration: 90, price: 'Desde €160' },
    ]
  },
  {
    id: '4',
    name: 'Ana',
    age: 30,
    location: 'Porto - Trindade',
    phone: '351910000004',
    specialties: ['Desportiva', 'Terapêutica', 'Relaxante'],
    rating: 4.7,
    reviews: 84,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop',
    isAvailable: false,
    isOnVacation: true,
    vacationUntil: '15/01/2025',
    schedule: {},
    services: [
      { id: 'sports', name: 'Massagem Desportiva', duration: 60, price: 'Desde €85' },
      { id: 'therapeutic', name: 'Terapêutica', duration: 60, price: 'Desde €75' },
      { id: 'relax', name: 'Relaxante', duration: 60, price: 'Desde €70' },
    ]
  },
  {
    id: '5',
    name: 'Joana',
    age: 27,
    location: 'Faro - Centro',
    phone: '351910000005',
    specialties: ['Body to Body', 'Tântrica', 'Couples'],
    rating: 4.9,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=400&fit=crop',
    isAvailable: true,
    schedule: {
      '1': { open: '14:00', close: '22:00', slots: generateFiveMinuteSlots('14:00', '22:00') },
      '2': { open: '14:00', close: '22:00', slots: generateFiveMinuteSlots('14:00', '22:00') },
      '3': { open: '14:00', close: '22:00', slots: generateFiveMinuteSlots('14:00', '22:00') },
      '4': { open: '14:00', close: '22:00', slots: generateFiveMinuteSlots('14:00', '22:00') },
      '5': { open: '14:00', close: '23:00', slots: generateFiveMinuteSlots('14:00', '23:00') },
      '6': { open: '16:00', close: '21:00', slots: generateFiveMinuteSlots('16:00', '21:00') },
      '0': { open: '16:00', close: '20:00', slots: generateFiveMinuteSlots('16:00', '20:00') },
    },
    services: [
      { id: 'body', name: 'Body to Body', duration: 60, price: 'Desde €130' },
      { id: 'tantric', name: 'Tântrica', duration: 90, price: 'Desde €155' },
      { id: 'couples', name: 'Para Casais', duration: 90, price: 'Desde €240' },
    ]
  },
]

const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

function getCurrentStatus(therapist: Therapist) {
  const now = new Date()
  const currentDay = now.getDay().toString()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  const currentTime = currentHour * 60 + currentMinute

  if (therapist.isOnVacation) {
    return { status: 'vacation', message: `De férias até ${therapist.vacationUntil}` }
  }

  const todaySchedule = therapist.schedule[currentDay]
  if (!todaySchedule || todaySchedule.open === 'Fechado') {
    return { status: 'closed', message: 'Fechada hoje' }
  }

  const [openHour, openMin] = todaySchedule.open.split(':').map(Number)
  const [closeHour, closeMin] = todaySchedule.close.split(':').map(Number)
  const openTime = openHour * 60 + openMin
  const closeTime = closeHour * 60 + closeMin

  if (currentTime < openTime) {
    const minutesUntil = openTime - currentTime
    const hoursUntil = Math.floor(minutesUntil / 60)
    const minsUntil = minutesUntil % 60
    return { 
      status: 'soon', 
      message: `Abre às ${todaySchedule.open} (${hoursUntil}h${minsUntil}m)` 
    }
  }

  if (currentTime >= openTime && currentTime < closeTime) {
    const minutesLeft = closeTime - currentTime
    const hoursLeft = Math.floor(minutesLeft / 60)
    const minsLeft = minutesLeft % 60
    return { 
      status: 'open', 
      message: `Aberta agora (fecha às ${todaySchedule.close})` 
    }
  }

  // Find next open day
  for (let i = 1; i <= 7; i++) {
    const nextDayIndex = (now.getDay() + i) % 7
    const nextDaySchedule = therapist.schedule[nextDayIndex.toString()]
    if (nextDaySchedule && nextDaySchedule.open !== 'Fechado') {
      return { 
        status: 'closed', 
        message: `Abre ${weekDays[nextDayIndex]} às ${nextDaySchedule.open}` 
      }
    }
  }

  return { status: 'closed', message: 'Indisponível' }
}

function getAvailableSlots(therapist: Therapist, selectedDate: Date) {
  const dayKey = selectedDate.getDay().toString()
  const schedule = therapist.schedule[dayKey]
  
  if (!schedule || schedule.open === 'Fechado') return []

  const now = new Date()
  const isToday = selectedDate.toDateString() === now.toDateString()
  const currentTime = now.getHours() * 60 + now.getMinutes()

  return schedule.slots.filter(slot => {
    if (!isToday) return true
    const [hour, min] = slot.split(':').map(Number)
    const slotTime = hour * 60 + min
    // Only show slots at least 30 minutes in the future
    return slotTime > currentTime + 30
  })
}

export default function RealTimeAvailability() {
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [filterLocation, setFilterLocation] = useState<string>('all')
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const filteredTherapists = useMemo(() => {
    if (filterLocation === 'all') return therapists
    return therapists.filter(t => t.location.includes(filterLocation))
  }, [filterLocation])

  const availableSlots = useMemo(() => {
    if (!selectedTherapist) return []
    return getAvailableSlots(selectedTherapist, selectedDate)
  }, [selectedTherapist, selectedDate])

  const generateNextDays = () => {
    const days = []
    const today = new Date()
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push(date)
    }
    return days
  }

  const handleWhatsAppBooking = () => {
    if (!selectedTherapist || !selectedService || !selectedTime) return
    
    const service = selectedTherapist.services.find(s => s.id === selectedService)
    const dateStr = selectedDate.toLocaleDateString('pt-PT', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    })
    
    const message = `Olá ${selectedTherapist.name}! 👋

Quero agendar:
📅 Data: ${dateStr}
⏰ Hora: ${selectedTime}
💆‍♀️ Serviço: ${service?.name}
📍 Local: ${selectedTherapist.location}

Por favor confirme se está disponível. Obrigado!`

    window.open(`https://wa.me/${selectedTherapist.phone}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleDirectWhatsApp = (therapist: Therapist) => {
    const message = `Olá ${therapist.name}! Tenho interesse nos seus serviços. Podemos falar?`
    window.open(`https://wa.me/${therapist.phone}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-4">
            <Clock className="w-4 h-4" />
            Disponibilidade em Tempo Real
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Escolha sua <span className="text-green-400">Terapeuta</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Cada profissional gere a sua própria agenda. 
            O status atualiza automaticamente conforme o horário de Lisboa.
          </p>
        </motion.div>

        {/* Location Filter */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {[
            { id: 'all', label: 'Todas' },
            { id: 'Lisboa', label: 'Lisboa' },
            { id: 'Porto', label: 'Porto' },
            { id: 'Faro', label: 'Faro' },
          ].map((loc) => (
            <button
              key={loc.id}
              onClick={() => {
                setFilterLocation(loc.id)
                setSelectedTherapist(null)
                setSelectedService('')
                setSelectedTime('')
              }}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                filterLocation === loc.id
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              )}
            >
              {loc.label}
            </button>
          ))}
        </div>

        {/* Therapists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTherapists.map((therapist) => {
            const status = getCurrentStatus(therapist)
            return (
              <motion.div
                key={therapist.id}
                whileHover={therapist.isAvailable ? { y: -5 } : {}}
                className={cn(
                  'relative rounded-2xl overflow-hidden cursor-pointer transition-all',
                  selectedTherapist?.id === therapist.id
                    ? 'ring-2 ring-green-500'
                    : 'hover:ring-1 hover:ring-slate-700',
                  !therapist.isAvailable && 'opacity-75'
                )}
              >
                {/* Status Badge - DYNAMIC */}
                <div className={cn(
                  'absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5',
                  status.status === 'open' && 'bg-green-500 text-white',
                  status.status === 'soon' && 'bg-amber-500 text-white',
                  status.status === 'closed' && 'bg-slate-700 text-slate-300',
                  status.status === 'vacation' && 'bg-amber-500 text-white'
                )}>
                  {status.status === 'open' && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                  {status.message}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                  {/* Image */}
                  <div className="relative h-56">
                    <Image
                      src={therapist.image}
                      alt={therapist.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{therapist.name}</h3>
                        <p className="text-slate-400 text-sm">{therapist.age} anos • {therapist.location}</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span className="text-sm font-medium">{therapist.rating}</span>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {therapist.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {therapist.isAvailable ? (
                        <>
                          <button
                            onClick={() => {
                              setSelectedTherapist(therapist)
                              setSelectedService('')
                              setSelectedTime('')
                              setSelectedDate(new Date())
                            }}
                            className={cn(
                              'flex-1 py-2.5 rounded-lg font-medium text-sm transition-all',
                              selectedTherapist?.id === therapist.id
                                ? 'bg-green-600 text-white'
                                : 'bg-slate-800 text-white hover:bg-slate-700'
                            )}
                          >
                            {selectedTherapist?.id === therapist.id ? 'Selecionada' : 'Ver Agenda'}
                          </button>
                          <button
                            onClick={() => handleDirectWhatsApp(therapist)}
                            className="px-3 py-2.5 rounded-lg bg-green-600/20 text-green-400 hover:bg-green-600/30 transition-all"
                          >
                            <MessageCircle className="w-5 h-5" />
                          </button>
                        </>
                      ) : (
                        <button
                          disabled
                          className="w-full py-2.5 rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed text-sm"
                        >
                          {therapist.isOnVacation ? 'Em férias' : 'Indisponível'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Booking Panel - Only show when therapist selected */}
        <AnimatePresence>
          {selectedTherapist && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
            >
              <div className="p-6 md:p-8">
                {/* Selected Therapist Header */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-800">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={selectedTherapist.image}
                      alt={selectedTherapist.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">Agendar com {selectedTherapist.name}</h3>
                    <p className="text-slate-400">{selectedTherapist.location} • WhatsApp direto</p>
                  </div>
                  <button
                    onClick={() => setSelectedTherapist(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left: Service Selection */}
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-green-400" />
                      Escolha o serviço
                    </h4>
                    <div className="space-y-3">
                      {selectedTherapist.services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => setSelectedService(service.id)}
                          className={cn(
                            'w-full p-4 rounded-xl border text-left transition-all',
                            selectedService === service.id
                              ? 'border-green-500 bg-green-500/10'
                              : 'border-slate-800 hover:border-slate-700'
                          )}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-white">{service.name}</p>
                              <p className="text-sm text-slate-400">{service.duration} minutos</p>
                            </div>
                            <span className="text-green-400 font-medium">{service.price}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right: Date & Time */}
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-green-400" />
                      Escolha data e hora
                    </h4>

                    {/* Date Selection */}
                    <div className="mb-6">
                      <p className="text-sm text-slate-400 mb-3">Próximos 14 dias:</p>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {generateNextDays().map((date, index) => {
                          const dayKey = date.getDay().toString()
                          const schedule = selectedTherapist.schedule[dayKey]
                          const isAvailable = schedule && schedule.open !== 'Fechado'
                          const isSelected = selectedDate.toDateString() === date.toDateString()
                          const isToday = index === 0

                          return (
                            <button
                              key={index}
                              disabled={!isAvailable}
                              onClick={() => {
                                setSelectedDate(date)
                                setSelectedTime('')
                              }}
                              className={cn(
                                'flex-shrink-0 p-3 rounded-xl text-center min-w-[70px] transition-all',
                                isSelected
                                  ? 'bg-green-600 text-white'
                                  : isAvailable
                                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                    : 'bg-slate-900 text-slate-600 cursor-not-allowed'
                              )}
                            >
                              <p className="text-xs uppercase">{weekDays[date.getDay()].slice(0, 3)}</p>
                              <p className="text-lg font-semibold">{date.getDate()}</p>
                              {isToday && <p className="text-[10px] text-green-400">Hoje</p>}
                              {!isAvailable && <p className="text-[10px] text-slate-600">Fechado</p>}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Time Selection */}
                    {selectedDate && (
                      <div>
                        <p className="text-sm text-slate-400 mb-3">
                          Horários disponíveis para {selectedDate.toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric' })}:
                        </p>
                        {availableSlots.length > 0 ? (
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {availableSlots.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={cn(
                                  'py-2.5 px-3 rounded-lg text-center text-sm transition-all',
                                  selectedTime === time
                                    ? 'bg-green-600 text-white'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                )}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                            <AlertCircle className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                            <p className="text-amber-400 text-sm">
                              Sem horários disponíveis para esta data
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Final CTA */}
                {selectedService && selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 pt-6 border-t border-slate-800"
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <p className="text-slate-400 text-sm">Resumo do agendamento:</p>
                        <p className="text-white">
                          {selectedTherapist.services.find(s => s.id === selectedService)?.name} • {' '}
                          {selectedDate.toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'short' })} • {' '}
                          {selectedTime}
                        </p>
                      </div>
                      <button
                        onClick={handleWhatsAppBooking}
                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-green-500/30 transition-all"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Confirmar via WhatsApp
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-center text-slate-500 text-sm mt-4">
                      A {selectedTherapist.name} confirmará a disponibilidade em poucos minutos
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-green-400" />
            </div>
            <h4 className="font-medium text-white mb-2">Agenda em Tempo Real</h4>
            <p className="text-slate-400 text-sm">
              O status atualiza automaticamente conforme o horário de Lisboa. 
              Apenas horários futuros são mostrados.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="font-medium text-white mb-2">Confirmação Direta</h4>
            <p className="text-slate-400 text-sm">
              O agendamento é enviado diretamente para o WhatsApp da terapeuta.
              Ela confirma manualmente em minutos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
              <Info className="w-6 h-6 text-amber-400" />
            </div>
            <h4 className="font-medium text-white mb-2">Cada Profissional é Única</h4>
            <p className="text-slate-400 text-sm">
              Cada terapeuta gere a sua própria agenda e horários.
              Férias e folgas são respeitadas automaticamente.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
