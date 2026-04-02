'use client'

import { useEffect, useRef } from 'react'

const TEXTS = ['Platform', 'System', 'Services']
const STAGGER = 0.025
const EXIT_DUR = 300
const ENTER_DUR = 420
const WIDTH_DUR = 500
const HOLD = 3500

export function RotatingText() {
  const pillRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLSpanElement>(null)
  const currentIdxRef = useRef(0)
  const busyRef = useRef(false)
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const measureWord = (word: string) => {
    if (!pillRef.current) return 0
    const g = document.createElement('span')
    g.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font-family:"Plus Jakarta Sans",sans-serif;font-weight:800;font-size:inherit;line-height:1.2em;'
    g.textContent = word
    pillRef.current.appendChild(g)
    const w = g.offsetWidth
    g.remove()
    return w
  }

  const setPillWidth = (wordWidth: number) => {
    if (!pillRef.current) return
    const fontSize = parseFloat(getComputedStyle(pillRef.current).fontSize || '16')
    const wPad = fontSize * 0.35 * 2
    const totalWidth = wordWidth + wPad
    pillRef.current.style.width = `${totalWidth}px`
  }

  const buildLayer = (word: string, direction: 'enter' | 'exit') => {
    const layer = document.createElement('span')
    layer.className = 'word-layer'
    const chars = Array.from(word)
    const n = chars.length

    chars.forEach((ch, i) => {
      const box = document.createElement('span')
      box.className = 'char-box'
      const inner = document.createElement('span')
      inner.className = 'char-inner'
      inner.textContent = ch === ' ' ? '\u00A0' : ch

      const delay = direction === 'enter'
        ? (n - 1 - i) * STAGGER * 1000
        : i * STAGGER * 1000

      if (direction === 'enter') {
        inner.animate([
          { transform: 'translateY(100%)', opacity: 0, color: '#ffffff' },
          { transform: 'translateY(0)', opacity: 1, color: '#ffffff' }
        ], { duration: ENTER_DUR, delay, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'both' })
      } else {
        inner.animate([
          { transform: 'translateY(0)', opacity: 1, color: '#ffffff' },
          { transform: 'translateY(-120%)', opacity: 0, color: '#ffffff' }
        ], { duration: EXIT_DUR, delay, easing: 'cubic-bezier(0.55,0,1,0.45)', fill: 'both' })
      }

      box.appendChild(inner)
      layer.appendChild(box)
    })
    return layer
  }

  const rotateTo = (nextIdx: number) => {
    if (busyRef.current) return
    busyRef.current = true

    const nextWord = TEXTS[nextIdx]
    const currentWord = TEXTS[currentIdxRef.current]
    const nextW = measureWord(nextWord)
    const currentLayer = viewportRef.current?.querySelector('.word-layer')

    if (!currentLayer) {
      busyRef.current = false
      return
    }

    // Build exit layer for current word
    const exitLayer = buildLayer(currentWord, 'exit')
    currentLayer.replaceWith(exitLayer)
    const exitTotal = EXIT_DUR + currentWord.length * STAGGER * 1000

    // Remove exit layer and adjust width
    setTimeout(() => {
      exitLayer.remove()
      if (pillRef.current) {
        pillRef.current.style.transition = `width ${WIDTH_DUR}ms cubic-bezier(0.4,0,0.2,1)`
        setPillWidth(nextW)
      }
    }, exitTotal)

    // Build enter layer for next word
    setTimeout(() => {
      currentIdxRef.current = nextIdx
      const enterLayer = buildLayer(nextWord, 'enter')
      viewportRef.current?.appendChild(enterLayer)
      const enterTotal = ENTER_DUR + nextWord.length * STAGGER * 1000

      setTimeout(() => {
        busyRef.current = false
      }, enterTotal)
    }, exitTotal + WIDTH_DUR)
  }

  const initFirst = () => {
    if (!pillRef.current || !viewportRef.current) return

    const word = TEXTS[0]
    const w = measureWord(word)

    pillRef.current.style.transition = 'none'
    pillRef.current.style.width = '0px'

    const layer = buildLayer(word, 'enter')
    viewportRef.current.appendChild(layer)

    setTimeout(() => {
      if (!pillRef.current) return
      pillRef.current.style.transition = `width ${WIDTH_DUR}ms cubic-bezier(0.4,0,0.2,1)`
      setPillWidth(w)
    }, ENTER_DUR + TEXTS[0].length * STAGGER * 1000)

    // Start rotation after initial animation
    setTimeout(() => {
      startRotation()
    }, ENTER_DUR + TEXTS[0].length * STAGGER * 1000 + WIDTH_DUR + 500)
  }

  const startRotation = () => {
    rotationIntervalRef.current = setInterval(() => {
      rotateTo((currentIdxRef.current + 1) % TEXTS.length)
    }, HOLD)
  }

  useEffect(() => {
    initFirst()

    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current)
      }
    }
  }, [])

  return (
    <span
      ref={pillRef}
      className="rotating-pill inline-block"
      style={{
        background: '#6365b9',
        borderRadius: '10px',
        padding: '0.05em 0.35em',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        verticalAlign: 'middle',
        minHeight: '1.2em',
      }}
    >
      <span
        ref={viewportRef}
        className="char-viewport"
        style={{
          overflow: 'hidden',
          height: '1.2em',
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          minWidth: '1px',
        }}
      />
    </span>
  )
}
