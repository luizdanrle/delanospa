'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Clock, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimeSlot {
  time: string
  available: boolean
  therapist: string
}

interface BookingCalendarProps {
  onSelect: (date: Date, time: string, therapist: string) => void
  className?: string
}

export default function BookingCalendar({ onSelect, className }: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  // Generate sample time slots
  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = []
    const therapists = ['Sofia', 'Mariana', 'Carolina']
    const baseTimes = ['10:00', '11:30', '14:00', '15:30', '17:00', '19:00']
    
    baseTimes.forEach(time => {
      therapists.forEach((therapist, i) => {
        // Deterministic pseudo-random
        const isAvailable = (date.getDate() + parseInt(time)) % 3 !== 0
        slots.push({ time, available: isAvailable, therapist })
      })
    })
    
    return slots
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const days: (number | null)[] = []
    for (let i = 0; i < startingDay; i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(i)
    return days
  }

  const handleDateSelect = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleTimeSelect = (slot: TimeSlot) => {
    if (!slot.available || !selectedDate) return
    setSelectedTime(slot.time)
    onSelect(selectedDate, slot.time, slot.therapist)
  }

  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : []

  return (
    <div className={cn('space-y-4', className)}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-medium text-white">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs text-slate-500 py-2">{day}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {getDaysInMonth(currentMonth).map((day, index) => (
          <div key={index} className="aspect-square">
            {day && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDateSelect(day)}
                className={cn(
                  'w-full h-full rounded-lg flex items-center justify-center text-sm transition-colors',
                  selectedDate?.getDate() === day
                    ? 'bg-purple-500 text-white'
                    : 'hover:bg-slate-800 text-slate-300'
                )}
              >
                {day}
              </motion.button>
            )}
          </div>
        ))}
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4 border-t border-slate-800"
        >
          <h4 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Horários disponíveis
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => handleTimeSelect(slot)}
                disabled={!slot.available}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-1 transition-colors',
                  selectedTime === slot.time
                    ? 'bg-purple-500 text-white'
                    : slot.available
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-900 text-slate-600 cursor-not-allowed'
                )}
              >
                {slot.time}
                {slot.available && selectedTime === slot.time && (
                  <Check className="w-3 h-3" />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
