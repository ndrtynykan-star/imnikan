import { Link, useParams } from 'react-router-dom'
import { BlogCard } from '@/components/blog/BlogCard'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { Reveal } from '@/components/ui/Reveal'
import { SmartImage } from '@/components/ui/SmartImage'
import { getPostBySlug, relatedPosts } from '@/data/blog'
import { HIGH_PRIORITY, photoSrcSet, photoUrl } from '@/lib/images'

function NotFoundPost() {
  return (
    <section className="bg-navy px-5 pb-24 pt-40 text-center lg:pt-48">
      <p className="eyebrow text-gold-soft">404</p>
      <h1 className="display-md mt-5 text-ivory">That article has moved.</h1>
      <div className="mt-9 flex justify-center">
        <ArrowButton to="/blog" variant="gold" pill>
          Back to the Journal
        </ArrowButton>
      </div>
    </section>
  )
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) return <NotFoundPost />

  const related = relatedPosts(post)

  return (
    <>
      <section className="relative isolate flex min-h-[480px] items-end overflow-hidden bg-navy">
        <img
          src={photoUrl(post.image, 1920)}
          srcSet={photoSrcSet(post.image)}
          sizes="100vw"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          {...HIGH_PRIORITY}
          decoding="async"
        />
        <div className="absolute inset-0 -z-10 bg-navy/75" aria-hidden="true" />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/65 to-navy/25"
          aria-hidden="true"
        />

        <div className="shell relative pb-14 pt-32 lg:pb-16 lg:pt-40">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[10.5px] uppercase tracking-label text-ivory/50"
          >
            <Link to="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/blog" className="transition-colors hover:text-gold">
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ivory/80">{post.category}</span>
          </nav>

          <p className="eyebrow mt-7 text-gold-soft">{post.category}</p>
          <h1 className="display-lg mt-4 max-w-3xl text-ivory">{post.title}</h1>
          <p className="mt-5 text-[11.5px] uppercase tracking-label text-ivory/55">
            {post.date} · {post.readMinutes} min read · {post.author}
          </p>
        </div>
      </section>

      <section className="bg-warm py-16 lg:py-20">
        <div className="shell">
          <article className="mx-auto max-w-3xl">
            <p className="font-display text-[1.3rem] leading-[1.6] text-ink">{post.excerpt}</p>
            <div className="mt-8 h-px w-16 bg-gold" aria-hidden="true" />

            {post.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mt-7 text-[14px] leading-[1.95] text-muted">
                {paragraph}
              </p>
            ))}

            <div className="mt-12 border-t border-ink/10 pt-8">
              <p className="text-[10.5px] uppercase tracking-label text-muted">Written by</p>
              <p className="mt-2 font-display text-[1.15rem] text-ink">{post.author}</p>
            </div>

            <div className="mt-10">
              <ArrowButton to="/blog" variant="outline">
                Back to the Journal
              </ArrowButton>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-ivory py-20">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Keep Reading</p>
            <h2 className="display-md mt-4 text-ink">Related Articles</h2>
          </Reveal>

          <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 90}>
                <BlogCard post={item} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
