import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export function DemoBar() {
  return (
    <div className="w-full bg-gray-900 text-gray-200 text-xs">
      <div className="max-w-6xl mx-auto px-4 h-9 flex items-center justify-between">
        <span className="text-gray-400">Demo realizzata da Mara</span>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          Tutte le demo
        </Link>
      </div>
    </div>
  )
}
