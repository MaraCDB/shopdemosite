import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

interface DemoCardProps {
  to: string
  title: string
  description: string
  image: string
  accent: string
}

/** Square photo tile for one demo: image on top, title and description below. */
export function DemoCard({ to, title, description, image, accent }: DemoCardProps) {
  return (
    <li data-reveal>
      <Link to={to} className="group grid gap-2.5">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.visibility = 'hidden'
            }}
          />
        </div>
        <div className="grid gap-0.5">
          <h3 className="text-xl min-[901px]:text-[1.375rem] font-bold leading-tight text-gray-900">
            {title}
            <ArrowUpRight
              size={18}
              className="inline ml-1 align-[-1px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              style={{ color: accent }}
            />
          </h3>
          <p className="text-[0.8125rem] leading-snug text-gray-500">{description}</p>
        </div>
      </Link>
    </li>
  )
}
