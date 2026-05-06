'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UserPlus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  Globe, 
  Heart, 
  Camera, 
  Video, 
  Upload, 
  Save, 
  X, 
  Plus, 
  Search,
  Filter,
  ChevronDown,
  Users,
  UserCircle,
  Award,
  Briefcase,
  Languages,
  DollarSign
} from 'lucide-react'
import { createClient, Therapist } from '@/lib/supabase'
import { cn, formatCurrency } from '@/lib/utils'
import Image from 'next/image'

interface TherapistFormData {
  id?: string
  name: string
  bio: string
  specialty: string
  experience_years: number
  location: string
  rating: number
  reviews: number
  price: number
  duration: number
  languages: string[]
  services: string[]
  availability: string
  image_url?: string
  video_url?: string
  gallery_images: string[]
  contact: {
    phone: string
    email: string
    whatsapp: string
    instagram?: string
    website?: string
  }
  schedule: {
    monday: { open: string; close: string; available: boolean }
    tuesday: { open: string; close: string; available: boolean }
    wednesday: { open: string; close: string; available: boolean }
    thursday: { open: string; close: string; available: boolean }
    friday: { open: string; close: string; available: boolean }
    saturday: { open: string; close: string; available: boolean }
    sunday: { open: string; close: string; available: boolean }
  }
  is_active: boolean
  featured: boolean
  order_index: number
}

interface TherapistManagerProps {
  onTherapistUpdate?: (therapists: Therapist[]) => void
}

export default function TherapistManager({ onTherapistUpdate }: TherapistManagerProps) {
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [filteredTherapists, setFilteredTherapists] = useState<Therapist[]>([])
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterSpecialty, setFilterSpecialty] = useState('')
  const [filterLocation, setFilterLocation] = useState('')
  const [showActiveOnly, setShowActiveOnly] = useState(false)
  const [activeTab, setActiveTab] = useState<'list' | 'edit' | 'create'>('list')

  const supabase = createClient()

  useEffect(() => {
    loadTherapists()
  }, [])

  useEffect(() => {
    filterTherapists()
  }, [therapists, searchQuery, filterSpecialty, filterLocation, showActiveOnly])

  const loadTherapists = async () => {
    try {
      const { data, error } = await supabase
        .from('therapists')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setTherapists(data || [])
      onTherapistUpdate?.(data || [])
    } catch (error) {
      console.error('Error loading therapists:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterTherapists = () => {
    let filtered = therapists

    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.bio.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (filterSpecialty) {
      filtered = filtered.filter(t => t.specialty === filterSpecialty)
    }

    if (filterLocation) {
      filtered = filtered.filter(t => t.location === filterLocation)
    }

    if (showActiveOnly) {
      filtered = filtered.filter(t => t.is_active)
    }

    setFilteredTherapists(filtered)
  }

  const saveTherapist = async (formData: TherapistFormData) => {
    setSaving(true)
    try {
      const therapistData = {
        ...formData,
        updated_at: new Date().toISOString()
      }

      if (formData.id) {
        // Update existing therapist
        const { error } = await supabase
          .from('therapists')
          .update(therapistData)
          .eq('id', formData.id)

        if (error) throw error
      } else {
        // Create new therapist
        const { error } = await supabase
          .from('therapists')
          .insert({
            ...therapistData,
            created_at: new Date().toISOString()
          })

        if (error) throw error
      }

      await loadTherapists()
      setIsEditing(false)
      setIsCreating(false)
      setSelectedTherapist(null)
      setActiveTab('list')
    } catch (error) {
      console.error('Error saving therapist:', error)
    } finally {
      setSaving(false)
    }
  }

  const deleteTherapist = async (id: string) => {
    if (!confirm('Tem certeza que deseja eliminar esta massagista?')) return

    try {
      const { error } = await supabase
        .from('therapists')
        .delete()
        .eq('id', id)

      if (error) throw error
      await loadTherapists()
    } catch (error) {
      console.error('Error deleting therapist:', error)
    }
  }

  const toggleTherapistStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('therapists')
        .update({ 
          is_active: !currentStatus, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)

      if (error) throw error
      await loadTherapists()
    } catch (error) {
      console.error('Error toggling therapist status:', error)
    }
  }

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('therapists')
        .update({ 
          featured: !currentFeatured, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)

      if (error) throw error
      await loadTherapists()
    } catch (error) {
      console.error('Error toggling featured status:', error)
    }
  }

  const specialties = [...new Set(therapists.map(t => t.specialty))]
  const locations = [...new Set(therapists.map(t => t.location))]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestão de Massagistas</h2>
          <p className="text-slate-400">
            {filteredTherapists.length} de {therapists.length} massagistas
          </p>
        </div>
        <button
          onClick={() => {
            setIsCreating(true)
            setActiveTab('create')
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all"
        >
          <UserPlus className="w-5 h-5" />
          Nova Massagista
        </button>
      </div>

      {/* Filters */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar massagistas..."
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <select
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
            className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
          >
            <option value="">Todas as Especialidades</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>

          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
          >
            <option value="">Todas as Localizações</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <label className="flex items-center gap-3 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={showActiveOnly}
              onChange={(e) => setShowActiveOnly(e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
            />
            <span className="text-white">Apenas ativas</span>
          </label>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Therapists Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTherapists.map((therapist) => (
                <motion.div
                  key={therapist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-purple-500/30 transition-all"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-slate-800">
                    {therapist.image_url ? (
                      <Image
                        src={therapist.image_url}
                        alt={therapist.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <UserCircle className="w-16 h-16 text-slate-600" />
                      </div>
                    )}

                    {/* Status Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {therapist.featured && (
                        <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full border border-amber-500/30">
                          <Star className="w-3 h-3 inline mr-1" />
                          Destaque
                        </span>
                      )}
                      <span className={cn(
                        "px-2 py-1 text-xs rounded-full border",
                        therapist.is_active
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      )}>
                        {therapist.is_active ? 'Ativa' : 'Inativa'}
                      </span>
                    </div>

                    {/* Video Indicator */}
                    {therapist.video_url && (
                      <div className="absolute top-3 right-3 p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                        <Video className="w-4 h-4 text-purple-400" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{therapist.name}</h3>
                        <p className="text-purple-400 text-sm">{therapist.specialty}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="text-white font-medium">{therapist.rating}</span>
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                      {therapist.bio}
                    </p>

                    <div className="space-y-2 text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {therapist.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {therapist.experience_years} anos de experiência
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        {formatCurrency(therapist.price)} / {therapist.duration}min
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedTherapist(therapist)
                          setIsEditing(true)
                          setActiveTab('edit')
                        }}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => toggleTherapistStatus(therapist.id, therapist.is_active)}
                        className={cn(
                          "p-2 rounded-lg transition-all",
                          therapist.is_active
                            ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                            : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        )}
                      >
                        {therapist.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => toggleFeatured(therapist.id, therapist.featured)}
                        className={cn(
                          "p-2 rounded-lg transition-all",
                          therapist.featured
                            ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                            : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                        )}
                      >
                        <Star className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteTherapist(therapist.id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredTherapists.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-800 flex items-center justify-center">
                  <Users className="w-10 h-10 text-slate-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {searchQuery || filterSpecialty || filterLocation 
                    ? 'Nenhuma massagista encontrada' 
                    : 'Ainda sem massagistas'
                  }
                </h3>
                <p className="text-slate-400 mb-6">
                  {searchQuery || filterSpecialty || filterLocation
                    ? 'Tente ajustar os filtros'
                    : 'Comece por adicionar a sua primeira massagista'
                  }
                </p>
                {!searchQuery && !filterSpecialty && !filterLocation && (
                  <button
                    onClick={() => {
                      setIsCreating(true)
                      setActiveTab('create')
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all"
                  >
                    Adicionar Massagista
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}

        {(activeTab === 'edit' || activeTab === 'create') && (
          <motion.div
            key="edit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <TherapistForm
              therapist={selectedTherapist}
              onSave={saveTherapist}
              onCancel={() => {
                setIsEditing(false)
                setIsCreating(false)
                setSelectedTherapist(null)
                setActiveTab('list')
              }}
              saving={saving}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Therapist Form Component
function TherapistForm({ 
  therapist, 
  onSave, 
  onCancel, 
  saving 
}: { 
  therapist: Therapist | null
  onSave: (data: TherapistFormData) => void
  onCancel: () => void
  saving: boolean
}) {
  const [formData, setFormData] = useState<TherapistFormData>({
    name: therapist?.name || '',
    bio: therapist?.bio || '',
    specialty: therapist?.specialty || '',
    experience_years: therapist?.experience_years || 0,
    location: therapist?.location || '',
    rating: therapist?.rating || 4.8,
    reviews: therapist?.reviews || 0,
    price: therapist?.price || 150,
    duration: therapist?.duration || 90,
    languages: therapist?.languages || ['Português'],
    services: therapist?.services || [],
    availability: therapist?.availability || 'Disponível',
    image_url: therapist?.image_url || '',
    video_url: therapist?.video_url || '',
    gallery_images: therapist?.gallery_images || [],
    contact: therapist?.contact || {
      phone: '',
      email: '',
      whatsapp: '',
      instagram: '',
      website: ''
    },
    schedule: therapist?.schedule || {
      monday: { open: '09:00', close: '20:00', available: true },
      tuesday: { open: '09:00', close: '20:00', available: true },
      wednesday: { open: '09:00', close: '20:00', available: true },
      thursday: { open: '09:00', close: '20:00', available: true },
      friday: { open: '09:00', close: '20:00', available: true },
      saturday: { open: '10:00', close: '18:00', available: false },
      sunday: { open: '10:00', close: '18:00', available: false }
    },
    is_active: therapist?.is_active ?? true,
    featured: therapist?.featured ?? false,
    order_index: therapist?.order_index || 0
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, id: therapist?.id })
  }

  const updateField = (field: keyof TherapistFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">
          {therapist ? 'Editar Massagista' : 'Nova Massagista'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 hover:bg-slate-800 rounded-lg transition-all"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Informações Básicas</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Especialidade
                </label>
                <input
                  type="text"
                  value={formData.specialty}
                  onChange={(e) => updateField('specialty', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="Ex: Massagem Tântrica"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Biografia
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => updateField('bio', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
                  placeholder="Descreva a massagista e suas qualidades..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Anos de Experiência
                  </label>
                  <input
                    type="number"
                    value={formData.experience_years}
                    onChange={(e) => updateField('experience_years', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Localização
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Ex: Lisboa"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Mídia</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  URL da Foto Principal
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => updateField('image_url', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="https://exemplo.com/foto.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  URL do Vídeo
                </label>
                <input
                  type="url"
                  value={formData.video_url}
                  onChange={(e) => updateField('video_url', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="https://exemplo.com/video.mp4"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing and Schedule */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Preços e Disponibilidade</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Preço (€)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => updateField('price', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Duração (minutos)
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => updateField('duration', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    min="30"
                    step="30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Classificação
                  </label>
                  <input
                    type="number"
                    value={formData.rating}
                    onChange={(e) => updateField('rating', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Avaliações
                  </label>
                  <input
                    type="number"
                    value={formData.reviews}
                    onChange={(e) => updateField('reviews', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Status de Disponibilidade
                </label>
                <select
                  value={formData.availability}
                  onChange={(e) => updateField('availability', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Disponível">Disponível</option>
                  <option value="Ocupada">Ocupada</option>
                  <option value="Indisponível">Indisponível</option>
                  <option value="Folga">Folga</option>
                </select>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Status</h4>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => updateField('is_active', e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
                />
                <span className="text-white">Massagista Ativa</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => updateField('featured', e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
                />
                <span className="text-white">Massagista em Destaque</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-all"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50"
        >
          {saving ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Salvando...
            </div>
          ) : (
            'Salvar Massagista'
          )}
        </button>
      </div>
    </form>
  )
}
