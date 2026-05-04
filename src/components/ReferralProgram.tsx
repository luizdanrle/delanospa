'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Gift, Share2, Copy, CheckCircle, Wallet, Percent, Star, MessageCircle, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  {
    icon: Share2,
    title: 'Partilha o teu Código',
    desc: 'Envia o teu código único aos amigos por WhatsApp, email ou redes sociais',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Eles Agendam',
    desc: 'O teu amigo marca a primeira massagem e usa o teu código de desconto',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Gift,
    title: 'Ambos Ganham',
    desc: 'Ele recebe 20% OFF na primeira massagem e tu ganhas €30 em crédito',
    color: 'from-red-500 to-rose-500',
  },
]

const benefits = [
  { icon: Percent, title: 'Teu Amigo Ganha', value: '20% OFF', subtext: 'Na primeira massagem' },
  { icon: Wallet, title: 'Tu Ganhas', value: '€30', subtext: 'Em crédito para usar' },
  { icon: Users, title: 'Sem Limite', value: 'Ilimitado', subtext: 'Indica quantos quiseres' },
]

export default function ReferralProgram() {
  const [copied, setCopied] = useState(false)
  const [referralCode] = useState('DELIRIO2024')

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLinks = {
    whatsapp: `https://wa.me/?text=Descobre o DelirioSpa! Usa o meu código ${referralCode} e ganha 20% OFF na tua primeira massagem sensual: https://deliriospa.pt`,
    email: `mailto:?subject=Experiência Única no DelirioSpa&body=Olá!\n\nQuero partilhar contigo uma experiência incrível no DelirioSpa.\n\nUsa o meu código ${referralCode} e ganha 20% OFF na tua primeira massagem sensual.\n\nVisita: https://deliriospa.pt`,
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/5 to-slate-950" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Indique e Ganhe
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Partilha o Prazer, <span className="text-purple-400">Ganha Recompensas</span>
          </h2>
          <p className="text-purple-200/60 max-w-2xl mx-auto">
            Indica os teus amigos e ambos saem a ganhar. Eles recebem desconto 
            e tu acumulas crédito para massagens grátis.
          </p>
        </motion.div>

        {/* How it Works */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center group hover:border-purple-500/30 transition-colors"
            >
              {/* Step Number */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold flex items-center justify-center">
                {i + 1}
              </div>
              
              {/* Icon */}
              <div className={cn(
                'w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mx-auto mb-4 shadow-lg',
                step.color
              )}>
                <step.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm">{step.desc}</p>
              
              {/* Arrow connector */}
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-3 text-slate-700">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Benefits Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-4 mb-16"
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-center group hover:border-purple-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
                <benefit.icon className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-sm text-slate-400 mb-1">{benefit.title}</p>
              <p className="text-3xl font-bold text-white mb-1">{benefit.value}</p>
              <p className="text-xs text-slate-500">{benefit.subtext}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Referral Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/20"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">O teu Código de Indicação</h3>
            <p className="text-slate-400">Partilha este código com os teus amigos</p>
          </div>

          {/* Code Display */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center gap-2 p-4 rounded-xl bg-slate-900 border border-slate-700">
              <code className="flex-1 text-2xl font-bold text-purple-400 tracking-wider">
                {referralCode}
              </code>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-slate-800 text-white hover:bg-purple-600 transition-colors"
              >
                {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            {copied && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-green-400 text-sm mt-2"
              >
                Código copiado!
              </motion.p>
            )}
          </div>

          {/* Share Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white font-medium hover:bg-green-500 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Partilhar no WhatsApp
            </a>
            <a
              href={shareLinks.email}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-700 text-white font-medium hover:bg-slate-600 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Enviar por Email
            </a>
          </div>
        </motion.div>

        {/* Stats & Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-2 gap-6"
        >
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-5 h-5 text-amber-400" />
              <h4 className="font-semibold text-white">Como Funciona</h4>
            </div>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>O teu amigo deve usar o código no momento da reserva</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Após a primeira visita confirmada, recebes €30 em crédito</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>O crédito pode ser usado em qualquer massagem</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Não há limite de indicações - quantos mais indicares, mais ganhas!</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="w-5 h-5 text-purple-400" />
              <h4 className="font-semibold text-white">O teu Saldo</h4>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800">
                <span className="text-slate-400">Crédito Disponível</span>
                <span className="text-2xl font-bold text-green-400">€0</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800">
                <span className="text-slate-400">Amigos Indicados</span>
                <span className="text-2xl font-bold text-purple-400">0</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800">
                <span className="text-slate-400">Total Ganho</span>
                <span className="text-2xl font-bold text-amber-400">€0</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">
              Inicia sessão para veres o teu saldo real
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://wa.me/351912345678?text=Quero conhecer mais sobre o programa de indicação"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/30"
          >
            <Users className="w-5 h-5" />
            Começar a Indicar
          </a>
        </motion.div>
      </div>
    </section>
  )
}
