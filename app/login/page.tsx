import { login } from '@/actions/login'
import { PageShell } from '@/components/templates/PageShell'
import { Suspense } from 'react'

function LoginError() {
  return (
    <Suspense fallback={null}>
      <LoginErrorInner />
    </Suspense>
  )
}

function LoginErrorInner() {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const error = params.get('error')
  
  if (!error) return null

  return (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-sm text-red-600 text-center">
        {error === 'invalid_credentials' && 'Invalid email or password. Please try again.'}
        {error === 'missing_credentials' && 'Please fill in all required fields.'}
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <PageShell className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Log In
            </h1>
            <p className="text-sm text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>

          <LoginError />

          <form action={login} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="name@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="flex gap-3">
              <a
                href="/"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </a>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Log In
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Contact your administrator to request access
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
