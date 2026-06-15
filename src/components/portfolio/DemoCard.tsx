import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

interface DemoCardProps {
  to: string
  title: string
  description: string
  image: string
  accent: string
}

export function DemoCard({ to, title, description, image, accent }: DemoCardProps) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-gray-200 overflow-hidden bg-white hover:shadow-lg transition-shadow"
    >
      <div className="aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.visibility = 'hidden'
          }}
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span
            className="inline-flex items-center gap-1 text-sm font-medium"
            style={{ color: accent }}
          >
            Apri
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{description}</p>
      </div>
    </Link>
  )
}
