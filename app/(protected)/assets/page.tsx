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
    href: 'https://docs.google.com/forms/d/10afl1QYM42kTgjWy1Hti7zD6h-iAscqAqhDaCy6s_nE/edit',
  },
  {
    id: 'request',
    imageSrc: 'https://picsum.photos/seed/clipboard-req/440/640.jpg',
    captionText: 'Asset Request',
    href: 'https://docs.google.com/spreadsheets/d/1vDm6sBzXRrS4v5h4AP5cNJBAerD0oviX3nhBJUNIHYk/edit?usp=sharing',
  },
  {
    id: 'mutation',
    imageSrc: 'https://picsum.photos/seed/transfer-move/440/640.jpg',
    captionText: 'Asset Mutation',
  },
]

export default function AssetsPage() {
  return (
    <main className="absolute top-20 bottom-16 left-0 right-0 px-8 flex items-center justify-center">
        <div className="flex gap-8 justify-center items-center flex-wrap max-w-6xl">
          {ASSETS_CARDS.map((card) => (
            <TiltedCard
              key={card.id}
              imageSrc={card.imageSrc}
              altText={card.captionText}
              captionText={card.captionText}
              captionMaxWidth={card.captionMaxWidth}
              containerHeight="320px"
              containerWidth="240px"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              href={card.href}
            />
          ))}
        </div>
      </main>
  )
}