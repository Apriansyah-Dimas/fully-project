'use client'

import { useEffect, useState } from 'react'
import { SmartNavbar } from '@/components/navbar/SmartNavbar'
import { SmartLoginButton } from '@/components/home/SmartLoginButton'

interface DashboardShellClientProps {
  user?: { email: string }
  children: React.ReactNode
  className?: string
}

export function DashboardShellClient({ user, children, className }: DashboardShellClientProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className={`h-screen w-full overflow-hidden ${className || ''}`}>
      <SmartNavbar />

      {/* Main Content with height limit - pt-24 to avoid navbar overlap */}
      <div className="pt-24 pb-8 px-4 h-full flex items-center justify-center">
        <div className="mx-auto max-w-7xl w-full">
          {children}
        </div>
      </div>

      <SmartLoginButton />
    </div>
  )
}
