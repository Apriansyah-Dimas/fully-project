'use client'

import { SmartNavbar } from '@/components/navbar/SmartNavbar'
import { SmartLoginButton } from '@/components/home/SmartLoginButton'

interface DashboardShellClientProps {
  user?: { email: string }
  children: React.ReactNode
  className?: string
}

export function DashboardShellClient({ user, children, className }: DashboardShellClientProps) {
  return (
    <div className={`h-screen w-full overflow-hidden ${className || ''}`}>
      <SmartNavbar />

      <div className="pt-24 pb-8 px-4 h-full flex items-center justify-center">
        <div className="mx-auto max-w-7xl w-full">
          {children}
        </div>
      </div>

      <SmartLoginButton />
    </div>
  )
}
