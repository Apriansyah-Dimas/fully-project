<<<<<<< HEAD
import { AppShell } from '@/components/templates/AppShell'
=======
import { DashboardShell } from '@/components/templates/DashboardShell'
>>>>>>> a86d915da190447ea48559e352b8f2d96558b5b1

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
<<<<<<< HEAD
  return <AppShell>{children}</AppShell>
=======
  return <DashboardShell>{children}</DashboardShell>
>>>>>>> a86d915da190447ea48559e352b8f2d96558b5b1
}
