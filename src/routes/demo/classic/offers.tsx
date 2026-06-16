import { createFileRoute } from '@tanstack/react-router'
import offers from '@/demos/classic/data/offers'
import { OfferCard } from '@/demos/classic/components/OfferCard'
import { Tag } from 'lucide-react'

export const Route = createFileRoute('/demo/classic/offers')({
  component: OffersPage,
})

function OffersPage() {
  const now = new Date()
  const active = offers.filter(
    (o) => new Date(o.startDate) <= now && new Date(o.expiryDate) >= now,
  )
  const upcoming = offers.filter((o) => new Date(o.startDate) > now)
  const expired = offers.filter((o) => new Date(o.expiryDate) < now)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-2">
        <Tag size={28} className="text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Novità e Offerte</h1>
      </div>
      <p className="text-gray-500 mb-10 max-w-xl">
        Scopri le nostre ultime promozioni e offerte speciali. Scarica i voucher da usare in negozio o condividi con gli amici!
      </p>

      {active.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Offerte Attive</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {active.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Prossimamente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </section>
      )}

      {expired.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Offerte Passate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expired.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </section>
      )}

      {offers.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">Nessuna offerta disponibile al momento. Torna presto a trovarci!</p>
        </div>
      )}
    </div>
  )
}
