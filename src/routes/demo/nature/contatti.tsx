import { createFileRoute } from '@tanstack/react-router'
import { MapPin, Clock, Mail } from 'lucide-react'

export const Route = createFileRoute('/demo/nature/contatti')({
  component: NatureContact,
})

function NatureContact() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>Contatti</h1>
      <p className="text-[var(--muted)] mb-8 max-w-xl">Passa a trovarci in bottega o scrivici: ti aspettiamo.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-5">
          <div className="flex items-start gap-3 rounded-[var(--radius)] border border-[var(--border)] p-5" style={{ background: 'var(--surface)' }}>
            <MapPin size={20} style={{ color: 'var(--primary)' }} className="mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Indirizzo</h3>
              <p className="text-sm text-[var(--muted)] mt-0.5">Stazione FS di Rovereto<br />Piazzale Orsi, 38068 Rovereto (TN)</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-[var(--radius)] border border-[var(--border)] p-5" style={{ background: 'var(--surface)' }}>
            <Clock size={20} style={{ color: 'var(--primary)' }} className="mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Orari</h3>
              <ul className="text-sm text-[var(--muted)] mt-0.5 space-y-0.5">
                <li>Mar – Sab: 8:30 – 19:00</li>
                <li>Domenica: 9:00 – 13:00</li>
                <li>Lunedì: Chiuso</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-[var(--radius)] border border-[var(--border)] p-5" style={{ background: 'var(--surface)' }}>
            <Mail size={20} style={{ color: 'var(--primary)' }} className="mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Email</h3>
              <a href="mailto:bottega@nature.demo" className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors">bottega@nature.demo</a>
            </div>
          </div>

          <form
            name="contatti-nature"
            method="POST"
            data-netlify="true"
            className="rounded-[var(--radius)] border border-[var(--border)] p-5 space-y-4"
            style={{ background: 'var(--surface)' }}
          >
            <input type="hidden" name="form-name" value="contatti-nature" />
            <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Scrivici</h3>
            <div>
              <label htmlFor="nome" className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Nome</label>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                placeholder="Il tuo nome"
                className="w-full border border-[var(--border)] rounded-[var(--radius)] px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2"
                style={{ color: 'var(--text)' }}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="tua@email.it"
                className="w-full border border-[var(--border)] rounded-[var(--radius)] px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2"
                style={{ color: 'var(--text)' }}
              />
            </div>
            <div>
              <label htmlFor="messaggio" className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Messaggio</label>
              <textarea
                id="messaggio"
                name="messaggio"
                required
                rows={4}
                placeholder="Come possiamo aiutarti?"
                className="w-full border border-[var(--border)] rounded-[var(--radius)] px-3 py-2 text-sm bg-transparent resize-none focus:outline-none focus:ring-2"
                style={{ color: 'var(--text)' }}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-[var(--radius)] py-2 px-4 text-sm font-semibold transition-colors"
              style={{ background: 'var(--primary)', color: 'var(--primary-contrast)' }}
            >
              Invia messaggio
            </button>
          </form>
        </div>
        <div className="rounded-[var(--radius)] overflow-hidden border border-[var(--border)] min-h-[360px]">
          <iframe
            title="Stazione FS di Rovereto"
            src="https://www.openstreetmap.org/export/embed.html?bbox=11.0206%2C45.8846%2C11.0406%2C45.8946&layer=mapnik&marker=45.8896%2C11.0306"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '360px' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}
