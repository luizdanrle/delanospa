'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

const featuredTestimonial = {
  name: 'Ricardo M.',
  age: 34,
  location: 'Lisboa',
  rating: 5,
  text: 'Já experimentei várias casas de massagem em Lisboa e posso afirmar com certeza: o Delírio Spa é de outro nível. A Sofia tem mãos mágicas e o ambiente é de uma elegância rara. Fui recebido com champagne, a sala tinha velas aromáticas e música perfeita. Foi uma experiência que transcendeu o físico - saí renovado em corpo e mente.',
  service: 'Massagem Tântrica VIP',
  therapist: 'Sofia',
  date: 'Dezembro 2024',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  verified: true,
}

export default function TestimonialHighlight() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Quote Icon */}
          <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center">
            <Quote className="w-8 h-8 text-rose-400" />
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 md:p-12">
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(featuredTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
              {featuredTestimonial.verified && (
                <span className="ml-3 px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
                  Verificado
                </span>
              )}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8 italic">
              "{featuredTestimonial.text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden">
                <Image
                  src={featuredTestimonial.image}
                  alt={featuredTestimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white">{featuredTestimonial.name}</p>
                <p className="text-slate-400 text-sm">
                  {featuredTestimonial.age} anos • {featuredTestimonial.location} • {featuredTestimonial.date}
                </p>
                <p className="text-rose-400 text-sm">
                  {featuredTestimonial.service} com {featuredTestimonial.therapist}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
