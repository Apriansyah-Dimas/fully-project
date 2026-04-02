'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSupabase } from '@/components/providers/SessionProvider'
import BackgroundTemplate from '@/components/background/BackgroundTemplate'
import { PublicNavbar } from '@/components/navbar/PublicNavbar'
import { ProtectedNavbar } from '@/components/navbar/ProtectedNavbar'
import { LoginModal } from '@/components/modal/LoginModal'
import { LoginButton } from '@/components/home/LoginButton'
import { LogoutButton } from '@/components/home/LogoutButton'
import { motion, AnimatePresence } from 'motion/react'

// Public views
import { HomeView } from '@/components/views/content/HomeView'
import { AboutView } from '@/components/views/content/AboutView'
import { ContactView } from '@/components/views/content/ContactView'

// Protected views
import { CalendarView } from '@/components/views/content/CalendarView'
import { AssetsView } from '@/components/views/content/AssetsView'
import { HandbookView } from '@/components/views/content/HandbookView'

export type ViewType =
  | 'home'
  | 'about'
  | 'contact'
  | 'calendar'
  | 'assets'
  | 'handbook'

interface ViewConfig {
  type: ViewType
  protected: boolean
  component: React.ComponentType
}

const VIEWS: Record<ViewType, ViewConfig> = {
  home: { type: 'home', protected: false, component: HomeView },
  about: { type: 'about', protected: false, component: AboutView },
  contact: { type: 'contact', protected: false, component: ContactView },
  calendar: { type: 'calendar', protected: true, component: CalendarView },
  assets: { type: 'assets', protected: true, component: AssetsView },
  handbook: { type: 'handbook', protected: true, component: HandbookView },
}

export function useAppView() {
  const searchParams = useSearchParams()
  const viewParam = searchParams.get('view') as ViewType | null
  return viewParam || 'home'
}

export function AppView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, loading } = useSupabase()
  const [currentView, setCurrentView] = useState<ViewType>('home')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [pendingView, setPendingView] = useState<ViewType | null>(null)

  // Sync with URL (with auth check)
  useEffect(() => {
    const viewParam = searchParams.get('view') as ViewType | null
    if (viewParam && VIEWS[viewParam]) {
      const viewConfig = VIEWS[viewParam]

      // Check if protected and user is not logged in - redirect to login page
      if (viewConfig.protected && !user && !loading) {
        router.push('/login')
        return
      }

      setCurrentView(viewParam)
    }
  }, [searchParams, user, loading, router])

  // Handle view changes with auth check
  const handleViewChange = (view: ViewType) => {
    const viewConfig = VIEWS[view]

    if (!viewConfig) {
      console.error('Invalid view:', view)
      return
    }

    // Check if protected and user is not logged in
    if (viewConfig.protected && !user) {
      setPendingView(view)
      setShowLoginModal(true)
      return
    }

    // Update URL and state
    const url = new URL(window.location.href)
    url.searchParams.set('view', view)
    router.push(url.toString(), { scroll: false })
    setCurrentView(view)
  }

  // Handle successful login
  const handleLoginSuccess = () => {
    setShowLoginModal(false)
    if (pendingView) {
      handleViewChange(pendingView)
      setPendingView(null)
    }
  }

  // Get current view config
  const viewConfig = VIEWS[currentView] || VIEWS.home
  const ViewComponent = viewConfig.component

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background - always rendered */}
      <BackgroundTemplate enabled />

      {/* Navigation */}
      {user ? (
        <ProtectedNavbar onViewChange={handleViewChange} currentView={currentView} />
      ) : (
        <PublicNavbar onViewChange={handleViewChange} currentView={currentView} />
      )}

      {/* Content overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="absolute inset-0 z-10"
        >
          <ViewComponent />
        </motion.div>
      </AnimatePresence>

      {/* Login/Logout button */}
      {user ? <LogoutButton /> : <LoginButton />}

      {/* Login modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false)
          setPendingView(null)
        }}
        onSuccess={handleLoginSuccess}
      />
    </div>
  )
}
