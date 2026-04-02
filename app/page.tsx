'use client'

import { useSupabase } from '@/components/providers/SessionProvider'
import { AppView } from '@/components/views/AppView'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, loading } = useSupabase()

  useEffect(() => {
    // Check if there's a view param, if not redirect based on auth
    const viewParam = searchParams.get('view')

    if (!loading && !viewParam) {
      // Set initial view based on auth state
      const initialView = user ? 'home' : 'home'
      const url = new URL(window.location.href)
      url.searchParams.set('view', initialView)
      router.replace(url.toString())
    }
  }, [user, loading, router, searchParams])

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  // Show the AppView component
  return <AppView />
}
