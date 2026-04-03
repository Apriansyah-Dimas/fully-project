import { AppShell } from '@/components/templates/AppShell'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppShell>{children}</AppShell>
}
