import { createFileRoute } from '@tanstack/react-router'
import { partners } from '@/demos/nature/data/partners'

export const Route = createFileRoute('/demo/nature/marchi')({
  component: NaturePartners,
})

function NaturePartners() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>I nostri marchi</h1>
      <p className="text-[var(--muted)] mb-10 max-w-xl">
        I produttori del territorio con cui collaboriamo. Persone vere, di cui ci fidiamo.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {partners.map((p) => (
          <div key={p.id} className="flex items-center gap-4 rounded-[var(--radius)] border border-[var(--border)] p-5" style={{ background: 'var(--surface)' }}>
            <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden bg-black/5 flex items-center justify-center">
              <img src={p.logo} alt={p.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--text)' }}>{p.name}</h3>
              <p className="text-xs uppercase tracking-wide text-[var(--accent)]">{p.area}</p>
              <p className="text-sm text-[var(--muted)] mt-1">{p.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
