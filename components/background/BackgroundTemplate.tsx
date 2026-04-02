'use client'

import { useEffect, useRef, useState } from 'react'

interface BackgroundTemplateProps {
  gridSize?: number
  lineColor?: { r: number; g: number; b: number }
  waveSpeed?: number
  dotIntensity?: number
  enabled?: boolean
}

export default function BackgroundTemplate({
  gridSize = 50,
  lineColor = { r: 0, g: 0, b: 0 },
  waveSpeed = 0.5,
  dotIntensity = 1,
  enabled = true,
}: BackgroundTemplateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (isMobile || !enabled) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const drawGrid = () => {
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const lineWidth = 0.5
      ctx.lineWidth = lineWidth

      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          const distanceX = Math.abs(x - canvas.width / 2)
          const distanceY = Math.abs(y - canvas.height / 2)
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
          const maxDistance = Math.sqrt(Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2))

          const wave = Math.sin(distance * 0.005 - time * waveSpeed) * 0.5 + 0.5
          const alpha = wave * 0.15 * (1 - distance / maxDistance)

          ctx.strokeStyle = `rgba(${lineColor.r}, ${lineColor.g}, ${lineColor.b}, ${alpha})`

          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x + gridSize * 0.3, y + gridSize * 0.3)
          ctx.stroke()

          const dotSize = 1 + wave * 1.5 * dotIntensity
          const dotAlpha = wave * 0.3 * dotIntensity * (1 - distance / maxDistance)
          ctx.fillStyle = `rgba(${lineColor.r}, ${lineColor.g}, ${lineColor.b}, ${dotAlpha})`
          ctx.beginPath()
          ctx.arc(x, y, dotSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      time += 0.02
      animationFrameId = requestAnimationFrame(drawGrid)
    }

    drawGrid()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile, enabled, gridSize, lineColor, waveSpeed, dotIntensity])

  return (
    !isMobile && enabled && (
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 1 }}
      />
    )
  )
}
