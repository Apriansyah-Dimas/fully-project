import { PageShell } from '@/components/templates/PageShell'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PageShell>{children}</PageShell>
}
