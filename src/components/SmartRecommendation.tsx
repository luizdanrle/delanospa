'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Heart, 
  Zap, 
  Moon,
  Sparkles,
  Target,
  ArrowRight,
  RotateCcw,
  Check,
  MessageCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Question {
  id: string
  question: string
  options: {
    id: string
    label: string
    icon: React.ReactNode
    scores: Record<string, number>
  }[]
}

const questions: Question[] = [
  {
    id: 'goal',
    question: 'Qual o seu objetivo principal?',
    options: [
      { 
        id: 'relax', 
        label: 'Relaxar e aliviar stress', 
        icon: <Moon className="w-6 h-6" />,
        scores: { relax: 3, therapeutic: 2, tantric: 1, vip: 2 }
      },
      { 
        id: 'sensual', 
        label: 'Experiência sensorial única', 
        icon: <Heart className="w-6 h-6" />,
        scores: { tantric: 3, body: 3, vip: 2, relax: 0 }
      },
      { 
        id: 'pain', 
        label: 'Aliviar dores musculares', 
        icon: <Zap className="w-6 h-6" />,
        scores: { therapeutic: 3, sports: 3, relax: 1, tantric: 0 }
      },
      { 
        id: 'special', 
        label: 'Ocasião especial', 
        icon: <Sparkles className="w-6 h-6" />,
        scores: { vip: 3, couples: 3, tantric: 2, fourhands: 2 }
      },
    ]
  },
  {
    id: 'intensity',
    question: 'Qual intensidade prefere?',
    options: [
      { 
        id: 'gentle', 
        label: 'Suave e delicada', 
        icon: <span className="text-2xl">🌸</span>,
        scores: { relax: 3, therapeutic: 1, tantric: 2, body: 1 }
      },
      { 
        id: 'moderate', 
        label: 'Moderada e equilibrada', 
        icon: <span className="text-2xl">🌊</span>,
        scores: { tantric: 3, therapeutic: 2, relax: 2, body: 2 }
      },
      { 
        id: 'intense', 
        label: 'Intensa e profunda', 
        icon: <span className="text-2xl">🔥</span>,
        scores: { sports: 3, therapeutic: 3, body: 3, tantric: 2 }
      },
    ]
  },
  {
    id: 'duration',
    question: 'Quanto tempo tem disponível?',
    options: [
      { 
        id: 'quick', 
        label: '30-45 minutos', 
        icon: <span className="text-2xl">⚡</span>,
        scores: { express: 3, relax: 1 }
      },
      { 
        id: 'standard', 
        label: '60 minutos', 
        icon: <span className="text-2xl">⏱️</span>,
        scores: { body: 3, therapeutic: 3, relax: 3, sports: 3 }
      },
      { 
        id: 'extended', 
        label: '90-120 minutos', 
        icon: <span className="text-2xl">🕐</span>,
        scores: { tantric: 3, vip: 3, couples: 3, fourhands: 3 }
      },
    ]
  },
  {
    id: 'experience',
    question: 'Já fez massagens antes?',
    options: [
      { 
        id: 'first', 
        label: 'Primeira vez', 
        icon: <span className="text-2xl">🆕</span>,
        scores: { relax: 3, therapeutic: 2, tantric: 1 }
      },
      { 
        id: 'some', 
        label: 'Algumas vezes', 
        icon: <span className="text-2xl">✨</span>,
        scores: { tantric: 3, body: 2, therapeutic: 2 }
      },
      { 
        id: 'experienced', 
        label: 'Experiente', 
        icon: <span className="text-2xl">🌟</span>,
        scores: { vip: 3, fourhands: 3, tantric: 3, body: 3 }
      },
    ]
  },
]

const services = {
  relax: {
    name: 'Massagem Relaxante',
    price: '€70',
    duration: '60 min',
    description: 'Perfeita para aliviar stress e tensão do dia a dia.',
    why: 'Baseado na sua preferência por relaxamento e tempo disponível.',
  },
  therapeutic: {
    name: 'Massagem Terapêutica',
    price: '€80',
    duration: '60 min',
    description: 'Focada em aliviar dores e tensões musculares específicas.',
    why: 'Indicada para dores musculares com intensidade personalizada.',
  },
  tantric: {
    name: 'Massagem Tântrica',
    price: '€150',
    duration: '90 min',
    description: 'Experiência sensorial profunda com técnicas milenares.',
    why: 'Combina experiência sensorial com o tempo disponível.',
  },
  body: {
    name: 'Body to Body',
    price: '€120',
    duration: '60 min',
    description: 'Contato pele a pele para máxima estimulação sensorial.',
    why: 'Para quem busca intensidade e experiência única.',
  },
  vip: {
    name: 'Experiência VIP',
    price: '€250',
    duration: '120 min',
    description: 'Jornada completa de 2 horas com champagne e ofurô.',
    why: 'Perfeita para ocasiões especiais com tempo estendido.',
  },
  sports: {
    name: 'Massagem Desportiva',
    price: '€85',
    duration: '60 min',
    description: 'Recuperação muscular para atletas e praticantes.',
    why: 'Indicada para alívio de tensões com intensidade alta.',
  },
  couples: {
    name: 'Massagem para Casais',
    price: '€220',
    duration: '90 min',
    description: 'Experiência partilhada para dois em ambiente especial.',
    why: 'Experiência única para ocasiões especiais a dois.',
  },
  fourhands: {
    name: 'Massagem Quatro Mãos',
    price: '€220',
    duration: '60 min',
    description: 'Duas terapeutas simultâneas para dupla sensação.',
    why: 'Experiência premium para quem busca algo extraordinário.',
  },
  express: {
    name: 'Massagem Express',
    price: '€45',
    duration: '30 min',
    description: 'Rápida e eficaz para quem tem pouco tempo.',
    why: 'Ideal para quem precisa de relaxamento rápido.',
  },
}

export default function SmartRecommendation() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleAnswer = (questionId: string, optionId: string) => {
    setIsAnimating(true)
    setAnswers(prev => ({ ...prev, [questionId]: optionId }))
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
      } else {
        setShowResult(true)
      }
      setIsAnimating(false)
    }, 400)
  }

  const calculateRecommendation = () => {
    const scores: Record<string, number> = {}
    
    Object.entries(answers).forEach(([questionId, optionId]) => {
      const question = questions.find(q => q.id === questionId)
      const option = question?.options.find(o => o.id === optionId)
      
      if (option?.scores) {
        Object.entries(option.scores).forEach(([service, score]) => {
          scores[service] = (scores[service] || 0) + score
        })
      }
    })

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
    return sorted[0]?.[0] || 'relax'
  }

  const recommendation = showResult ? calculateRecommendation() : null
  const service = recommendation ? services[recommendation as keyof typeof services] : null

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            Recomendação Inteligente
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Qual massagem é <span className="text-purple-400">ideal para si</span>?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Responda a 4 perguntas rápidas e descubra a experiência perfeita para você.
          </p>
        </motion.div>

        {!showResult ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-semibold text-white mb-6">
                  {questions[currentQuestion].question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {questions[currentQuestion].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(questions[currentQuestion].id, option.id)}
                      disabled={isAnimating}
                      className={cn(
                        'p-6 rounded-xl border text-left transition-all hover:scale-[1.02]',
                        'border-slate-700 hover:border-purple-500/50 bg-slate-800/50',
                        'flex items-center gap-4 group'
                      )}
                    >
                      <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                        {option.icon}
                      </div>
                      <span className="text-lg font-medium text-white">{option.label}</span>
                      <ArrowRight className="w-5 h-5 text-slate-500 ml-auto group-hover:text-purple-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Back button */}
            {currentQuestion > 0 && (
              <button
                onClick={() => setCurrentQuestion(prev => prev - 1)}
                className="mt-6 text-slate-400 hover:text-white flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Voltar
              </button>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 border border-purple-500/30 rounded-2xl p-8 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-white" />
            </div>

            <p className="text-purple-400 font-medium mb-2">Recomendação Personalizada</p>
            <h3 className="text-3xl font-bold text-white mb-2">{service?.name}</h3>
            <p className="text-2xl text-purple-400 font-semibold mb-4">{service?.price}</p>
            <p className="text-slate-400 mb-2">{service?.duration}</p>
            <p className="text-white mb-6">{service?.description}</p>

            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-8">
              <p className="text-sm text-purple-300">
                <span className="font-medium">Por que recomendamos:</span> {service?.why}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/351912345678?text=Olá! Quero agendar a ${encodeURIComponent(service?.name || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Agendar Esta
              </a>
              <button
                onClick={() => {
                  setShowResult(false)
                  setCurrentQuestion(0)
                  setAnswers({})
                }}
                className="px-8 py-4 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Refazer Quiz
              </button>
            </div>

            <p className="text-slate-500 text-sm mt-6">
              Esta é uma sugestão baseada nas suas respostas. Fale connosco para explorar outras opções!
            </p>
          </motion.div>
        )}

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-12">
          {[
            { icon: <Brain className="w-6 h-6" />, label: 'Algoritmo inteligente' },
            { icon: <Check className="w-6 h-6" />, label: '4 perguntas rápidas' },
            { icon: <Heart className="w-6 h-6" />, label: '100% personalizado' },
          ].map((feature, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-purple-400 mx-auto mb-2">
                {feature.icon}
              </div>
              <p className="text-slate-400 text-sm">{feature.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
