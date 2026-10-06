import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SmartImage } from '@/components/ui/SmartImage'
import { TESTIMONIALS } from '@/data/content'
import { PHOTO } from '@/lib/images'

export function TestimonialSlider() {
  const [index, setIndex] = useState(0)
  const total = TESTIMONIALS.length
  const testimonial = TESTIMONIALS[index]

  const go = (delta: number) => setIndex((current) => (current + delta + total) % total)

  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Client Stories</p>
              <h2 className="display-lg mt-4 text-ink">What Our Clients Say</h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-400 ease-luxury hover:border-gold hover:bg-gold hover:text-navy"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-400 ease-luxury hover:border-gold hover:bg-gold hover:text-navy"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid border border-ink/10 bg-warm lg:grid-cols-[1.35fr_1fr]">
            <blockquote className="p-8 sm:p-11 lg:p-14">
              <span className="font-display text-[3rem] leading-none text-gold" aria-hidden="true">
                &ldquo;
              </span>
              <p className="mt-2 font-display text-[1.35rem] leading-[1.5] text-ink sm:text-[1.6rem]">
                {testimonial.quote}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-5 border-t border-ink/10 pt-7">
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  <SmartImage
                    id={testimonial.portrait}
                    alt={`Portrait of ${testimonial.name}`}
                    sizes="56px"
                    className="h-full w-full object-cover"
                  />
                </span>
                <div>
                  <p className="font-display text-[1.05rem] text-ink">{testimonial.name}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-label text-muted">
                    {testimonial.role}
                  </p>
                </div>

                <div
                  className="ml-auto flex items-center gap-1"
                  aria-label={`Rated ${testimonial.rating} out of 5`}
                >
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star
                      key={star}
                      className={
                        star < testimonial.rating
                          ? 'h-3.5 w-3.5 fill-gold text-gold'
                          : 'h-3.5 w-3.5 text-ink/20'
                      }
                      strokeWidth={1.4}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              <div className="mt-7 flex items-center gap-2" aria-hidden="true">
                {TESTIMONIALS.map((item, dot) => (
                  <span
                    key={item.name}
                    className={[
                      'h-1.5 rounded-full transition-all duration-400 ease-luxury',
                      dot === index ? 'w-7 bg-gold' : 'w-1.5 bg-ink/20',
                    ].join(' ')}
                  />
                ))}
              </div>
            </blockquote>

            <div className="relative min-h-[320px] overflow-hidden">
              <SmartImage
                id={PHOTO.about}
                alt="Luxury Dubai residential community with a pool at dusk"
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-navy/45" aria-hidden="true" />
              <p className="absolute inset-x-8 bottom-9 font-script text-[2rem] leading-tight text-ivory sm:text-[2.4rem]">
                People
                <br />
                Place
                <br />
                Possibilities
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
