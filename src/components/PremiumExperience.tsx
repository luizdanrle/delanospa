'use client'

import { motion } from 'framer-motion'
import { 
  Wine, 
  Music, 
  Thermometer, 
  Droplets,
  Sparkles,
  Flower
} from 'lucide-react'

const features = [
  { icon: <Wine className="w-6 h-6" />, title: 'Drink de Boas-vindas', desc: 'Champagne, vinho ou sumo natural' },
  { icon: <Music className="w-6 h-6" />, title: 'Playlist Premium', desc: 'Música ambiente personalizada' },
  { icon: <Thermometer className="w-6 h-6" />, title: 'Temperatura Ideal', desc: 'Ambiente climatizado 24°C' },
  { icon: <Droplets className="w-6 h-6" />, title: 'Óleos Importados', desc: 'Aromaterapia de qualidade' },
  { icon: <Sparkles className="w-6 h-6" />, title: 'Iluminação Soft', desc: 'Luzes reguláveis e velas' },
  { icon: <Flower className="w-6 h-6" />, title: 'Flores Frescas', desc: 'Arranjos naturais diários' },
]

export default function PremiumExperience() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Experiência Premium
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Cada Detalhe <span className="text-amber-400">Pensado</span> para Você
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Dos óleos importados à temperatura ambiente, cada elemento é cuidadosamente 
              selecionado para criar o ambiente perfeito de relaxamento.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{feature.title}</p>
                    <p className="text-slate-500 text-xs">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-16 h-16 text-white" />
                </div>
                <p className="text-2xl font-bold text-white mb-2">Experiência 5 Estrelas</p>
                <p className="text-slate-400">Em cada visita</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
