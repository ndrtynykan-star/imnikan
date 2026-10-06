type Props = {
  className?: string
}

/** DevVortex studio mark — cool gradient monogram against the warm gold palette. */
export function DevVortexMark({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="dv-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5B8DEF" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect x="0.75" y="0.75" width="42.5" height="42.5" rx="10" fill="url(#dv-gradient)" />
      <path
        d="M13 13h7.6c5.2 0 8.6 3.5 8.6 9s-3.4 9-8.6 9H13V13Zm5 4.4v9.2h2.4c2.4 0 3.9-1.7 3.9-4.6s-1.5-4.6-3.9-4.6H18Z"
        fill="#F8F7F3"
      />
      <path
        d="M27.4 13h4.2l3.4 9.1L38.4 13H42l-6 18h-4.2l-4.4-18Z"
        fill="#F8F7F3"
        opacity="0.75"
      />
    </svg>
  )
}
