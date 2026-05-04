'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Loader2, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VoiceSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export default function VoiceSearch({ onSearch, placeholder = 'Pesquisar por voz...' }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef<any>(null)

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false)
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    
    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = 'pt-PT'

    recognitionRef.current.onstart = () => {
      setIsListening(true)
      setTranscript('')
    }

    recognitionRef.current.onresult = (event: any) => {
      const current = event.resultIndex
      const transcript = event.results[current][0].transcript
      setTranscript(transcript)
    }

    recognitionRef.current.onend = () => {
      setIsListening(false)
      if (transcript) {
        onSearch(transcript)
      }
    }

    recognitionRef.current.onerror = () => {
      setIsListening(false)
    }

    recognitionRef.current.start()
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }

  if (!isSupported) {
    return null
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <div className="px-4 py-2 rounded-full bg-purple-600 text-white text-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {transcript || 'A ouvir...'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={isListening ? stopListening : startListening}
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center transition-all',
          isListening 
            ? 'bg-red-500 text-white animate-pulse' 
            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
        )}
        title="Pesquisar por voz"
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>
    </div>
  )
}
