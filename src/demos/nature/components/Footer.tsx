import { MapPin, Clock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-16" style={{ background: 'var(--primary)', color: 'var(--primary-contrast)' }}>
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-3">Bottega Nature</h3>
          <p className="text-sm opacity-90 leading-relaxed">
            Cibo curato, biologico e del territorio. Selezioniamo ogni giorno il
            meglio dai piccoli produttori locali.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2"><MapPin size={16} /> Dove siamo</h3>
          <p className="text-sm opacity-90">Stazione FS di Rovereto<br />Piazzale Orsi, 38068 Rovereto (TN)</p>
        </div>
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2"><Clock size={16} /> Orari</h3>
          <ul className="text-sm opacity-90 space-y-1">
            <li>Mar – Sab: 8:30 – 19:00</li>
            <li>Domenica: 9:00 – 13:00</li>
            <li>Lunedì: Chiuso</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/20 text-center py-4 text-xs opacity-80">
        © {new Date().getFullYear()} Bottega Nature — demo
      </div>
    </footer>
  )
}
