import { ArrowButton } from '@/components/ui/ArrowButton'

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-navy px-5 py-32">
      <div className="shell text-center">
        <p className="eyebrow text-gold-soft">404</p>
        <h1 className="display-lg mx-auto mt-5 max-w-2xl text-ivory">
          This address doesn’t exist.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[13.5px] leading-relaxed text-ivory/65">
          The page you were looking for has moved. Let’s get you back to the portfolio.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ArrowButton to="/" variant="gold" size="lg" pill>
            Return Home
          </ArrowButton>
          <ArrowButton to="/properties" variant="outline-light" size="lg" pill>
            View Properties
          </ArrowButton>
        </div>
      </div>
    </section>
  )
}
