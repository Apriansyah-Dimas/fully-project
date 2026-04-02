'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import type { ViewType } from '@/components/views/AppView'
import { NavHighlight } from './NavHighlight'

interface ProtectedNavbarProps {
  onViewChange: (view: ViewType) => void
  currentView: ViewType
}

const navItems = [
  { name: 'Home', href: 'home' },
  { name: 'About', href: 'about' },
  { name: 'Contact', href: 'contact' },
  { name: 'Calendar', href: 'calendar' },
  { name: 'Assets', href: 'assets' },
  { name: 'Handbook', href: 'handbook' },
]

export function ProtectedNavbar({ onViewChange, currentView }: ProtectedNavbarProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const navItemRefs = useRef<(HTMLButtonElement | null)[]>(
    navItems.map(() => null)
  )

  // Set initial active index based on currentView
  useEffect(() => {
    const index = navItems.findIndex(item => item.href === currentView)
    if (index !== -1 && index !== activeIndex) {
      setActiveIndex(index)
    }
  }, [currentView])

  const handleMouseEnter = useCallback((index: number) => {
    setHoverIndex(index)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoverIndex(null)
  }, [])

  const handleClick = useCallback((index: number, view: string) => {
    setActiveIndex(index)
    onViewChange(view as ViewType)
  }, [onViewChange])

  return (
    <nav className="navbar fixed top-8 left-1/2 -translate-x-1/2 z-[200] flex gap-2">
      <NavHighlight
        activeIndex={activeIndex}
        hoverIndex={hoverIndex}
        navItemRefs={navItemRefs}
      />
      {navItems.map((item, index) => (
        <button
          key={item.name}
          ref={(el) => { navItemRefs.current[index] = el }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index, item.href)}
          className={`nav-link relative text-base font-semibold transition-colors duration-300 px-6 py-3 rounded-[30px] border-none bg-transparent cursor-pointer select-none z-[2] w-max ${
            (hoverIndex !== null ? hoverIndex : activeIndex) === index ? 'text-white' : 'text-black'
          }`}
        >
          {item.name}
        </button>
      ))}
    </nav>
  )
}
