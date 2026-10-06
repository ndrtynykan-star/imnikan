export function formatAED(value: number): string {
  return `AED ${value.toLocaleString('en-US')}`
}

export function formatArea(sqft: number): string {
  return `${sqft.toLocaleString('en-US')} sqft`
}

/** AED prices sit in the millions/billions — keep the display short and premium. */
export function compactValue(value: number): string {
  if (value >= 1_000_000_000) return `AED ${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`
  if (value >= 1_000_000) return `AED ${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (value >= 1_000) return `AED ${Math.round(value / 1_000)}K`
  return `AED ${value}`
}
