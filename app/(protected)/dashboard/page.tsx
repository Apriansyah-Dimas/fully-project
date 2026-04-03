import { SafeContentZone } from '@/components/templates/SafeContentZone'

export default function DashboardPage() {
  return (
    <SafeContentZone>
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Selamat datang di Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Navigate using the menu above
          </p>
        </div>
      </div>
    </SafeContentZone>
  )
}
