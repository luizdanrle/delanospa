'use client'

import { motion } from 'framer-motion'
import { Gift, Clock, Calendar, Check, ChevronRight } from 'lucide-react'
import { PACKAGES } from '@/data/siteData'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function PackagesShowcase() {
  return (
    <section id="pacotes" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-slate-950 to-slate-950" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 font-medium tracking-wider uppercase text-sm flex items-center justify-center gap-2">
            <Gift className="w-4 h-4" />
            Ofertas Especiais
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Pacotes & Experiências
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Presenteie alguém especial ou celebre momentos únicos com os nossos 
            pacotes exclusivos de bem-estar.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'group relative rounded-2xl overflow-hidden border transition-all',
                pkg.id === 'fidelidade' 
                  ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/50'
                  : 'bg-slate-900/50 border-slate-800 hover:border-amber-500/50'
              )}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-rose-500 text-white font-bold text-sm">
                  -{Math.round((1 - pkg.price / pkg.originalPrice) * 100)}%
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{pkg.name}</h3>
                    <p className="text-slate-400 text-sm">{pkg.description}</p>
                  </div>
                </div>

                {/* Includes */}
                <ul className="space-y-2 mb-6">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {pkg.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Válido {pkg.validDays} dias
                  </span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 line-through text-sm">€{pkg.originalPrice}</p>
                    <p className="text-3xl font-bold text-white">€{pkg.price}</p>
                  </div>
                  <button className={cn(
                    'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all',
                    pkg.id === 'fidelidade'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500'
                      : 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                  )}>
                    Comprar
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 mb-4">
            Quer um pacote personalizado? Fale connosco!
          </p>
          <a
            href="https://wa.me/351912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25"
          >
            <Gift className="w-5 h-5" />
            Criar Pacote Personalizado
          </a>
        </motion.div>
      </div>
    </section>
  )
}
