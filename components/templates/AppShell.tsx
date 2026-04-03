'use client'

import { useSupabase } from '@/components/providers/SessionProvider'
import BackgroundTemplate from '@/components/background/BackgroundTemplate'
import { PublicNavbar } from '@/components/navbar/PublicNavbar'
import { ProtectedNavbar } from '@/components/navbar/ProtectedNavbar'
import { LoginButton } from '@/components/home/LoginButton'
import { LogoutButton } from '@/components/home/LogoutButton'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const { user } = useSupabase()

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background - always rendered */}
      <BackgroundTemplate enabled />

      {/* Navigation */}
      {user ? <ProtectedNavbar /> : <PublicNavbar />}

      {/* Content overlay */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Login/Logout button */}
      {user ? <LogoutButton /> : <LoginButton />}
    </div>
  )
}
