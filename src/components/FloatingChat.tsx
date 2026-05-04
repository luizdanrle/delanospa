'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Clock, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

const quickReplies = [
  'Quais massagens fazem?',
  'Preços e duração',
  'Como agendar?',
  'É discreto?',
  'Horários disponíveis',
]

const botResponses: Record<string, string> = {
  'Quais massagens fazem?': 'Oferecemos: Massagem Tântrica, Body to Body, Lingam, Yoni, Nuru, para Casais, Quatro Mãos e VIP. Todas incluem finalização especial 😈 Qual te interessa mais?',
  'Preços e duração': 'Massagens desde €120 (60min) até €500 (VIP 120min). TODAS com 20% OFF na primeira visita! Quer saber mais detalhes de alguma?',
  'Como agendar?': 'É super fácil! Podes agendar pelo WhatsApp (+351 912 345 678), telefone ou aqui mesmo no chat. Atendimento 24h! Queres agendar agora?',
  'É discreto?': '100% discreto! Não guardamos dados, pagamento pode ser em dinheiro, entradas privadas. A tua privacidade é sagrada 🔒',
  'Horários disponíveis': 'Funcionamos todos os dias 10h-22h, incluindo fins de semana. Hoje ainda temos vagas às 14h, 16h e 20h. Qual prefere?',
  'default': 'Entendi! Para te ajudar melhor, podes clicar numa das opções acima ou falar direto no WhatsApp. As nossas massagistas estão ansiosas por ti 😏',
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Olá! Sou a assistente virtual do DelirioSpa 💋\n\nComo posso te deixar satisfeito hoje? Escolhe uma opção:',
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Show chat bubble after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        // Pulse animation on closed button
      }
    }, 10000)
    return () => clearTimeout(timer)
  }, [isOpen])

  const handleQuickReply = (reply: string) => {
    // Add user message
    const userMsg: Message = {
      id: messages.length + 1,
      text: reply,
      isUser: true,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    // Simulate bot typing and response
    setTimeout(() => {
      const response = botResponses[reply] || botResponses['default']
      const botMsg: Message = {
        id: messages.length + 2,
        text: response,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'fixed bottom-28 right-4 z-40 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-colors',
          isOpen 
            ? 'bg-slate-800 text-white' 
            : 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-red-500/40'
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="relative"
            >
              <MessageCircle className="w-6 h-6" />
              {/* Notification dot */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-44 right-4 z-40 w-80 sm:w-96 bg-slate-900 rounded-2xl shadow-2xl border border-red-500/30 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-red-600 to-rose-600 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">Delirio Assistente</h3>
                  <div className="flex items-center gap-1 text-xs text-red-100">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Online agora
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-slate-950">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'flex gap-2',
                    msg.isUser ? 'flex-row-reverse' : ''
                  )}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                    msg.isUser ? 'bg-red-600' : 'bg-slate-700'
                  )}>
                    {msg.isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                  </div>
                  <div className={cn(
                    'max-w-[80%] p-3 rounded-2xl text-sm',
                    msg.isUser 
                      ? 'bg-red-600 text-white rounded-br-none' 
                      : 'bg-slate-800 text-slate-200 rounded-bl-none'
                  )}>
                    {msg.text.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? 'mt-1' : ''}>{line}</p>
                    ))}
                    <span className="text-xs opacity-50 mt-1 block">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6 }}
                        className="w-2 h-2 bg-slate-400 rounded-full"
                      />
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-2 h-2 bg-slate-400 rounded-full"
                      />
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="w-2 h-2 bg-slate-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="p-3 bg-slate-900 border-t border-slate-800">
              <p className="text-xs text-slate-500 mb-2">Perguntas frequentes:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    disabled={isTyping}
                    className="px-3 py-1.5 rounded-full bg-slate-800 text-xs text-rose-300 hover:bg-red-600/20 hover:text-red-300 transition-colors border border-slate-700"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="p-3 bg-slate-900 border-t border-slate-800">
              <a
                href="https://wa.me/351912345678?text=Olá! Vim pelo chat do site"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-500 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Falar no WhatsApp
                <Sparkles className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
