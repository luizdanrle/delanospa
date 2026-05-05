'use client'

import { motion } from 'framer-motion'
import { Heart, Shield, Sparkles, Users, Award, Clock, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'

export default function AboutSection() {
  const stats = [
    { number: '10+', label: 'Anos de Experiência', icon: Clock },
    { number: '50+', label: 'Massagistas', icon: Users },
    { number: '6', label: 'Localizações', icon: MapPin },
    { number: '100K+', label: 'Clientes Satisfeitos', icon: Heart },
  ]

  const values = [
    {
      icon: Shield,
      title: 'Discrição Total',
      description: 'Privacidade garantida em todos os nossos espaços. Ambientes seguros e confidenciais.'
    },
    {
      icon: Sparkles,
      title: 'Excelência',
      description: 'Massagistas profissionais e certificadas. Técnicas refinadas para máximo prazer.'
    },
    {
      icon: Heart,
      title: 'Bem-estar',
      description: 'Focamos no relaxamento completo do corpo e mente. Experiências transformadoras.'
    },
    {
      icon: Award,
      title: 'Premium',
      description: 'Ambientes luxuosos com material de alta qualidade. O melhor para nossos clientes.'
    }
  ]

  return (
    <section id="sobre" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-950 to-slate-950" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            Quem Somos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            A Arte do <span className="text-purple-400">Prazer</span>
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
            O DelanoSpa nasceu da paixão por proporcionar experiências únicas de relaxamento e bem-estar. 
            Somos referência em Portugal no segmento de massagens sensuais e terapêuticas, 
            combinando técnicas milenares com toques modernos de luxo e sedução.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/30 transition-all"
            >
              <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.number}</p>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Values */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Nossos <span className="text-purple-400">Valores</span>
            </h3>
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800 hover:border-purple-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center flex-shrink-0 group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                  <value.icon className="w-6 h-6 text-purple-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">{value.title}</h4>
                  <p className="text-slate-400 text-sm">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right - Image & Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/50 to-slate-900 border border-slate-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-white font-semibold text-lg">DelanoSpa</p>
                  <p className="text-slate-400">Desde 2014</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h4 className="text-lg font-semibold text-white mb-3">Nossa História</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Fundado em 2014, o DelanoSpa começou como um pequeno espaço em Lisboa 
                com uma missão clara: oferecer massagens de excelência num ambiente 
                de total discrição e luxo.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Hoje, com 6 unidades em Portugal, somos referência no setor, 
                conhecidos pela qualidade dos nossos serviços e pelo profissionalismo 
                das nossas massagistas. Cada cliente é único, e cada experiência é 
                personalizada para superar expectativas.
              </p>
            </div>

            <a
              href="https://wa.me/351912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25"
            >
              <Phone className="w-5 h-5" />
              Fale Conosco
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
