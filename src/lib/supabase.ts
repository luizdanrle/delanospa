import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Service = {
  id: string
  name: string
  short_name: string
  price: number
  promo_price: number | null
  description: string
  short_description: string
  category: 'massage' | 'therapy' | 'ritual' | 'package'
  duration: number
  icon: string
  color: string
  image_url: string | null
  video_url: string | null
  gif_url: string | null
  gallery: string[]
  is_active: boolean
  is_featured: boolean
  is_promo: boolean
  order_index: number
  max_capacity: number
  requires_booking: boolean
  benefits: string[]
  includes: string[]
  contraindications: string[]
  tags: string[]
  created_at: string
  updated_at: string
}

export type Therapist = {
  id: string
  name: string
  bio: string
  gender: 'female' | 'male'
  services: string[]
  image_url: string | null
  is_active: boolean
  order_index: number
  created_at: string
  updated_at: string
  location?: string
  specialty?: string
  experience_years?: number
}

export type ContactInfo = {
  id: string
  whatsapp: string
  instagram: string
  facebook: string
  twitter: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  google_maps_url: string
  updated_at: string
}

export type Location = {
  id: string
  name: string
  address: string
  city: string
  phone: string
  image_url: string | null
  is_active: boolean
  order_index: number
  created_at: string
  updated_at: string
  email?: string
  map_url?: string
  working_hours?: Record<string, string>
}

export type AdminUser = {
  id: string
  email: string
  created_at: string
}

export type Client = {
  id: string
  name: string
  email: string
  phone: string
  whatsapp: string
  preferences: string
  notes: string
  is_vip: boolean
  created_at: string
  updated_at: string
}
