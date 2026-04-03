'use client'

import { useEffect, useState } from 'react'
import { ProtectedNavbar } from '@/components/navbar/ProtectedNavbar'

interface DashboardShellClientProps {
  user: { email: string }
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
    <div className={`min-h-screen w-full ${className || ''}`}>
      <ProtectedNavbar />

      {/* User info and logout in top-right corner */}
      <div className="fixed top-8 right-8 z-[200] flex items-center gap-4">
        <span className="text-sm text-gray-600">{user.email}</span>
        <form action="/auth/logout" method="post">
          <button
            type="submit"
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Logout
          </button>
        </form>
      </div>

      {/* Main Content with height limit - pt-24 to avoid navbar overlap */}
      <div className="pt-24 pb-8 px-4 h-[calc(100vh-6rem)] overflow-auto">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </div>
    </div>
  )
}
