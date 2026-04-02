'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
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
  loading: true,
})

export function useSupabase() {
  return useContext(SupabaseContext)
}

function getCookieOptions(maxAge?: number) {
  if (maxAge && maxAge > 0) {
    return {
      path: '/',
      sameSite: 'lax' as const,
      maxAge,
    }
  }
  return {
    path: '/',
    sameSite: 'lax' as const,
  }
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            if (typeof document === 'undefined') return []
            const cookies = document.cookie.split(';').reduce((acc, cookie) => {
              const [name, ...value] = cookie.trim().split('=')
              if (name) {
                acc.push({ name, value: value.join('=') })
              }
              return acc
            }, [] as { name: string; value: string }[])
            return cookies
          },
          setAll(cookiesToSet: { name: string; value: string; options?: { maxAge?: number; path?: string; sameSite?: string } }[]) {
            cookiesToSet.forEach(({ name, value, options }) => {
              const cookieOptions = getCookieOptions(options?.maxAge)
              const maxAgeStr = cookieOptions.maxAge ? `; max-age=${cookieOptions.maxAge}` : ''
              document.cookie = `${name}=${value}; path=${cookieOptions.path}${maxAgeStr}; sameSite=${cookieOptions.sameSite}`
            })
          },
        },
      }
    )
  )
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user ? 'Logged in' : 'Not logged in')
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== 'TOKEN_REFRESHED') {
        console.log('Auth state changed:', event, session?.user ? 'Logged in' : 'Not logged in')
        setUser(session?.user ?? null)
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <SupabaseContext.Provider value={{ supabase, user, loading }}>
      {children}
    </SupabaseContext.Provider>
  )
}
