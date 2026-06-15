import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export interface CarouselSlide {
  image: string
  alt: string
  caption?: string
  subcaption?: string
  /** Optional route to navigate to when the slide is clicked. */
  href?: string
}

interface CarouselProps {
  slides: CarouselSlide[]
  autoplayMs?: number
}

export function Carousel({ slides, autoplayMs = 5000 }: CarouselProps) {
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), [slides.length])
  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [slides.length])

  useEffect(() => {
    const timer = setInterval(next, autoplayMs)
    return () => clearInterval(timer)
  }, [next, autoplayMs])

  if (!slides.length) return null

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-gray-100" style={{ aspectRatio: '16/7' }}>
      {/* Slides */}
      {slides.map((slide, i) => {
        const content = (
          <>
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            {(slide.caption || slide.subcaption) && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 md:p-10">
                {slide.caption && (
                  <h2 className="text-white text-2xl md:text-4xl font-bold drop-shadow">{slide.caption}</h2>
                )}
                {slide.subcaption && (
                  <p className="text-white/85 text-sm md:text-base mt-1 drop-shadow">{slide.subcaption}</p>
                )}
              </div>
            )}
          </>
        )

        return (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? 'auto' : 'none' }}
          >
            {slide.href ? (
              <Link to={slide.href} className="block w-full h-full group">
                {content}
              </Link>
            ) : (
              content
            )}
          </div>
        )
      })}

      {/* Prev / Next Buttons */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all ${i === current ? 'bg-white w-5 h-2' : 'bg-white/50 w-2 h-2'}`}
          />
        ))}
      </div>
    </div>
  )
}
