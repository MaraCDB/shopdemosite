import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Mail } from 'lucide-react'
import { DemoCard } from '@/components/portfolio/DemoCard'

export const Route = createFileRoute('/')({
  component: PortfolioHome,
})

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
    image: '/resources/shop3.png',
    accent: '#2f5d3a',
  },
]

function PortfolioHome() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="max-w-5xl mx-auto px-4 pt-12 pb-8">
        <a
          href="https://mara-melchiori.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Torna al mio sito
        </a>
        <h1 className="text-4xl font-bold text-gray-900">Siti demo</h1>
        <p className="text-gray-500 mt-2 max-w-xl">
          Una raccolta di siti dimostrativi che ho realizzato. Ogni demo mostra
          uno stile e un'impostazione diversa. Dai un'occhiata.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {demos.map((d) => (
            <DemoCard key={d.to} {...d} />
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            Sito demo creato da Mara. Realizzo siti su misura, con pacchetti
            anche per piccole imprese.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://mara-melchiori.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
            >
              Visita il mio sito
            </a>
            <a
              href="mailto:mara.melchiori@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-500 transition-colors"
            >
              <Mail size={16} />
              Contattami
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
