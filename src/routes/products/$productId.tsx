import { Link, createFileRoute } from '@tanstack/react-router'
import products, { categories } from '../../data/products'

export const Route = createFileRoute('/products/$productId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const product = products.find(
      (product) => product.id === +params.productId,
    )
    if (!product) {
      throw new Error('Product not found')
    }
    const category = categories.find((c) => c.slug === product.category)
    return { product, category }
  },
})

function RouteComponent() {
  const { product, category } = Route.useLoaderData()

  return (
    <div className="flex flex-col md:flex-row gap-8 p-5">
      <div className="w-full md:w-[55%]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-2xl object-cover"
        />
      </div>

      <div className="w-full md:w-[45%] p-8">
        {category ? (
          <Link
            to="/products/category/$category"
            params={{ category: category.slug }}
            className="inline-block mb-4 text-gray-500 hover:text-gray-900 transition-colors"
          >
            &larr; Torna a {category.name}
          </Link>
        ) : (
          <Link to="/products" className="inline-block mb-4 text-gray-500 hover:text-gray-900 transition-colors">
            &larr; Torna ai prodotti
          </Link>
        )}
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="mb-6">{product.description}</p>
        <div className="text-2xl font-bold">
          {product.price.toLocaleString('it-IT')} €
        </div>
      </div>
    </div>
  )
}
