import { ArrowButton } from '@/components/ui/ArrowButton'

export default function NotFound() {
  return (
    <section className="bg-ink px-5 pb-28 pt-44 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display-lg mx-auto mt-6 max-w-2xl text-cream">
        This address doesn&rsquo;t exist.
      </h1>
      <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted">
        The page you were looking for has moved. Let&rsquo;s get you back to the portfolio.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <ArrowButton to="/" variant="gold" size="lg">
          Return Home
        </ArrowButton>
        <ArrowButton to="/properties" variant="outline" size="lg">
          View Properties
        </ArrowButton>
      </div>
    </section>
  )
}
