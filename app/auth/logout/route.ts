import { logout } from '@/actions/auth'
import { redirect } from 'next/navigation'

export async function POST() {
  const result = await logout()

  if (result.error) {
    // Still redirect to login even on error
    redirect('/login?error=logout_failed')
  }

  redirect('/login')
}
