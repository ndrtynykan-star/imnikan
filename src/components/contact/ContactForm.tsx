import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Check, Mail, MapPin, Phone, Clock } from 'lucide-react'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { CONTACT } from '@/data/content'
import { PROPERTY_TYPES } from '@/data/properties'

const FIELD =
  'mt-2 w-full border border-white/10 bg-ink px-4 py-3.5 text-sm text-cream placeholder:text-muted/60 transition-colors duration-300 hover:border-white/25 focus:border-champagne focus:outline-none'
const LABEL = 'block text-[10px] uppercase tracking-label text-muted'

const BUDGETS = [
  'Under AED 2M',
  'AED 2M – 5M',
  'AED 5M – 10M',
  'AED 10M – 20M',
  'AED 20M+',
]

const INTERESTS = ['Buying', 'Selling', 'Investment consulting', 'Property management', 'Relocation', ...PROPERTY_TYPES.slice(0, 3)]

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    interest: INTERESTS[0],
    budget: BUDGETS[1],
    message: '',
  })

  const update =
    (key: keyof typeof form) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((current) => ({ ...current, [key]: event.target.value }))

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="border border-champagne/30 bg-champagne/[0.05] p-10 text-center" role="status">
        <span className="mx-auto flex h-12 w-12 items-center justify-center border border-champagne/50 text-champagne">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-2xl text-cream">Thank you, {form.name || 'there'}.</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Your enquiry has been logged. A private advisor will call you within one business day — or
          sooner if you flagged the brief as urgent.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-7 text-[10.5px] uppercase tracking-label text-champagne underline-offset-4 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
      <form onSubmit={submit} noValidate={false}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={LABEL} htmlFor="contact-name">
              Full Name
            </label>
            <input
              id="contact-name"
              name="name"
              required
              autoComplete="name"
              placeholder="Your full name"
              className={FIELD}
              value={form.name}
              onChange={update('name')}
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={FIELD}
              value={form.email}
              onChange={update('email')}
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="contact-phone">
              Phone
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+971 50 000 0000"
              className={FIELD}
              value={form.phone}
              onChange={update('phone')}
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="contact-interest">
              Interested In
            </label>
            <select
              id="contact-interest"
              name="interest"
              className={FIELD}
              value={form.interest}
              onChange={update('interest')}
            >
              {INTERESTS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={LABEL} htmlFor="contact-budget">
              Budget
            </label>
            <select
              id="contact-budget"
              name="budget"
              className={FIELD}
              value={form.budget}
              onChange={update('budget')}
            >
              {BUDGETS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className={LABEL} htmlFor="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="Tell us what you are looking for — community, configuration, timing."
              className={`${FIELD} resize-y`}
              value={form.message}
              onChange={update('message')}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
          <p className="max-w-xs text-[11px] leading-relaxed text-muted">
            Your details stay with our advisory team. No mailing lists, no third parties.
          </p>
          <ArrowButton type="submit" variant="gold" size="lg" className="w-full sm:w-auto">
            Request A Consultation
          </ArrowButton>
        </div>
      </form>

      <aside className="border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
        <h3 className="font-display text-xl text-cream">Dubai Office</h3>

        <ul className="mt-7 space-y-6 text-sm text-muted">
          <li className="flex gap-4">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
            <span className="leading-relaxed">
              {CONTACT.address}
              <br />
              {CONTACT.city}
            </span>
          </li>
          <li className="flex gap-4">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
            <a href={CONTACT.phoneHref} className="transition-colors hover:text-cream">
              {CONTACT.phone}
            </a>
          </li>
          <li className="flex gap-4">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
            <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-cream">
              {CONTACT.email}
            </a>
          </li>
          <li className="flex gap-4">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
            <span className="leading-relaxed">{CONTACT.hours}</span>
          </li>
        </ul>

        <div className="mt-9 border border-white/10 p-5">
          <p className="text-[10px] uppercase tracking-label text-champagne">Private viewings</p>
          <p className="mt-3 text-[12.5px] leading-relaxed text-muted">
            Weekend and after-hours appointments are available for international clients across all
            time zones.
          </p>
        </div>
      </aside>
    </div>
  )
}
