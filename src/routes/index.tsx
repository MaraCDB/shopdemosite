import { createFileRoute, Link } from '@tanstack/react-router'
import { Carousel } from '@/components/Carousel'
import type { CarouselSlide } from '@/components/Carousel'
import { categories } from '@/data/products'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const heroSlides: CarouselSlide[] = [
  {
    image: '/resources/shop3.png',
    alt: 'Benvenuti da Small Business',
    caption: 'Benvenuti da Small Business',
    subcaption: 'Prodotti e servizi di qualità per la nostra comunità',
  },
  {
    image: '/resources/shop2.png',
    alt: 'I Nostri Prodotti',
    caption: 'Scopri i Nostri Prodotti',
    subcaption: 'Trova esattamente ciò che cerchi',
    href: '/products',
  },
  {
    image: '/resources/shop1.png',
    alt: 'Vieni a Trovarci',
    caption: 'Vieni a Trovarci',
    subcaption: 'Stazione FS di Rovereto — Lun–Ven 9:00–18:00',
    href: '/contact',
  },
]

function HomePage() {
  return (
    <div>
      {/* Hero Carousel */}
      <section className="px-4 py-6 max-w-6xl mx-auto">
        <Carousel slides={heroSlides} />
      </section>

      {/* Intro */}
      <section className="max-w-6xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Small Business</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
          Siamo un'attività a conduzione locale, dedicata alla nostra comunità con
          prodotti di qualità e un servizio impeccabile. Sfoglia il nostro catalogo qui sotto.
        </p>
      </section>

      {/* Product Categories */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Acquista per Categoria</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to="/products/category/$category"
              params={{ category: cat.slug }}
              className="group rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow bg-white"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
