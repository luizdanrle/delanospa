'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Scale, X, ArrowRight } from 'lucide-react'

export function ServiceComparisonButton() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setShowModal(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
        title="Comparar Massagens"
      >
        <Scale className="w-5 h-5 text-blue-400" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-5xl bg-slate-900 rounded-3xl overflow-hidden z-50 border border-slate-800"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  Comparador de Massagens
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-slate-800 transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-center mb-8">
                  <p className="text-slate-400 mb-4">
                    Compare diferentes massagens para encontrar a experiência perfeita para você.
                  </p>
                  <a
                    href="#massagens"
                    onClick={() => setShowModal(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium hover:from-blue-500 hover:to-cyan-500 transition-all"
                  >
                    Ver Comparador Completo
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Quick Preview */}
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      name: 'Massagem Tântrica',
                      price: '€150',
                      duration: '90 min',
                      level: 'Sensualidade Máxima',
                      color: 'from-red-600 to-rose-600'
                    },
                    {
                      name: 'Body to Body',
                      price: '€180',
                      duration: '60 min',
                      level: 'Contato Intenso',
                      color: 'from-pink-600 to-purple-600'
                    },
                    {
                      name: 'Massagem Terapêutica',
                      price: '€95',
                      duration: '60 min',
                      level: 'Relaxamento',
                      color: 'from-emerald-600 to-teal-600'
                    }
                  ].map((service, index) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700"
                    >
                      <div className={`h-2 rounded-full bg-gradient-to-r ${service.color} mb-4`} />
                      <h3 className="font-semibold text-white mb-2">{service.name}</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Preço:</span>
                          <span className="text-white font-medium">{service.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Duração:</span>
                          <span className="text-white">{service.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Nível:</span>
                          <span className="text-blue-400 text-xs">{service.level}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
