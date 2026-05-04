'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Clock, ArrowRight, Sparkles, Percent } from 'lucide-react'
import Image from 'next/image'

export default function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Check if already shown in this session
    if (sessionStorage.getItem('exitPopupShown')) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !hasShown && !sessionStorage.getItem('exitPopupShown')) {
        setShowPopup(true)
        setHasShown(true)
        sessionStorage.setItem('exitPopupShown', 'true')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    
    // Also show after 60 seconds if not shown yet
    const timer = setTimeout(() => {
      if (!hasShown && !sessionStorage.getItem('exitPopupShown')) {
        setShowPopup(true)
        setHasShown(true)
        sessionStorage.setItem('exitPopupShown', 'true')
      }
    }, 60000)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timer)
    }
  }, [hasShown])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => {
        setShowPopup(false)
      }, 3000)
    }
  }

  if (!showPopup) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setShowPopup(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-slate-900 rounded-3xl overflow-hidden border border-red-500/30 shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800 text-white hover:bg-red-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid md:grid-cols-2">
            {/* Left - Image */}
            <div className="relative h-64 md:h-auto bg-gradient-to-br from-red-600 to-rose-700">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center text-white">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center"
                  >
                    <Gift className="w-12 h-12" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-2">NÃO SAIAS!</h3>
                  <p className="text-white/80">Temos uma oferta especial para ti</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-bold animate-pulse">
                  <Percent className="w-4 h-4 inline mr-1" />
                  -30% OFF
                </span>
              </div>
            </div>

            {/* Right - Content */}
            <div className="p-8">
              {!submitted ? (
                <>
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-3">
                      <Clock className="w-4 h-4" />
                      Oferta termina em 15 minutos
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Ainda não vives-te a experiência?
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Deixa o teu email e recebe <span className="text-red-400 font-bold">30% de desconto</span> na primeira massagem + uma bebida grátis!
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="O teu melhor email..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-red-500 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold hover:from-red-500 hover:to-rose-500 transition-all shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Receber Oferta Exclusiva
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <p className="mt-4 text-xs text-slate-500 text-center">
                    Promoção válida apenas para novos clientes. Não partilhamos o teu email.
                  </p>

                  {/* Trust indicators */}
                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      2.847+ clientes satisfeitos
                    </span>
                    <span className="flex items-center gap-1">
                      <Percent className="w-3 h-3 text-green-400" />
                      30% OFF garantido
                    </span>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"
                  >
                    <Sparkles className="w-10 h-10 text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Oferta Reservada!</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Enviamos o código de desconto para <span className="text-red-400">{email}</span>
                  </p>
                  <p className="text-xs text-slate-500">
                    Verifica o teu email (incluindo spam). Válido por 24h.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
