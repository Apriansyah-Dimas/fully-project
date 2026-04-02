'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface SplitTextProps {
  children: ReactNode
  className?: string
  delay?: number
  animationType?: 'fade-up' | 'fade-in' | 'slide-left'
}

export function SplitText({ children, className = '', delay = 30, animationType = 'fade-up' }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const text = container.textContent || ''
    if (!text.trim()) return

    container.innerHTML = ''
    
    text.split('').forEach((char, i) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.className = 'split-char'
      if (animationType === 'slide-left') {
        span.style.setProperty('--slide-dir', 'translateX(-100%)')
      }
      container.appendChild(span)
    })

    const chars = container.querySelectorAll('.split-char')
    chars.forEach((char, i) => {
      setTimeout(() => {
        char.classList.add('animated')
      }, i * delay)
    })
  }, [delay, animationType])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}