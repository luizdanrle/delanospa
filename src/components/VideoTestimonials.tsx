'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Star, Quote, X, Volume2, VolumeX, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Testimonial {
  id: number
  name: string
  age: number
  city: string
  rating: number
  text: string
  service: string
  therapist: string
  videoThumbnail: string
  initials: string
  verified: boolean
  date: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ricardo Mendes',
    age: 34,
    city: 'Lisboa',
    rating: 5,
    text: 'Não estava à espera que fosse TÃO bom. A Mariana tem uma energia incrível e as técnicas dela são de outro nível. Fui para aliviar stress do trabalho e saí renovado. O espaço em Lisboa é discreto, cheiro agradável, música relaxante... detalhes que fazem toda a diferença. Já marquei a minha 3ª sessão.',
    service: 'Massagem Tântrica • 90min',
    therapist: 'Mariana',
    videoThumbnail: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
    initials: 'RM',
    verified: true,
    date: 'há 2 dias',
  },
  {
    id: 2,
    name: 'João S.',
    age: 28,
    city: 'Porto',
    rating: 5,
    text: 'Confesso que fiquei com receio pelo preço, mas depois de experimentar a Quatro Mãos entendi porque é premium. Duas massagistas a trabalharem em sincronia... é uma experiência sensorial única. Perdi a noção do tempo. Vale cada cêntimo pelo descanso profundo que senti depois.',
    service: 'Quatro Mãos • 60min',
    therapist: 'Sofia & Ana',
    videoThumbnail: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&h=300&fit=crop',
    initials: 'JS',
    verified: true,
    date: 'há 1 semana',
  },
  {
    id: 3,
    name: 'Miguel Andrade',
    age: 41,
    city: 'Faro',
    rating: 5,
    text: 'Sou da área da saúde e sou exigente com terapias corporais. Experimentei o pacote VIP no Algarve e fiquei impressionado com a profissionalismo da Carolina. Ela percebeu exactamente onde eu acumulo tensão sem eu dizer. A combinação de técnicas foi perfeita. Recomendo para quem quer qualidade.',
    service: 'Massagem VIP • 120min',
    therapist: 'Carolina',
    videoThumbnail: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop',
    initials: 'MA',
    verified: true,
    date: 'há 3 dias',
  },
  {
    id: 4,
    name: 'António Pereira',
    age: 37,
    city: 'Leiria',
    rating: 5,
    text: 'Primeira vez numa massagem body-to-body e a Joana soube criar um ambiente confortável desde o início. Não é apenas sensual, é terapêutica mesmo. Ela explicou cada passo, perguntou sobre pressão, ajustou a temperatura... senti-me tratado com respeito. Saí mais leve, sem as dores nas costas que me atormentavam há semanas.',
    service: 'Body to Body • 60min',
    therapist: 'Joana',
    videoThumbnail: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop',
    initials: 'AP',
    verified: true,
    date: 'há 5 dias',
  },
  {
    id: 5,
    name: 'Bruno Costa',
    age: 29,
    city: 'Coimbra',
    rating: 5,
    text: 'Levei a minha namorada para a massagem para casais e foi uma experiência que nos aproximou muito. A Inês e a Catarina criaram um ritual lindo, muito respeitoso. Não é vulgar nem barraqueiro, é mesmo uma experiência de conexão. Levámos o voucher dos 6 meses porque queremos repetir.',
    service: 'Massagem para Casais • 90min',
    therapist: 'Inês & Catarina',
    videoThumbnail: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=400&h=300&fit=crop',
    initials: 'BC',
    verified: true,
    date: 'ontem',
  },
  {
    id: 6,
    name: 'Fernando L.',
    age: 45,
    city: 'Lisboa',
    rating: 4,
    text: 'Cliente há 2 anos. Já experimentei praticamente todas as massagistas e todas têm qualidades diferentes. A Sofia é mais energética, a Ana é mais suave. Gosto de alternar conforme o meu mood. O programa de fidelidade compensa, já ganhei 3 massagens grátis. Atendimento consistentemente bom.',
    service: 'Massagens Regulares',
    therapist: 'Várias',
    videoThumbnail: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop',
    initials: 'FL',
    verified: true,
    date: 'há 2 semanas',
  },
]

export default function VideoTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const activeTestimonial = testimonials[activeIndex]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-red-950/5 to-slate-950" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
            <Play className="w-4 h-4" />
            Depoimentos em Vídeo
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            O que os <span className="text-red-400">Homens Dizem</span>
          </h2>
          <p className="text-rose-200/60 max-w-2xl mx-auto">
            Depoimentos reais de clientes que viveram a experiência DelirioSpa
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          {/* Video Thumbnail */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer"
                onClick={() => setShowVideo(true)}
              >
                <Image
                  src={activeTestimonial.videoThumbnail}
                  alt={`Depoimento ${activeTestimonial.name}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Play Button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-20 h-20 rounded-full bg-red-600/90 flex items-center justify-center shadow-2xl shadow-red-500/50 group-hover:bg-red-500 transition-colors">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                </motion.div>

                {/* Verified Badge */}
                {activeTestimonial.verified && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Cliente Verificado
                  </div>
                )}

                {/* Duration */}
                <div className="absolute bottom-4 right-4 px-2 py-1 rounded bg-slate-900/80 text-white text-xs font-medium">
                  0:45
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={() => setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Testimonial Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote className="absolute -top-4 -left-2 w-8 h-8 text-red-500/20" />
                <p className="text-lg text-rose-100/90 leading-relaxed italic pl-6">
                  "{activeTestimonial.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white font-bold text-lg">
                  {activeTestimonial.initials}
                </div>
                <div>
                  <p className="text-white font-semibold">{activeTestimonial.name}</p>
                  <p className="text-rose-300/60 text-sm">
                    {activeTestimonial.age} anos • {activeTestimonial.city}
                  </p>
                </div>
              </div>

              {/* Service Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {activeTestimonial.service}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-sm">
                  com {activeTestimonial.therapist}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-500 text-xs">
                  {activeTestimonial.date}
                </span>
              </div>

              {/* CTA */}
              <a
                href="https://wa.me/351912345678?text=Quero agendar como o Ricardo!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold hover:from-red-500 hover:to-rose-500 transition-all shadow-lg shadow-red-500/30"
              >
                Quero Viver Isso Também
              </a>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Thumbnail Navigation */}
        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                'relative w-20 h-14 rounded-lg overflow-hidden transition-all',
                idx === activeIndex 
                  ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-slate-950' 
                  : 'opacity-50 hover:opacity-100'
              )}
            >
              <Image
                src={t.videoThumbnail}
                alt={t.name}
                fill
                className="object-cover"
              />
              {idx === activeIndex && (
                <div className="absolute inset-0 bg-red-600/30" />
              )}
            </button>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '4.9', label: 'Avaliação Média', suffix: '/5' },
            { value: '2.847', label: 'Clientes Satisfeitos', suffix: '+' },
            { value: '98', label: 'Taxa de Retorno', suffix: '%' },
            { value: '6', label: 'Estúdios Premium', suffix: '' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <p className="text-3xl font-bold text-white">
                {stat.value}
                <span className="text-red-400">{stat.suffix}</span>
              </p>
              <p className="text-rose-300/60 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Video Modal (Simulated) */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-slate-900 rounded-2xl overflow-hidden"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 text-white hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Simulated Video Player */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Play className="w-10 h-10 text-red-500 fill-red-500" />
                  </div>
                  <p className="text-white font-medium">Reproduzindo depoimento...</p>
                  <p className="text-slate-400 text-sm mt-2">{activeTestimonial.name}</p>
                </div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 rounded-full bg-slate-800/80 text-white hover:bg-slate-700"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="text-white text-sm">0:23 / 0:45</span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-1/2 bg-red-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
