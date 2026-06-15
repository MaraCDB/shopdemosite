import { createFileRoute, Link } from '@tanstack/react-router'
import { categories } from '@/data/products'
import { ShoppingBag } from 'lucide-react'

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
})

function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-2">
        <ShoppingBag size={28} className="text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">I Nostri Prodotti</h1>
      </div>
      <p className="text-gray-500 mb-10 max-w-xl">
        Sfoglia le categorie di prodotti per trovare esattamente ciò che cerchi.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to="/products/category/$category"
            params={{ category: cat.slug }}
            className="group rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow bg-white"
          >
            <div className="aspect-[16/9] overflow-hidden bg-gray-100">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {cat.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                {cat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
