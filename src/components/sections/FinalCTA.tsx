import { ArrowButton } from '@/components/ui/ArrowButton'
import { Reveal } from '@/components/ui/Reveal'
import { PHOTO, photoSrcSet, photoUrl } from '@/lib/images'

export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 lg:py-32">
      <img
        src={photoUrl(PHOTO.dubaiAerial, 2000)}
        srcSet={photoSrcSet(PHOTO.dubaiAerial)}
        sizes="100vw"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.22]"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 -z-10 bg-ink/70" aria-hidden="true" />

      <div className="shell relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">The Next Step</p>
            <h2 className="display-lg mt-6 text-cream">
              Ready To Find
              <br />
              Your Place
              <br />
              In Dubai?
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-cream/70">
              Let&rsquo;s turn your next move into your best investment.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ArrowButton to="/properties" variant="gold" size="lg" className="w-full sm:w-auto">
                Explore Properties
              </ArrowButton>
              <ArrowButton to="/contact" variant="outline" size="lg" className="w-full sm:w-auto">
                Contact An Expert
              </ArrowButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
