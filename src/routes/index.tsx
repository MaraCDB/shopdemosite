import { useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Home, Mail } from 'lucide-react'
import { DemoCard } from '@/components/portfolio/DemoCard'
import { useReveal } from '@/components/portfolio/useReveal'

export const Route = createFileRoute('/')({
  component: PortfolioHome,
})

const personalSiteUrl = 'https://maramelchiori.it/'
const contactMailto = 'mailto:mara.melchiori@gmail.com'

const demos = [
  {
    to: '/demo/classic',
    title: 'Classic — Negozio locale',
    description:
      'Storefront pulito e versatile per una piccola impresa: catalogo, categorie, offerte, contatti.',
    image: '/resources/shop1.png',
    accent: '#2563eb',
  },
  {
    to: '/demo/nature',
    title: 'Nature — Bottega bio',
    description:
      'Negozio di cibo curato, biologico e del territorio. Stile botanico, caldo ed editoriale.',
    image: '/resources/002_green_benvenuti.png',
    accent: '#2f5d3a',
  },
]

const pageWidth = 'max-w-[1440px] mx-auto px-[clamp(20px,4vw,64px)] min-[901px]:px-[clamp(14px,2.8vw,45px)]'

function PortfolioHome() {
  const pageRef = useRef<HTMLDivElement>(null)
  useReveal(pageRef)

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-50 text-gray-900 pb-16 min-[901px]:pb-14">
      <header className="sticky top-0 z-10 bg-[#0b1220] text-gray-50">
        <div className={`${pageWidth} h-[60px] flex items-center justify-between gap-6`}>
          <a href={personalSiteUrl} className="font-extrabold tracking-tight">
            Mara Melchiori
          </a>
          <nav aria-label="Menu principale" className="hidden min-[901px]:block">
            <ul className="flex items-center gap-7 text-sm font-semibold uppercase tracking-[0.08em]">
              <li>
                <a href={personalSiteUrl} className="hover:text-blue-300 transition-colors">Home</a>
              </li>
              <li>
                <a href="/" aria-current="page" className="text-blue-300">Siti demo</a>
              </li>
              <li>
                <a href={contactMailto} className="hover:text-blue-300 transition-colors">Contatti</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="bg-gray-900 text-gray-50 py-[clamp(36px,4.1vw,66px)]">
        <div className={pageWidth}>
          <h1 className="text-[2.5rem] min-[901px]:text-[3.25rem] leading-none font-extrabold tracking-tight">
            Siti demo
          </h1>
          <p className="mt-5 max-w-[60ch] text-[1.0625rem] min-[901px]:text-lg leading-relaxed text-gray-300">
            Una raccolta di siti dimostrativi che ho realizzato. Ogni demo mostra
            uno stile e un'impostazione diversa. Dai un'occhiata.
          </p>
        </div>
      </section>

      <main>
        <ul
          className={`${pageWidth} my-[clamp(28px,3vw,48px)] grid grid-cols-2 min-[901px]:grid-cols-4 gap-x-1.5 gap-y-[clamp(18px,2vw,28px)]`}
        >
          {demos.map((demo) => (
            <DemoCard key={demo.to} {...demo} />
          ))}
        </ul>
      </main>

      <nav aria-label="Contatti" className="fixed inset-x-0 bottom-0 z-10 bg-[#0b1220] text-gray-50">
        <div className={`${pageWidth} h-16 min-[901px]:h-14 flex items-center justify-between gap-4`}>
          <div className="flex gap-4 min-[521px]:gap-6 text-sm font-semibold">
            <a href={personalSiteUrl} className="inline-flex items-center gap-1.5 hover:text-blue-300 transition-colors">
              <Home size={16} />
              Home
            </a>
            <a href={contactMailto} className="inline-flex items-center gap-1.5 hover:text-blue-300 transition-colors">
              <Mail size={16} />
              Scrivimi
            </a>
          </div>
          <a
            href={personalSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-md bg-blue-600 px-3.5 py-2 text-xs min-[521px]:px-5 min-[521px]:text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
          >
            Visita il mio sito
          </a>
        </div>
      </nav>
    </div>
  )
}
