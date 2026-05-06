'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Send, ArrowRight } from 'lucide-react'

interface BookingButtonsProps {
  serviceName?: string
  therapistName?: string
  message?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'horizontal' | 'vertical' | 'dropdown'
}

export function BookingButtons({ 
  serviceName, 
  therapistName, 
  message,
  className = '',
  size = 'md',
  variant = 'horizontal'
}: BookingButtonsProps) {
  
  // Construir mensagem padrão baseada no contexto
  const getDefaultMessage = (platform: 'whatsapp' | 'telegram') => {
    if (message) return message
    
    let msg = 'Olá! '
    if (serviceName) {
      msg += `Quero agendar a massagem: ${serviceName}`
    } else if (therapistName) {
      msg += `Quero agendar com ${therapistName}`
    } else {
      msg += 'Quero agendar uma massagem'
    }
    return msg
  }

  const whatsappMessage = getDefaultMessage('whatsapp')
  const telegramMessage = getDefaultMessage('telegram')

  // URLs de contato
  const whatsappUrl = `https://wa.me/351912345678?text=${encodeURIComponent(whatsappMessage)}`
  const telegramUrl = `https://t.me/deliriospa?text=${encodeURIComponent(telegramMessage)}`

  // Tamanhos dos botões
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  // Renderizar baseado na variante
  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:from-green-500 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/25"
        >
          <MessageCircle className={iconSizes[size]} />
          Agendar Agora
          <ArrowRight className={iconSizes[size]} />
        </motion.button>
        
        {/* Opções que aparecem no hover */}
        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-slate-900 border border-slate-700 rounded-xl shadow-xl opacity-0 invisible hover:opacity-100 hover:visible transition-all duration-200 z-50">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-slate-800 transition-colors text-green-400"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-slate-800 transition-colors text-sky-400"
          >
            <Send className="w-4 h-4" />
            Telegram
          </a>
        </div>
      </div>
    )
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:from-green-500 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/25 ${sizeClasses[size]}`}
        >
          <MessageCircle className={iconSizes[size]} />
          WhatsApp
          <ArrowRight className={iconSizes[size]} />
        </a>
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-medium hover:from-sky-500 hover:to-blue-500 transition-all shadow-lg shadow-sky-500/25 ${sizeClasses[size]}`}
        >
          <Send className={iconSizes[size]} />
          Telegram
          <ArrowRight className={iconSizes[size]} />
        </a>
      </div>
    )
  }

  // Horizontal (padrão)
  return (
    <div className={`flex gap-2 ${className}`}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:from-green-500 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/25 ${sizeClasses[size]}`}
      >
        <MessageCircle className={iconSizes[size]} />
        WhatsApp
      </a>
      <a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-medium hover:from-sky-500 hover:to-blue-500 transition-all shadow-lg shadow-sky-500/25 ${sizeClasses[size]}`}
      >
        <Send className={iconSizes[size]} />
        Telegram
      </a>
    </div>
  )
}

// Versão compacta para espaços pequenos
export function CompactBookingButtons({ 
  serviceName, 
  therapistName, 
  className = ''
}: Omit<BookingButtonsProps, 'size' | 'variant'>) {
  const message = serviceName 
    ? `Quero agendar: ${serviceName}`
    : therapistName 
      ? `Quero agendar com ${therapistName}`
      : 'Quero agendar uma massagem'

  const whatsappUrl = `https://wa.me/351912345678?text=${encodeURIComponent(message)}`
  const telegramUrl = `https://t.me/deliriospa?text=${encodeURIComponent(message)}`

  return (
    <div className={`flex gap-1 ${className}`}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-500 transition-colors"
        title="Agendar via WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
      </a>
      <a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-sky-600 text-white hover:bg-sky-500 transition-colors"
        title="Agendar via Telegram"
      >
        <Send className="w-4 h-4" />
      </a>
    </div>
  )
}
