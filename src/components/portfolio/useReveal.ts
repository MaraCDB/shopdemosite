import { useEffect, type RefObject } from 'react'

/**
 * Fades in every `[data-reveal]` element inside the root the first time it scrolls into view.
 * Content stays visible without JavaScript: hiding starts only once the root gets `reveal-ready`.
 */
export function useReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          revealObserver.unobserve(entry.target)
        }
      },
      { threshold: 0.15 },
    )
    root.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element))
    root.classList.add('reveal-ready')
    return () => revealObserver.disconnect()
  }, [rootRef])
}
