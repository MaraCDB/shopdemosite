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
