import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Post } from '@/data/blog'
import { SmartImage } from '@/components/ui/SmartImage'

type Props = {
  post: Post
  className?: string
  sizes?: string
}

export function BlogCard({
  post,
  className = '',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
}: Props) {
  return (
    <article
      className={[
        'group flex flex-col border border-ink/10 bg-warm transition-[transform,box-shadow,border-color] duration-400 ease-luxury',
        'hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-card',
        className,
      ].join(' ')}
    >
      <Link to={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden" tabIndex={-1}>
        <SmartImage
          id={post.image}
          alt={post.title}
          sizes={sizes}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-luxury group-hover:scale-[1.06]"
        />
        <span className="absolute left-0 top-5 bg-gold px-3.5 py-1.5 text-[9.5px] font-semibold uppercase tracking-label text-navy">
          {post.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[10.5px] uppercase tracking-label text-muted">
          {post.date} · {post.readMinutes} min read
        </p>

        <h3 className="mt-3.5 font-display text-[1.25rem] leading-snug text-ink">
          <Link
            to={`/blog/${post.slug}`}
            className="transition-colors duration-400 ease-luxury hover:text-gold-deep"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-3.5 text-[13px] leading-relaxed text-muted">{post.excerpt}</p>

        <Link
          to={`/blog/${post.slug}`}
          className="group/link mt-auto inline-flex items-center gap-2 pt-6 text-[10.5px] font-semibold uppercase tracking-label text-ink transition-colors duration-400 ease-luxury hover:text-gold-deep"
        >
          Read Article
          <ArrowRight
            className="h-3.5 w-3.5 text-gold transition-transform duration-400 ease-luxury group-hover/link:translate-x-1"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  )
}
