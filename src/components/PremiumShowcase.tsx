'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import SpotlightCard from './SpotlightCard'
import MagneticButton from './MagneticButton'
import LiquidButton from './LiquidButton'
import TextGradient from './TextGradient'
import ParallaxTilt from './ParallaxTilt'
import GlowButton from './GlowButton'
import MorphingCard from './MorphingCard'

export default function PremiumShowcase() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Experiência Premium
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            <TextGradient animate>Diferenciadores Visuais</TextGradient>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Elementos interativos e efeitos visuais únicos que tornam sua experiência inesquecível
          </p>
        </motion.div>

        {/* Premium Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Spotlight Card */}
          <SpotlightCard className="p-8">
            <h3 className="text-xl font-bold text-white mb-3">Spotlight Effect</h3>
            <p className="text-slate-400 text-sm mb-6">
              Card com efeito de luz que segue o cursor do mouse, criando uma experiência imersiva única.
            </p>
            <div className="flex items-center gap-2 text-purple-400 text-sm">
              <span>Passe o mouse para ver</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </SpotlightCard>

          {/* Magnetic Button */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-3">Magnetic Button</h3>
            <p className="text-slate-400 text-sm mb-6">
              Botão que reage magneticamente à proximidade do cursor, criando interação física.
            </p>
            <MagneticButton className="px-6 py-3 rounded-full bg-purple-600 text-white font-medium">
              Experimente
            </MagneticButton>
          </div>

          {/* Parallax Tilt */}
          <ParallaxTilt className="h-full">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-600/20 to-purple-600/20 border border-pink-500/30 h-full">
              <h3 className="text-xl font-bold text-white mb-3">3D Parallax Tilt</h3>
              <p className="text-slate-400 text-sm">
                Efeito 3D com profundidade e reflexo dinâmico que responde ao movimento do mouse.
              </p>
            </div>
          </ParallaxTilt>

          {/* Liquid Button */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-3">Liquid Ripple</h3>
            <p className="text-slate-400 text-sm mb-6">
              Botão com efeito de onda líquida ao clicar, simulando toque na água.
            </p>
            <LiquidButton>
              Clique Aqui
            </LiquidButton>
          </div>

          {/* Glow Button */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-3">Neon Glow</h3>
            <p className="text-slate-400 text-sm mb-6">
              Botão com brilho neon pulsante e reflexo animado no hover.
            </p>
            <GlowButton variant="pink">
              Brilho Suave
            </GlowButton>
          </div>

          {/* Morphing Card */}
          <div className="h-[280px]">
            <MorphingCard
              frontContent={
                <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 h-full flex flex-col justify-center items-center text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Clique para Virar</h3>
                  <p className="text-slate-400 text-sm">Card com efeito flip 3D ao clicar</p>
                </div>
              }
              backContent={
                <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 h-full flex flex-col justify-center items-center text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Verso</h3>
                  <p className="text-slate-400 text-sm">Conteúdo alternativo revelado</p>
                </div>
              }
            />
          </div>

        </div>
      </div>
    </section>
  )
}
