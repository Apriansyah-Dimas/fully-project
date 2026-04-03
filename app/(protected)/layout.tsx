import { AppShell } from '@/components/templates/AppShell'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppShell>{children}</AppShell>
}
