'use client'

import { useEffect, useRef } from 'react'

interface NavItemRef {
  getBoundingClientRect: () => DOMRect
  offsetLeft: number
  offsetWidth: number
}

interface NavHighlightProps {
  activeIndex: number
  hoverIndex: number | null
  navItemRefs: React.RefObject<(HTMLAnchorElement | null)[]>
}

export function NavHighlight({ activeIndex, hoverIndex, navItemRefs }: NavHighlightProps) {
  const highlightRef = useRef<HTMLDivElement>(null)
  const targetIndex = hoverIndex !== null ? hoverIndex : activeIndex

  useEffect(() => {
    if (!highlightRef.current || !navItemRefs.current) return

    const targetLink = navItemRefs.current[targetIndex]
    if (!targetLink) return

    const targetLeft = targetLink.offsetLeft
    const targetWidth = targetLink.offsetWidth

    highlightRef.current.style.transition = 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    highlightRef.current.style.left = `${targetLeft}px`
    highlightRef.current.style.width = `${targetWidth}px`
  }, [targetIndex, navItemRefs])

  return (
    <div
      ref={highlightRef}
      className="nav-highlight absolute top-0 bottom-0 bg-black rounded-[30px] z-[1] pointer-events-none"
      style={{
        transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    />
  )
}
