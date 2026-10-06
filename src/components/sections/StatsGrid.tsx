import { useCountUp } from '@/hooks/useCountUp'
import type { Stat } from '@/data/content'

function StatItem({ stat, tone }: { stat: Stat; tone: 'light' | 'dark' }) {
  const { ref, value } = useCountUp(stat.value)
  const display = value.toFixed(stat.decimals ?? 0)

  return (
    <div
      ref={ref}
      className={[
        'border-t pt-6',
        tone === 'light' ? 'border-white/10' : 'border-graphite/10',
      ].join(' ')}
    >
      <p
        className={[
          'font-display text-[2rem] leading-none tabular-nums lg:text-[2.6rem]',
          tone === 'light' ? 'text-cream' : 'text-graphite',
        ].join(' ')}
      >
        <span className="text-champagne">{stat.prefix}</span>
        {display}
        <span className="text-champagne">{stat.suffix}</span>
      </p>
      <p
        className={[
          'mt-3 text-[10.5px] uppercase leading-relaxed tracking-label',
          tone === 'light' ? 'text-muted' : 'text-graphite/55',
        ].join(' ')}
      >
        {stat.label}
      </p>
    </div>
  )
}

type Props = {
  stats: Stat[]
  tone?: 'light' | 'dark'
  className?: string
}

export function StatsGrid({ stats, tone = 'light', className = '' }: Props) {
  return (
    <div className={['grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4', className].join(' ')}>
      {stats.map((stat) => (
        <StatItem key={stat.label} stat={stat} tone={tone} />
      ))}
    </div>
  )
}
