import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: any) {
          cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options?: any }) => {
            request.cookies.set(name, value)
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes check
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') ||
                           request.nextUrl.pathname.startsWith('/home') ||
                           request.nextUrl.pathname.startsWith('/about') ||
                           request.nextUrl.pathname.startsWith('/contact') ||
                           request.nextUrl.pathname.startsWith('/calendar') ||
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
    url.pathname = '/'
    url.searchParams.set('view', 'home')
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
