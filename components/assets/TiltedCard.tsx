'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

interface TiltedCardProps {
  imageSrc: string
  altText?: string
  captionText?: string
  captionMaxWidth?: string
  containerHeight?: string
  containerWidth?: string
  imageHeight?: string
  imageWidth?: string
  rotateAmplitude?: number
  scaleOnHover?: number
  showMobileWarning?: boolean
  showTooltip?: boolean
  onClick?: () => void
  href?: string
}

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
}

export function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  captionMaxWidth,
  containerHeight = '300px',
  containerWidth = '300px',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = false,
  showTooltip = false,
  onClick,
  href,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), springValues)
  const rotateY = useSpring(useMotionValue(0), springValues)
  const scale = useSpring(1, springValues)
  const opacity = useSpring(0)
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  })

  const [lastY, setLastY] = useState(0)

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude

    rotateX.set(rotationX)
    rotateY.set(rotationY)

    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)

    const velocityY = offsetY - lastY
    rotateFigcaption.set(-velocityY * 0.6)
    setLastY(offsetY)
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover)
    opacity.set(1)
  }

  function handleMouseLeave() {
    opacity.set(0)
    scale.set(1)
    rotateX.set(0)
    rotateY.set(0)
    rotateFigcaption.set(0)
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      window.location.href = href
    }
  }

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{
        '--card-width': containerWidth,
        '--card-height': containerHeight,
      } as React.CSSProperties}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role={href || onClick ? 'button' : undefined}
    >
      <motion.div
        className="tilted-card-inner"
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="tilted-card-img"
        />
        {captionText && (
          <div style={{
            position: 'absolute',
            bottom: '32px',
            left: '0',
            right: '0',
            display: 'flex',
            justifyContent: 'center',
            transform: 'translateZ(40px)',
          }}>
            <span style={{
              color: 'white',
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textAlign: 'center',
              padding: '8px 16px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2))',
              borderRadius: '10px',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              maxWidth: captionMaxWidth,
              whiteSpace: captionMaxWidth ? 'normal' : 'nowrap',
            }}>
              {captionText}
            </span>
          </div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  )
}