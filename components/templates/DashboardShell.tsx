import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { cn } from '@/lib/utils'

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
    <div className={cn('min-h-screen w-full', className)}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <a href="/dashboard" className="text-xl font-bold">
                Dashboard
              </a>
              <div className="flex items-center gap-4">
                <a
                  href="/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Home
                </a>
                <a
                  href="/calendar"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Calendar
                </a>
                <a
                  href="/assets"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Assets
                </a>
                <a
                  href="/handbook"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Handbook
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <form action="/auth/logout" method="post">
                <button
                  type="submit"
                  className="rounded-md bg px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>
    </div>
  )
}
