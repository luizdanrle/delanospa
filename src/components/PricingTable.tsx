'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, HelpCircle, Info } from 'lucide-react'
import { MASSAGE_SERVICES } from '@/data/siteData'
import { cn } from '@/lib/utils'

export default function PricingTable() {
  const [showDetails, setShowDetails] = useState<string | null>(null)

  const categories = [
    { id: 'sensual', name: 'Massagens Sensuais', color: 'from-pink-600 to-rose-600' },
    { id: 'terapeutica', name: 'Terapêuticas', color: 'from-blue-600 to-cyan-600' },
    { id: 'premium', name: 'Premium & VIP', color: 'from-amber-500 to-orange-600' },
    { id: 'especial', name: 'Especiais', color: 'from-purple-600 to-violet-600' },
  ]

  const formatDuration = (min: number) => {
    if (min >= 60) {
      const hours = Math.floor(min / 60)
      const remaining = min % 60
      return remaining > 0 ? `${hours}h ${remaining}min` : `${hours}h`
    }
    return `${min}min`
  }

  return (
    <section id="precos" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-slate-950 to-slate-950" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 font-medium tracking-wider uppercase text-sm">
            Preços Transparentes
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Tabela de Preços 2024
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Todos os preços incluem IVA e garantia de satisfação. 
            Pagamento seguro e discreto.
          </p>
        </motion.div>

        {/* Category Tables */}
        <div className="space-y-16">
          {categories.map((category, catIndex) => {
            const services = MASSAGE_SERVICES.filter(s => s.category === category.id)
            if (services.length === 0) return null

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                {/* Category Header */}
                <div className={cn(
                  'p-4 rounded-t-2xl bg-gradient-to-r text-white font-semibold text-lg',
                  category.color
                )}>
                  {category.name}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-900/80 text-slate-400 text-sm">
                        <th className="text-left p-4 font-medium">Serviço</th>
                        <th className="text-center p-4 font-medium">Duração</th>
                        <th className="text-center p-4 font-medium">Preço</th>
                        <th className="text-center p-4 font-medium">Estendido</th>
                        <th className="text-center p-4 font-medium">Disponibilidade</th>
                        <th className="text-center p-4 font-medium">Info</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {services.map((service, index) => (
                        <motion.tr
                          key={service.id}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-slate-900/40 hover:bg-slate-800/50 transition-colors group"
                        >
                          <td className="p-4">
                            <div>
                              <p className="font-medium text-white group-hover:text-purple-400 transition-colors">
                                {service.name}
                              </p>
                              <p className="text-sm text-slate-500 line-clamp-1">
                                {service.shortDescription}
                              </p>
                            </div>
                          </td>
                          <td className="p-4 text-center text-slate-300">
                            {formatDuration(service.duration)}
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-xl font-bold text-white">
                              €{service.price}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            {service.extendedDuration ? (
                              <div>
                                <span className="text-purple-400 font-medium">
                                  €{service.extendedPrice}
                                </span>
                                <span className="text-slate-500 text-sm block">
                                  {formatDuration(service.extendedDuration)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-slate-600">-</span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            <span className={cn(
                              'px-2 py-1 rounded-full text-xs',
                              service.availability === 'Diária' 
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-amber-500/20 text-amber-400'
                            )}>
                              {service.availability}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => setShowDetails(showDetails === service.id ? null : service.id)}
                              className="p-2 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                            >
                              <Info className="w-5 h-5" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Service Details Modal */}
                {showDetails && services.find(s => s.id === showDetails) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-slate-800/50 p-6 rounded-b-2xl"
                  >
                    {(() => {
                      const service = services.find(s => s.id === showDetails)!
                      return (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-white mb-3">O que inclui:</h4>
                            <ul className="space-y-2">
                              {service.includes.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-slate-400">
                                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-3">Benefícios:</h4>
                            <ul className="space-y-2">
                              {service.benefits.map((benefit, i) => (
                                <li key={i} className="flex items-start gap-2 text-slate-400">
                                  <Check className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20">
                              <p className="text-sm text-slate-300">
                                <strong className="text-white">Avaliação:</strong> {service.rating}★ ({service.reviews} avaliações)
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-purple-500/20">
              <HelpCircle className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Informações Importantes</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• Todos os preços incluem IVA à taxa legal em vigor</li>
                <li>• Cancelamentos devem ser feitos com pelo menos 4h de antecedência</li>
                <li>• Pagamento pode ser feito no local ou por MB Way</li>
                <li>• Descontos de 10% para marcações de grupo (3+ pessoas)</li>
                <li>• Programa de fidelidade: a 6ª massagem tem 50% de desconto</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
