'use client'

import { PublicNavbar } from '@/components/navbar/PublicNavbar'
import { LoginButton } from '@/components/home/LoginButton'
import { PageShell } from '@/components/templates/PageShell'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PublicNavbar />
      <PageShell>{children}</PageShell>
      <LoginButton />
    </>
  )
}
