import { Mail, MessageCircle, Phone } from 'lucide-react'
import type { Agent } from '@/data/properties'
import { ArrowButton } from '@/components/ui/ArrowButton'

type Props = {
  agent: Agent
  reference: string
}

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

/** Property consultant panel with every contact channel for the listing. */
export function AgentCard({ agent, reference }: Props) {
  const tel = `tel:${agent.phone.replace(/\s/g, '')}`

  return (
    <div className="border border-ink/10 bg-ivory p-7">
      <p className="text-[10px] font-semibold uppercase tracking-label text-gold-deep">
        Property Consultant
      </p>

      <div className="mt-6 flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/45 font-display text-lg text-gold-deep">
          {initials(agent.name)}
        </span>
        <div>
          <p className="font-display text-[1.15rem] text-ink">{agent.name}</p>
          <p className="mt-1 text-[11px] uppercase tracking-label text-muted">{agent.role}</p>
        </div>
      </div>

      <ul className="mt-7 space-y-3.5 border-t border-ink/10 pt-6 text-[12.5px]">
        <li>
          <a href={tel} className="flex items-center gap-3 text-ink/80 transition-colors hover:text-gold-deep">
            <Phone className="h-3.5 w-3.5 text-gold-deep" strokeWidth={1.6} aria-hidden="true" />
            {agent.phone}
          </a>
        </li>
        <li>
          <a
            href={`mailto:${agent.email}?subject=Enquiry%20about%20${reference}`}
            className="flex items-center gap-3 text-ink/80 transition-colors hover:text-gold-deep"
          >
            <Mail className="h-3.5 w-3.5 text-gold-deep" strokeWidth={1.6} aria-hidden="true" />
            {agent.email}
          </a>
        </li>
        <li>
          <a
            href="https://wa.me/97145128800"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-ink/80 transition-colors hover:text-gold-deep"
          >
            <MessageCircle className="h-3.5 w-3.5 text-gold-deep" strokeWidth={1.6} aria-hidden="true" />
            Chat on WhatsApp
          </a>
        </li>
      </ul>

      <div className="mt-8 space-y-3">
        <ArrowButton href="#enquire" variant="gold" pill className="w-full">
          Contact Agent
        </ArrowButton>
        <ArrowButton href="#enquire" variant="outline" className="w-full">
          Schedule Viewing
        </ArrowButton>
      </div>

      <p className="mt-6 text-[11px] leading-relaxed text-muted">
        Reference <span className="text-gold-deep">{reference}</span> when you get in touch. Viewings
        can be arranged within 24 hours, including video walkthroughs.
      </p>
    </div>
  )
}
