'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, X } from 'lucide-react'

export default function AgeVerification() {
  const [showModal, setShowModal] = useState(false)
  const [verified, setVerified] = useState(false)
  const [rejected, setRejected] = useState(false)

  useEffect(() => {
    // Check if already verified
    const isVerified = localStorage.getItem('ageVerified')
    if (!isVerified) {
      setShowModal(true)
    } else {
      setVerified(true)
    }
  }, [])

  const handleVerify = () => {
    localStorage.setItem('ageVerified', 'true')
    setVerified(true)
    setTimeout(() => setShowModal(false), 500)
  }

  const handleReject = () => {
    setRejected(true)
  }

  if (!showModal) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-950 z-[100] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md"
        >
          {!rejected ? (
            <div className="p-8 rounded-3xl bg-slate-900 border border-red-500/30 text-center">
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <Shield className="w-10 h-10 text-red-500" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">
                Verificação de Idade
              </h2>
              
              <p className="text-slate-400 mb-6">
                Este site contém conteúdo adulto destinado apenas a maiores de 18 anos.
                Deves ter idade legal para aceder.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleReject}
                  className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-400 font-medium hover:bg-slate-700 transition-colors"
                >
                  <X className="w-4 h-4 inline mr-2" />
                  Menos de 18
                </button>
                <button
                  onClick={handleVerify}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold hover:from-red-500 hover:to-rose-500 transition-all shadow-lg shadow-red-500/30"
                >
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Tenho 18+
                </button>
              </div>

              <p className="mt-6 text-xs text-slate-500">
                Ao clicar "Tenho 18+" confirmas que és maior de idade e aceitas os nossos Termos de Utilização e Política de Privacidade.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-3xl bg-slate-900 border border-red-500/30 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3">
                Acesso Negado
              </h2>
              
              <p className="text-slate-400 mb-6">
                Lamentamos, mas este conteúdo é exclusivo para maiores de 18 anos.
                Volta quando tiveres idade suficiente.
              </p>

              <button
                onClick={() => window.location.href = 'https://www.google.com'}
                className="w-full py-3 rounded-xl bg-slate-800 text-slate-400 font-medium hover:bg-slate-700 transition-colors"
              >
                Sair do Site
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
