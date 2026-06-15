import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, ArrowUpRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Business Info */}
        <div>
          <h3 className="text-white font-bold text-lg mb-1">Small Business</h3>
          <p className="text-sm font-medium text-gray-300 mb-3">Demo Studio Site</p>
          <p className="text-sm leading-relaxed text-gray-400">
            Sito demo creato da Mara. Realizzo siti web su misura — come li
            vuoi tu — con pacchetti pensati anche per piccole imprese e attività
            locali.
          </p>
          <p className="text-sm leading-relaxed text-gray-400 mt-3">
            Per informazioni e preventivi:
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href="https://mara-melchiori.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-colors hover:bg-gray-200"
            >
              Visita il mio sito
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="mailto:mara.melchiori@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold text-gray-200 transition-colors hover:border-gray-400 hover:text-white"
            >
              <Mail size={16} />
              Contattami
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contatti</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" />
              <span>Stazione FS di Rovereto<br />Piazzale Orsi, 38068 Rovereto (TN)</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-gray-400" />
              <a href="tel:+15551234567" className="hover:text-white transition-colors">(555) 123-4567</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-gray-400" />
              <a href="mailto:hello@smallbusiness.com" className="hover:text-white transition-colors">hello@smallbusiness.com</a>
            </li>
          </ul>
        </div>

        {/* Hours + Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Orari</h3>
          <ul className="space-y-1 text-sm text-gray-400 mb-5">
            <li className="flex justify-between gap-4"><span>Lun – Ven</span><span>9:00 – 18:00</span></li>
            <li className="flex justify-between gap-4"><span>Sabato</span><span>10:00 – 16:00</span></li>
            <li className="flex justify-between gap-4"><span>Domenica</span><span>Chiuso</span></li>
          </ul>
          <div className="flex items-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Facebook size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-pink-400 transition-colors">
              <Instagram size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="text-gray-400 hover:text-sky-400 transition-colors">
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} Small Business. Tutti i diritti riservati.
      </div>
    </footer>
  )
}
