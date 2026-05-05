'use client'

import { useState, useEffect } from 'react'

// Generate static params for build - actual data is fetched client-side
export function generateStaticParams() {
  return [{ id: 'placeholder' }]
}
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, Client } from '@/lib/supabase'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Loader2,
  UserCircle,
  Phone,
  Mail,
  MessageCircle,
  Star,
  Heart,
  Trash2
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function EditClientPage() {
  const router = useRouter()
  const params = useParams()
  const { user, loading: authLoading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [client, setClient] = useState<Client | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    preferences: '',
    is_vip: false,
    notes: ''
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !authLoading && !user) {
      router.push('/admin/login')
    }
  }, [user, authLoading, router, mounted])

  useEffect(() => {
    if (mounted && user && params.id) {
      loadClient()
    }
  }, [mounted, user, params.id])

  const loadClient = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) throw error

      setClient(data)
      setFormData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        whatsapp: data.whatsapp || '',
        preferences: data.preferences || '',
        is_vip: data.is_vip,
        notes: data.notes || ''
      })
    } catch (error) {
      console.error('Error loading client:', error)
      alert('Erro ao carregar cliente')
      router.push('/admin/dashboard?tab=clients')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { error } = await supabase
        .from('clients')
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('id', params.id)

      if (error) throw error

      router.push('/admin/dashboard?tab=clients')
    } catch (error) {
      console.error('Error updating client:', error)
      alert('Erro ao atualizar cliente')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja eliminar este cliente?')) return

    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', params.id)

      if (error) throw error

      router.push('/admin/dashboard?tab=clients')
    } catch (error) {
      console.error('Error deleting client:', error)
      alert('Erro ao eliminar cliente')
    }
  }

  if (!mounted || authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    )
  }

  if (!user || !client) return null

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/dashboard?tab=clients')}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-white">Editar Cliente</h1>
          </div>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
          >
            <Trash2 className="w-5 h-5" />
            Eliminar
          </button>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-3xl mx-auto p-8">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Basic Info */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <UserCircle className="w-5 h-5 text-purple-400" />
              Informações Pessoais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Nome Completo</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Telefone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-green-400" />
                  WhatsApp (opcional)
                </label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={cn(
                    "w-12 h-6 rounded-full transition-all relative",
                    formData.is_vip ? "bg-amber-500" : "bg-slate-700"
                  )}>
                    <div className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                      formData.is_vip ? "left-7" : "left-1"
                    )} />
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.is_vip}
                    onChange={(e) => setFormData({ ...formData, is_vip: e.target.checked })}
                    className="hidden"
                  />
                  <span className="text-white flex items-center gap-2">
                    <Star className={cn("w-4 h-4", formData.is_vip ? "text-amber-400 fill-amber-400" : "text-slate-400")} />
                    Cliente VIP
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Heart className="w-5 h-5 text-purple-400" />
              Preferências
            </h3>
            <textarea
              value={formData.preferences}
              onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
              placeholder="Preferências do cliente (tipo de massagem, pressão, óleos, etc.)..."
            />
          </div>

          {/* Notes */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Notas Internas</h3>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
              placeholder="Notas internas sobre o cliente (visíveis apenas para admin)..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard?tab=clients')}
              className="px-6 py-3 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/25"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  A guardar...
                </>
              ) : (
                'Guardar Alterações'
              )}
            </button>
          </div>
        </motion.form>
      </main>
    </div>
  )
}
