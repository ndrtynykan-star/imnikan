import { useMemo, useState } from 'react'
import { BlogCard } from '@/components/blog/BlogCard'
import { PageHero } from '@/components/sections/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { BLOG_CATEGORIES, POSTS } from '@/data/blog'
import { PHOTO } from '@/lib/images'

export default function Blog() {
  const [category, setCategory] = useState<string>('')

  const posts = useMemo(
    () => (category ? POSTS.filter((post) => post.category === category) : POSTS),
    [category],
  )

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Insight From the Dubai Market."
        description="Market analysis, investment strategy and lifestyle guides from the Dubai House advisory team."
        imageId={PHOTO.downtown}
        imageAlt="Dubai skyline at dusk"
      />

      <section className="bg-warm py-14 lg:py-20">
        <div className="shell">
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setCategory('')}
              aria-pressed={category === ''}
              className={[
                'rounded-full px-5 py-2.5 text-[10.5px] font-medium uppercase tracking-label transition-all duration-400 ease-luxury',
                category === ''
                  ? 'bg-navy text-ivory'
                  : 'border border-ink/15 text-ink/70 hover:border-gold hover:text-gold-deep',
              ].join(' ')}
            >
              All
            </button>
            {BLOG_CATEGORIES.map((item) => {
              const active = category === item
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={active}
                  className={[
                    'rounded-full px-5 py-2.5 text-[10.5px] font-medium uppercase tracking-label transition-all duration-400 ease-luxury',
                    active
                      ? 'bg-navy text-ivory'
                      : 'border border-ink/15 text-ink/70 hover:border-gold hover:text-gold-deep',
                  ].join(' ')}
                >
                  {item}
                </button>
              )
            })}
          </div>

          <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={Math.min(index, 5) * 70}>
                <BlogCard post={post} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
