import { createFileRoute } from '@tanstack/react-router'
import { Carousel } from '@/components/Carousel'
import type { CarouselSlide } from '@/components/Carousel'
import products from '@/data/products'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const heroSlides: CarouselSlide[] = [
  {
    image: '/placeholder.png',
    alt: 'Welcome to Small Business',
    caption: 'Welcome to Small Business',
    subcaption: 'Quality products and services for our community',
  },
  {
    image: '/placeholder.png',
    alt: 'Our Products',
    caption: 'Explore Our Products',
    subcaption: 'Find exactly what you need',
  },
  {
    image: '/placeholder.png',
    alt: 'Get in Touch',
    caption: 'Visit Us Today',
    subcaption: '123 Main Street, Springfield — Mon–Fri 9am to 6pm',
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
          We're a locally owned business dedicated to serving our community with quality
          products and exceptional service. Browse our catalog below.
        </p>
      </section>

      {/* Products */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to="/products/$productId"
              params={{ productId: product.id.toString() }}
              className="group rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow bg-white"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.shortDescription}</p>
                <p className="text-lg font-bold text-gray-900 mt-2">${product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
