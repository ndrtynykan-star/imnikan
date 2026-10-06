import { MapPin, Quote, Star } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { TESTIMONIALS } from '@/data/content'

export function Testimonials() {
  return (
    <section className="bg-ink py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Client Experience</p>
              <h2 className="display-lg mt-5 text-cream">What Our Clients Say</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-3.5 w-3.5 fill-champagne text-champagne" />
                ))}
              </div>
              <p className="text-[11px] uppercase tracking-label text-muted">
                4.9 average · 180 reviews
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 110}>
              <figure className="group flex h-full flex-col border border-white/[0.08] bg-ink-800 p-7 transition-all duration-500 ease-luxury hover:-translate-y-1 hover:border-champagne/35">
                <Quote className="h-6 w-6 text-champagne/60" strokeWidth={1.25} aria-hidden="true" />

                <blockquote className="mt-6 flex-1 font-display text-[1.05rem] leading-relaxed text-cream/90">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="mt-7 flex gap-1" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-3 w-3 fill-champagne text-champagne" aria-hidden="true" />
                  ))}
                </div>

                <figcaption className="mt-5 border-t border-white/[0.08] pt-5">
                  <p className="text-[13px] font-medium text-cream">{testimonial.name}</p>
                  <p className="mt-1.5 text-[11px] uppercase tracking-label text-muted">
                    {testimonial.role}
                  </p>
                  <p className="mt-3 flex items-center gap-1.5 text-[11.5px] text-muted/80">
                    <MapPin className="h-3.5 w-3.5 text-champagne/70" aria-hidden="true" />
                    {testimonial.location}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
