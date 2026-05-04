'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
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
  ArrowUp,
  ArrowDown,
  Palette,
  List,
  Info
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

export default function NewServicePage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{[key: string]: string}>({})
  
  // Form data with extended fields
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
    meta_title: '',
    meta_description: '',
  })

  const [newBenefit, setNewBenefit] = useState('')
  const [newInclude, setNewInclude] = useState('')
  const [newContra, setNewContra] = useState('')
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect if not authenticated - fixed
  useEffect(() => {
    if (!authLoading && !user && mounted) {
      router.push('/admin/login')
    }
  }, [user, authLoading, router, mounted])

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

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `services/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file)

    if (uploadError) {
      console.error('Error uploading:', uploadError)
      setUploadStatus(prev => ({ ...prev, [field]: 'error' }))
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath)

    if (field === 'image_url') {
      setFormData(prev => ({ ...prev, image_url: publicUrl }))
    } else {
      setFormData(prev => ({ ...prev, gallery: [...prev.gallery, publicUrl] }))
    }
    
    setUploadStatus(prev => ({ ...prev, [field]: 'success' }))
    setTimeout(() => setUploadStatus(prev => ({ ...prev, [field]: '' })), 2000)
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadStatus(prev => ({ ...prev, video: 'uploading' }))

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `services/videos/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file)

    if (uploadError) {
      setUploadStatus(prev => ({ ...prev, video: 'error' }))
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath)

    setFormData(prev => ({ ...prev, video_url: publicUrl }))
    setUploadStatus(prev => ({ ...prev, video: 'success' }))
  }

  const handleGifUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadStatus(prev => ({ ...prev, gif: 'uploading' }))

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `services/gifs/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file)

    if (uploadError) {
      setUploadStatus(prev => ({ ...prev, gif: 'error' }))
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath)

    setFormData(prev => ({ ...prev, gif_url: publicUrl }))
    setUploadStatus(prev => ({ ...prev, gif: 'success' }))
  }

  const removeFile = (type: 'image' | 'video' | 'gif' | 'gallery', index?: number) => {
    if (type === 'image') setFormData(prev => ({ ...prev, image_url: '' }))
    if (type === 'video') setFormData(prev => ({ ...prev, video_url: '' }))
    if (type === 'gif') setFormData(prev => ({ ...prev, gif_url: '' }))
    if (type === 'gallery' && typeof index === 'number') {
      setFormData(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('services').insert({
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
      meta_title: formData.meta_title || formData.name,
      meta_description: formData.meta_description || formData.short_description,
    })

    if (!error) {
      router.push('/admin/dashboard')
    } else {
      console.error('Error creating service:', error)
      alert('Erro ao criar serviço: ' + error.message)
    }

    setLoading(false)
  }

  if (authLoading || !mounted) {
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
            <div>
              <h1 className="text-2xl font-bold text-white">Novo Serviço</h1>
              <p className="text-sm text-slate-400">Preencha todos os detalhes do serviço</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  A criar...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Criar Serviço
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-7xl mx-auto p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Basic Info */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Info className="w-5 h-5 text-purple-400" />
                  Informações Básicas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Nome Completo do Serviço *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Ex: Massagem Tântrica Premium com Óleos Aromáticos"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Nome Curto (para cards)
                    </label>
                    <input
                      type="text"
                      value={formData.short_name}
                      onChange={(e) => setFormData({ ...formData, short_name: e.target.value })}
                      placeholder="Ex: Massagem Tântrica"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Categoria *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    >
                      <option value="massage">Massagem</option>
                      <option value="therapy">Terapia</option>
                      <option value="ritual">Ritual</option>
                      <option value="package">Pacote</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                        Preço Promo (€)
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.promo_price}
                          onChange={(e) => setFormData({ ...formData, promo_price: e.target.value })}
                          placeholder="120.00"
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Duração (min) *
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
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Capacidade Máxima
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.max_capacity}
                      onChange={(e) => setFormData({ ...formData, max_capacity: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <AlignLeft className="w-5 h-5 text-purple-400" />
                  Descrições
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Descrição Curta (para listagens)
                    </label>
                    <textarea
                      value={formData.short_description}
                      onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                      rows={2}
                      placeholder="Breve descrição que aparece nos cards..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Descrição Completa *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={6}
                      placeholder="Descrição detalhada do serviço, experiência, benefícios..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Benefits & Includes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    Benefícios
                  </h2>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newBenefit}
                        onChange={(e) => setNewBenefit(e.target.value)}
                        placeholder="Ex: Alívio do stress"
                        className="flex-1 px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('benefits', newBenefit, setNewBenefit))}
                      />
                      <button
                        type="button"
                        onClick={() => addItem('benefits', newBenefit, setNewBenefit)}
                        className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition-all"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                          <span className="text-slate-300">{benefit}</span>
                          <button
                            type="button"
                            onClick={() => removeItem('benefits', index)}
                            className="p-1 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <List className="w-5 h-5 text-blue-400" />
                    O que Inclui
                  </h2>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newInclude}
                        onChange={(e) => setNewInclude(e.target.value)}
                        placeholder="Ex: Toalhas aquecidas"
                        className="flex-1 px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('includes', newInclude, setNewInclude))}
                      />
                      <button
                        type="button"
                        onClick={() => addItem('includes', newInclude, setNewInclude)}
                        className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition-all"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.includes.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                          <span className="text-slate-300">{item}</span>
                          <button
                            type="button"
                            onClick={() => removeItem('includes', index)}
                            className="p-1 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contraindications & Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    Contraindicações
                  </h2>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newContra}
                        onChange={(e) => setNewContra(e.target.value)}
                        placeholder="Ex: Gestantes"
                        className="flex-1 px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('contraindications', newContra, setNewContra))}
                      />
                      <button
                        type="button"
                        onClick={() => addItem('contraindications', newContra, setNewContra)}
                        className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition-all"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.contraindications.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                          <span className="text-slate-300">{item}</span>
                          <button
                            type="button"
                            onClick={() => removeItem('contraindications', index)}
                            className="p-1 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-purple-400" />
                    Tags
                  </h2>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Ex: relaxamento"
                        className="flex-1 px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('tags', newTag, setNewTag))}
                      />
                      <button
                        type="button"
                        onClick={() => addItem('tags', newTag, setNewTag)}
                        className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition-all"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeItem('tags', index)}
                            className="hover:text-red-400 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Media & Settings */}
            <div className="space-y-8">
              
              {/* Visual Settings */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-400" />
                  Visual
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Ícone do Serviço
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {serviceIcons.map((icon) => {
                        const IconComponent = icon.icon
                        return (
                          <button
                            key={icon.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, icon: icon.id })}
                            className={cn(
                              "p-3 rounded-xl border transition-all",
                              formData.icon === icon.id
                                ? "bg-purple-500/20 border-purple-500"
                                : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                            )}
                            title={icon.name}
                          >
                            <IconComponent className={cn(
                              "w-6 h-6 mx-auto",
                              formData.icon === icon.id ? "text-purple-400" : "text-slate-400"
                            )} />
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Cor do Card
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, color: color.id })}
                          className={cn(
                            "p-3 rounded-xl border transition-all text-left",
                            formData.color === color.id
                              ? "border-purple-500 bg-purple-500/10"
                              : "border-slate-700 hover:border-slate-600"
                          )}
                        >
                          <div className={cn("w-full h-8 rounded-lg bg-gradient-to-r mb-2", color.gradient)} />
                          <span className="text-xs text-slate-400">{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status & Visibility */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Estado</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 cursor-pointer hover:bg-slate-800 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <span className="text-white font-medium">Serviço Ativo</span>
                      <p className="text-xs text-slate-400">Visível no site</p>
                    </div>
                    {formData.is_active ? <Eye className="w-5 h-5 text-green-400" /> : <EyeOff className="w-5 h-5 text-slate-500" />}
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 cursor-pointer hover:bg-slate-800 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <span className="text-white font-medium">Destaque</span>
                      <p className="text-xs text-slate-400">Aparece em destaque</p>
                    </div>
                    <Star className={cn("w-5 h-5", formData.is_featured ? "text-yellow-400" : "text-slate-500")} />
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 cursor-pointer hover:bg-slate-800 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.is_promo}
                      onChange={(e) => setFormData({ ...formData, is_promo: e.target.checked })}
                      className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <span className="text-white font-medium">Promoção</span>
                      <p className="text-xs text-slate-400">Mostra preço promocional</p>
                    </div>
                    <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-bold">PROMO</span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Ordem de Exibição
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.order_index}
                      onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-purple-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Main Image Upload */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-purple-400" />
                  Imagem Principal
                </h2>
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
                        <Upload className="w-10 h-10 text-slate-500 mb-2" />
                        <span className="text-sm text-slate-400">Clique para upload</span>
                        <span className="text-xs text-slate-500 mt-1">JPG, PNG, WebP</span>
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
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Video className="w-5 h-5 text-purple-400" />
                  Vídeo (Opcional)
                </h2>
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
                        <span className="text-xs text-slate-500 mt-1">MP4, WebM (max 50MB)</span>
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
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FileImage className="w-5 h-5 text-purple-400" />
                  GIF (Opcional)
                </h2>
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
                        <span className="text-xs text-slate-500 mt-1">GIF animado</span>
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

              {/* Gallery Upload */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-purple-400" />
                  Galeria ({formData.gallery.length})
                </h2>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {formData.gallery.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-slate-800">
                      <img src={url} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeFile('gallery', index)}
                        className="absolute top-1 right-1 p-1 rounded-lg bg-red-500/80 text-white hover:bg-red-600 transition-all"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <label className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/50 hover:border-purple-500/50 hover:bg-slate-800 transition-all cursor-pointer">
                  {uploadStatus.gallery === 'uploading' ? (
                    <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
                  ) : (
                    <>
                      <Plus className="w-6 h-6 text-slate-500 mb-1" />
                      <span className="text-xs text-slate-400">Adicionar imagem</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'gallery')}
                    className="hidden"
                    disabled={uploadStatus.gallery === 'uploading'}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Pré-visualização do Card</h2>
            <div className="max-w-sm">
              <div className={cn(
                "relative p-6 rounded-2xl bg-slate-800 border overflow-hidden",
                selectedColor?.id === 'orange-red' && "border-orange-500/30",
                selectedColor?.id === 'pink-rose' && "border-pink-500/30",
                selectedColor?.id === 'blue-cyan' && "border-blue-500/30",
                selectedColor?.id === 'purple-violet' && "border-purple-500/30",
                selectedColor?.id === 'green-emerald' && "border-emerald-500/30",
                selectedColor?.id === 'fuchsia-pink' && "border-fuchsia-500/30",
                selectedColor?.id === 'teal-cyan' && "border-teal-500/30",
                selectedColor?.id === 'amber-orange' && "border-amber-500/30"
              )}>
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-10",
                  selectedColor?.gradient
                )} />
                <div className="relative">
                  <div className={cn(
                    "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                    selectedColor?.gradient
                  )}>
                    <SelectedIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {formData.short_name || formData.name || 'Nome do Serviço'}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {formData.short_description || 'Descrição curta do serviço...'}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-purple-400">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-bold">
                        {formData.price ? `€${formData.price}` : '€0.00'}
                        {formData.is_promo && formData.promo_price && (
                          <span className="ml-2 text-red-400 line-through text-sm">€{formData.promo_price}</span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{formData.duration || '60'}min</span>
                    </div>
                  </div>
                  {formData.is_promo && (
                    <div className="mt-3 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold inline-block">
                      PROMOÇÃO
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
