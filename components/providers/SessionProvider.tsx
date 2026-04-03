'use client'

import { createContext, useContext, useState, Suspense } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { User } from '@supabase/supabase-js'

interface SupabaseContextType {
  supabase: SupabaseClient | null
  user: User | null
  loading: boolean
}

const SupabaseContext = createContext<SupabaseContextType>({
  supabase: null,
  user: null,
  loading: false,
})

export function useSupabase() {
  return useContext(SupabaseContext)
}

// Mock user for development - replace with real auth later
const mockUser = {
  id: 'demo-user',
  email: 'demo@example.com',
  name: 'Demo User'
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<User | null>(mockUser)
  const [loading] = useState(false)
  const [supabase] = useState<SupabaseClient | null>(null)

  return (
    <SupabaseContext.Provider value={{ supabase, user, loading }}>
      {children}
    </SupabaseContext.Provider>
  )
}
