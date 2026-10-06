import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, Check } from 'lucide-react'

/** Footer newsletter — the reference's circular submit button on a navy ground. */
export function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setDone(true)
  }

  return (
    <div>
      <h3 className="font-display text-[1.15rem] text-ivory">Subscribe to Our Newsletter</h3>
      <p className="mt-2.5 text-[12.5px] leading-relaxed text-ivory/60">
        Get the latest property updates and investment insights.
      </p>

      <form onSubmit={submit} className="mt-5">
        <label htmlFor="newsletter-email" className="sr-only">
          Enter your email
        </label>
        <div className="flex items-center gap-3 border-b border-white/20 pb-2 transition-colors duration-300 focus-within:border-gold">
          <input
            id="newsletter-email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-transparent py-2 text-[13px] text-ivory placeholder:text-ivory/40 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Subscribe to the newsletter"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-navy transition-colors duration-400 ease-luxury hover:bg-gold-deep"
          >
            {done ? (
              <Check className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            ) : (
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            )}
          </button>
        </div>
        {done && (
          <p role="status" className="mt-3 text-[11px] text-gold">
            Thank you — you are on the list.
          </p>
        )}
      </form>
    </div>
  )
}
