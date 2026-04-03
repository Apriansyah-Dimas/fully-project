import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Validate environment variables first
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('[Middleware] Missing Supabase environment variables')
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet: any) {
            cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options?: any }) => {
              try {
                request.cookies.set(name, value)
                supabaseResponse.cookies.set(name, value, options)
              } catch (error) {
                console.error('[Middleware] Error setting cookie:', name, error)
              }
            })
          },
        },
      }
    )

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      // Only log unexpected errors, not missing session on public routes
      if (error.message !== 'Auth session missing!') {
        console.error('[Middleware] Auth error:', error.message)
      }
    }

    // Protected routes: /calendar, /assets, /handbook
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/calendar') ||
                             request.nextUrl.pathname.startsWith('/assets') ||
                             request.nextUrl.pathname.startsWith('/handbook')

    // Login route check - redirect if already logged in
    const isLoginRoute = request.nextUrl.pathname.startsWith('/login')

    if (isProtectedRoute && !user) {
      // Redirect to login if trying to access protected route without auth
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    if (isLoginRoute && user) {
      // Redirect to home if already logged in
      const url = request.nextUrl.clone()
      url.pathname = '/home'
      return NextResponse.redirect(url)
    }

    return supabaseResponse
  } catch (error) {
    console.error('[Middleware] Unexpected error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
