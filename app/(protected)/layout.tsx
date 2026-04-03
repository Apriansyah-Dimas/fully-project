import { DashboardShell } from '@/components/templates/DashboardShell'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardShell>{children}</DashboardShell>
}
