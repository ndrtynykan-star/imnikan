import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SmartImage } from '@/components/ui/SmartImage'
import { CATEGORIES } from '@/data/content'

export function ExploreCategories() {
  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Browse"
            title="Explore by Category"
            description="Find a property that fits your lifestyle or investment goals."
            action={{ label: 'View All', to: '/properties' }}
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {CATEGORIES.map((category, index) => (
            <Reveal
              key={category.name}
              delay={index * 70}
              className={index === CATEGORIES.length - 1 ? 'col-span-2 sm:col-span-1' : ''}
            >
              <Link
                to={`/properties?type=${encodeURIComponent(category.name)}`}
                className="group flex h-full flex-col border border-ink/10 bg-warm transition-[transform,border-color,box-shadow] duration-400 ease-luxury hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <SmartImage
                    id={category.image}
                    alt={`${category.name} in Dubai`}
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-luxury group-hover:scale-[1.07]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.15rem] text-ink transition-colors duration-400 ease-luxury group-hover:text-gold-deep">
                    {category.name}
                  </h3>
                  <p className="mt-1.5 text-[12px] text-muted">{category.description}</p>

                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="text-[10px] uppercase tracking-label text-muted">
                      {category.count} listings
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-400 ease-luxury group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
