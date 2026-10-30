import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export const Route = createFileRoute('/demo/classic/contact')({
  component: ContactPage,
})

function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Contatti</h1>
      <p className="text-gray-500 mb-8">Ci farebbe piacere sentirti. Passa a trovarci, chiama o inviaci un messaggio.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                <MapPin size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Indirizzo</h3>
                <p className="text-gray-500 text-sm mt-0.5">Stazione FS di Rovereto<br />Piazzale Orsi, 38068 Rovereto (TN)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                <Phone size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Telefono</h3>
                <a href="tel:+15551234567" className="text-gray-500 text-sm mt-0.5 hover:text-gray-900 transition-colors">
                  (555) 123-4567
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                <Mail size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <a href="mailto:hello@smallbusiness.com" className="text-gray-500 text-sm mt-0.5 hover:text-gray-900 transition-colors">
                  hello@smallbusiness.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                <Clock size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Orari</h3>
                <ul className="text-gray-500 text-sm mt-0.5 space-y-0.5">
                  <li>Lun – Ven: 9:00 – 18:00</li>
                  <li>Sabato: 10:00 – 16:00</li>
                  <li>Domenica: Chiuso</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Inviaci un Messaggio</h2>
            <form
              name="contact"
              onSubmit={(event) => {
                event.preventDefault()
                setIsSubmitted(true)
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Il tuo nome"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Messaggio</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Come possiamo aiutarti?"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white rounded-lg py-2 px-4 text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Invia Messaggio
              </button>
              {isSubmitted && (
                <p role="status" className="text-sm text-gray-500">Questa è una demo, il messaggio non viene inviato.</p>
              )}
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-xl overflow-hidden border border-gray-200 h-full min-h-[400px]">
          <iframe
            title="Stazione FS di Rovereto"
            src="https://www.openstreetmap.org/export/embed.html?bbox=11.0206%2C45.8846%2C11.0406%2C45.8946&layer=mapnik&marker=45.8896%2C11.0306"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '400px' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="bg-white px-4 py-2 text-xs text-gray-400 text-center">
            Dati mappa © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">OpenStreetMap</a> contributori
          </div>
        </div>
      </div>
    </div>
  )
}
