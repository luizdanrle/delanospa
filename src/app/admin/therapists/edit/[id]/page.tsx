'use client'

import { useState, useEffect } from 'react'

// Generate static params for build - actual data is fetched client-side
export function generateStaticParams() {
  return [{ id: 'placeholder' }]
}
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, Therapist } from '@/lib/supabase'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Upload,
  Loader2,
  UserCircle,
  Briefcase,
  CheckCircle,
  Plus,
  Trash2
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function EditTherapistPage() {
  const router = useRouter()
  const params = useParams()
  const { user, loading: authLoading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [therapist, setTherapist] = useState<Therapist | null>(null)

  const [availableServices, setAvailableServices] = useState<string[]>([
    'Massagem Relaxante',
    'Massagem Terapêutica',
    'Massagem Desportiva',
    'Massagem Tailandesa',
    'Shiatsu',
    'Reflexologia',
    'Hot Stones',
    'Drenagem Linfática'
  ])

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    gender: 'female' as 'female' | 'male',
    services: [] as string[],
    experience_years: '',
    image_url: '',
    is_active: true,
    order_index: 0
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
      loadTherapist()
    }
  }, [mounted, user, params.id])

  const loadTherapist = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('therapists')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) throw error

      setTherapist(data)
      setFormData({
        name: data.name,
        bio: data.bio,
        gender: data.gender,
        services: data.services || [],
        experience_years: data.experience_years?.toString() || '',
        image_url: data.image_url || '',
        is_active: data.is_active,
        order_index: data.order_index
      })
    } catch (error) {
      console.error('Error loading therapist:', error)
      alert('Erro ao carregar massagista')
      router.push('/admin/dashboard?tab=therapists')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `therapists/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file, { cacheControl: '3600', upsert: false })

      if (uploadError) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setFormData(prev => ({ ...prev, image_url: e.target?.result as string }))
        }
        reader.readAsDataURL(file)
        alert('Bucket não configurado. Use preview local ou configure o bucket "media" no Supabase.')
      } else {
        const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName)
        setFormData(prev => ({ ...prev, image_url: publicUrl }))
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Erro ao fazer upload da imagem')
    } finally {
      setUploadingImage(false)
    }
  }

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      console.log('Updating therapist:', params.id, formData)
      
      const { data, error } = await supabase
        .from('therapists')
        .update({
          ...formData,
          experience_years: parseInt(formData.experience_years) || 0,
          updated_at: new Date().toISOString()
        })
        .eq('id', params.id)
        .select()

      if (error) {
        console.error('Supabase update error:', error)
        throw new Error(`Database error: ${error.message} (code: ${error.code})`)
      }
      
      console.log('Therapist updated successfully:', data)
      alert('Massagista atualizado com sucesso!')
      router.push('/admin/dashboard?tab=therapists')
      router.refresh()
    } catch (error: any) {
      console.error('Error updating therapist:', error)
      alert(`Erro ao atualizar massagista: ${error.message || 'Verifique o console para detalhes'}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja eliminar esta massagista?')) return

    try {
      const { error } = await supabase
        .from('therapists')
        .delete()
        .eq('id', params.id)

      if (error) throw error

      router.push('/admin/dashboard?tab=therapists')
    } catch (error) {
      console.error('Error deleting therapist:', error)
      alert('Erro ao eliminar massagista')
    }
  }

  if (!mounted || authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    )
  }

  if (!user || !therapist) return null

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/dashboard?tab=therapists')}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-white">Editar Massagista</h1>
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
      <main className="max-w-4xl mx-auto p-8">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Image Upload */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <UserCircle className="w-5 h-5 text-purple-400" />
              Foto da Massagista
            </h3>
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32 rounded-2xl bg-slate-800 overflow-hidden flex items-center justify-center">
                {formData.image_url ? (
                  <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <UserCircle className="w-12 h-12 text-slate-600" />
                )}
              </div>
              <div className="flex-1 space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white cursor-pointer hover:bg-slate-700 transition-all"
                >
                  {uploadingImage ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Upload className="w-5 h-5" />
                  )}
                  {uploadingImage ? 'A carregar...' : 'Alterar Foto'}
                </label>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Informações Básicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
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
                <label className="block text-sm font-medium text-slate-300 mb-2">Género</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'female' | 'male' })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                >
                  <option value="female">Feminino</option>
                  <option value="male">Masculino</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Anos de Experiência</label>
                <input
                  type="number"
                  value={formData.experience_years}
                  onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                  min="0"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Ordem de Exibição</label>
                <input
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                  min="0"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Biografia</h3>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
              placeholder="Descreva a experiência e especialidades da massagista..."
            />
          </div>

          {/* Services */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-400" />
              Serviços Especializados
            </h3>
            <div className="flex flex-wrap gap-3">
              {availableServices.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleService(service)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2",
                    formData.services.includes(service)
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-purple-500/30"
                  )}
                >
                  {formData.services.includes(service) ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Estado</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className={cn(
                "w-12 h-6 rounded-full transition-all relative",
                formData.is_active ? "bg-green-500" : "bg-slate-700"
              )}>
                <div className={cn(
                  "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                  formData.is_active ? "left-7" : "left-1"
                )} />
              </div>
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="hidden"
              />
              <span className="text-white">{formData.is_active ? 'Ativa' : 'Inativa'}</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard?tab=therapists')}
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
