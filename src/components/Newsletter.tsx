'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Sparkles, Gift, Bell, CheckCircle, ArrowRight } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-slate-950 to-rose-950/20" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-3xl bg-slate-900/80 border border-red-500/20 backdrop-blur-sm"
        >
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
              <Mail className="w-4 h-4" />
              Newsletter Exclusiva
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Recebe as <span className="text-red-400">Novidades</span> em Primeira Mão
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Subscreve e recebe ofertas exclusivas, novas massagistas e promoções secretas 
              diretamente no teu email.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="O teu melhor email..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-red-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold hover:from-red-500 hover:to-rose-500 transition-all shadow-lg shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      Subscrever
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
              <p className="mt-4 text-xs text-slate-500 text-center">
                Ao subscrever, aceitas a nossa Política de Privacidade. Podes cancelar a qualquer momento.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Bem-vindo à Família!</h3>
              <p className="text-slate-400">
                Recebeste um email de confirmação. Verifica a tua caixa de entrada.
              </p>
            </motion.div>
          )}

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Gift, text: 'Ofertas Exclusivas' },
              { icon: Bell, text: 'Novidades Primeiro' },
              { icon: Sparkles, text: 'Descontos Especiais' },
              { icon: Mail, text: 'Conteúdo Premium' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-400 justify-center">
                <item.icon className="w-4 h-4 text-red-400" />
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
