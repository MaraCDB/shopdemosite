import { createFileRoute, Link } from '@tanstack/react-router'
import { natureProducts } from '@/demos/nature/data/products'

export const Route = createFileRoute('/demo/nature/prodotti')({
  component: NatureProducts,
})

function NatureProducts() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>I nostri prodotti</h1>
      <p className="text-[var(--muted)] mb-10 max-w-xl">
        Una selezione curata di prodotti biologici e del territorio, dai nostri produttori di fiducia.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {natureProducts.map((p) => (
          <Link
            key={p.id}
            to="/demo/nature/prodotti/$id"
            params={{ id: p.id }}
            className="group rounded-[var(--radius)] border border-[var(--border)] overflow-hidden"
            style={{ background: 'var(--surface)' }}
          >
            <div className="aspect-[4/3] overflow-hidden bg-black/5">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold" style={{ color: 'var(--text)' }}>{p.name}</h3>
              <p className="text-sm text-[var(--muted)] mt-1 line-clamp-2">{p.shortDescription}</p>
              <p className="text-lg font-bold mt-2" style={{ color: 'var(--primary)' }}>{p.price.toLocaleString('it-IT')} €</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
