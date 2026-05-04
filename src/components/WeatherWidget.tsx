'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cloud, Sun, CloudRain, Wind, Droplets } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WeatherData {
  temp: number
  condition: 'sunny' | 'cloudy' | 'rainy'
  humidity: number
  wind: number
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData>({
    temp: 22,
    condition: 'sunny',
    humidity: 65,
    wind: 12,
  })

  // Simulate weather updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWeather(prev => ({
        ...prev,
        temp: prev.temp + (Math.random() - 0.5) * 2,
      }))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const weatherIcons = {
    sunny: { icon: Sun, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    cloudy: { icon: Cloud, color: 'text-slate-400', bg: 'bg-slate-500/10' },
    rainy: { icon: CloudRain, color: 'text-sky-400', bg: 'bg-sky-500/10' },
  }

  const { icon: Icon, color, bg } = weatherIcons[weather.condition]

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-2xl bg-slate-900 border border-slate-800"
    >
      <div className="flex items-center gap-4">
        <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center', bg)}>
          <Icon className={cn('w-7 h-7', color)} />
        </div>
        
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white">
              {Math.round(weather.temp)}°
            </span>
            <span className="text-slate-400">C</span>
          </div>
          <p className="text-slate-400 text-sm capitalize">{weather.condition}</p>
        </div>

        <div className="ml-auto flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Droplets className="w-3.5 h-3.5" />
            <span>{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Wind className="w-3.5 h-3.5" />
            <span>{weather.wind} km/h</span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Perfeito para uma massagem relaxante ☀️
      </p>
    </motion.div>
  )
}
