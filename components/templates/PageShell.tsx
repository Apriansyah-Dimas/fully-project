import { cn } from '@/lib/utils'

interface PageShellProps {
  children: React.ReactNode
  className?: string
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div
      className={cn('h-screen w-full', className)}
      style={{
        paddingTop: 'var(--safe-zone-top)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
