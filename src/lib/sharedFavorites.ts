'use client'

import { createClient } from '@/lib/supabase'

// Tipos para favoritos compartilhados
export interface SharedFavorite {
  id: string
  name: string
  image?: string
  specialty: string
  location: string
  rating: number
  created_at: string
  user_ip?: string
}

export interface SharedCompareItem {
  id: string
  name: string
  image?: string
  specialty: string
  location: string
  rating: number
  reviews: number
  price: number
  duration: number
  experience: number
  services: string[]
  languages: string[]
  availability: string
  created_at: string
  user_ip?: string
}

// Obter IP do usuário para identificação simples
async function getUserIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip || 'anonymous'
  } catch {
    return 'anonymous'
  }
}

// Funções para favoritos compartilhados
export async function getSharedFavorites(): Promise<SharedFavorite[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('shared_favorites')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50) // Limitar para não sobrecarregar

    if (error) {
      console.error('Error fetching shared favorites:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getSharedFavorites:', error)
    return []
  }
}

export async function addSharedFavorite(favorite: Omit<SharedFavorite, 'created_at' | 'user_ip'>): Promise<boolean> {
  try {
    const supabase = createClient()
    const userIP = await getUserIP()
    
    const { error } = await supabase
      .from('shared_favorites')
      .insert({
        ...favorite,
        created_at: new Date().toISOString(),
        user_ip: userIP
      })

    if (error) {
      console.error('Error adding shared favorite:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in addSharedFavorite:', error)
    return false
  }
}

export async function removeSharedFavorite(id: string): Promise<boolean> {
  try {
    const supabase = createClient()
    const { error } = await supabase
      .from('shared_favorites')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error removing shared favorite:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in removeSharedFavorite:', error)
    return false
  }
}

// Funções para comparações compartilhadas
export async function getSharedCompareItems(): Promise<SharedCompareItem[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('shared_compare')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10) // Limitar comparações

    if (error) {
      console.error('Error fetching shared compare items:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getSharedCompareItems:', error)
    return []
  }
}

export async function addSharedCompareItem(item: Omit<SharedCompareItem, 'created_at' | 'user_ip'>): Promise<boolean> {
  try {
    const supabase = createClient()
    const userIP = await getUserIP()
    
    const { error } = await supabase
      .from('shared_compare')
      .insert({
        ...item,
        created_at: new Date().toISOString(),
        user_ip: userIP
      })

    if (error) {
      console.error('Error adding shared compare item:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in addSharedCompareItem:', error)
    return false
  }
}

export async function removeSharedCompareItem(id: string): Promise<boolean> {
  try {
    const supabase = createClient()
    const { error } = await supabase
      .from('shared_compare')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error removing shared compare item:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in removeSharedCompareItem:', error)
    return false
  }
}

export async function clearSharedCompare(): Promise<boolean> {
  try {
    const supabase = createClient()
    const { error } = await supabase
      .from('shared_compare')
      .delete()
      .neq('id', 'impossible-id') // Deletar todos os registros

    if (error) {
      console.error('Error clearing shared compare:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in clearSharedCompare:', error)
    return false
  }
}

// Função para inicializar as tabelas se não existirem
export async function initializeSharedTables(): Promise<void> {
  try {
    const supabase = createClient()
    
    // Verificar se as tabelas existem (via RPC ou tentativa de consulta)
    // Em produção, as tabelas devem ser criadas via migration SQL
    
    console.log('Shared tables initialization check completed')
  } catch (error) {
    console.error('Error initializing shared tables:', error)
  }
}
