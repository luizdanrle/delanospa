'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, Service, ContactInfo, Location, Therapist, Client } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Plus,
  Settings,
  LogOut,
  Phone,
  MapPin,
  Mail,
  Loader2,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  Image as ImageIcon,
  Video,
  DollarSign,
  Clock,
  Search,
  X,
  Globe,
  MessageCircle,
  Share2,
  Users,
  UserCircle,
  Heart,
  Calendar,
  MoreHorizontal,
  Star,
  Award,
  Briefcase,
  Filter,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  FileText,
  TrendingUp,
  DollarSign as DollarIcon,
  Package,
  Gift
} from 'lucide-react'
import { cn, formatCurrency, formatDuration } from '@/lib/utils'
import ContentEditor from '@/components/admin/ContentEditor'
import TherapistManager from '@/components/admin/TherapistManager'
import ServiceManager from '@/components/admin/ServiceManager'

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user, signOut, loading: authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'therapists' | 'locations' | 'contacts' | 'clients' | 'content' | 'settings'>('dashboard')
  const [services, setServices] = useState<Service[]>([])
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [locations, setLocations] = useState<Location[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [stats, setStats] = useState({
    totalServices: 0,
    activeServices: 0,
    totalTherapists: 0,
    totalClients: 0,
    totalLocations: 0
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login')
    }
  }, [user, authLoading, router])

  // Load data when user is available or tab changes
  useEffect(() => {
    if (user) {
      console.log('Loading dashboard data...')
      loadData()
    }
  }, [user, activeTab])

  // Reload data when window gains focus (user returns to tab)
  useEffect(() => {
    const handleFocus = () => {
      if (user) {
        console.log('Window focused, reloading data...')
        loadData()
      }
    }
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [user])

  const loadData = async () => {
    setLoading(true)
    try {
      console.log('Fetching dashboard data from Supabase...')
      
      // Load services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true })
      console.log('Services loaded:', servicesData?.length || 0, 'Error:', servicesError)
      if (servicesData) {
        setServices(servicesData)
        setStats(prev => ({
          ...prev,
          totalServices: servicesData.length,
          activeServices: servicesData.filter(s => s.is_active).length
        }))
      }

      // Load therapists
      const { data: therapistsData, error: therapistsError } = await supabase
        .from('therapists')
        .select('*')
        .order('order_index', { ascending: true })
      console.log('Therapists loaded:', therapistsData?.length || 0, 'Error:', therapistsError)
      if (therapistsData) {
        setTherapists(therapistsData)
        setStats(prev => ({ ...prev, totalTherapists: therapistsData.length }))
      }

      // Load contact info
      const { data: contactData } = await supabase
        .from('contact_info')
        .select('*')
        .single()
      if (contactData) setContactInfo(contactData)

      // Load locations
      const { data: locationsData } = await supabase
        .from('locations')
        .select('*')
        .order('order_index', { ascending: true })
      if (locationsData) {
        setLocations(locationsData)
        setStats(prev => ({ ...prev, totalLocations: locationsData.length }))
      }

      // Load clients
      const { data: clientsData } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })
      if (clientsData) {
        setClients(clientsData)
        setStats(prev => ({ ...prev, totalClients: clientsData.length }))
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
    router.push('/admin/login')
  }

  const toggleServiceStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('services')
      .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (!error) {
      setServices(services.map(s => s.id === id ? { ...s, is_active: !currentStatus } : s))
    }
  }

  const deleteService = async (id: string) => {
    if (!confirm('Tem certeza que deseja eliminar este serviço?')) return

    const { error } = await supabase.from('services').delete().eq('id', id)
    if (!error) {
      setServices(services.filter(s => s.id !== id))
    }
  }

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800 z-50">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white">DelirioSpa</h1>
              <p className="text-xs text-slate-400">Painel de Admin</p>
            </div>
          </div>
        </div>

        <nav className="px-4 py-4 space-y-1">
          <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Principal
          </div>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
              activeTab === 'dashboard'
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
              activeTab === 'services'
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <Package className="w-5 h-5" />
            <span>Serviços</span>
            <span className="ml-auto text-xs bg-slate-800 px-2 py-1 rounded-full text-slate-400">
              {stats.totalServices}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('therapists')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
              activeTab === 'therapists'
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <UserCircle className="w-5 h-5" />
            <span>Massagistas</span>
            <span className="ml-auto text-xs bg-slate-800 px-2 py-1 rounded-full text-slate-400">
              {stats.totalTherapists}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
              activeTab === 'clients'
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <Users className="w-5 h-5" />
            <span>Clientes</span>
            <span className="ml-auto text-xs bg-slate-800 px-2 py-1 rounded-full text-slate-400">
              {stats.totalClients}
            </span>
          </button>

          <div className="px-4 py-2 mt-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Conteúdo
          </div>
          <button
            onClick={() => setActiveTab('content')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
              activeTab === 'content'
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <FileText className="w-5 h-5" />
            <span>Editar Páginas</span>
          </button>

          <div className="px-4 py-2 mt-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Gestão
          </div>
          <button
            onClick={() => setActiveTab('locations')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
              activeTab === 'locations'
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <MapPin className="w-5 h-5" />
            <span>Locais</span>
            <span className="ml-auto text-xs bg-slate-800 px-2 py-1 rounded-full text-slate-400">
              {stats.totalLocations}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
              activeTab === 'contacts'
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <Phone className="w-5 h-5" />
            Contactos
          </button>

          <div className="px-4 py-2 mt-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Configurações
          </div>
          <button
            onClick={() => setActiveTab('settings')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
              activeTab === 'settings'
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <Settings className="w-5 h-5" />
            <span>Configurações</span>
          </button>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-400 mb-1">Sessão iniciada como</p>
            <p className="text-sm font-medium text-white truncate">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            Terminar Sessão
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">
              {activeTab === 'services' && 'Gestão de Serviços'}
              {activeTab === 'therapists' && 'Gestão de Massagistas'}
              {activeTab === 'clients' && 'Base de Clientes'}
              {activeTab === 'contacts' && 'Contactos e Redes Sociais'}
              {activeTab === 'locations' && 'Locais e Endereços'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {activeTab === 'services' && (
              <button
                onClick={() => router.push('/admin/services/new')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/25"
              >
                <Plus className="w-5 h-5" />
                Novo Serviço
              </button>
            )}
            {activeTab === 'therapists' && (
              <button
                onClick={() => router.push('/admin/therapists/new')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/25"
              >
                <Plus className="w-5 h-5" />
                Nova Massagista
              </button>
            )}
            {activeTab === 'clients' && (
              <button
                onClick={() => router.push('/admin/clients/new')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/25"
              >
                <Plus className="w-5 h-5" />
                Novo Cliente
              </button>
            )}
            {activeTab === 'locations' && (
              <button
                onClick={() => router.push('/admin/locations/new')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/25"
              >
                <Plus className="w-5 h-5" />
                Novo Local
              </button>
            )}
          </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-500/20 rounded-lg">
                        <Package className="w-6 h-6 text-purple-400" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{stats.totalServices}</h3>
                    <p className="text-slate-400 text-sm">Total de Serviços</p>
                    <p className="text-green-400 text-xs mt-2">{stats.activeServices} ativos</p>
                  </div>

                  <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-pink-500/20 rounded-lg">
                        <UserCircle className="w-6 h-6 text-pink-400" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{stats.totalTherapists}</h3>
                    <p className="text-slate-400 text-sm">Massagistas</p>
                    <p className="text-green-400 text-xs mt-2">Todos verificados</p>
                  </div>

                  <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-500/20 rounded-lg">
                        <Users className="w-6 h-6 text-blue-400" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{stats.totalClients}</h3>
                    <p className="text-slate-400 text-sm">Clientes</p>
                    <p className="text-green-400 text-xs mt-2">+12% este mês</p>
                  </div>

                  <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-amber-500/20 rounded-lg">
                        <MapPin className="w-6 h-6 text-amber-400" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{stats.totalLocations}</h3>
                    <p className="text-slate-400 text-sm">Localizações</p>
                    <p className="text-green-400 text-xs mt-2">Todas ativas</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setActiveTab('content')}
                      className="p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all text-left"
                    >
                      <FileText className="w-6 h-6 text-purple-400 mb-2" />
                      <h4 className="font-semibold text-white">Editar Conteúdo</h4>
                      <p className="text-slate-400 text-sm">Modifique textos e imagens do site</p>
                    </button>
                    <button
                      onClick={() => setActiveTab('services')}
                      className="p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all text-left"
                    >
                      <Package className="w-6 h-6 text-pink-400 mb-2" />
                      <h4 className="font-semibold text-white">Gerenciar Serviços</h4>
                      <p className="text-slate-400 text-sm">Adicione ou edite serviços</p>
                    </button>
                    <button
                      onClick={() => setActiveTab('therapists')}
                      className="p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all text-left"
                    >
                      <UserCircle className="w-6 h-6 text-blue-400 mb-2" />
                      <h4 className="font-semibold text-white">Gerenciar Massagistas</h4>
                      <p className="text-slate-400 text-sm">Gerencie o time de profissionais</p>
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Atividade Recente</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-slate-300">Sistema online e funcionando</span>
                      <span className="text-slate-500 text-sm ml-auto">Agora</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-slate-300">Novos favoritos compartilhados</span>
                      <span className="text-slate-500 text-sm ml-auto">Há 5 min</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-slate-300">Backup automático concluído</span>
                      <span className="text-slate-500 text-sm ml-auto">Há 1 hora</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'content' && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ContentEditor page="home" section="main" />
              </motion.div>
            )}

            {activeTab === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ServiceManager onServiceUpdate={setServices} />
              </motion.div>
            )}

            {activeTab === 'therapists' && (
              <motion.div
                key="therapists"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <TherapistManager onTherapistUpdate={setTherapists} />
              </motion.div>
            )}

            {activeTab === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Search */}
                <div className="relative max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar serviços..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Services grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredServices.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-purple-500/30 transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative h-48 bg-slate-800 overflow-hidden">
                        {service.image_url ? (
                          <img
                            src={service.image_url}
                            alt={service.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-12 h-12 text-slate-600" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                        
                        {/* Status badge */}
                        <div className={cn(
                          "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium",
                          service.is_active
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        )}>
                          {service.is_active ? 'Ativo' : 'Inativo'}
                        </div>

                        {/* Video/GIF indicator */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          {service.video_url && (
                            <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
                              <Video className="w-4 h-4 text-purple-400" />
                            </div>
                          )}
                          {service.gif_url && (
                            <div className="p-2 rounded-lg bg-pink-500/20 border border-pink-500/30">
                              <ImageIcon className="w-4 h-4 text-pink-400" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-white text-lg">{service.name}</h3>
                          <span className="text-purple-400 font-bold">
                            {formatCurrency(service.price)}
                          </span>
                        </div>
                        
                        <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                          {service.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatDuration(service.duration)}
                          </span>
                          <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-400 capitalize">
                            {service.category === 'massage' ? 'Massagem' : 'Terapia'}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => router.push(`/admin/services/edit/${service.id}`)}
                            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                            Editar
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
                            {service.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                      <Search className="w-10 h-10 text-slate-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {searchQuery ? 'Nenhum serviço encontrado' : 'Ainda sem serviços'}
                    </h3>
                    <p className="text-slate-400 mb-6">
                      {searchQuery 
                        ? 'Tente ajustar os termos da pesquisa'
                        : 'Comece por adicionar o seu primeiro serviço'
                      }
                    </p>
                    {!searchQuery && (
                      <button
                        onClick={() => router.push('/admin/services/new')}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all"
                      >
                        Adicionar Serviço
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'contacts' && contactInfo && (
              <ContactsEditor 
                contactInfo={contactInfo} 
                onUpdate={setContactInfo}
              />
            )}

            {activeTab === 'therapists' && (
              <TherapistsEditor
                therapists={therapists}
                onUpdate={setTherapists}
                router={router}
              />
            )}

            {activeTab === 'clients' && (
              <ClientsEditor
                clients={clients}
                onUpdate={setClients}
                router={router}
              />
            )}

            {activeTab === 'locations' && (
              <LocationsEditor 
                locations={locations}
                onUpdate={setLocations}
                router={router}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

// Contacts Editor Component
function ContactsEditor({ contactInfo, onUpdate }: { contactInfo: ContactInfo; onUpdate: (c: ContactInfo) => void }) {
  const [formData, setFormData] = useState(contactInfo)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase
      .from('contact_info')
      .update({
        ...formData,
        updated_at: new Date().toISOString()
      })
      .eq('id', formData.id)

    if (!error) {
      onUpdate(formData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }

    setSaving(false)
  }

  const handleChange = (field: keyof ContactInfo, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const socialFields = [
    { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, placeholder: '+351 912 345 678' },
    { key: 'instagram', label: 'Instagram', icon: Globe, placeholder: '@deliriospa' },
    { key: 'facebook', label: 'Facebook', icon: Share2, placeholder: 'facebook.com/deliriospa' },
    { key: 'twitter', label: 'Twitter/X', icon: MessageCircle, placeholder: '@deliriospa' },
    { key: 'email', label: 'Email', icon: Mail, placeholder: 'info@deliriospa.pt' },
    { key: 'phone', label: 'Telefone', icon: Phone, placeholder: '+351 210 123 456' },
  ]

  return (
    <motion.div
      key="contacts"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {/* Social Media & Contact */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Phone className="w-5 h-5 text-purple-400" />
            Contactos e Redes Sociais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {socialFields.map(({ key, label, icon: Icon, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {label}
                </label>
                <div className="relative">
                  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    value={formData[key as keyof ContactInfo] as string}
                    onChange={(e) => handleChange(key as keyof ContactInfo, e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-400" />
            Morada Principal
          </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Endereço
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Rua Exemplo, 123, 4º Esq."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Cidade
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  placeholder="Lisboa"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  País
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  placeholder="Portugal"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Link Google Maps
                </label>
                <input
                  type="url"
                  value={formData.google_maps_url}
                  onChange={(e) => handleChange('google_maps_url', e.target.value)}
                  placeholder="https://maps.google.com/..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-end gap-4">
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-green-400 font-medium"
            >
              Alterações guardadas com sucesso!
            </motion.span>
          )}
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50"
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
      </form>
    </motion.div>
  )
}

// Locations Editor Component
function LocationsEditor({ locations, onUpdate, router }: { locations: Location[]; onUpdate: (l: Location[]) => void; router: any }) {
  const toggleLocationStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('locations')
      .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (!error) {
      onUpdate(locations.map(l => l.id === id ? { ...l, is_active: !currentStatus } : l))
    }
  }

  const deleteLocation = async (id: string) => {
    if (!confirm('Tem certeza que deseja eliminar este local?')) return
    const { error } = await supabase.from('locations').delete().eq('id', id)
    if (!error) {
      onUpdate(locations.filter(l => l.id !== id))
    }
  }

  return (
    <motion.div
      key="locations"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {locations.map((location) => (
        <div
          key={location.id}
          className="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-purple-500/30 transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{location.name}</h3>
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  location.is_active
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                )}>
                  {location.is_active ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/admin/locations/edit/${location.id}`)}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleLocationStatus(location.id, location.is_active)}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  location.is_active
                    ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                    : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                )}
              >
                {location.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={() => deleteLocation(location.id)}
                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-slate-400 text-sm mb-2">{location.address}</p>
          <p className="text-slate-500 text-sm">{location.city}</p>
          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
            <p className="text-sm text-slate-400 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {location.phone}
            </p>
            <span className="text-xs text-slate-500">Ordem: {location.order_index}</span>
          </div>
        </div>
      ))}
      {locations.length === 0 && (
        <div className="col-span-2 text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-800 flex items-center justify-center">
            <MapPin className="w-10 h-10 text-slate-600" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Ainda sem locais</h3>
          <p className="text-slate-400 mb-6">Adicione o primeiro local do seu spa</p>
          <button
            onClick={() => router.push('/admin/locations/new')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all"
          >
            Adicionar Local
          </button>
        </div>
      )}
    </motion.div>
  )
}

// Therapists Editor Component
function TherapistsEditor({ therapists, onUpdate, router }: { therapists: Therapist[]; onUpdate: (t: Therapist[]) => void; router: any }) {
  const toggleTherapistStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('therapists')
      .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (!error) {
      onUpdate(therapists.map(t => t.id === id ? { ...t, is_active: !currentStatus } : t))
    }
  }

  const deleteTherapist = async (id: string) => {
    if (!confirm('Tem certeza que deseja eliminar esta massagista?')) return
    const { error } = await supabase.from('therapists').delete().eq('id', id)
    if (!error) {
      onUpdate(therapists.filter(t => t.id !== id))
    }
  }

  return (
    <motion.div
      key="therapists"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {therapists.map((therapist) => (
        <div
          key={therapist.id}
          className="group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-purple-500/30 transition-all"
        >
          <div className="relative h-48 bg-slate-800 overflow-hidden">
            {therapist.image_url ? (
              <img
                src={therapist.image_url}
                alt={therapist.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <UserCircle className="w-20 h-20 text-slate-600" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            <div className={cn(
              "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium",
              therapist.is_active
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            )}>
              {therapist.is_active ? 'Ativa' : 'Inativa'}
            </div>
            <div className="absolute top-4 left-4">
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                therapist.gender === 'female' 
                  ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
                  : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              )}>
                {therapist.gender === 'female' ? 'Feminino' : 'Masculino'}
              </span>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-white text-lg mb-2">{therapist.name}</h3>
            <p className="text-slate-400 text-sm line-clamp-2 mb-4">{therapist.bio}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {therapist.services.slice(0, 3).map((service, idx) => (
                <span key={idx} className="text-xs px-2 py-1 rounded-lg bg-slate-800 text-slate-400">
                  {service}
                </span>
              ))}
              {therapist.services.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-lg bg-slate-800 text-slate-400">
                  +{therapist.services.length - 3}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push(`/admin/therapists/edit/${therapist.id}`)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
              >
                <Edit2 className="w-4 h-4" />
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
                {therapist.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={() => deleteTherapist(therapist.id)}
                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
      {therapists.length === 0 && (
        <div className="col-span-full text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-800 flex items-center justify-center">
            <UserCircle className="w-10 h-10 text-slate-600" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Ainda sem massagistas</h3>
          <p className="text-slate-400 mb-6">Adicione a primeira massagista ao seu spa</p>
          <button
            onClick={() => router.push('/admin/therapists/new')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all"
          >
            Adicionar Massagista
          </button>
        </div>
      )}
    </motion.div>
  )
}

// Clients Editor Component
function ClientsEditor({ clients, onUpdate, router }: { clients: Client[]; onUpdate: (c: Client[]) => void; router: any }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'vip'>('all')

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.phone.includes(searchQuery)
    const matchesFilter = filter === 'all' || (filter === 'vip' && client.is_vip)
    return matchesSearch && matchesFilter
  })

  const toggleVIPStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('clients')
      .update({ is_vip: !currentStatus, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (!error) {
      onUpdate(clients.map(c => c.id === id ? { ...c, is_vip: !currentStatus } : c))
    }
  }

  const deleteClient = async (id: string) => {
    if (!confirm('Tem certeza que deseja eliminar este cliente?')) return
    const { error } = await supabase.from('clients').delete().eq('id', id)
    if (!error) {
      onUpdate(clients.filter(c => c.id !== id))
    }
  }

  return (
    <motion.div
      key="clients"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar clientes..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              "px-4 py-2 rounded-xl transition-all",
              filter === 'all'
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                : "bg-slate-900 text-slate-400 border border-slate-800"
            )}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('vip')}
            className={cn(
              "px-4 py-2 rounded-xl transition-all flex items-center gap-2",
              filter === 'vip'
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "bg-slate-900 text-slate-400 border border-slate-800"
            )}
          >
            <Star className="w-4 h-4" />
            VIP
          </button>
        </div>
      </div>

      {/* Clients List */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-800">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Cliente</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Contacto</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Preferências</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-slate-400">Status</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-400">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                        <UserCircle className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{client.name}</p>
                        <p className="text-sm text-slate-400">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-slate-400 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {client.phone}
                      </p>
                      {client.whatsapp && (
                        <p className="text-sm text-green-400 flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-400 line-clamp-2">{client.preferences || 'Nenhuma'}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleVIPStatus(client.id, client.is_vip)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium transition-all",
                        client.is_vip
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-slate-800 text-slate-400"
                      )}
                    >
                      {client.is_vip ? 'VIP' : 'Regular'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => router.push(`/admin/clients/edit/${client.id}`)}
                        className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteClient(client.id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto mb-4 text-slate-600" />
            <p className="text-slate-400">Nenhum cliente encontrado</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
