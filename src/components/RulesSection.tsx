'use client'

import { motion } from 'framer-motion'
import { Check, X, AlertCircle, Shield, Info, Scale, Heart, Hand } from 'lucide-react'

export default function RulesSection() {
  const allowed = [
    { title: 'Toques Sensuais', description: 'Massagens com toques suaves e sensuais em todo o corpo' },
    { title: 'Relaxamento Total', description: 'Técnicas para relaxamento muscular e mental completo' },
    { title: 'Óleos Aromáticos', description: 'Uso de óleos premium e aromas terapêuticos' },
    { title: 'Ambiente Intimista', description: 'Iluminação suave, música ambiente e total privacidade' },
    { title: 'Ducha Antes/Depois', description: 'Acesso a instalações de higiene privativas' },
    { title: 'Roupas Descartáveis', description: 'Fornecemos roupas confortáveis e higiénicas' },
  ]

  const limits = [
    { title: 'Respeito à Vontade', description: 'NADA é feito contra a vontade da massagista. Ela determina seus próprios limites.' },
    { title: 'Sem Pressão', description: 'Não insistimos em serviços que a massagista não se sinta confortável em realizar.' },
    { title: 'Comunicação', description: 'O que não estiver claro deve ser perguntado educadamente ANTES da sessão.' },
    { title: 'Ambiente Seguro', description: 'Qualquer comportamento inadequado resulta no término imediato da sessão.' },
    { title: 'Privacidade Total', description: 'Gravações são proibidas. Discrição total para clientes e massagistas.' },
    { title: 'Maiores de Idade', description: 'Serviços exclusivos para maiores de 18 anos. Documento pode ser solicitado.' },
  ]

  const importantNotes = [
    {
      icon: Shield,
      title: 'Privacidade Garantida',
      description: 'Todos os nossos espaços possuem entrada discreta e garantimos o anonimato dos clientes.'
    },
    {
      icon: Hand,
      title: 'Respeito Mútuo',
      description: 'Esperamos que os clientes tratem as massagistas com respeito. Qualquer comportamento inadequado resultará no término imediato da sessão.'
    },
    {
      icon: Scale,
      title: 'Nada Contra a Vontade',
      description: 'Respeitamos absolutamente os limites de cada massagista. Nenhum serviço é prestado sem o consentimento explícito e conforto da profissional.'
    }
  ]

  return (
    <section id="regras" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900/10 via-slate-950 to-slate-950" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium mb-4">
            <Scale className="w-4 h-4" />
            Transparência
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            O que <span className="text-green-400">Oferecemos</span> & <span className="text-amber-400">Limites</span>
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Conheça nossos serviços e entenda nosso compromisso com o respeito mútuo. 
            <span className="text-rose-400 font-semibold">NADA é feito contra a vontade da massagista.</span>
            Leia atentamente.
          </p>
        </motion.div>

        {/* Alert Banner - Ênfase no respeito */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Heart className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Respeito Acima de Tudo</h3>
              <p className="text-slate-300 leading-relaxed">
                Somos um SPA legalizado focado no bem-estar e relaxamento. 
                <span className="text-purple-400 font-semibold"> NADA é feito contra a vontade da massagista.</span>{' '}
                Cada profissional determina seus próprios limites e conforto. 
                Respeito mútuo é a base de nosso atendimento. Qualquer desrespeito resulta no término imediato.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Allowed */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-slate-900/50 border border-green-500/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Permitido ✓</h3>
            </div>
            <div className="space-y-4">
              {allowed.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/20"
                >
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Not Allowed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-slate-900/50 border border-red-500/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Limites & Respeito ⚠️</h3>
            </div>
            <div className="space-y-4">
              {limits.map((item: { title: string; description: string }, index: number) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20"
                >
                  <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {importantNotes.map((note, index) => (
            <motion.div
              key={note.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-purple-500/30 transition-all"
            >
              <note.icon className="w-8 h-8 text-purple-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">{note.title}</h4>
              <p className="text-slate-400 text-sm">{note.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 text-sm">
            <Info className="w-4 h-4 inline mr-1" />
            Em caso de dúvidas sobre algum serviço específico,{' '}
            <a href="https://wa.me/351912345678" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
              entre em contacto connosco
            </a>
            {' '}antes de fazer a reserva.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
