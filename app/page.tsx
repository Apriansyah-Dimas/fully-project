<<<<<<< HEAD
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/home')
=======
import Link from 'next/link'
import { PageShell } from '@/components/templates/PageShell'

export default function HomePage() {
  return (
    <PageShell className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore our platform and discover what we have to offer
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/home"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Go to Home
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </PageShell>
  )
>>>>>>> a86d915da190447ea48559e352b8f2d96558b5b1
}
