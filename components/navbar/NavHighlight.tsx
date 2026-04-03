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
  navItemRefs: React.RefObject<(HTMLElement | null)[]>
}

export function NavHighlight({ activeIndex, hoverIndex, navItemRefs }: NavHighlightProps) {
  const highlightRef = useRef<HTMLDivElement>(null)
  const prevActiveIndexRef = useRef<number>(activeIndex)
  const targetIndex = hoverIndex !== null ? hoverIndex : activeIndex
  const isHovering = hoverIndex !== null

  useEffect(() => {
    if (!highlightRef.current || !navItemRefs.current) return

    const targetLink = navItemRefs.current[targetIndex]
    if (!targetLink) return

    const targetLeft = targetLink.offsetLeft
    const targetWidth = targetLink.offsetWidth

    const wasPageNavigation = prevActiveIndexRef.current !== activeIndex && !isHovering
    prevActiveIndexRef.current = activeIndex

    if (wasPageNavigation) {
      highlightRef.current.style.transition = 'none'
    } else if (isHovering) {
      highlightRef.current.style.transition = 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }

    highlightRef.current.style.left = `${targetLeft}px`
    highlightRef.current.style.width = `${targetWidth}px`
  }, [targetIndex, navItemRefs, isHovering, activeIndex])

  return (
    <div
      ref={highlightRef}
      className="nav-highlight absolute top-0 bottom-0 bg-black rounded-[30px] z-[1] pointer-events-none"
    />
  )
}
