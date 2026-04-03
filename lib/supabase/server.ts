import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Validate environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('[Supabase Server] Missing environment variables')
    throw new Error('Missing Supabase configuration. Please check your environment variables.')
  }

  try {
    const cookieStore = await cookies()

    return createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch (error) {
              // Log the error but don't fail silently
              console.error('[Supabase Server] Error setting cookies:', error)
              // This is expected in Server Components - continue execution
            }
          },
        },
      }
    )
  } catch (error) {
    console.error('[Supabase Server] Error creating client:', error)
    throw new Error('Failed to initialize Supabase client. Please try again.')
  }
}
