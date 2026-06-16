import { Link } from '@tanstack/react-router'
import { Facebook, Instagram, Twitter, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/demo/classic" className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:text-gray-700 transition-colors">
          <img src="/resources/logo.png" alt="Business Logo" className="h-16 w-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/demo/classic" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors [&.active]:text-gray-900 [&.active]:font-semibold">
            Home
          </Link>
          <Link to="/demo/classic/products" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors [&.active]:text-gray-900 [&.active]:font-semibold">
            Prodotti
          </Link>
          <Link to="/demo/classic/offers" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors [&.active]:text-gray-900 [&.active]:font-semibold">
            Offerte
          </Link>
          <Link to="/demo/classic/contact" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors [&.active]:text-gray-900 [&.active]:font-semibold">
            Contatti
          </Link>
          <Link to="/demo/classic/download" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors [&.active]:text-gray-900 [&.active]:font-semibold">
            Download
          </Link>
        </nav>

        {/* Social Links */}
        <div className="hidden md:flex items-center gap-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-blue-600 transition-colors">
            <Facebook size={18} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-pink-600 transition-colors">
            <Instagram size={18} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="text-gray-400 hover:text-sky-500 transition-colors">
            <Twitter size={18} />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <Link to="/demo/classic" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/demo/classic/products" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Prodotti</Link>
          <Link to="/demo/classic/offers" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Offerte</Link>
          <Link to="/demo/classic/contact" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Contatti</Link>
          <Link to="/demo/classic/download" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Download</Link>
          <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Facebook size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-pink-600 transition-colors">
              <Instagram size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="text-gray-400 hover:text-sky-500 transition-colors">
              <Twitter size={18} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
