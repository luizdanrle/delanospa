'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    id: 1,
    name: 'Ricardo M.',
    location: 'Lisboa',
    rating: 5,
    text: 'Experiência incrível! O ambiente é de luxo e a massagista foi extremamente profissional. Saí completamente relaxado e renovado. Recomendo vivamente!',
    service: 'Massagem Tântrica',
  },
  {
    id: 2,
    name: 'Ana C.',
    location: 'Porto',
    rating: 5,
    text: 'Foi a melhor experiência de spa que já tive. A atenção aos detalhes, o champagne antes e o chá depois... tudo perfeito! Voltarei certamente.',
    service: 'Massagem para Casais',
  },
  {
    id: 3,
    name: 'Pedro S.',
    location: 'Algarve',
    rating: 5,
    text: 'Discrição absoluta, profissionalismo exemplar. A massagem body to body superou todas as expectativas. Cinco estrelas sem dúvida!',
    service: 'Body to Body',
  },
  {
    id: 4,
    name: 'Mariana L.',
    location: 'Leiria',
    rating: 5,
    text: 'Finalmente encontrei um spa de luxo na minha zona. As instalações são impecáveis e o serviço de transporte é um plus fantástico.',
    service: 'Massagem de Relaxamento',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Testemunhos
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            O Que Dizem os Clientes
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mb-8">
                <Quote className="w-16 h-16 mx-auto text-purple-500/30" />
              </div>
              
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-xl sm:text-2xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              <div>
                <p className="font-semibold text-white text-lg">{testimonials[current].name}</p>
                <p className="text-slate-500">{testimonials[current].location}</p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm">
                  {testimonials[current].service}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-all border border-slate-700"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={cn(
                    'w-3 h-3 rounded-full transition-all',
                    current === index
                      ? 'bg-purple-500 w-8'
                      : 'bg-slate-600 hover:bg-slate-500'
                  )}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-all border border-slate-700"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
