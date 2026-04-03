import { logout } from '@/actions/auth'
import { redirect } from 'next/navigation'

export async function POST() {
  const result = await logout()

  if (result.error) {
    redirect('/home?error=logout_failed')
  }

  redirect('/home')
}
