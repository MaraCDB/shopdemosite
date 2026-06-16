import { createFileRoute, Link } from '@tanstack/react-router'
import products, { categories } from '@/demos/classic/data/products'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/demo/classic/products/category/$category')({
  component: CategoryPage,
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.category)
    if (!category) {
      throw new Error('Category not found')
    }
    const categoryProducts = products.filter(
      (p) => p.category === params.category,
    )
    return { category, products: categoryProducts }
  },
})

function CategoryPage() {
  const { category, products } = Route.useLoaderData()

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link
        to="/demo/classic/products"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Tutte le Categorie
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
      <p className="text-gray-500 mb-10 max-w-xl">{category.description}</p>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">Nessun prodotto in questa categoria al momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to="/demo/classic/products/$productId"
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
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {product.shortDescription}
                </p>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  {product.price.toLocaleString('it-IT')} €
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
