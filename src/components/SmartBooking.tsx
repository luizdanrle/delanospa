'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  ChevronRight, 
  Check,
  Sparkles,
  ArrowRight,
  Phone
} from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  { id: 1, title: 'Serviço', icon: Sparkles },
  { id: 2, title: 'Data/Hora', icon: Calendar },
  { id: 3, title: 'Local', icon: MapPin },
  { id: 4, title: 'Confirma', icon: Check },
]

const services = [
  { id: 'tantric', name: 'Massagem Tântrica', duration: '90 min', price: 'Consultar' },
  { id: 'body', name: 'Body to Body', duration: '60 min', price: 'Consultar' },
  { id: 'vip', name: 'Experiência VIP', duration: '120 min', price: 'Consultar' },
  { id: 'couples', name: 'Para Casais', duration: '90 min', price: 'Consultar' },
]

const times = [
  '10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00', '20:30'
]

const locations = [
  { id: 'lx', name: 'Lisboa - Saldanha', address: 'Avenida da República, 15' },
  { id: 'pt', name: 'Porto - Trindade', address: 'Rua de Cedofeita, 45' },
  { id: 'fr', name: 'Faro - Centro', address: 'Rua de Santo António, 12' },
]

export default function SmartBooking() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setCurrentStep(1)
        setSelectedService('')
        setSelectedDate('')
        setSelectedTime('')
        setSelectedLocation('')
      }, 3000)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedService
      case 2: return selectedDate && selectedTime
      case 3: return selectedLocation
      default: return true
    }
  }

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900/50 border border-green-500/30 rounded-3xl p-8 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
          <Check className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Pedido Enviado!</h3>
        <p className="text-slate-400">
          Vamos contactá-lo em breve para confirmar a sua reserva.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = step.id === currentStep
          const isCompleted = step.id < currentStep
          
          return (
            <div key={step.id} className="flex items-center">
              <motion.div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  isActive && 'bg-red-600 text-white',
                  isCompleted && 'bg-green-500 text-white',
                  !isActive && !isCompleted && 'bg-slate-800 text-slate-400'
                )}
                animate={{ scale: isActive ? 1.1 : 1 }}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </motion.div>
              {index < steps.length - 1 && (
                <div className={cn(
                  'w-12 h-0.5 mx-2',
                  isCompleted ? 'bg-green-500' : 'bg-slate-800'
                )} />
              )}
            </div>
          )
        })}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Escolha o serviço</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={cn(
                    'p-4 rounded-xl border text-left transition-all',
                    selectedService === service.id
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-slate-800 hover:border-slate-700'
                  )}
                >
                  <p className="font-medium text-white">{service.name}</p>
                  <p className="text-sm text-slate-400">{service.duration}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Escolha a data</h3>
              <div className="grid grid-cols-7 gap-2">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                  <div key={day} className="text-center text-xs text-slate-500 py-2">{day}</div>
                ))}
                {Array.from({ length: 28 }).map((_, i) => {
                  const day = i + 1
                  const isSelected = selectedDate === `2024-01-${day.toString().padStart(2, '0')}`
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(`2024-01-${day.toString().padStart(2, '0')}`)}
                      className={cn(
                        'aspect-square rounded-lg text-sm transition-all',
                        isSelected
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      )}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>
            </div>

            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Escolha a hora</h3>
                <div className="flex flex-wrap gap-3">
                  {times.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm transition-all',
                        selectedTime === time
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Escolha o local</h3>
            <div className="space-y-3">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location.id)}
                  className={cn(
                    'w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4',
                    selectedLocation === location.id
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-slate-800 hover:border-slate-700'
                  )}
                >
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{location.name}</p>
                    <p className="text-sm text-slate-400">{location.address}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Confirme a sua reserva</h3>
            
            <div className="bg-slate-800/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-sm text-slate-400">Serviço</p>
                  <p className="text-white">{services.find(s => s.id === selectedService)?.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-sm text-slate-400">Data e Hora</p>
                  <p className="text-white">{selectedDate} às {selectedTime}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-sm text-slate-400">Local</p>
                  <p className="text-white">{locations.find(l => l.id === selectedLocation)?.name}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <Phone className="w-5 h-5 text-amber-400" />
              <p className="text-sm text-amber-200">
                Vamos confirmar a disponibilidade e contactá-lo via WhatsApp em breve.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="px-6 py-3 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            Voltar
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={cn(
            'ml-auto px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all',
            canProceed()
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:shadow-lg hover:shadow-red-500/25'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          )}
        >
          {currentStep === 4 ? 'Confirmar Pedido' : 'Continuar'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
