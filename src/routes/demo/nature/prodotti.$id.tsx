import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { natureProducts } from '@/demos/nature/data/products'
import { partners } from '@/demos/nature/data/partners'

export const Route = createFileRoute('/demo/nature/prodotti/$id')({
  component: NatureProductDetail,
  loader: ({ params }) => {
    const product = natureProducts.find((p) => p.id === params.id)
    if (!product) throw notFound()
    const producer = partners.find((p) => p.id === product.producerId) ?? null
    return { product, producer }
  },
})

function NatureProductDetail() {
  const { product, producer } = Route.useLoaderData()
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link to="/demo/nature/prodotti" className="inline-block mb-6 text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
        &larr; Torna ai prodotti
      </Link>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full rounded-[var(--radius)] object-cover" />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>{product.name}</h1>
          <p className="mt-4 text-[var(--text)] leading-relaxed">{product.description}</p>
          {producer && (
            <p className="mt-4 text-sm text-[var(--muted)]">
              Produttore: <strong style={{ color: 'var(--text)' }}>{producer.name}</strong> — {producer.area}
            </p>
          )}
          <p className="text-2xl font-bold mt-6" style={{ color: 'var(--primary)' }}>{product.price.toLocaleString('it-IT')} €</p>
        </div>
      </div>
    </div>
  )
}
