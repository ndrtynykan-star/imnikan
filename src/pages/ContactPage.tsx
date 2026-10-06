import { ContactForm } from '@/components/contact/ContactForm'
import { PageHero } from '@/components/sections/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { CONTACT } from '@/data/content'
import { PHOTO } from '@/lib/images'

const FAQ = [
  {
    q: 'Can foreign nationals buy freehold property in Dubai?',
    a: 'Yes. Freehold ownership is available to all nationalities in designated zones, and purchases above AED 2M qualify for a renewable ten-year Golden Visa.',
  },
  {
    q: 'What are the transaction costs?',
    a: 'Budget 4% Dubai Land Department transfer fee, plus approximately 2% for agency and administrative costs. There is no annual property tax.',
  },
  {
    q: 'How quickly can a purchase complete?',
    a: 'A cash acquisition typically completes in seven to fourteen working days once terms are agreed; mortgaged purchases take three to five weeks.',
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s Talk About Your Next Move."
        description={`Our Dubai office is open ${CONTACT.hours}. International clients are welcome to request an out-of-hours call.`}
        imageId={PHOTO.lobby}
        imageAlt="Luxury hotel lobby interior in Dubai"
      />

      <section className="bg-warm py-16 lg:py-24">
        <div className="shell">
          <ContactForm />
        </div>
      </section>

      <section className="bg-ivory py-20 lg:py-24">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Good To Know</p>
            <h2 className="display-md mt-4 text-ink">Frequently Asked</h2>
          </Reveal>

          <dl className="mt-12 grid gap-px border-t border-ink/10 sm:grid-cols-3">
            {FAQ.map((item, index) => (
              <Reveal key={item.q} delay={index * 90}>
                <div className="h-full border-b border-ink/10 py-8 sm:border-r sm:pr-8">
                  <dt className="font-display text-[1.15rem] leading-snug text-ink">{item.q}</dt>
                  <dd className="mt-3.5 text-[13px] leading-relaxed text-muted">{item.a}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}
