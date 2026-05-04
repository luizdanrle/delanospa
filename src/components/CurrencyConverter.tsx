'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

const currencies = {
  EUR: { symbol: '€', name: 'Euro', rate: 1 },
  USD: { symbol: '$', name: 'Dólar', rate: 1.09 },
  GBP: { symbol: '£', name: 'Libra', rate: 0.85 },
  BRL: { symbol: 'R$', name: 'Real', rate: 5.35 },
}

interface CurrencyConverterProps {
  className?: string
}

export default function CurrencyConverter({ className }: CurrencyConverterProps) {
  const [amount, setAmount] = useState(100)
  const [fromCurrency, setFromCurrency] = useState<keyof typeof currencies>('EUR')
  const [toCurrency, setToCurrency] = useState<keyof typeof currencies>('USD')

  const convert = (amount: number, from: keyof typeof currencies, to: keyof typeof currencies) => {
    const eurAmount = amount / currencies[from].rate
    return eurAmount * currencies[to].rate
  }

  const result = convert(amount, fromCurrency, toCurrency)

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn('p-6 rounded-2xl bg-slate-900 border border-slate-800', className)}
    >
      <h3 className="text-lg font-semibold text-white mb-4">Conversor de Moeda</h3>
      
      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Valor</label>
          <div className="flex">
            <span className="flex items-center px-3 bg-slate-800 border-y border-l border-slate-700 rounded-l-lg text-slate-400">
              {currencies[fromCurrency].symbol}
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value as keyof typeof currencies)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-r-lg text-white text-sm focus:outline-none focus:border-purple-500"
            >
              {Object.entries(currencies).map(([code, { name }]) => (
                <option key={code} value={code}>{code} - {name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapCurrencies}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Result */}
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Resultado</label>
          <div className="flex">
            <span className="flex items-center px-3 bg-slate-800 border-y border-l border-slate-700 rounded-l-lg text-slate-400">
              {currencies[toCurrency].symbol}
            </span>
            <input
              type="text"
              value={result.toFixed(2)}
              readOnly
              className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 text-white"
            />
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value as keyof typeof currencies)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-r-lg text-white text-sm focus:outline-none focus:border-purple-500"
            >
              {Object.entries(currencies).map(([code, { name }]) => (
                <option key={code} value={code}>{code} - {name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500 text-center">
        Taxas aproximadas para referência
      </p>
    </motion.div>
  )
}
