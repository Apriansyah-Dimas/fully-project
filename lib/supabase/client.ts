import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

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

export function createClient() {
  if (supabaseClient) {
    return supabaseClient
  }

  supabaseClient = createBrowserClient(
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
        setAll(cookiesToSet: { name: string; value: string; options?: { maxAge?: number } }[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            const cookieOptions = getCookieOptions(options?.maxAge)
            const maxAgeStr = cookieOptions.maxAge ? `; max-age=${cookieOptions.maxAge}` : ''
            document.cookie = `${name}=${value}; path=${cookieOptions.path}${maxAgeStr}; sameSite=${cookieOptions.sameSite}`
          })
        },
      },
    }
  )

  return supabaseClient
}

export function getSupabaseClient() {
  if (!supabaseClient) {
    return createClient()
  }
  return supabaseClient
}
