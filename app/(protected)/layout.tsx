'use client'

import BackgroundTemplate from '@/components/background/BackgroundTemplate'
import { LogoutButton } from '@/components/home/LogoutButton'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BackgroundTemplate />
      {children}
      <LogoutButton />
    </>
  )
}
