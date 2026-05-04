'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, Service } from '@/lib/supabase'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Video,
  FileImage,
  Loader2,
  X,
  DollarSign,
  Clock,
  Type,
  AlignLeft,
  Tag,
  Sparkles,
  Heart,
  Flame,
  Droplets,
  Users,
  Shield,
  Star,
  Check,
  AlertCircle,
  Plus,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Palette,
  List,
  Info,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import { cn } from '@/lib/utils'

const serviceIcons = [
  { id: 'flame', name: 'Fogo/Intensidade', icon: Flame },
  { id: 'heart', name: 'Amor/Sensual', icon: Heart },
  { id: 'droplets', name: 'Água/Fluidos', icon: Droplets },
  { id: 'sparkles', name: 'Luxo/Especial', icon: Sparkles },
  { id: 'users', name: 'Casal/Dupla', icon: Users },
  { id: 'shield', name: 'Proteção/Cuidado', icon: Shield },
  { id: 'star', name: 'Premium/VIP', icon: Star },
]

const colorOptions = [
  { id: 'orange-red', name: 'Laranja → Vermelho', gradient: 'from-orange-500 to-red-600', bg: 'bg-orange-500' },
  { id: 'pink-rose', name: 'Rosa → Rosa Escuro', gradient: 'from-pink-500 to-rose-600', bg: 'bg-pink-500' },
  { id: 'blue-cyan', name: 'Azul → Ciano', gradient: 'from-blue-500 to-cyan-600', bg: 'bg-blue-500' },
  { id: 'purple-violet', name: 'Roxo → Violeta', gradient: 'from-purple-500 to-violet-600', bg: 'bg-purple-500' },
  { id: 'green-emerald', name: 'Verde → Esmeralda', gradient: 'from-green-500 to-emerald-600', bg: 'bg-green-500' },
  { id: 'fuchsia-pink', name: 'Fúcsia → Rosa', gradient: 'from-fuchsia-500 to-pink-600', bg: 'bg-fuchsia-500' },
  { id: 'teal-cyan', name: 'Turquesa → Ciano', gradient: 'from-teal-500 to-cyan-600', bg: 'bg-teal-500' },
  { id: 'amber-orange', name: 'Âmbar → Laranja', gradient: 'from-amber-500 to-orange-600', bg: 'bg-amber-500' },
]

export default function EditServicePage() {
  const router = useRouter()
  const params = useParams()
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{[key: string]: string}>({})

  const [formData, setFormData] = useState({
    name: '',
    short_name: '',
    price: '',
    promo_price: '',
    description: '',
    short_description: '',
    category: 'massage' as 'massage' | 'therapy' | 'ritual' | 'package',
    duration: '60',
    icon: 'flame',
    color: 'orange-red',
    image_url: '',
    video_url: '',
    gif_url: '',
    gallery: [] as string[],
    is_active: true,
    is_featured: false,
    is_promo: false,
    order_index: 0,
    max_capacity: 1,
    requires_booking: true,
    benefits: [] as string[],
    includes: [] as string[],
    contraindications: [] as string[],
    tags: [] as string[],
  })

  const [newBenefit, setNewBenefit] = useState('')
  const [newInclude, setNewInclude] = useState('')
  const [newContra, setNewContra] = useState('')
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    setMounted(true)
    if (user && params.id) {
      fetchService()
    }
  }, [user, params.id])

  const fetchService = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', params.id)
      .single()

    if (data) {
      setFormData({
        name: data.name || '',
        short_name: data.short_name || '',
        price: data.price?.toString() || '',
        promo_price: data.promo_price?.toString() || '',
        description: data.description || '',
        short_description: data.short_description || '',
        category: data.category || 'massage',
        duration: data.duration?.toString() || '60',
        icon: data.icon || 'flame',
        color: data.color || 'orange-red',
        image_url: data.image_url || '',
        video_url: data.video_url || '',
        gif_url: data.gif_url || '',
        gallery: data.gallery || [],
        is_active: data.is_active ?? true,
        is_featured: data.is_featured ?? false,
        is_promo: data.is_promo ?? false,
        order_index: data.order_index || 0,
        max_capacity: data.max_capacity || 1,
        requires_booking: data.requires_booking ?? true,
        benefits: data.benefits || [],
        includes: data.includes || [],
        contraindications: data.contraindications || [],
        tags: data.tags || [],
      })
    }

    setFetching(false)
  }

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user && mounted) {
      router.push('/admin/login')
    }
  }, [authLoading, user, mounted, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('services')
      .update({
        name: formData.name,
        short_name: formData.short_name || formData.name,
        price: parseFloat(formData.price) || 0,
        promo_price: formData.promo_price ? parseFloat(formData.promo_price) : null,
        description: formData.description,
        short_description: formData.short_description || formData.description.substring(0, 100),
        category: formData.category,
        duration: parseInt(formData.duration) || 60,
        icon: formData.icon,
        color: formData.color,
        image_url: formData.image_url || null,
        video_url: formData.video_url || null,
        gif_url: formData.gif_url || null,
        gallery: formData.gallery,
        is_active: formData.is_active,
        is_featured: formData.is_featured,
        is_promo: formData.is_promo,
        order_index: formData.order_index,
        max_capacity: formData.max_capacity,
        requires_booking: formData.requires_booking,
        benefits: formData.benefits,
        includes: formData.includes,
        contraindications: formData.contraindications,
        tags: formData.tags,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)

    if (!error) {
      router.push('/admin/dashboard')
    } else {
      console.error('Error updating service:', error)
      alert('Erro ao atualizar serviço: ' + error.message)
    }

    setLoading(false)
  }

  const addItem = (field: 'benefits' | 'includes' | 'contraindications' | 'tags', value: string, setter: (val: string) => void) => {
    if (!value.trim()) return
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], value.trim()]
    }))
    setter('')
  }

  const removeItem = (field: 'benefits' | 'includes' | 'contraindications' | 'tags', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image_url' | 'gallery') => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadStatus(prev => ({ ...prev, [field]: 'uploading' }))

    try {
      const tempUrl = URL.createObjectURL(file)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `services/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file)

      let finalUrl: string
      
      if (uploadError) {
        console.warn('Supabase storage error:', uploadError.message)
        finalUrl = tempUrl
        alert('⚠️ Bucket não configurado. Imagem carregada temporariamente.')
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath)
        finalUrl = publicUrl
      }

      if (field === 'image_url') {
        setFormData(prev => ({ ...prev, image_url: finalUrl }))
      } else {
        setFormData(prev => ({ ...prev, gallery: [...prev.gallery, finalUrl] }))
      }
      
      setUploadStatus(prev => ({ ...prev, [field]: 'success' }))
      setTimeout(() => setUploadStatus(prev => ({ ...prev, [field]: '' })), 2000)
    } catch (err) {
      console.error('Upload error:', err)
      setUploadStatus(prev => ({ ...prev, [field]: 'error' }))
    }
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadStatus(prev => ({ ...prev, video: 'uploading' }))

    try {
      const tempUrl = URL.createObjectURL(file)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `services/videos/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file)

      if (uploadError) {
        console.warn('Supabase storage error:', uploadError.message)
        setFormData(prev => ({ ...prev, video_url: tempUrl }))
        alert('⚠️ Bucket não configurado. Vídeo carregado temporariamente.')
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath)
        setFormData(prev => ({ ...prev, video_url: publicUrl }))
      }
      
      setUploadStatus(prev => ({ ...prev, video: 'success' }))
    } catch (err) {
      console.error('Upload error:', err)
      setUploadStatus(prev => ({ ...prev, video: 'error' }))
    }
  }

  const handleGifUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadStatus(prev => ({ ...prev, gif: 'uploading' }))

    try {
      const tempUrl = URL.createObjectURL(file)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `services/gifs/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file)

      if (uploadError) {
        console.warn('Supabase storage error:', uploadError.message)
        setFormData(prev => ({ ...prev, gif_url: tempUrl }))
        alert('⚠️ Bucket não configurado. GIF carregado temporariamente.')
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath)
        setFormData(prev => ({ ...prev, gif_url: publicUrl }))
      }
      
      setUploadStatus(prev => ({ ...prev, gif: 'success' }))
    } catch (err) {
      console.error('Upload error:', err)
      setUploadStatus(prev => ({ ...prev, gif: 'error' }))
    }
  }

  const removeFile = (type: 'image' | 'video' | 'gif' | 'gallery', index?: number) => {
    if (type === 'image') setFormData(prev => ({ ...prev, image_url: '' }))
    if (type === 'video') setFormData(prev => ({ ...prev, video_url: '' }))
    if (type === 'gif') setFormData(prev => ({ ...prev, gif_url: '' }))
    if (type === 'gallery' && typeof index === 'number') {
      setFormData(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }))
    }
  }

  if (authLoading || fetching || !mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    )
  }

  if (!user) return null

  const SelectedIcon = serviceIcons.find(i => i.id === formData.icon)?.icon || Flame
  const selectedColor = colorOptions.find(c => c.id === formData.color)

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-white">Editar Serviço</h1>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                A guardar...
              </>
            ) : (
              'Guardar Alterações'
            )}
          </button>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Type className="w-5 h-5 text-purple-400" />
              Informações Básicas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nome do Serviço *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Ex: Massagem Tântrica Premium"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Preço (€) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    placeholder="150.00"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Duração (minutos) *
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="number"
                    min="15"
                    step="15"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                    placeholder="60"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Categoria *
                </label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as 'massage' | 'therapy' })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none"
                  >
                    <option value="massage">Massagem</option>
                    <option value="therapy">Terapia</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5 rounded-lg border-slate-600 bg-slate-800 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="is_active" className="text-slate-300">
                  Serviço ativo (visível no site)
                </label>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <AlignLeft className="w-5 h-5 text-purple-400" />
              Descrição
            </h2>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={6}
              placeholder="Descreva o serviço em detalhe..."
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
            />
          </div>

          {/* Media Upload */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Upload className="w-5 h-5 text-purple-400" />
              Imagens e Vídeos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Imagem Principal
                </label>
                {formData.image_url ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile('image')}
                      className="absolute top-2 right-2 p-2 rounded-lg bg-red-500/80 text-white hover:bg-red-600 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/50 hover:border-purple-500/50 hover:bg-slate-800 transition-all cursor-pointer">
                    {uploadStatus.image_url === 'uploading' ? (
                      <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                    ) : (
                      <>
                        <ImageIcon className="w-10 h-10 text-slate-500 mb-2" />
                        <span className="text-sm text-slate-400">Clique para upload</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'image_url')}
                      className="hidden"
                      disabled={uploadStatus.image_url === 'uploading'}
                    />
                  </label>
                )}
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Vídeo (opcional)
                </label>
                {formData.video_url ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800">
                    <video
                      src={formData.video_url}
                      className="w-full h-full object-cover"
                      controls
                    />
                    <button
                      type="button"
                      onClick={() => removeFile('video')}
                      className="absolute top-2 right-2 p-2 rounded-lg bg-red-500/80 text-white hover:bg-red-600 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/50 hover:border-purple-500/50 hover:bg-slate-800 transition-all cursor-pointer">
                    {uploadStatus.video === 'uploading' ? (
                      <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                    ) : (
                      <>
                        <Video className="w-10 h-10 text-slate-500 mb-2" />
                        <span className="text-sm text-slate-400">Clique para upload</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      disabled={uploadStatus.video === 'uploading'}
                    />
                  </label>
                )}
              </div>

              {/* GIF Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  GIF (opcional)
                </label>
                {formData.gif_url ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800">
                    <img
                      src={formData.gif_url}
                      alt="GIF Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile('gif')}
                      className="absolute top-2 right-2 p-2 rounded-lg bg-red-500/80 text-white hover:bg-red-600 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/50 hover:border-purple-500/50 hover:bg-slate-800 transition-all cursor-pointer">
                    {uploadStatus.gif === 'uploading' ? (
                      <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                    ) : (
                      <>
                        <FileImage className="w-10 h-10 text-slate-500 mb-2" />
                        <span className="text-sm text-slate-400">Clique para upload</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/gif"
                      onChange={handleGifUpload}
                      className="hidden"
                      disabled={uploadStatus.gif === 'uploading'}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
