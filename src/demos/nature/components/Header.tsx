import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const nav = [
  { to: '/demo/nature', label: 'Home' },
  { to: '/demo/nature/prodotti', label: 'Prodotti' },
  { to: '/demo/nature/marchi', label: 'Marchi' },
  { to: '/demo/nature/storia', label: 'La nostra storia' },
  { to: '/demo/nature/contatti', label: 'Contatti' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 bg-[var(--bg)]/90 backdrop-blur border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/demo/nature" className="flex items-center gap-2">
          <img
            src="/resources/002_green_logo.png"
            alt="Bottega Nature"
            className="h-12 w-auto"
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)] transition-colors [&.active]:text-[var(--primary)]"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          className="md:hidden text-[var(--text)]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[var(--border)] px-4 py-4 flex flex-col gap-3 bg-[var(--bg)]">
          {nav.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[var(--text)] font-medium"
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
