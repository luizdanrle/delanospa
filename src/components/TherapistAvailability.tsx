'use client'

import { useState, useMemo } from 'react'
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
  Filter,
  Heart
} from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Therapist {
  id: string
  name: string
  age: number
  location: string
  specialties: string[]
  rating: number
  reviews: number
  image: string
  isAvailable: boolean
  isOnVacation?: boolean
  vacationUntil?: string
  workingHours: {
    monday: string[]
    tuesday: string[]
    wednesday: string[]
    thursday: string[]
    friday: string[]
    saturday: string[]
    sunday: string[]
  }
  services: {
    id: string
    name: string
    duration: number
    basePrice: number
    isAvailable: boolean
  }[]
}

const therapists: Therapist[] = [
  {
    id: '1',
    name: 'Sofia',
    age: 26,
    location: 'Lisboa - Saldanha',
    specialties: ['Tântrica', 'Body to Body', 'Nuru'],
    rating: 4.9,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop',
    isAvailable: true,
    workingHours: {
      monday: ['10:00', '11:30', '14:00', '15:30', '17:00', '19:00'],
      tuesday: ['10:00', '11:30', '14:00', '15:30', '17:00', '19:00'],
      wednesday: ['10:00', '11:30', '14:00', '15:30', '17:00', '19:00'],
      thursday: ['10:00', '11:30', '14:00', '15:30', '17:00', '19:00'],
      friday: ['10:00', '11:30', '14:00', '15:30', '17:00', '19:00', '20:30'],
      saturday: ['11:00', '12:30', '14:00', '15:30', '17:00', '19:00'],
      sunday: ['14:00', '15:30', '17:00', '19:00'],
    },
    services: [
      { id: 'tantric', name: 'Massagem Tântrica', duration: 90, basePrice: 150, isAvailable: true },
      { id: 'body', name: 'Body to Body', duration: 60, basePrice: 120, isAvailable: true },
      { id: 'nuru', name: 'Nuru Gel', duration: 60, basePrice: 140, isAvailable: true },
      { id: 'vip', name: 'Experiência VIP', duration: 120, basePrice: 250, isAvailable: false },
    ]
  },
  {
    id: '2',
    name: 'Mariana',
    age: 28,
    location: 'Lisboa - Saldanha',
    specialties: ['Terapêutica', 'Relaxante', 'Tântrica'],
    rating: 4.8,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=400&fit=crop',
    isAvailable: true,
    workingHours: {
      monday: ['09:00', '10:30', '12:00', '14:30', '16:00', '18:00'],
      tuesday: ['09:00', '10:30', '12:00', '14:30', '16:00', '18:00'],
      wednesday: ['09:00', '10:30', '12:00', '14:30', '16:00', '18:00'],
      thursday: ['09:00', '10:30', '12:00', '14:30', '16:00', '18:00'],
      friday: ['09:00', '10:30', '12:00', '14:30', '16:00', '18:00', '20:00'],
      saturday: ['10:00', '11:30', '13:00', '15:00', '17:00'],
      sunday: [],
    },
    services: [
      { id: 'therapeutic', name: 'Massagem Terapêutica', duration: 60, basePrice: 80, isAvailable: true },
      { id: 'relax', name: 'Relaxante', duration: 60, basePrice: 70, isAvailable: true },
      { id: 'tantric', name: 'Massagem Tântrica', duration: 90, basePrice: 140, isAvailable: true },
      { id: 'couples', name: 'Para Casais', duration: 90, basePrice: 220, isAvailable: true },
    ]
  },
  {
    id: '3',
    name: 'Carolina',
    age: 24,
    location: 'Porto - Trindade',
    specialties: ['VIP', 'Quatro Mãos', 'Tântrica'],
    rating: 5.0,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop',
    isAvailable: true,
    workingHours: {
      monday: ['11:00', '12:30', '14:00', '16:00', '18:00', '20:00'],
      tuesday: ['11:00', '12:30', '14:00', '16:00', '18:00', '20:00'],
      wednesday: ['11:00', '12:30', '14:00', '16:00', '18:00', '20:00'],
      thursday: ['11:00', '12:30', '14:00', '16:00', '18:00', '20:00'],
      friday: ['11:00', '12:30', '14:00', '16:00', '18:00', '20:00', '21:30'],
      saturday: ['12:00', '14:00', '16:00', '18:00', '20:00'],
      sunday: ['14:00', '16:00', '18:00'],
    },
    services: [
      { id: 'vip', name: 'Experiência VIP', duration: 120, basePrice: 300, isAvailable: true },
      { id: 'fourhands', name: 'Quatro Mãos', duration: 60, basePrice: 220, isAvailable: true },
      { id: 'tantric', name: 'Massagem Tântrica', duration: 90, basePrice: 160, isAvailable: true },
    ]
  },
  {
    id: '4',
    name: 'Ana',
    age: 30,
    location: 'Porto - Trindade',
    specialties: ['Desportiva', 'Terapêutica', 'Relaxante'],
    rating: 4.7,
    reviews: 84,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop',
    isAvailable: false,
    isOnVacation: true,
    vacationUntil: '15/01/2025',
    workingHours: {
      monday: ['10:00', '12:00', '14:00', '16:00', '18:00'],
      tuesday: ['10:00', '12:00', '14:00', '16:00', '18:00'],
      wednesday: ['10:00', '12:00', '14:00', '16:00', '18:00'],
      thursday: ['10:00', '12:00', '14:00', '16:00', '18:00'],
      friday: ['10:00', '12:00', '14:00', '16:00', '18:00'],
      saturday: ['10:00', '12:00', '14:00'],
      sunday: [],
    },
    services: [
      { id: 'sports', name: 'Massagem Desportiva', duration: 60, basePrice: 85, isAvailable: false },
      { id: 'therapeutic', name: 'Terapêutica', duration: 60, basePrice: 75, isAvailable: false },
      { id: 'relax', name: 'Relaxante', duration: 60, basePrice: 70, isAvailable: false },
    ]
  },
  {
    id: '5',
    name: 'Joana',
    age: 27,
    location: 'Faro - Centro',
    specialties: ['Body to Body', 'Tântrica', 'Couples'],
    rating: 4.9,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=400&fit=crop',
    isAvailable: true,
    workingHours: {
      monday: ['14:00', '15:30', '17:00', '19:00', '20:30'],
      tuesday: ['14:00', '15:30', '17:00', '19:00', '20:30'],
      wednesday: ['14:00', '15:30', '17:00', '19:00', '20:30'],
      thursday: ['14:00', '15:30', '17:00', '19:00', '20:30'],
      friday: ['14:00', '15:30', '17:00', '19:00', '20:30', '22:00'],
      saturday: ['16:00', '18:00', '20:00'],
      sunday: ['16:00', '18:00'],
    },
    services: [
      { id: 'body', name: 'Body to Body', duration: 60, basePrice: 130, isAvailable: true },
      { id: 'tantric', name: 'Massagem Tântrica', duration: 90, basePrice: 155, isAvailable: true },
      { id: 'couples', name: 'Para Casais', duration: 90, basePrice: 240, isAvailable: true },
    ]
  },
]

const weekDays = [
  { key: 'monday', label: 'Seg', full: 'Segunda' },
  { key: 'tuesday', label: 'Ter', full: 'Terça' },
  { key: 'wednesday', label: 'Qua', full: 'Quarta' },
  { key: 'thursday', label: 'Qui', full: 'Quinta' },
  { key: 'friday', label: 'Sex', full: 'Sexta' },
  { key: 'saturday', label: 'Sáb', full: 'Sábado' },
  { key: 'sunday', label: 'Dom', full: 'Domingo' },
]

export default function TherapistAvailability() {
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedDay, setSelectedDay] = useState<string>('monday')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [filterLocation, setFilterLocation] = useState<string>('all')
  const [step, setStep] = useState<number>(1)

  const filteredTherapists = useMemo(() => {
    if (filterLocation === 'all') return therapists
    return therapists.filter(t => t.location.includes(filterLocation))
  }, [filterLocation])

  const availableTimes = useMemo(() => {
    if (!selectedTherapist || !selectedDay) return []
    return selectedTherapist.workingHours[selectedDay as keyof typeof selectedTherapist.workingHours] || []
  }, [selectedTherapist, selectedDay])

  const canProceed = () => {
    switch (step) {
      case 1: return selectedTherapist && selectedTherapist.isAvailable
      case 2: return selectedService
      case 3: return selectedDay && selectedTime
      default: return true
    }
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Final submission
      const therapist = selectedTherapist!
      const service = therapist.services.find(s => s.id === selectedService)!
      const message = `Olá! Quero agendar:\n\nMassagista: ${therapist.name}\nServiço: ${service.name}\nData: ${weekDays.find(d => d.key === selectedDay)?.full}\nHora: ${selectedTime}\nLocal: ${therapist.location}`
      window.open(`https://wa.me/351912345678?text=${encodeURIComponent(message)}`, '_blank')
    }
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            Disponibilidade em Tempo Real
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Escolha sua <span className="text-red-400">Massagista</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Cada massagista tem especialidades e horários diferentes. 
            Selecione quem preferir e veja a disponibilidade em tempo real.
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
                setStep(1)
              }}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                filterLocation === loc.id
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              )}
            >
              {loc.label}
            </button>
          ))}
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            {[
              { num: 1, label: 'Massagista' },
              { num: 2, label: 'Serviço' },
              { num: 3, label: 'Horário' },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold',
                  step >= s.num ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-500'
                )}>
                  {s.num}
                </div>
                <span className={cn(
                  'ml-2 text-sm',
                  step >= s.num ? 'text-white' : 'text-slate-500'
                )}>
                  {s.label}
                </span>
                {i < 2 && (
                  <div className={cn(
                    'w-8 h-0.5 mx-4',
                    step > s.num ? 'bg-red-600' : 'bg-slate-800'
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content based on step */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTherapists.map((therapist) => (
                <motion.div
                  key={therapist.id}
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    if (therapist.isAvailable) {
                      setSelectedTherapist(therapist)
                    }
                  }}
                  className={cn(
                    'relative rounded-2xl overflow-hidden cursor-pointer transition-all',
                    selectedTherapist?.id === therapist.id
                      ? 'ring-2 ring-red-500'
                      : 'hover:ring-1 hover:ring-slate-700',
                    !therapist.isAvailable && 'opacity-75 cursor-not-allowed'
                  )}
                >
                  {/* Vacation Badge */}
                  {therapist.isOnVacation && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      De férias até {therapist.vacationUntil}
                    </div>
                  )}

                  {/* Available Now Badge */}
                  {therapist.isAvailable && (
                    <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-green-500/90 text-white text-xs font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      Disponível
                    </div>
                  )}

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    {/* Image */}
                    <div className="relative h-64">
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
                            className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>

                      {/* Services count */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">
                          {therapist.services.filter(s => s.isAvailable).length} serviços disponíveis
                        </span>
                        <span className="text-slate-400">{therapist.reviews} avaliações</span>
                      </div>

                      {!therapist.isAvailable && (
                        <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
                          <p className="text-amber-400 text-sm font-medium">
                            {therapist.isOnVacation 
                              ? `Em férias até ${therapist.vacationUntil}` 
                              : 'Indisponível no momento'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {step === 2 && selectedTherapist && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              {/* Selected Therapist Summary */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={selectedTherapist.image}
                    alt={selectedTherapist.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{selectedTherapist.name}</h3>
                  <p className="text-slate-400 text-sm">{selectedTherapist.location}</p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-slate-400 hover:text-white text-sm"
                >
                  Alterar
                </button>
              </div>

              <h3 className="text-xl font-semibold text-white mb-6">Escolha o serviço</h3>

              <div className="space-y-4">
                {selectedTherapist.services.map((service) => (
                  <button
                    key={service.id}
                    disabled={!service.isAvailable}
                    onClick={() => setSelectedService(service.id)}
                    className={cn(
                      'w-full p-5 rounded-xl border text-left transition-all',
                      selectedService === service.id
                        ? 'border-red-500 bg-red-500/10'
                        : service.isAvailable
                          ? 'border-slate-800 hover:border-slate-700'
                          : 'border-slate-800 opacity-50 cursor-not-allowed'
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={cn(
                          'font-medium',
                          service.isAvailable ? 'text-white' : 'text-slate-500'
                        )}>
                          {service.name}
                        </h4>
                        <p className="text-slate-400 text-sm mt-1">
                          {service.duration} minutos
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">Consultar</p>
                        {!service.isAvailable && (
                          <p className="text-amber-400 text-xs mt-1">Indisponível hoje</p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && selectedTherapist && selectedService && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              {/* Summary */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={selectedTherapist.image}
                      alt={selectedTherapist.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{selectedTherapist.name}</h3>
                    <p className="text-slate-400 text-sm">
                      {selectedTherapist.services.find(s => s.id === selectedService)?.name}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <button onClick={() => setStep(1)} className="text-slate-400 hover:text-white">
                    Alterar massagista
                  </button>
                  <button onClick={() => setStep(2)} className="text-slate-400 hover:text-white">
                    Alterar serviço
                  </button>
                </div>
              </div>

              {/* Day Selection */}
              <h3 className="text-xl font-semibold text-white mb-4">Escolha o dia</h3>
              <div className="grid grid-cols-7 gap-2 mb-8">
                {weekDays.map((day) => {
                  const hasSlots = selectedTherapist.workingHours[day.key as keyof typeof selectedTherapist.workingHours]?.length > 0
                  return (
                    <button
                      key={day.key}
                      disabled={!hasSlots}
                      onClick={() => {
                        setSelectedDay(day.key)
                        setSelectedTime('')
                      }}
                      className={cn(
                        'p-3 rounded-xl text-center transition-all',
                        selectedDay === day.key
                          ? 'bg-red-600 text-white'
                          : hasSlots
                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            : 'bg-slate-900 text-slate-600 cursor-not-allowed'
                      )}
                    >
                      <p className="text-xs uppercase">{day.label}</p>
                      <p className="font-medium">{hasSlots ? 'Disp' : '-'}</p>
                    </button>
                  )
                })}
              </div>

              {/* Time Selection */}
              {selectedDay && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Horários disponíveis ({weekDays.find(d => d.key === selectedDay)?.full})
                  </h3>
                  
                  {availableTimes.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            'py-3 px-4 rounded-xl text-center transition-all',
                            selectedTime === time
                              ? 'bg-red-600 text-white'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                      <p className="text-amber-400">
                        Sem horários disponíveis neste dia
                      </p>
                      <p className="text-amber-200/60 text-sm mt-1">
                        Tente outro dia da semana
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-12 max-w-2xl mx-auto">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 rounded-xl text-slate-400 hover:text-white transition-colors"
            >
              Voltar
            </button>
          )}
          
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={cn(
              'ml-auto px-8 py-4 rounded-xl font-semibold flex items-center gap-3 transition-all',
              canProceed()
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:shadow-lg hover:shadow-red-500/30'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            )}
          >
            {step === 3 ? (
              <>
                Confirmar Agendamento
                <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 max-w-2xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Como funciona?</h4>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>• Cada massagista tem especialidades e horários diferentes</li>
                <li>• Verifique a disponibilidade em tempo real antes de agendar</li>
                <li>• Algumas massagistas podem estar de folga ou férias</li>
                <li>• O agendamento é confirmado via WhatsApp em poucos minutos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
