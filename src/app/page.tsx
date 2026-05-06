'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Sparkles,
  Droplets,
  Flame,
  Heart,
  Users,
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  Star,
  Shield,
  Gem,
  Menu,
  X,
  ChevronDown,
  MessageCircle,
  Share2,
  Mail,
  Loader2,
  Scale
} from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { supabase, Therapist, Location, Service } from '@/lib/supabase'
import { sensualImages, getRandomTherapistImage } from '@/lib/sensualAssets'
import Hero3D from '@/components/Hero3D'
import ServiceCard from '@/components/ServiceCard'
import TherapistCard from '@/components/TherapistCard'
import LocationCard from '@/components/LocationCard'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import TherapistModal from '@/components/TherapistModal'
import SensualHero from '@/components/SensualHero'
import ModelGallery from '@/components/ModelGallery'
import ModelProfile from '@/components/ModelProfile'
import VirtualTour360 from '@/components/VirtualTour360'
import RecentActivity from '@/components/RecentActivity'
import SensualFAQ from '@/components/SensualFAQ'
import GuaranteeBadge from '@/components/GuaranteeBadge'
import FloatingChat from '@/components/FloatingChat'
import AvailabilityCalendar from '@/components/AvailabilityCalendar'
import VideoTestimonials from '@/components/VideoTestimonials'
import LoyaltyProgram from '@/components/LoyaltyProgram'
import ReferralProgram from '@/components/ReferralProgram'
import ExitIntentPopup from '@/components/ExitIntentPopup'
import AgeVerification from '@/components/AgeVerification'
import GiftCards from '@/components/GiftCards'
import CorporateBookings from '@/components/CorporateBookings'
import Newsletter from '@/components/Newsletter'
import ConfettiCelebration, { SuccessModal } from '@/components/ConfettiCelebration'
import ReadingProgress from '@/components/ReadingProgress'
import { ToastProvider } from '@/components/Toast'
import BackToTop from '@/components/BackToTop'
import SearchModal from '@/components/SearchModal'
import Breadcrumb from '@/components/Breadcrumb'
import { SkeletonGrid, SkeletonCard, SkeletonHero } from '@/components/Skeleton'
import CustomCursor from '@/components/CustomCursor'
import ParallaxSection from '@/components/ParallaxSection'
import QuickActions, { QuickStats } from '@/components/QuickActions'
import SmartBooking from '@/components/SmartBooking'
import LastMinuteDeals from '@/components/LastMinuteDeals'
import TherapistAvailability from '@/components/TherapistAvailability'
import PriceCalculator from '@/components/PriceCalculator'
import LiveNotifications, { LiveNotificationsMobile } from '@/components/LiveNotifications'
import InteractiveFAQ from '@/components/InteractiveFAQ'
import RealTimeAvailability from '@/components/RealTimeAvailability'
import SmartRecommendation from '@/components/SmartRecommendation'
import BookingStats from '@/components/BookingStats'
import HowItWorks from '@/components/HowItWorks'
import TrustBadges from '@/components/TrustBadges'
import TestimonialHighlight from '@/components/TestimonialHighlight'
import PremiumExperience from '@/components/PremiumExperience'
import PremiumShowcase from '@/components/PremiumShowcase'
import VisualEffectsShowcase from '@/components/VisualEffectsShowcase'

// NOVOS COMPONENTES PREMIUM - Diferenciadores visuais
import AuroraBackground from '@/components/AuroraBackground'
import SpotlightCard from '@/components/SpotlightCard'
import MagneticButton from '@/components/MagneticButton'
import LiquidButton from '@/components/LiquidButton'
import TextGradient from '@/components/TextGradient'
import FloatingElements from '@/components/FloatingElements'
import ParallaxTilt from '@/components/ParallaxTilt'
import KineticText from '@/components/KineticText'
import NoiseTexture from '@/components/NoiseTexture'
import GlowButton from '@/components/GlowButton'
import MorphingCard from '@/components/MorphingCard'
import ParticleField from '@/components/ParticleField'
import WarpBackground from '@/components/WarpBackground'

// NOVOS COMPONENTES ÚTEIS - Funcionalidades premium
import { useFavorites, FavoritesButton, FavoritesPanel, FavoriteButton, FavoritesButtonWithCount } from '@/components/FavoritesSystem'
import QuickViewModal from '@/components/QuickViewModal'
import { useCompare, CompareButton, ComparePanel, CompareButtonWithCount } from '@/components/ComparePanel'

// COMPONENTES DA BARRA SUPERIOR - Preços e Favoritos de Serviços
import { ServiceFavoritesButton } from '@/components/ServiceFavoritesButton'
import { PriceTableButton } from '@/components/PriceTableButton'

// COMPONENTE DE COMPARAÇÃO DE SERVIÇOS
import ServiceComparison from '@/components/ServiceComparison'
import { ServiceComparisonButton } from '@/components/ServiceComparisonButton'

// NOVOS COMPONENTES COMPLETOS - Dados reais
import ServicesShowcase from '@/components/ServicesShowcase'
import TherapistsGallery from '@/components/TherapistsGallery'
import PricingTable from '@/components/PricingTable'
import LocationsMap from '@/components/LocationsMap'
import PackagesShowcase from '@/components/PackagesShowcase'
import AboutSection from '@/components/AboutSection'
import RulesSection from '@/components/RulesSection'
import TopicSidebar from '@/components/TopicSidebar'
import { HeroSlider, TherapistAIGrid, LocationSlider } from '@/components/AIGallery'

// MASSAGENS COMPLETAS - Sensuais + Terapêuticas + Desportivas
const massageServices = [
  {
    id: 'tantric',
    name: 'Massagem Tântrica',
    description: 'Ritual erótico de sedução. A massagista utiliza técnicas milenares para despertar sua energia sexual através de toques provocantes no corpo inteiro. Uma jornada de prazer intenso.',
    price: 150,
    duration: 90,
    icon: Flame,
    color: 'from-red-600 to-rose-700',
  },
  {
    id: 'body-to-body',
    name: 'Massagem Body to Body',
    description: 'A massagista nua desliza seu corpo sensual sobre o seu. Contato pele com pele, curvas quentes e movimentos provocantes que levam ao delírio. Experiência completa de prazer.',
    price: 180,
    duration: 60,
    icon: Heart,
    color: 'from-red-700 to-rose-600',
  },
  {
    id: 'lingam',
    name: 'Massagem Lingam',
    description: 'Prazer masculino em sua forma mais intensa. Toques exclusivos na região íntima com técnicas que prolongam o prazer e levam a um orgasmo inesquecível.',
    price: 140,
    duration: 75,
    icon: Droplets,
    color: 'from-rose-600 to-red-800',
  },
  {
    id: 'yoni',
    name: 'Massagem Yoni',
    description: 'Dedicação total ao prazer feminino. Massagem íntima que explora cada ponto de prazer, levando a múltiplas ondas de êxtase e satisfação completa.',
    price: 140,
    duration: 75,
    icon: Sparkles,
    color: 'from-red-500 to-pink-700',
  },
  {
    id: 'relaxation',
    name: 'Massagem de Relaxamento Sensual',
    description: 'Toques provocantes por todo o corpo, terminando em áreas especiais. Relaxamento que se transforma em intenso prazer sexual com final feliz garantido.',
    price: 120,
    duration: 60,
    icon: Shield,
    color: 'from-red-600 to-orange-700',
  },
  {
    id: 'couples',
    name: 'Massagem para Casais',
    description: 'Experiência a três: você, seu parceiro e nossa massagista. Toques simultâneos, troca de carícias e prazer compartilhado em uma sessão intensa e sem limites.',
    price: 280,
    duration: 90,
    icon: Users,
    color: 'from-red-700 to-rose-500',
  },
  {
    id: 'nuru',
    name: 'Massagem Nuru',
    description: 'Gel transparente, corpos escorregadios e deslizantes. A massagista usa cada centímetro do corpo para provocar, deslizando entre suas pernas e levando ao delírio.',
    price: 200,
    duration: 60,
    icon: Droplets,
    color: 'from-red-600 to-rose-800',
  },
  {
    id: 'sensual',
    name: 'Massagem Sensual Premium',
    description: 'O ápice do prazer. Combinação de técnicas eróticas com toques exclusivos nas zonas mais sensíveis. Uma experiência que vai do relaxamento ao êxtase absoluto.',
    price: 220,
    duration: 90,
    icon: Heart,
    color: 'from-rose-700 to-red-900',
  },
]

// MASSAGENS TERAPÊUTICAS
const therapeuticServices = [
  {
    id: 'therapeutic-relax',
    name: 'Massagem Terapêutica Relaxante',
    description: 'Movimentos firmes e suaves que aliviam tensões musculares e promovem relaxamento profundo. Ideal para quem sofre de stress e dores de cabeça.',
    price: 95,
    duration: 60,
    icon: Shield,
    color: 'from-emerald-600 to-teal-700',
  },
  {
    id: 'anti-stress',
    name: 'Massagem Anti-Stress',
    description: 'Técnicas específicas para reduzir o stress acumulado. Pressões suaves e aromaterapia para acalmar mente e corpo. Sessão de puro relaxamento.',
    price: 110,
    duration: 75,
    icon: Sparkles,
    color: 'from-teal-600 to-cyan-700',
  },
  {
    id: 'pain-relief',
    name: 'Massagem Alívio de Dores',
    description: 'Focada em áreas com dores crónicas: costas, ombros e pescoço. Pressões mais intensas para descontrair musculatura tensa.',
    price: 100,
    duration: 60,
    icon: Heart,
    color: 'from-cyan-600 to-blue-700',
  },
  {
    id: 'lymphatic',
    name: 'Drenagem Linfática',
    description: 'Movimentos suaves e rítmicos que estimulam o sistema linfático. Reduz inchaço, melhora circulação e detoxifica o organismo.',
    price: 120,
    duration: 90,
    icon: Droplets,
    color: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'reflexology',
    name: 'Reflexologia Podal',
    description: 'Estimulação de pontos reflexos nos pés que correspondem a órgãos e sistemas do corpo. Promove equilíbrio e bem-estar geral.',
    price: 85,
    duration: 45,
    icon: Users,
    color: 'from-indigo-600 to-purple-700',
  },
]

// MASSAGENS DESPORTIVAS
const sportsServices = [
  {
    id: 'sports-deep',
    name: 'Massagem Desportiva Profunda',
    description: 'Para atletas e praticantes de exercício. Pressões intensas aliviam dores musculares, prevenem lesões e aceleram recuperação pós-treino.',
    price: 115,
    duration: 60,
    icon: Flame,
    color: 'from-amber-600 to-orange-700',
  },
  {
    id: 'post-workout',
    name: 'Massagem Pós-Treino',
    description: 'Indicada após atividade física intensa. Alivia fadiga muscular, reduz cãibras e melhora flexibilidade. Sessão revitalizante.',
    price: 95,
    duration: 45,
    icon: Sparkles,
    color: 'from-orange-600 to-red-700',
  },
  {
    id: 'sports-recovery',
    name: 'Recuperação Muscular',
    description: 'Técnicas específicas para recuperação de lesões e sobrecargas. Mobilizações suaves combinadas com pressões terapêuticas.',
    price: 125,
    duration: 75,
    icon: Shield,
    color: 'from-red-600 to-rose-700',
  },
  {
    id: 'shiatsu',
    name: 'Shiatsu Terapêutico',
    description: 'Massagem japonesa com pressões nos pontos de acupuntura. Alivia tensões, dores e melhora a energia vital (Qi).',
    price: 105,
    duration: 60,
    icon: Users,
    color: 'from-rose-600 to-pink-700',
  },
]

// MASSAGENS SENSUAIS ESPECIAIS
const extraSensualServices = [
  {
    id: 'four-hands',
    name: 'Massagem Quatro Mãos',
    description: 'Duas massagistas simultâneas dedicadas ao seu prazer. Toques sincronizados que cobrem todo seu corpo em uma experiência duplamente intensa.',
    price: 300,
    duration: 60,
    icon: Users,
    color: 'from-red-800 to-rose-700',
  },
  {
    id: 'mutual',
    name: 'Massagem Mútua',
    description: 'Você também pode tocar. Troca de carícias onde a massagista guia suas mãos para explorar seu corpo e o dela. Interação sem limites.',
    price: 250,
    duration: 75,
    icon: Heart,
    color: 'from-rose-700 to-red-900',
  },
  {
    id: 'vip',
    name: 'Massagem VIP Exclusiva',
    description: 'Experiência premium com duas massagistas, champanhe, óleos importados e finalização especial. O luxo do prazer absoluto.',
    price: 500,
    duration: 120,
    icon: Sparkles,
    color: 'from-red-900 to-rose-800',
  },
  {
    id: 'shower',
    name: 'Massagem no Chuveiro',
    description: 'Água quente, espuma e corpos molhados deslizantes. A massagista lava cada parte do seu corpo antes da sessão principal.',
    price: 180,
    duration: 45,
    icon: Droplets,
    color: 'from-rose-600 to-red-700',
  },
  {
    id: 'domination',
    name: 'Massagem com Dominacao Suave',
    description: 'Para quem gosta de se entregar. A massagista assume o controle, amarras suaves, vendas e toques provocantes no limite do prazer.',
    price: 220,
    duration: 90,
    icon: Flame,
    color: 'from-red-700 to-rose-900',
  },
]

// Fallback services data (simplified to avoid TypeScript errors)
const fallbackServices = [
  { id: '1', name: 'Massagem Tântrica', description: 'Uma massagem erótica que redistribui as energias sexuais do corpo.', price: 150, category: 'massage', duration: 90, color: 'from-orange-500 to-red-600' },
  { id: '2', name: 'Massagem Body to Body', description: 'Massagem sensual de corpo inteiro.', price: 180, category: 'massage', duration: 60, color: 'from-pink-500 to-rose-600' },
  { id: '3', name: 'Massagem Lingam', description: 'Uma ode ao sexo masculino.', price: 140, category: 'massage', duration: 75, color: 'from-blue-500 to-cyan-600' },
  { id: '4', name: 'Massagem Yoni', description: 'Destinada a senhoras.', price: 140, category: 'massage', duration: 75, color: 'from-purple-500 to-violet-600' },
  { id: '5', name: 'Massagem de Relaxamento', description: 'Relaxamento muscular completo.', price: 100, category: 'massage', duration: 60, color: 'from-green-500 to-emerald-600' },
  { id: '6', name: 'Massagem para Casais', description: 'Experiência a dois.', price: 280, category: 'massage', duration: 90, color: 'from-fuchsia-500 to-pink-600' },
  { id: '7', name: 'Massagem Nuru', description: 'Com gel Nuru.', price: 200, category: 'massage', duration: 75, color: 'from-teal-500 to-cyan-600' },
  { id: '8', name: 'Massagem Desportiva', description: 'Para atletas.', price: 110, category: 'massage', duration: 60, color: 'from-amber-500 to-orange-600' },
] as any

// Fallback data with real model photos (using Unsplash for demo)
const fallbackTherapists = [
  { 
    id: '1', 
    name: 'Sofia', 
    gender: 'female' as const, 
    location: 'Lisboa', 
    specialty: 'Tântrica', 
    bio: 'Especialista em massagens tântricas com 5 anos de experiência. Sofía combina técnicas ancestrais com um toque sensual único que transporta para outra dimensão de prazer.', 
    image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop', 
    is_active: true, 
    services: ['Massagem Tântrica', 'Massagem Body to Body', 'Massagem Nuru'], 
    order_index: 0, 
    experience_years: 5,
    created_at: '', 
    updated_at: '' 
  },
  { 
    id: '2', 
    name: 'Marco', 
    gender: 'male' as const, 
    location: 'Lisboa', 
    specialty: 'Body to Body', 
    bio: 'Massagista profissional especializado em terapias de relaxamento profundo. Marco tem mãos mágicas que encontram todos os pontos de tensão.', 
    image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop', 
    is_active: true, 
    services: ['Massagem Body to Body', 'Massagem Lingam', 'Massagem Desportiva'], 
    order_index: 1, 
    experience_years: 4,
    created_at: '', 
    updated_at: '' 
  },
  { 
    id: '3', 
    name: 'Ana', 
    gender: 'female' as const, 
    location: 'Porto', 
    specialty: 'Yoni', 
    bio: 'Terapeuta especializada em massagens femininas. Ana cria um ambiente seguro e acolhedor para mulheres explorarem seu prazer.', 
    image_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop', 
    is_active: true, 
    services: ['Massagem Yoni', 'Massagem Tântrica', 'Terapia Holística'], 
    order_index: 2, 
    experience_years: 6,
    created_at: '', 
    updated_at: '' 
  },
  { 
    id: '4', 
    name: 'Pedro', 
    gender: 'male' as const, 
    location: 'Porto', 
    specialty: 'Lingam', 
    bio: 'Especialista em massagens masculinas. Pedro domina técnicas milenares para o autoconhecimento e prazer masculino.', 
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop', 
    is_active: true, 
    services: ['Massagem Lingam', 'Massagem Nuru', 'Shiatsu'], 
    order_index: 3, 
    experience_years: 3,
    created_at: '', 
    updated_at: '' 
  },
  { 
    id: '5', 
    name: 'Isabela', 
    gender: 'female' as const, 
    location: 'Algarve', 
    specialty: 'Relaxamento', 
    bio: 'Expert em técnicas de relaxamento profundo. Isabela é conhecida por suas mãos de seda e toque inconfundível.', 
    image_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop', 
    is_active: true, 
    services: ['Massagem Relaxante', 'Massagem para Casais', 'Reflexologia'], 
    order_index: 4, 
    experience_years: 7,
    created_at: '', 
    updated_at: '' 
  },
  { 
    id: '6', 
    name: 'Lucas', 
    gender: 'male' as const, 
    location: 'Leiria', 
    specialty: 'Casais', 
    bio: 'Especialista em massagens para casais. Lucas ajuda casais a reconectarem-se através do toque.', 
    image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop', 
    is_active: true, 
    services: ['Massagem para Casais', 'Massagem Tântrica', 'Reiki'], 
    order_index: 5, 
    experience_years: 5,
    created_at: '', 
    updated_at: '' 
  },
  { 
    id: '7', 
    name: 'Catarina', 
    gender: 'female' as const, 
    location: 'Lisboa', 
    specialty: 'Nuru', 
    bio: 'Especialista em Massagem Nuru. Catarina domina a arte do deslizamento corporal com gel de algas.', 
    image_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop', 
    is_active: true, 
    services: ['Massagem Nuru', 'Massagem Body to Body'], 
    order_index: 6, 
    experience_years: 4,
    created_at: '', 
    updated_at: '' 
  },
  { 
    id: '8', 
    name: 'Rafael', 
    gender: 'male' as const, 
    location: 'Porto', 
    specialty: 'Desportiva', 
    bio: 'Especialista em recuperação muscular e massagem desportiva. Rafael atletas e executivos.', 
    image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop', 
    is_active: true, 
    services: ['Massagem Desportiva', 'Massoterapia', 'Massagem Relaxante'], 
    order_index: 7, 
    experience_years: 8,
    created_at: '', 
    updated_at: '' 
  },
]

const fallbackLocations: Location[] = [
  { id: '1', name: 'DelirioSpa Saldanha', city: 'Lisboa', address: 'Avenida da República, 15', phone: '+351 210 123 456', email: '', map_url: '', working_hours: {}, is_active: true, order_index: 0, created_at: '', updated_at: '', image_url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop' },
  { id: '2', name: 'DelirioSpa Chiado', city: 'Lisboa', address: 'Rua Garrett, 89', phone: '+351 210 123 457', email: '', map_url: '', working_hours: {}, is_active: true, order_index: 1, created_at: '', updated_at: '', image_url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&h=600&fit=crop' },
  { id: '3', name: 'DelirioSpa Trindade', city: 'Porto', address: 'Rua de Cedofeita, 45', phone: '+351 220 123 456', email: '', map_url: '', working_hours: {}, is_active: true, order_index: 2, created_at: '', updated_at: '', image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop' },
  { id: '4', name: 'DelirioSpa Clérigos', city: 'Porto', address: 'Rua dos Clérigos, 23', phone: '+351 220 123 457', email: '', map_url: '', working_hours: {}, is_active: true, order_index: 3, created_at: '', updated_at: '', image_url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&h=600&fit=crop' },
  { id: '5', name: 'DelirioSpa Marina', city: 'Algarve', address: 'Avenida 5 de Outubro, 120', phone: '+351 280 123 456', email: '', map_url: '', working_hours: {}, is_active: true, order_index: 4, created_at: '', updated_at: '', image_url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop' },
  { id: '6', name: 'DelirioSpa Centro', city: 'Leiria', address: 'Rua Herois de Angola, 8', phone: '+351 240 123 456', email: '', map_url: '', working_hours: {}, is_active: true, order_index: 5, created_at: '', updated_at: '', image_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop' },
]

export default function Home() {
  const [activeService, setActiveService] = useState('sensual')
  const [activeSection, setActiveSection] = useState('inicio')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [sidebarMinimized, setSidebarMinimized] = useState(false)
  const [therapists, setTherapists] = useState<Therapist[]>(fallbackTherapists)
  const [locations, setLocations] = useState<Location[]>(fallbackLocations)
  const [services, setServices] = useState<Service[]>(fallbackServices)
  const [loadingTherapists, setLoadingTherapists] = useState(true)
  const [loadingLocations, setLoadingLocations] = useState(true)
  const [loadingServices, setLoadingServices] = useState(true)
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)
  const [isTherapistModalOpen, setIsTherapistModalOpen] = useState(false)
  const [isModelProfileOpen, setIsModelProfileOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  
  // NOVOS: Estados para Favoritos e Comparação
  const [showFavorites, setShowFavorites] = useState(false)
  const [showCompare, setShowCompare] = useState(false)

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowSearch(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Trigger confetti on booking
  const triggerCelebration = () => {
    setShowConfetti(true)
    setShowSuccessModal(true)
    setTimeout(() => {
      setShowConfetti(false)
      setShowSuccessModal(false)
    }, 3000)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from Supabase...')
        
        // Fetch therapists
        const { data: therapistsData, error: therapistsError } = await supabase
          .from('therapists')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true })

        console.log('Therapists fetch result:', { data: therapistsData, error: therapistsError })
        
        if (therapistsError) {
          console.error('Therapists error:', therapistsError)
        } else if (therapistsData && therapistsData.length > 0) {
          console.log('Setting therapists from Supabase:', therapistsData.length, 'items')
          setTherapists(therapistsData)
        } else {
          console.log('No therapists in Supabase, using fallback')
        }
        setLoadingTherapists(false)

        // Fetch locations
        const { data: locationsData, error: locationsError } = await supabase
          .from('locations')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true })

        console.log('Locations fetch result:', { data: locationsData, error: locationsError })
        
        if (locationsError) {
          console.error('Locations error:', locationsError)
        } else if (locationsData && locationsData.length > 0) {
          console.log('Setting locations from Supabase:', locationsData.length, 'items')
          setLocations(locationsData)
        } else {
          console.log('No locations in Supabase, using fallback')
        }
        setLoadingLocations(false)

        // Fetch services
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true })

        console.log('Services fetch result:', { data: servicesData, error: servicesError })
        
        if (servicesError) {
          console.error('Services error:', servicesError)
        } else if (servicesData && servicesData.length > 0) {
          console.log('Setting services from Supabase:', servicesData.length, 'items')
          setServices(servicesData)
        } else {
          console.log('No services in Supabase, using fallback')
        }
        setLoadingServices(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoadingTherapists(false)
        setLoadingLocations(false)
        setLoadingServices(false)
      }
    }

    fetchData()
  }, [])

  return (
    <ToastProvider>
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* TOPIC SIDEBAR - Menu Lateral de Tópicos */}
      <TopicSidebar 
        activeSection={activeSection} 
        onNavigate={(id) => {
          setActiveSection(id)
          // Scroll para a seção
          const element = document.getElementById(id)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          } else if (id === 'inicio') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }}
        onMinimizeChange={setSidebarMinimized}
      />
      
      {/* PREMIUM VISUAL EFFECTS - Diferenciadores */}
      <AuroraBackground />
      <FloatingElements count={12} />
      <NoiseTexture opacity={0.02} />
      
      {/* READING PROGRESS BAR */}
      <ReadingProgress />
      
      {/* CUSTOM CURSOR (Desktop only) */}
      <CustomCursor />
      
      {/* QUICK STATS (Left side) */}
      <QuickStats />
      
      {/* LIVE NOTIFICATIONS - Social proof */}
      <LiveNotifications />
      <LiveNotificationsMobile />
      
      {/* SIMPLIFIED TOP NAVBAR - Apenas Logo e Ações */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 lg:left-80 right-0 z-40 transition-all duration-500',
          scrolled
            ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50 py-3'
            : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                DelirioSpa
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {[
                { name: 'Início', id: 'top' },
                { name: 'Sobre', id: 'sobre' },
                { name: 'Regras', id: 'regras' },
                { name: 'Massagens', id: 'massagens' },
                { name: 'Massagistas', id: 'massagistas' },
                { name: 'Locais', id: 'locais' },
                { name: 'Contactos', id: 'contactos' },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (item.id === 'top') {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      } else {
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
                  </button>
                  {/* Price Table Button - Ao lado de Regras */}
                  {item.name === 'Regras' && <PriceTableButton />}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Favorites Button - Massagistas */}
              <FavoritesButtonWithCount 
                onClick={() => setShowFavorites(true)} 
              />
              
              {/* Compare Button - Massagistas */}
              <CompareButtonWithCount 
                onClick={() => setShowCompare(true)} 
              />
              
              {/* Service Favorites Button */}
              <ServiceFavoritesButton />
              
              {/* Service Comparison Button */}
              <ServiceComparisonButton />
              
              {/* WhatsApp */}
              <a
                href="https://wa.me/351912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:from-green-500 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/25"
                title="WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="hidden xl:inline">WhatsApp</span>
              </a>
              
              {/* Telegram */}
              <a
                href="https://t.me/deliriospa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium hover:from-sky-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/25"
                title="Telegram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036 306.306.02.472-.18 1.898-.962 6.174-1.35 8.244-.168.898-.497 1.198-1.152 1.198-.173 0-.333-.025-.522-.074-.316-.075-.799-.255-1.123-.398-.5-.211-2.25-.968-3.281-1.412-2.084-.899-2.867-1.206-3.212-1.27-.017-.003-.03.007-.03.024 0 .016.03.13.15.306.222.319.557.71.96 1.144 1.08 1.188 2.207 2.735 2.525 3.437.057.126.107.26.107.39 0 .23-.12.447-.333.576-.22.133-.54.171-.872.106-.433-.082-1.695-.738-3.396-1.968-1.204-.874-2.38-1.89-3.234-2.813-.445-.49-.737-.913-.858-1.244-.122-.332-.062-.514.18-.62.178-.074.456-.088.747-.026.28.06 1.168.352 2.623.868 1.227.435 2.19.75 2.876.937.684.186 1.193.26 1.53.22.335-.04.588-.16.755-.357.17-.2.275-.497.32-.895.05-.42.072-1.048.078-1.885.003-.418-.017-.796-.06-1.135a2.22 2.22 0 0 0-.1-.493c-.044-.114-.095-.183-.156-.207-.062-.024-.156-.024-.283.003-.128.027-.29.09-.486.19a7.36 7.36 0 0 0-.665.363c-.426.27-.877.6-1.35.99a.5.5 0 0 1-.355.132.485.485 0 0 1-.312-.1c-.096-.065-.164-.17-.195-.308-.032-.14-.048-.32-.048-.544 0-.302.014-.564.042-.79.028-.223.075-.407.14-.548.066-.142.16-.26.283-.356.124-.095.282-.17.476-.222.618-.16 1.38-.242 2.286-.248.552-.003 1.168.023 1.848.078z"/>
                </svg>
                <span className="hidden xl:inline">Telegram</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: mobileMenuOpen ? 'auto' : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          className="lg:hidden overflow-hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800"
        >
          <div className="px-4 py-4 space-y-4">
            {[
              { name: 'Início', id: 'top' },
              { name: 'Sobre', id: 'sobre' },
              { name: 'Regras', id: 'regras' },
              { name: 'Massagens', id: 'massagens' },
              { name: 'Massagistas', id: 'massagistas' },
              { name: 'Locais', id: 'locais' },
              { name: 'Contactos', id: 'contactos' },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setMobileMenuOpen(false)
                  setTimeout(() => {
                    if (item.id === 'top') {
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    } else {
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }, 100)
                }}
                className="block w-full text-left py-2 text-slate-300 hover:text-white transition-colors"
              >
                {item.name}
              </button>
            ))}
            {/* WhatsApp Mobile */}
            <a
              href="https://wa.me/351912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            
            {/* Telegram Mobile */}
            <a
              href="https://t.me/deliriospa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036 306.306.02.472-.18 1.898-.962 6.174-1.35 8.244-.168.898-.497 1.198-1.152 1.198-.173 0-.333-.025-.522-.074-.316-.075-.799-.255-1.123-.398-.5-.211-2.25-.968-3.281-1.412-2.084-.899-2.867-1.206-3.212-1.27-.017-.003-.03.007-.03.024 0 .016.03.13.15.306.222.319.557.71.96 1.144 1.08 1.188 2.207 2.735 2.525 3.437.057.126.107.26.107.39 0 .23-.12.447-.333.576-.22.133-.54.171-.872.106-.433-.082-1.695-.738-3.396-1.968-1.204-.874-2.38-1.89-3.234-2.813-.445-.49-.737-.913-.858-1.244-.122-.332-.062-.514.18-.62.178-.074.456-.088.747-.026.28.06 1.168.352 2.623.868 1.227.435 2.19.75 2.876.937.684.186 1.193.26 1.53.22.335-.04.588-.16.755-.357.17-.2.275-.497.32-.895.05-.42.072-1.048.078-1.885.003-.418-.017-.796-.06-1.135a2.22 2.22 0 0 0-.1-.493c-.044-.114-.095-.183-.156-.207-.062-.024-.156-.024-.283.003-.128.027-.29.09-.486.19a7.36 7.36 0 0 0-.665.363c-.426.27-.877.6-1.35.99a.5.5 0 0 1-.355.132.485.485 0 0 1-.312-.1c-.096-.065-.164-.17-.195-.308-.032-.14-.048-.32-.048-.544 0-.302.014-.564.042-.79.028-.223.075-.407.14-.548.066-.142.16-.26.283-.356.124-.095.282-.17.476-.222.618-.16 1.38-.242 2.286-.248.552-.003 1.168.023 1.848.078z"/>
              </svg>
              Telegram
            </a>
          </div>
        </motion.div>
      </motion.nav>

      {/* MAIN CONTENT - Com margem para o sidebar (condicional) */}
      <main className={cn(
        'transition-all duration-300',
        sidebarMinimized ? 'lg:ml-0' : 'lg:ml-80'
      )}>
      {/* AI HERO SLIDER - Galeria com transições */}
      <section id="inicio" className="px-4 lg:px-8 pt-8">
        <HeroSlider />
      </section>

      {/* ABOUT SECTION - Quem Somos */}
      <AboutSection />

      {/* RULES SECTION - O que pode/não pode */}
      <RulesSection />

      {/* SERVICES SHOWCASE - New Complete Services Component */}
      <ServicesShowcase />

      {/* PRICING TABLE - Complete Price List */}
      <PricingTable />

      {/* SERVICE COMPARISON - Compare different massages */}
      <ServiceComparison />

      {/* Services Section - PREMIUM */}
      <section id="massagens" className="py-24 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* PROMO Banner - Limited Time */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="relative p-6 rounded-2xl bg-gradient-to-r from-red-600/20 via-rose-600/20 to-red-600/20 border border-red-500/30 overflow-hidden">
              {/* Animated background shine */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
              
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-red-500/20">
                    <Sparkles className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">🔥 PROMOÇÃO EXCLUSIVA HOJE</p>
                    <p className="text-rose-300/80 text-sm">Primeira massagem com 20% OFF + Upgrade VIP grátis</p>
                  </div>
                </div>
                
                {/* Countdown */}
                <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-2 rounded-xl border border-red-500/20">
                  <span className="text-rose-300/60 text-xs">Termina em:</span>
                  <div className="flex gap-1">
                    {['04', '32', '18'].map((num, i) => (
                      <span key={i} className="px-2 py-1 bg-red-600 rounded text-white text-sm font-bold">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              Serviços Premium
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Experiências <span className="text-red-400">Proibidas</span>
            </h2>
            <p className="text-rose-200/60 max-w-2xl mx-auto">
              Cada toque é uma transgressão do prazer. Nossas massagistas dominam o arte 
              de satisfazer todos os seus desejos mais secretos.
            </p>
          </motion.div>

          {/* Service Tabs - All Categories */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap justify-center p-1 rounded-2xl bg-gradient-to-br from-slate-900 to-red-950/30 border border-red-900/30 gap-1">
              <button
                onClick={() => setActiveService('sensual')}
                className={cn(
                  'px-4 py-3 rounded-xl font-medium transition-all text-sm',
                  activeService === 'sensual'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/30'
                    : 'text-rose-200/60 hover:text-rose-100'
                )}
              >
                Sensuais 🔥
              </button>
              <button
                onClick={() => setActiveService('therapeutic')}
                className={cn(
                  'px-4 py-3 rounded-xl font-medium transition-all text-sm',
                  activeService === 'therapeutic'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                    : 'text-emerald-200/60 hover:text-emerald-100'
                )}
              >
                Terapêuticas 🌿
              </button>
              <button
                onClick={() => setActiveService('sports')}
                className={cn(
                  'px-4 py-3 rounded-xl font-medium transition-all text-sm',
                  activeService === 'sports'
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/30'
                    : 'text-amber-200/60 hover:text-amber-100'
                )}
              >
                Desportivas 💪
              </button>
              <button
                onClick={() => setActiveService('special')}
                className={cn(
                  'px-4 py-3 rounded-xl font-medium transition-all text-sm',
                  activeService === 'special'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                    : 'text-purple-200/60 hover:text-purple-100'
                )}
              >
                Especiais ✨
              </button>
            </div>
          </div>

          {/* Services Grid */}
          {loadingServices ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-red-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(() => {
                let services
                switch (activeService) {
                  case 'therapeutic':
                    services = therapeuticServices
                    break
                  case 'sports':
                    services = sportsServices
                    break
                  case 'special':
                    services = extraSensualServices
                    break
                  default:
                    services = massageServices
                }
                // Define popular services
                const popularIds = ['tantric', 'body-to-body', 'four-hands', 'vip', 'sports-deep', 'anti-stress']
                const newIds = ['shower', 'domination']
                
                return services.map((service, index) => (
                  <ServiceCard 
                    key={service.id} 
                    service={service as any} 
                    index={index}
                    isPopular={popularIds.includes(service.id)}
                    isNew={newIds.includes(service.id)}
                  />
                ))
              })()}
            </div>
          )}
        </div>
      </section>

      {/* Features Section - RED THEME with animated background */}
      <section id="features" className="py-24 relative overflow-hidden">
        {/* Animated Background Slideshow */}
        <div className="absolute inset-0">
          <Image
            src={sensualImages.tantricBg.hero2}
            alt="Massagem sensual"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-red-950/30 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-rose-950/20" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Porquê Escolher-nos
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Profissionalismo e{' '}
                <span className="bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
                  Sedução
                </span>
              </h2>
              <p className="text-rose-200/70 mb-8 leading-relaxed">
                Nossas massagistas especializadas oferecem experiências de prazer absoluto 
                em ambiente discreto e luxuoso. Cada toque é calculado para levá-lo ao 
                ápice do desejo e da satisfação completa.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Shield, title: 'Discrição Total', desc: 'Privacidade absoluta e sigilo garantido' },
                  { icon: Star, title: 'Ambiente Erótico', desc: 'Suites intimistas com iluminação sensual' },
                  { icon: Users, title: 'Massagistas Sensuais', desc: 'Profissionais bonitas e experientes' },
                  { icon: MapPin, title: 'Vários Locais', desc: 'Lisboa, Porto, Algarve e Leiria' },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-red-900/30 hover:border-red-500/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600/20 to-rose-600/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-sm text-rose-200/60">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-red-600/20 via-rose-600/20 to-red-600/20 p-1">
                <div className="relative w-full h-full rounded-3xl overflow-hidden">
                  <Image
                    src={sensualImages.tantricBg.massage2}
                    alt="Massagem sensual"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Prazer & Sedução</h3>
                    <p className="text-rose-200/70">Ambiente intimista para experiências inesquecíveis.</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 p-4 rounded-2xl bg-slate-900/90 border border-red-900/30 shadow-xl backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-5 h-5 text-red-400" />
                  <span className="text-white">Até 2h de prazer</span>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 p-4 rounded-2xl bg-slate-900/90 border border-red-900/30 shadow-xl backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-5 h-5 text-rose-400" />
                  <span className="text-white">+50 Massagistas</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Special Services */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Serviços Especiais
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Para tornar a sua experiência ainda mais memorável
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: 'Serviço de Transporte',
                desc: 'Disponibilizamos serviço de transporte personalizado para que a sua experiência seja ainda mais relaxante.',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Sparkles,
                title: 'Miminhos Especiais',
                desc: 'Oferecemos uma taça de Champagne antes da sua massagem e um chazinho com biscoitos depois.',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: Shield,
                title: 'Discrição Máxima',
                desc: 'Privacidade total e absoluta em todas as nossas instalações. Entrada e saída privadas.',
                color: 'from-emerald-500 to-teal-500',
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-purple-500/30 transition-all duration-500"
              >
                <div className={cn(
                  'w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 shadow-lg',
                  service.color
                )}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI MASSAGISTAS GALLERY - Fotos em IA com slider */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium mb-4">
              IA Generated
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nossas <span className="text-rose-400">Especialistas</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Conheça nossas massagistas profissionais. Cada uma especializada em técnicas únicas para seu prazer e relaxamento.
            </p>
          </motion.div>
          <TherapistAIGrid />
        </div>
      </section>

      {/* THERAPISTS GALLERY - Dados completos com filtros */}
      <div id="massagistas">
        <TherapistsGallery />
      </div>

      {/* AVAILABILITY CALENDAR - Real-time slots */}
      <div data-section="calendar" id="calendario">
        <AvailabilityCalendar />
      </div>

      {/* REAL TIME AVAILABILITY - Dynamic status based on current time */}
      <RealTimeAvailability />

      {/* SMART RECOMMENDATION - Quiz to find perfect massage */}
      <SmartRecommendation />

      {/* SERVICE COMPARISON - Compare services side by side */}
      <ServiceComparison />

      {/* PRICE CALCULATOR - Interactive pricing */}
      <PriceCalculator />

      {/* BOOKING STATS - Live statistics */}
      <BookingStats />

      {/* HOW IT WORKS - Process explanation */}
      <HowItWorks />

      {/* TRUST BADGES - Trust indicators */}
      <TrustBadges />

      {/* TESTIMONIAL HIGHLIGHT - Featured review */}
      <TestimonialHighlight />

      {/* PREMIUM EXPERIENCE - Amenities showcase */}
      <PremiumExperience />

      {/* PREMIUM SHOWCASE - Diferenciadores visuais */}
      <PremiumShowcase />

      {/* VISUAL EFFECTS SHOWCASE - Efeitos premium */}
      <VisualEffectsShowcase />

      {/* VIDEO TESTIMONIALS - Social Proof Premium */}
      <VideoTestimonials />

      {/* LAST MINUTE DEALS - Flash offers */}
      <LastMinuteDeals />

      {/* SMART BOOKING - Simplified 4-step booking (Alternative) */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Agendamento Simplificado
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Reserve em <span className="text-red-400">4 Passos</span>
            </h2>
            <p className="text-slate-400">
              Sem complicações. Escolha, confirme e receba a confirmação via WhatsApp ou Telegram.
            </p>
          </motion.div>
          
          <SmartBooking />
        </div>
      </section>

      {/* PACKAGES SHOWCASE - Gift & Experience Packages */}
      <PackagesShowcase />

      {/* LOYALTY PROGRAM - Retention */}
      <LoyaltyProgram />

      {/* REFERRAL PROGRAM - Viral Growth */}
      <ReferralProgram />

      {/* LOCATIONS MAP - New Complete Locations Component */}
      <LocationsMap />

      {/* CONTACT SECTION */}
      <section id="contactos" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Entre em Contacto
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Estamos disponíveis para responder a todas as suas questões e agendar a sua experiência
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                { icon: Phone, label: 'WhatsApp', value: '+351 912 345 678', href: 'https://wa.me/351912345678', color: 'text-green-400', bg: 'bg-green-500/10' },
                { icon: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036 306.306.02.472-.18 1.898-.962 6.174-1.35 8.244-.168.898-.497 1.198-1.152 1.198-.173 0-.333-.025-.522-.074-.316-.075-.799-.255-1.123-.398-.5-.211-2.25-.968-3.281-1.412-2.084-.899-2.867-1.206-3.212-1.27-.017-.003-.03.007-.03.024 0 .016.03.13.15.306.222.319.557.71.96 1.144 1.08 1.188 2.207 2.735 2.525 3.437.057.126.107.26.107.39 0 .23-.12.447-.333.576-.22.133-.54.171-.872.106-.433-.082-1.695-.738-3.396-1.968-1.204-.874-2.38-1.89-3.234-2.813-.445-.49-.737-.913-.858-1.244-.122-.332-.062-.514.18-.62.178-.074.456-.088.747-.026.28.06 1.168.352 2.623.868 1.227.435 2.19.75 2.876.937.684.186 1.193.26 1.53.22.335-.04.588-.16.755-.357.17-.2.275-.497.32-.895.05-.42.072-1.048.078-1.885.003-.418-.017-.796-.06-1.135a2.22 2.22 0 0 0-.1-.493c-.044-.114-.095-.183-.156-.207-.062-.024-.156-.024-.283.003-.128.027-.29.09-.486.19a7.36 7.36 0 0 0-.665.363c-.426.27-.877.6-1.35.99a.5.5 0 0 1-.355.132.485.485 0 0 1-.312-.1c-.096-.065-.164-.17-.195-.308-.032-.14-.048-.32-.048-.544 0-.302.014-.564.042-.79.028-.223.075-.407.14-.548.066-.142.16-.26.283-.356.124-.095.282-.17.476-.222.618-.16 1.38-.242 2.286-.248.552-.003 1.168.023 1.848.078z"/></svg>, label: 'Telegram', value: '@deliriospa', href: 'https://t.me/deliriospa', color: 'text-sky-400', bg: 'bg-sky-500/10' },
                { icon: Phone, label: 'Telefone', value: '+351 210 123 456', href: 'tel:+351210123456', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                { icon: Mail, label: 'Email', value: 'info@deliriospa.pt', href: 'mailto:info@deliriospa.pt', color: 'text-amber-400', bg: 'bg-amber-500/10' },
                { icon: MapPin, label: 'Morada Principal', value: 'Avenida da República, 15, Lisboa', href: '#', color: 'text-purple-400', bg: 'bg-purple-500/10' },
              ].map((contact, index) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  className="flex items-center gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/30 transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                    <contact.icon className="w-7 h-7 text-purple-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">{contact.label}</p>
                    <p className="text-lg font-semibold text-white">{contact.value}</p>
                  </div>
                </a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-slate-900 border border-slate-800"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Redes Sociais</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: MessageCircle, name: 'Instagram', handle: '@deliriospa', color: 'from-purple-500 to-pink-500' },
                  { icon: Share2, name: 'Facebook', handle: 'DelirioSpa', color: 'from-blue-500 to-cyan-500' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="flex items-center gap-3 p-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all"
                  >
                    <div className={cn('w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center', social.color)}>
                      <social.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{social.name}</p>
                      <p className="text-xs text-slate-400">{social.handle}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/20">
                <h4 className="font-semibold text-white mb-2">Horário de Funcionamento</h4>
                <p className="text-slate-400 text-sm">
                  Todos os dias das 10:00 às 22:00<br />
                  Incluindo fins de semana e feriados
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GUARANTEE Section - Conversion Booster */}
      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <GuaranteeBadge />
        </div>
      </section>

      {/* INTERACTIVE FAQ - Advanced with search & categories */}
      <InteractiveFAQ />

      {/* FAQ Section - Objection Handler */}
      <SensualFAQ />

      {/* Recent Activity Popup - FOMO */}
      <RecentActivity />

      {/* Floating Chat Bot */}
      <FloatingChat />

      {/* Footer */}
      <Footer />

      {/* STICKY Booking Bar - WhatsApp & Telegram */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2, type: "spring" }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-t border-red-500/30 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center border-2 border-slate-950">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center border-2 border-slate-950">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036 306.306.02.472-.18 1.898-.962 6.174-1.35 8.244-.168.898-.497 1.198-1.152 1.198-.173 0-.333-.025-.522-.074-.316-.075-.799-.255-1.123-.398-.5-.211-2.25-.968-3.281-1.412-2.084-.899-2.867-1.206-3.212-1.27-.017-.003-.03.007-.03.024 0 .016.03.13.15.306.222.319.557.71.96 1.144 1.08 1.188 2.207 2.735 2.525 3.437.057.126.107.26.107.39 0 .23-.12.447-.333.576-.22.133-.54.171-.872.106-.433-.082-1.695-.738-3.396-1.968-1.204-.874-2.38-1.89-3.234-2.813-.445-.49-.737-.913-.858-1.244-.122-.332-.062-.514.18-.62.178-.074.456-.088.747-.026.28.06 1.168.352 2.623.868 1.227.435 2.19.75 2.876.937.684.186 1.193.26 1.53.22.335-.04.588-.16.755-.357.17-.2.275-.497.32-.895.05-.42.072-1.048.078-1.885.003-.418-.017-.796-.06-1.135a2.22 2.22 0 0 0-.1-.493c-.044-.114-.095-.183-.156-.207-.062-.024-.156-.024-.283.003-.128.027-.29.09-.486.19a7.36 7.36 0 0 0-.665.363c-.426.27-.877.6-1.35.99a.5.5 0 0 1-.355.132.485.485 0 0 1-.312-.1c-.096-.065-.164-.17-.195-.308-.032-.14-.048-.32-.048-.544 0-.302.014-.564.042-.79.028-.223.075-.407.14-.548.066-.142.16-.26.283-.356.124-.095.282-.17.476-.222.618-.16 1.38-.242 2.286-.248.552-.003 1.168.023 1.848.078z"/>
                </svg>
              </div>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-950 z-10"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-semibold text-sm">Atendimento Imediato</p>
              <p className="text-rose-300/60 text-xs">WhatsApp ou Telegram</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* WhatsApp */}
            <a
              href="https://wa.me/351912345678?text=Olá! Quero agendar uma massagem VIP"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 sm:px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:from-green-400 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/30"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="hidden sm:inline">WhatsApp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            
            {/* Telegram */}
            <a
              href="https://t.me/deliriospa"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 sm:px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold hover:from-sky-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/30"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036 306.306.02.472-.18 1.898-.962 6.174-1.35 8.244-.168.898-.497 1.198-1.152 1.198-.173 0-.333-.025-.522-.074-.316-.075-.799-.255-1.123-.398-.5-.211-2.25-.968-3.281-1.412-2.084-.899-2.867-1.206-3.212-1.27-.017-.003-.03.007-.03.024 0 .016.03.13.15.306.222.319.557.71.96 1.144 1.08 1.188 2.207 2.735 2.525 3.437.057.126.107.26.107.39 0 .23-.12.447-.333.576-.22.133-.54.171-.872.106-.433-.082-1.695-.738-3.396-1.968-1.204-.874-2.38-1.89-3.234-2.813-.445-.49-.737-.913-.858-1.244-.122-.332-.062-.514.18-.62.178-.074.456-.088.747-.026.28.06 1.168.352 2.623.868 1.227.435 2.19.75 2.876.937.684.186 1.193.26 1.53.22.335-.04.588-.16.755-.357.17-.2.275-.497.32-.895.05-.42.072-1.048.078-1.885.003-.418-.017-.796-.06-1.135a2.22 2.22 0 0 0-.1-.493c-.044-.114-.095-.183-.156-.207-.062-.024-.156-.024-.283.003-.128.027-.29.09-.486.19a7.36 7.36 0 0 0-.665.363c-.426.27-.877.6-1.35.99a.5.5 0 0 1-.355.132.485.485 0 0 1-.312-.1c-.096-.065-.164-.17-.195-.308-.032-.14-.048-.32-.048-.544 0-.302.014-.564.042-.79.028-.223.075-.407.14-.548.066-.142.16-.26.283-.356.124-.095.282-.17.476-.222.618-.16 1.38-.242 2.286-.248.552-.003 1.168.023 1.848.078z"/>
              </svg>
              <span className="hidden sm:inline">Telegram</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Therapist Detail Modal */}
      <TherapistModal 
        therapist={selectedTherapist}
        isOpen={isTherapistModalOpen}
        onClose={() => setIsTherapistModalOpen(false)}
      />

      {/* Model Profile Modal */}
      <ModelProfile
        therapist={selectedTherapist}
        allTherapists={therapists}
        isOpen={isModelProfileOpen}
        onClose={() => setIsModelProfileOpen(false)}
        onSelectOther={(t) => {
          setSelectedTherapist(t)
          // Keep modal open with new therapist
        }}
      />

      {/* Virtual Tour 360 Modal */}
      <VirtualTour360
        location={selectedLocation}
        isOpen={isVirtualTourOpen}
        onClose={() => setIsVirtualTourOpen(false)}
      />
      
      {/* SEARCH MODAL */}
      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
      
      {/* BREADCRUMB */}
      <Breadcrumb items={[{ label: 'Início' }, { label: 'Massagens' }]} />
      
      {/* BACK TO TOP */}
      <BackToTop />
      
      {/* QUICK ACTIONS (FAB) */}
      <QuickActions />

      {/* AGE VERIFICATION - Required for adult content */}
      <AgeVerification />

      {/* EXIT INTENT POPUP - Capture leaving visitors */}
      <ExitIntentPopup />

      {/* GIFT CARDS Section */}
      <GiftCards />

      {/* CORPORATE BOOKINGS */}
      <CorporateBookings />

      {/* NEWSLETTER SUBSCRIPTION */}
      <Newsletter />

      {/* CONFETTI CELEBRATION */}
      <ConfettiCelebration show={showConfetti} />

      {/* SUCCESS MODAL */}
      <SuccessModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Agendamento Recebido!"
        message="Entraremos em contacto contigo em breve para confirmar."
      />
      
      {/* FAVORITES PANEL */}
      <FavoritesPanel 
        isOpen={showFavorites} 
        onClose={() => setShowFavorites(false)} 
      />
      
      {/* COMPARE PANEL */}
      <ComparePanel 
        isOpen={showCompare} 
        onClose={() => setShowCompare(false)} 
      />
    </main>
    </div>
    </ToastProvider>
  )
}

