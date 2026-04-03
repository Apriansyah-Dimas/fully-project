'use client'

import { useEffect, useRef, useState } from 'react'
import { TiltedCard } from '@/components/assets/TiltedCard'
import '@/components/assets/TiltedCard.css'

const ASSETS_CARDS = [
  {
    id: 'assets-list',
    imageSrc: 'https://picsum.photos/seed/warehouse-inv/440/640.jpg',
    captionText: 'Assets List',
  },
  {
    id: 'maintenance',
    imageSrc: 'https://picsum.photos/seed/mech-tools-fix/440/640.jpg',
    captionText: 'Maintenance Asset Request',
    captionMaxWidth: '180px',
  },
  {
    id: 'request',
    imageSrc: 'https://picsum.photos/seed/clipboard-req/440/640.jpg',
    captionText: 'Asset Request',
  },
  {
    id: 'mutation',
    imageSrc: 'https://picsum.photos/seed/transfer-move/440/640.jpg',
    captionText: 'Asset Mutation',
  },
]

function AnimatedCard({
  children,
  delay
}: {
  children: React.ReactNode
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  )
}

export default function AssetsPage() {
  return (
    <main className="absolute top-20 bottom-16 left-0 right-0 px-8 flex items-center justify-center">
      <div className="flex gap-8 justify-center items-center flex-wrap max-w-6xl">
        {ASSETS_CARDS.map((card, index) => (
          <AnimatedCard key={card.id} delay={index * 100}>
            <TiltedCard
              imageSrc={card.imageSrc}
              altText={card.captionText}
              captionText={card.captionText}
              captionMaxWidth={card.captionMaxWidth}
              containerHeight="320px"
              containerWidth="240px"
              rotateAmplitude={12}
              scaleOnHover={1.05}
            />
          </AnimatedCard>
        ))}
      </div>
    </main>
  )
}
