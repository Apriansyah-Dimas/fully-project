'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { SmartNavbar } from '@/components/navbar/SmartNavbar'
import { SmartLoginButton } from '@/components/home/SmartLoginButton'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/login')
      } else {
        setMounted(true)
      }
    }
    
    checkAuth()
  }, [router])

  if (!mounted) {
    return (
      <div className="h-screen w-full bg-white" />
    )
  }

  return (
    <div className="h-screen w-full overflow-hidden" style={{
      paddingTop: 'var(--safe-zone-top)',
      paddingBottom: 'var(--safe-zone-bottom)',
    }}>
      <SmartNavbar />
      <div className="px-4 h-full flex items-center justify-center">
        <div className="mx-auto max-w-7xl w-full">
          {children}
        </div>
      </div>
      <SmartLoginButton />
    </div>
  )
}
