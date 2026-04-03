import { cn } from '@/lib/utils'

interface PageShellProps {
  children: React.ReactNode
  className?: string
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className={cn('min-h-screen w-full', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </div>
    </div>
  )
}
