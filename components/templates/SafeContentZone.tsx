import { cn } from '@/lib/utils'

interface SafeContentZoneProps {
  children: React.ReactNode
  className?: string
  disableVerticalPadding?: boolean
  disableMaxHeight?: boolean
}

export function SafeContentZone({
  children,
  className,
  disableVerticalPadding = false,
  disableMaxHeight = false,
}: SafeContentZoneProps) {
  return (
    <div
      className={cn('w-full h-full', className)}
      style={{
        paddingBottom: disableVerticalPadding ? 0 : 'var(--safe-zone-bottom)',
        maxHeight: disableMaxHeight ? 'none' : 'var(--safe-zone-available)',
      }}
    >
      <div className="h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
