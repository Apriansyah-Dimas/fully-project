'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavHighlight } from './NavHighlight'
import { ContactLink } from './ContactLink'

interface PublicNavbarProps {
  currentView?: string
}

const navItems = [
  { name: 'Home', href: '/home' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function PublicNavbar({ currentView }: PublicNavbarProps) {
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>(
    navItems.map(() => null)
  )

  // Set initial active index based on pathname
  useEffect(() => {
    const index = navItems.findIndex(item => item.href === pathname)
    if (index !== -1) {
      setActiveIndex(index)
    }
  }, [pathname])

  const handleMouseEnter = useCallback((index: number) => {
    setHoverIndex(index)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoverIndex(null)
  }, [])

  return (
    <nav className="navbar fixed top-8 left-1/2 -translate-x-1/2 z-[200] flex gap-2">
      <NavHighlight
        activeIndex={activeIndex}
        hoverIndex={hoverIndex}
        navItemRefs={navItemRefs}
      />
      {navItems.map((item, index) => (
        item.name === 'Contact' ? (
          <ContactLink
            key={item.name}
            ref={(el) => { navItemRefs.current[index] = el }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            href={item.href}
            className={`nav-link relative text-base font-semibold transition-colors duration-300 px-6 py-3 rounded-[30px] border-none bg-transparent cursor-pointer select-none z-[2] w-max ${
              (hoverIndex !== null ? hoverIndex : activeIndex) === index ? 'text-white' : 'text-black'
            }`}
          />
        ) : (
          <Link
            key={item.name}
            ref={(el) => { navItemRefs.current[index] = el }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            href={item.href}
            className={`nav-link relative text-base font-semibold transition-colors duration-300 px-6 py-3 rounded-[30px] border-none bg-transparent cursor-pointer select-none z-[2] w-max ${
              (hoverIndex !== null ? hoverIndex : activeIndex) === index ? 'text-white' : 'text-black'
            }`}
          >
            {item.name}
          </Link>
        )
      ))}
    </nav>
  )
}
