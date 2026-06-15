import { createFileRoute, Link } from '@tanstack/react-router'
import { Carousel } from '@/components/ui/Carousel'
import type { CarouselSlide } from '@/components/ui/Carousel'
import { natureProducts } from '@/demos/nature/data/products'

export const Route = createFileRoute('/demo/nature/')({
  component: NatureHome,
})

const heroSlides: CarouselSlide[] = [
  {
    image: '/resources/002_green_benvenuti.png',
    alt: 'Benvenuti nella nostra bottega',
    caption: 'Buono, pulito e del territorio',
    subcaption: 'Cibo biologico selezionato dai piccoli produttori locali',
  },
  {
    image: '/resources/002_green_prodotti.png',
    alt: 'I nostri prodotti',
    caption: 'I nostri prodotti',
    subcaption: 'Una selezione curata, stagionale e a filiera corta',
    href: '/demo/nature/prodotti',
  },
  {
    image: '/resources/002_green_contattaci.png',
    alt: 'Contattaci',
    caption: 'Vieni a trovarci',
    subcaption: 'Ti aspettiamo in bottega a Rovereto',
    href: '/demo/nature/contatti',
  },
]

function NatureHome() {
  const featured = natureProducts.slice(0, 3)
  return (
    <div>
      {/* Carousel hero a tema */}
      <section className="max-w-6xl mx-auto px-4 pt-8">
        <Carousel slides={heroSlides} />
      </section>

      {/* Valori — tre blocchi */}
      <section className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { t: 'Filiera corta', d: 'Conosciamo di persona ogni produttore con cui lavoriamo.' },
          { t: 'Biologico vero', d: 'Prodotti certificati, stagionali, selezionati per qualità.' },
          { t: 'Il territorio', d: 'Sapori che raccontano le valli e i pascoli intorno a noi.' },
        ].map((b) => (
          <div key={b.t} className="rounded-[var(--radius)] border border-[var(--border)] p-6" style={{ background: 'var(--surface)' }}>
            <h3 className="font-semibold text-lg" style={{ color: 'var(--primary)' }}>{b.t}</h3>
            <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">{b.d}</p>
          </div>
        ))}
      </section>

      {/* Banner "vieni a trovarci" con immagine cassa */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <a href="/demo/nature/contatti" className="group block relative rounded-[var(--radius)] overflow-hidden" style={{ aspectRatio: '21/8' }}>
          <img src="/resources/002_green_cassa.png" alt="Vieni a trovarci in bottega" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-transparent flex flex-col justify-center p-6 md:p-10">
            <h2 className="text-white text-2xl md:text-3xl font-bold drop-shadow">Vieni a trovarci in bottega</h2>
            <p className="text-white/90 text-sm md:text-base mt-1 drop-shadow max-w-sm">Ti accogliamo con i sapori del territorio. Scopri dove siamo.</p>
          </div>
        </a>
      </section>

      {/* Prodotti in evidenza — layout asimmetrico */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary)' }}>In evidenza</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <Link
              key={p.id}
              to="/demo/nature/prodotti/$id"
              params={{ id: p.id }}
              className={`group rounded-[var(--radius)] border border-[var(--border)] overflow-hidden ${i === 0 ? 'md:col-span-2' : ''}`}
              style={{ background: 'var(--surface)' }}
            >
              <div className={`overflow-hidden bg-black/5 ${i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold" style={{ color: 'var(--text)' }}>{p.name}</h3>
                <p className="text-sm text-[var(--muted)] mt-1">{p.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
