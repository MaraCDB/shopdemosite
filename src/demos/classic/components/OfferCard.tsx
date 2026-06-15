import { Calendar, Share2, Download, MessageCircle } from 'lucide-react'
import type { Offer } from '@/demos/classic/data/offers'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('it-IT', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function isExpired(expiryDate: string) {
  return new Date(expiryDate) < new Date()
}

function isUpcoming(startDate: string) {
  return new Date(startDate) > new Date()
}

export function OfferCard({ offer }: { offer: Offer }) {
  const expired = isExpired(offer.expiryDate)
  const upcoming = isUpcoming(offer.startDate)

  const shareText = `${offer.title} - ${offer.description}`
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: offer.title, text: shareText, url: shareUrl })
    } else {
      handleShareFacebook()
    }
  }

  function handleShareWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  function handleShareFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  function handleDownloadVoucher() {
    const canvas = document.createElement('canvas')
    canvas.width = 800
    canvas.height = 400
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Background
    ctx.fillStyle = '#1f2937'
    ctx.fillRect(0, 0, 800, 400)

    // Accent bar
    ctx.fillStyle = '#3b82f6'
    ctx.fillRect(0, 0, 800, 6)

    // Discount label
    if (offer.discountLabel) {
      ctx.fillStyle = '#3b82f6'
      ctx.font = 'bold 48px system-ui, sans-serif'
      ctx.fillText(offer.discountLabel, 40, 70)
    }

    // Title
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 28px system-ui, sans-serif'
    ctx.fillText(offer.title, 40, 130)

    // Description (wrap text)
    ctx.fillStyle = '#d1d5db'
    ctx.font = '16px system-ui, sans-serif'
    const words = offer.description.split(' ')
    let line = ''
    let y = 170
    for (const word of words) {
      const test = line + word + ' '
      if (ctx.measureText(test).width > 720) {
        ctx.fillText(line, 40, y)
        line = word + ' '
        y += 24
      } else {
        line = test
      }
    }
    ctx.fillText(line, 40, y)

    // Voucher code
    if (offer.voucherCode) {
      ctx.strokeStyle = '#6b7280'
      ctx.setLineDash([6, 4])
      ctx.strokeRect(40, 280, 300, 50)
      ctx.setLineDash([])
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 22px monospace'
      ctx.fillText(`CODICE: ${offer.voucherCode}`, 60, 313)
    }

    // Dates
    ctx.fillStyle = '#9ca3af'
    ctx.font = '14px system-ui, sans-serif'
    ctx.fillText(
      `Valido: ${formatDate(offer.startDate)} – ${formatDate(offer.expiryDate)}`,
      40,
      370,
    )

    // Convert to PDF-like downloadable image
    const link = document.createElement('a')
    link.download = `voucher-${offer.voucherCode || offer.id}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div
      className={`rounded-xl border overflow-hidden bg-white transition-shadow hover:shadow-md ${
        expired ? 'opacity-60 border-gray-200' : 'border-gray-200'
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover"
        />
        {offer.discountLabel && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {offer.discountLabel}
          </span>
        )}
        {expired && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Scaduta
          </span>
        )}
        {upcoming && !expired && (
          <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Prossimamente
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{offer.title}</h3>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">{offer.description}</p>

        {/* Dates */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            Dal {formatDate(offer.startDate)}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            Al {formatDate(offer.expiryDate)}
          </span>
        </div>

        {/* Voucher code */}
        {offer.voucherCode && (
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg px-4 py-2 mb-4 text-center">
            <span className="text-xs text-gray-400 block">Codice Voucher</span>
            <span className="text-lg font-mono font-bold text-gray-800 tracking-wider">
              {offer.voucherCode}
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Share2 size={15} />
            Condividi
          </button>
          <button
            onClick={handleShareWhatsApp}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <MessageCircle size={15} />
            WhatsApp
          </button>
          <button
            onClick={handleDownloadVoucher}
            disabled={expired}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={15} />
            Scarica Voucher
          </button>
        </div>
      </div>
    </div>
  )
}
