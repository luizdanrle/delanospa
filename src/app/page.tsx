'use client'

import { useState, useEffect } from 'react'

// Página temporária - atualização em andamento v2
export default function Home() {
  const [date, setDate] = useState<string>('')
  
  useEffect(() => {
    setDate(new Date().toLocaleString('pt-PT'))
  }, [])

  return (
    <div className="p-12 min-h-screen bg-slate-950 text-white">
      <h1 className="text-3xl font-bold mb-4">DelanoSpa - Em Construção</h1>
      <p className="mb-4">O site está sendo atualizado. Volte em breve!</p>
      {date && <p className="mb-6 text-slate-400">Data: {date}</p>}
      <a 
        href="/admin/login" 
        className="text-purple-400 hover:text-purple-300 underline"
      >
        → Área Admin
      </a>
    </div>
  )
}
