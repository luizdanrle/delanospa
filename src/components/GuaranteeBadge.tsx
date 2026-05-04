'use client'

import { motion } from 'framer-motion'
import { Shield, CheckCircle, Star, RotateCcw } from 'lucide-react'

export default function GuaranteeBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-red-500/20 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl" />
      
      <div className="relative flex flex-col md:flex-row items-center gap-8">
        {/* Badge Icon */}
        <div className="relative">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center shadow-2xl shadow-red-500/30"
          >
            <Shield className="w-16 h-16 text-white" />
          </motion.div>
          
          {/* Stars around badge */}
          {[0, 72, 144, 216, 288].map((rotation, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 text-amber-400"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${rotation}deg) translateY(-70px) translateX(-50%)`,
              }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
            >
              <Star className="w-full h-full fill-amber-400" />
            </motion.div>
          ))}
        </div>
        
        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            Garantia Exclusiva DelirioSpa
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Satisfação Garantida ou <span className="text-red-400">Devolvemos o Dinheiro</span>
          </h3>
          
          <p className="text-rose-200/70 mb-6 max-w-xl">
            Tens 30 minutos após o início da sessão para decidir. Se não estiveres 100% satisfeito, 
            devolvemos o valor integral sem perguntas. Estamos tão confiantes na qualidade que 
            assumimos todo o risco por ti.
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {[
              { icon: RotateCcw, text: 'Reembolso Total' },
              { icon: CheckCircle, text: 'Sem Perguntas' },
              { icon: Clock, text: '30 Minutos para Decidir' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-rose-300/80">
                <item.icon className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Trust seal at bottom */}
      <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap justify-center gap-6 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-green-500" />
          Pagamento Seguro
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-green-500" />
          Discrição Absoluta
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-green-500" />
          Profissionais Certificadas
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-green-500" />
          +2.847 Clientes Satisfeitos
        </span>
      </div>
    </motion.div>
  )
}

import { Clock } from 'lucide-react'
