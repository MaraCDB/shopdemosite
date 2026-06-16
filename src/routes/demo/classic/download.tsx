import { createFileRoute } from '@tanstack/react-router'
import { FileDown, FileText } from 'lucide-react'
import { useState } from 'react'

const files = [
  {
    id: 'catalog',
    name: 'Catalogo Prodotti 2026',
    description: 'Sfoglia il nostro catalogo completo con prezzi e caratteristiche.',
    file: '/files/catalog.pdf',
  },
  {
    id: 'brochure',
    name: 'Brochure Aziendale',
    description: 'Scopri di più sulla nostra storia, la nostra missione e i nostri valori.',
    file: '/files/brochure.pdf',
  },
]

export const Route = createFileRoute('/demo/classic/download')({
  component: DownloadPage,
})

function DownloadPage() {
  const [selected, setSelected] = useState(files[0])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-2">
        <FileText size={28} className="text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Download</h1>
      </div>
      <p className="text-gray-500 mb-10 max-w-xl">
        Visualizza e scarica i nostri documenti. Seleziona un file per
        l'anteprima, oppure usa il pulsante per scaricarlo direttamente.
      </p>

      {/* File selector */}
      <div className="flex flex-wrap gap-3 mb-6">
        {files.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelected(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              selected.id === f.id
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      {/* Selected file info + download */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {selected.name}
          </h2>
          <p className="text-sm text-gray-500">{selected.description}</p>
        </div>
        <a
          href={selected.file}
          download
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shrink-0"
        >
          <FileDown size={18} />
          Scarica PDF
        </a>
      </div>

      {/* PDF Viewer */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <iframe
          src={`${selected.file}#toolbar=1&navpanes=0`}
          title={selected.name}
          className="w-full h-[70vh]"
        />
      </div>
    </div>
  )
}
