'use client'

import { motion } from 'framer-motion'
import { Sparkles, Zap, Heart, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import GlassCard from './GlassCard'
import NeonBorder from './NeonBorder'
import HolographicCard from './HolographicCard'
import AnimatedCounter from './AnimatedCounter'
import ShimmerButton from './ShimmerButton'
import ParticleField from './ParticleField'

export default function VisualEffectsShowcase() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Particle background */}
      <ParticleField particleCount={30} color="rgba(168, 85, 247, 0.3)" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Efeitos Visuais Premium
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Experiência <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">Imersiva</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Elementos visuais de última geração que criam uma atmosfera única e inesquecível
          </p>
        </motion.div>

        {/* Counters Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <AnimatedCounter value={5000} suffix="+" label="Clientes Satisfeitos" />
          <AnimatedCounter value={15} suffix="+" label="Anos de Experiência" />
          <AnimatedCounter value={50} suffix="+" label="Massagistas Premium" />
          <AnimatedCounter value={98} suffix="%" label="Avaliações 5 Estrelas" />
        </div>

        {/* Effects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Glass Card */}
          <GlassCard className="p-8" intensity="high">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Glass Morphism</h3>
            </div>
            <p className="text-white/70">
              Efeito de vidro fosco com blur e transparência. Tecnologia moderna de UI que cria profundidade visual.
            </p>
          </GlassCard>

          {/* Neon Border */}
          <NeonBorder color="pink" pulse>
            <div className="p-8 bg-slate-950 rounded-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Neon Glow</h3>
              </div>
              <p className="text-slate-400">
                Bordas luminosas pulsantes com efeito neon. Brilho dinâmico que reage ao hover.
              </p>
            </div>
          </NeonBorder>

          {/* Holographic */}
          <HolographicCard className="bg-slate-900 rounded-3xl">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Holographic</h3>
              </div>
              <p className="text-slate-400">
                Efeito holográfico 3D com reflexos iridescentes. Mova o mouse para ver a magia.
              </p>
            </div>
          </HolographicCard>

          {/* Shimmer Button */}
          <GlassCard className="p-8 flex flex-col items-center justify-center" intensity="medium">
            <h3 className="text-xl font-bold text-white mb-4">Shimmer Effect</h3>
            <ShimmerButton>
              <span className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Botão Premium
              </span>
            </ShimmerButton>
            <p className="text-slate-400 text-sm mt-4 text-center">
              Animação de brilho contínua que atrai a atenção
            </p>
          </GlassCard>

          {/* Particle Connection */}
          <GlassCard className="p-8" intensity="low">
            <h3 className="text-xl font-bold text-white mb-4">Particle Network</h3>
            <p className="text-slate-400 mb-4">
              Campo de partículas interconectadas que criam uma rede viva no background.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs">Canvas API</span>
              <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-xs">60 FPS</span>
            </div>
          </GlassCard>

          {/* Ambient Glow */}
          <NeonBorder color="purple" pulse={false}>
            <div className="p-8 bg-slate-950 rounded-3xl">
              <h3 className="text-xl font-bold text-white mb-4">Ambient Glow</h3>
              <p className="text-slate-400">
                Iluminação ambiente dinâmica que cria atmosfera única em cada seção.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-purple-400 text-sm">Efeito Ativo</span>
              </div>
            </div>
          </NeonBorder>

        </div>
      </div>
    </section>
  )
}
