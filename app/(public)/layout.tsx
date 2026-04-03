'use client'

import { SmartNavbar } from '@/components/navbar/SmartNavbar'
import { SmartLoginButton } from '@/components/home/SmartLoginButton'
import { PageShell } from '@/components/templates/PageShell'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-full overflow-hidden">
      <SmartNavbar />
      <PageShell>{children}</PageShell>
      <SmartLoginButton />
    </div>
  )
}
