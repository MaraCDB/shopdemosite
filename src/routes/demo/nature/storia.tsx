import { createFileRoute } from '@tanstack/react-router'
import { storyIntro, storySections } from '@/demos/nature/data/story'

export const Route = createFileRoute('/demo/nature/storia')({
  component: NatureStory,
})

function NatureStory() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--primary)' }}>La nostra storia</h1>
      <p className="text-lg leading-relaxed text-[var(--text)] mb-10">{storyIntro}</p>
      <div className="space-y-10">
        {storySections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--primary)' }}>{s.heading}</h2>
            <p className="leading-relaxed text-[var(--muted)]">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
