'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Package, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star, 
  Clock, 
  DollarSign, 
  Plus, 
  Search,
  Filter,
  Save,
  X,
  Image as ImageIcon,
  Video,
  Heart,
  Sparkles,
  Shield,
  Users,
  Zap,
  Award,
  TrendingUp,
  Calendar,
  MapPin,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { createClient, Service } from '@/lib/supabase'
import { cn, formatCurrency, formatDuration } from '@/lib/utils'
import Image from 'next/image'

interface ServiceFormData {
  id?: string
  name: string
  description: string
  category: 'massage' | 'therapy' | 'package'
  price: number
  duration: number
  color: string
  image_url?: string
  video_url?: string
  gif_url?: string
  is_active: boolean
  is_featured: boolean
  order_index: number
  benefits: string[]
  includes: string[]
  requirements: string[]
  locations: string[]
  therapists: string[]
  schedule: {
    available_days: string[]
    time_slots: string[]
    max_bookings_per_day: number
  }
  pricing: {
    base_price: number
    weekend_surcharge: number
    couple_surcharge: number
    discounts: {
      percentage: number
      min_sessions: number
    }[]
  }
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  analytics: {
    views: number
    bookings: number
    revenue: number
    rating: number
    reviews: number
  }
}

interface ServiceManagerProps {
  onServiceUpdate?: (services: Service[]) => void
}

export default function ServiceManager({ onServiceUpdate }: ServiceManagerProps) {
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'duration' | 'popularity'>('name')
  const [activeTab, setActiveTab] = useState<'list' | 'edit' | 'create' | 'analytics'>('list')

  const supabase = createClient()

  useEffect(() => {
    loadServices()
  }, [])

  useEffect(() => {
    filterAndSortServices()
  }, [services, searchQuery, filterCategory, filterStatus, sortBy])

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setServices(data || [])
      onServiceUpdate?.(data || [])
    } catch (error) {
      console.error('Error loading services:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortServices = () => {
    let filtered = services

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (filterCategory) {
      filtered = filtered.filter(s => s.category === filterCategory)
    }

    // Filter by status
    if (filterStatus === 'active') {
      filtered = filtered.filter(s => s.is_active)
    } else if (filterStatus === 'inactive') {
      filtered = filtered.filter(s => !s.is_active)
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price':
          return a.price - b.price
        case 'duration':
          return a.duration - b.duration
        case 'popularity':
          return (b.analytics?.bookings || 0) - (a.analytics?.bookings || 0)
        default:
          return 0
      }
    })

    setFilteredServices(filtered)
  }

  const saveService = async (formData: ServiceFormData) => {
    setSaving(true)
    try {
      const serviceData = {
        ...formData,
        updated_at: new Date().toISOString()
      }

      if (formData.id) {
        // Update existing service
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', formData.id)

        if (error) throw error
      } else {
        // Create new service
        const { error } = await supabase
          .from('services')
          .insert({
            ...serviceData,
            created_at: new Date().toISOString()
          })

        if (error) throw error
      }

      await loadServices()
      setIsEditing(false)
      setIsCreating(false)
      setSelectedService(null)
      setActiveTab('list')
    } catch (error) {
      console.error('Error saving service:', error)
    } finally {
      setSaving(false)
    }
  }

  const deleteService = async (id: string) => {
    if (!confirm('Tem certeza que deseja eliminar este serviço?')) return

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)

      if (error) throw error
      await loadServices()
    } catch (error) {
      console.error('Error deleting service:', error)
    }
  }

  const toggleServiceStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ 
          is_active: !currentStatus, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)

      if (error) throw error
      await loadServices()
    } catch (error) {
      console.error('Error toggling service status:', error)
    }
  }

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ 
          is_featured: !currentFeatured, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)

      if (error) throw error
      await loadServices()
    } catch (error) {
      console.error('Error toggling featured status:', error)
    }
  }

  const duplicateService = async (service: Service) => {
    const duplicatedService: ServiceFormData = {
      ...service,
      id: undefined,
      name: `${service.name} (Cópia)`,
      order_index: services.length
    }
    
    await saveService(duplicatedService)
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      massage: <Heart className="w-5 h-5 text-rose-400" />,
      therapy: <Sparkles className="w-5 h-5 text-purple-400" />,
      package: <Package className="w-5 h-5 text-amber-400" />
    }
    return icons[category as keyof typeof icons] || <Package className="w-5 h-5 text-slate-400" />
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      massage: 'from-rose-500 to-pink-500',
      therapy: 'from-purple-500 to-indigo-500',
      package: 'from-amber-500 to-orange-500'
    }
    return colors[category as keyof typeof colors] || 'from-slate-500 to-gray-500'
  }

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
          <h2 className="text-2xl font-bold text-white">Gestão de Serviços</h2>
          <p className="text-slate-400">
            {filteredServices.length} de {services.length} serviços
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('analytics')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
              activeTab === 'analytics'
                ? "bg-purple-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            )}
          >
            <TrendingUp className="w-4 h-4" />
            Analytics
          </button>
          <button
            onClick={() => {
              setIsCreating(true)
              setActiveTab('create')
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all"
          >
            <Plus className="w-5 h-5" />
            Novo Serviço
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar serviços..."
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
          >
            <option value="">Todas as Categorias</option>
            <option value="massage">Massagem</option>
            <option value="therapy">Terapia</option>
            <option value="package">Pacote</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
          >
            <option value="name">Ordenar por Nome</option>
            <option value="price">Ordenar por Preço</option>
            <option value="duration">Ordenar por Duração</option>
            <option value="popularity">Ordenar por Popularidade</option>
          </select>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Total:</span>
            <span className="font-semibold text-white">
              {formatCurrency(filteredServices.reduce((sum, s) => sum + s.price, 0))}
            </span>
          </div>
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
            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-purple-500/30 transition-all"
                >
                  {/* Header */}
                  <div className="relative h-32 bg-gradient-to-br p-6" style={{ backgroundImage: `linear-gradient(to bottom right, ${service.color || 'from-purple-600 to-pink-600'})` }}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(service.category)}
                        <div>
                          <h3 className="font-bold text-white text-lg">{service.name}</h3>
                          <p className="text-white/80 text-sm capitalize">
                            {service.category === 'massage' ? 'Massagem' : 
                             service.category === 'therapy' ? 'Terapia' : 'Pacote'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {service.is_featured && (
                          <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full border border-amber-500/30">
                            <Star className="w-3 h-3 inline mr-1" />
                            Destaque
                          </span>
                        )}
                        <span className={cn(
                          "px-2 py-1 text-xs rounded-full border",
                          service.is_active
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                        )}>
                          {service.is_active ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative h-40 bg-slate-800">
                    {service.image_url ? (
                      <Image
                        src={service.image_url}
                        alt={service.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-12 h-12 text-slate-600" />
                      </div>
                    )}

                    {/* Media Indicators */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      {service.video_url && (
                        <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                          <Video className="w-4 h-4 text-purple-400" />
                        </div>
                      )}
                      {service.gif_url && (
                        <div className="p-2 bg-pink-500/20 rounded-lg border border-pink-500/30">
                          <ImageIcon className="w-4 h-4 text-pink-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock className="w-4 h-4" />
                        <span>{formatDuration(service.duration)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-400 font-semibold">
                        <DollarSign className="w-4 h-4" />
                        <span>{formatCurrency(service.price)}</span>
                      </div>
                    </div>

                    {/* Analytics Preview */}
                    {service.analytics && (
                      <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                        <div className="text-center p-2 bg-slate-800 rounded">
                          <div className="text-slate-400">Visualizações</div>
                          <div className="text-white font-semibold">{service.analytics.views || 0}</div>
                        </div>
                        <div className="text-center p-2 bg-slate-800 rounded">
                          <div className="text-slate-400">Reservas</div>
                          <div className="text-white font-semibold">{service.analytics.bookings || 0}</div>
                        </div>
                        <div className="text-center p-2 bg-slate-800 rounded">
                          <div className="text-slate-400">Receita</div>
                          <div className="text-green-400 font-semibold">
                            {formatCurrency(service.analytics.revenue || 0)}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedService(service)
                          setIsEditing(true)
                          setActiveTab('edit')
                        }}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => duplicateService(service)}
                        className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:bg-slate-700 transition-all"
                        title="Duplicar"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleServiceStatus(service.id, service.is_active)}
                        className={cn(
                          "p-2 rounded-lg transition-all",
                          service.is_active
                            ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                            : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        )}
                      >
                        {service.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => deleteService(service.id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-800 flex items-center justify-center">
                  <Package className="w-10 h-10 text-slate-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {searchQuery || filterCategory || filterStatus !== 'all'
                    ? 'Nenhum serviço encontrado'
                    : 'Ainda sem serviços'
                  }
                </h3>
                <p className="text-slate-400 mb-6">
                  {searchQuery || filterCategory || filterStatus !== 'all'
                    ? 'Tente ajustar os filtros'
                    : 'Comece por adicionar o seu primeiro serviço'
                  }
                </p>
                {!searchQuery && !filterCategory && filterStatus === 'all' && (
                  <button
                    onClick={() => {
                      setIsCreating(true)
                      setActiveTab('create')
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all"
                  >
                    Adicionar Serviço
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ServiceAnalytics services={services} />
          </motion.div>
        )}

        {(activeTab === 'edit' || activeTab === 'create') && (
          <motion.div
            key="edit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ServiceForm
              service={selectedService}
              onSave={saveService}
              onCancel={() => {
                setIsEditing(false)
                setIsCreating(false)
                setSelectedService(null)
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

// Service Analytics Component
function ServiceAnalytics({ services }: { services: Service[] }) {
  const totalRevenue = services.reduce((sum, s) => sum + (s.analytics?.revenue || 0), 0)
  const totalBookings = services.reduce((sum, s) => sum + (s.analytics?.bookings || 0), 0)
  const totalViews = services.reduce((sum, s) => sum + (s.analytics?.views || 0), 0)
  const averageRating = services.reduce((sum, s) => sum + (s.analytics?.rating || 0), 0) / services.length || 0

  const topServices = [...services]
    .sort((a, b) => (b.analytics?.bookings || 0) - (a.analytics?.bookings || 0))
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</h3>
          <p className="text-slate-400 text-sm">Receita Total</p>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">{totalBookings}</h3>
          <p className="text-slate-400 text-sm">Total de Reservas</p>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Eye className="w-6 h-6 text-purple-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">{totalViews.toLocaleString()}</h3>
          <p className="text-slate-400 text-sm">Visualizações</p>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-500/20 rounded-lg">
              <Star className="w-6 h-6 text-amber-400" />
            </div>
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">{averageRating.toFixed(1)}</h3>
          <p className="text-slate-400 text-sm">Avaliação Média</p>
        </div>
      </div>

      {/* Top Services */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Serviços Mais Populares</h3>
        <div className="space-y-4">
          {topServices.map((service, index) => (
            <div key={service.id} className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white">{service.name}</h4>
                <p className="text-slate-400 text-sm">{service.analytics?.bookings || 0} reservas</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-400">{formatCurrency(service.analytics?.revenue || 0)}</p>
                <p className="text-slate-400 text-sm">receita</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Service Form Component (simplified for brevity)
function ServiceForm({ 
  service, 
  onSave, 
  onCancel, 
  saving 
}: { 
  service: Service | null
  onSave: (data: ServiceFormData) => void
  onCancel: () => void
  saving: boolean
}) {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: service?.name || '',
    description: service?.description || '',
    category: service?.category || 'massage',
    price: service?.price || 0,
    duration: service?.duration || 60,
    color: service?.color || 'from-purple-600 to-pink-600',
    image_url: service?.image_url || '',
    video_url: service?.video_url || '',
    gif_url: service?.gif_url || '',
    is_active: service?.is_active ?? true,
    is_featured: service?.is_featured ?? false,
    order_index: service?.order_index || 0,
    benefits: service?.benefits || [],
    includes: service?.includes || [],
    requirements: service?.requirements || [],
    locations: service?.locations || [],
    therapists: service?.therapists || [],
    schedule: service?.schedule || {
      available_days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      time_slots: ['09:00', '11:00', '14:00', '16:00', '18:00'],
      max_bookings_per_day: 8
    },
    pricing: service?.pricing || {
      base_price: service?.price || 0,
      weekend_surcharge: 20,
      couple_surcharge: 50,
      discounts: []
    },
    seo: service?.seo || {
      title: service?.name || '',
      description: service?.description || '',
      keywords: []
    },
    analytics: service?.analytics || {
      views: 0,
      bookings: 0,
      revenue: 0,
      rating: 0,
      reviews: 0
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, id: service?.id })
  }

  const updateField = (field: keyof ServiceFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">
          {service ? 'Editar Serviço' : 'Novo Serviço'}
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
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Informações Básicas</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nome do Serviço
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
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Categoria
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="massage">Massagem</option>
                  <option value="therapy">Terapia</option>
                  <option value="package">Pacote</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Cor do Tema
                </label>
                <select
                  value={formData.color}
                  onChange={(e) => updateField('color', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="from-purple-600 to-pink-600">Roxo para Rosa</option>
                  <option value="from-rose-600 to-pink-600">Rosa para Pink</option>
                  <option value="from-blue-600 to-indigo-600">Azul para Índigo</option>
                  <option value="from-green-600 to-emerald-600">Verde para Esmeralda</option>
                  <option value="from-amber-600 to-orange-600">Âmbar para Laranja</option>
                </select>
              </div>
            </div>

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
                  required
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
                  required
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
                URL da Imagem
              </label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => updateField('image_url', e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                placeholder="https://exemplo.com/imagem.jpg"
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

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                URL do GIF
              </label>
              <input
                type="url"
                value={formData.gif_url}
                onChange={(e) => updateField('gif_url', e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                placeholder="https://exemplo.com/animacao.gif"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Status</h4>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => updateField('is_active', e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
            />
            <span className="text-white">Serviço Ativo</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.is_featured}
              onChange={(e) => updateField('is_featured', e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
            />
            <span className="text-white">Serviço em Destaque</span>
          </label>
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
            'Salvar Serviço'
          )}
        </button>
      </div>
    </form>
  )
}
