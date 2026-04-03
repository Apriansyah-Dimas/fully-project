'use client'

import { useEffect } from 'react'
import { RotatingText } from '@/components/home/RotatingText'
import { PageShell } from '@/components/templates/PageShell'

const LINE1_TEXT = "Welcome to HR Imajin,"
const STATIC_TEXT = "Your Internal"

export default function HomePage() {
  useEffect(() => {
    // Animate Line 1 character by character
    const line1Chars = document.querySelectorAll('.line1 .split-char')
    line1Chars.forEach((char, i) => {
      setTimeout(() => {
        char.classList.add('animated')
      }, i * 30)
    })

    // After Line 1 completes, show Line 2
    const line1TotalDelay = LINE1_TEXT.length * 30 + 500
    setTimeout(() => {
      const line2 = document.querySelector('.line2')
      if (line2) {
        line2.classList.add('visible')
      }

      // Animate static text character by character
      const staticChars = document.querySelectorAll('.static-internal .split-char')
      staticChars.forEach((char, i) => {
        setTimeout(() => {
          char.classList.add('animated')
        }, i * 30)
      })
    }, line1TotalDelay)
  }, [])

  return (
    <PageShell>
      <div className="hero active text-center max-w-[900px] w-full">
        {/* Line 1 */}
        <div className="line1">
          {LINE1_TEXT.split('').map((char, i) => (
            <span
              key={`line1-${i}`}
              className="split-char"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Line 2 */}
        <div className="line2">
          {/* Static text */}
          <span className="static-internal">
            {STATIC_TEXT.split('').map((char, i) => (
              <span
                key={`static-${i}`}
                className="split-char"
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>

          {/* Rotating pill - langsung muncul dari awal */}
          <span className="rotating-pill">
            <RotatingText />
          </span>
        </div>
      </div>
    </PageShell>
  )
}
