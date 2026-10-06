import { StatsGrid } from '@/components/sections/StatsGrid'
import { Reveal } from '@/components/ui/Reveal'
import { DISTRICT_GROWTH, INVESTMENT_GROWTH, STATS } from '@/data/content'

const CHART = { width: 460, height: 200, padding: 8 }

/** Minimal gold area chart — hand-rolled SVG, no charting dependency. */
function GrowthChart() {
  const max = Math.max(...INVESTMENT_GROWTH.map((point) => point.value)) * 1.06
  const min = Math.min(...INVESTMENT_GROWTH.map((point) => point.value)) * 0.9
  const stepX = (CHART.width - CHART.padding * 2) / (INVESTMENT_GROWTH.length - 1)

  const points = INVESTMENT_GROWTH.map((point, index) => {
    const x = CHART.padding + index * stepX
    const ratio = (point.value - min) / (max - min)
    const y = CHART.height - CHART.padding - ratio * (CHART.height - CHART.padding * 2)
    return { ...point, x, y }
  })

  const line = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`).join(' ')
  const area = `${line} L${points[points.length - 1].x},${CHART.height} L${points[0].x},${CHART.height} Z`

  return (
    <figure className="w-full">
      <svg
        viewBox={`0 0 ${CHART.width} ${CHART.height}`}
        className="h-auto w-full"
        role="img"
        aria-label="Prime Dubai residential values index from 2021 to 2026"
      >
        <defs>
          <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D8B477" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#D8B477" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((tick) => (
          <line
            key={tick}
            x1={CHART.padding}
            x2={CHART.width - CHART.padding}
            y1={CHART.height * tick}
            y2={CHART.height * tick}
            stroke="#F8F7F3"
            strokeOpacity="0.07"
            strokeWidth="1"
          />
        ))}

        <path d={area} fill="url(#growth-fill)" />
        <path
          d={line}
          fill="none"
          stroke="#D8B477"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="3.4" fill="#071016" stroke="#E3C58C" strokeWidth="1.5" />
            <text
              x={point.x}
              y={CHART.height - 0.5}
              textAnchor="middle"
              fill="#A9AAA5"
              fontSize="8.5"
              letterSpacing="1"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-4 text-[11px] leading-relaxed text-muted">
        Prime Dubai residential value index, 2021 = 100. Source: Dubai Elite Homes research.
      </figcaption>
    </figure>
  )
}

function DistrictBars() {
  return (
    <ul className="space-y-5">
      {DISTRICT_GROWTH.map((district) => (
        <li key={district.name}>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[11.5px] tracking-wide text-cream/85">{district.name}</span>
            <span className="text-[11.5px] tabular-nums text-champagne">+{district.change}%</span>
          </div>
          <div className="mt-2.5 h-px w-full bg-white/10">
            <div
              className="h-px bg-champagne"
              style={{ width: `${(district.change / 20) * 100}%` }}
              aria-hidden="true"
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function Investment() {
  return (
    <section className="bg-ink-800 py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <div>
              <p className="eyebrow">Investment</p>
              <h2 className="display-lg mt-5 text-cream">
                Invest In
                <br />
                Dubai&rsquo;s Future.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
                Dubai&rsquo;s prime market has compounded through every cycle since 2021, supported by
                zero property tax, residency incentives and record prime transaction volumes. We
                underwrite each acquisition against live comparable data.
              </p>

              <div className="mt-10 border border-champagne/20 bg-champagne/[0.04] p-6">
                <p className="text-[10px] uppercase tracking-label text-champagne">Headline yield</p>
                <p className="mt-3 font-display text-[2.2rem] leading-none text-cream">
                  6.4<span className="text-champagne">%</span>
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-muted">
                  Gross rental yield across our managed prime residential portfolio.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <GrowthChart />
              <DistrictBars />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <StatsGrid stats={STATS} />
        </Reveal>
      </div>
    </section>
  )
}
