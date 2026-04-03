import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardShellClient } from './DashboardShellClient'

interface DashboardShellProps {
  children: React.ReactNode
  className?: string
}

export async function DashboardShell({ children, className }: DashboardShellProps) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <DashboardShellClient className={className}>
      {children}
    </DashboardShellClient>
  )
}
