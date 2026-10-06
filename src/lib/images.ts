/**
 * Curated Dubai architectural photography, hot-linked from Unsplash.
 * Every id here was checked to resolve; keep new ids verified too.
 */
export const PHOTO = {
  heroSkyline: '1512453979798-5ea266f8880c',
  heroVilla: '1613490493576-7fde63acd811',
  cinematic: '1571003123894-1f0594d2b5d9',
  skylineNight: '1582672060674-bc2bd808a8b5',
  about: '1600585154340-be6161a56a0c',
  dubaiAerial: '1518684079-3c830dcef090',
  marina: '1526495124232-a04e1849168c',
  downtown: '1580674684081-7617fbf3d745',
  burj: '1546412414-e1885259563a',
  palm: '1590725140246-20acdee442be',
  villaA: '1600596542815-ffad4c1539a9',
  villaB: '1613977257363-707ba9348227',
  villaC: '1600047509807-ba8f99d2cdde',
  villaD: '1580587771525-78b9dba3b914',
  houseA: '1568605114967-8130f3a36994',
  houseB: '1449844908441-8829872d2607',
  houseC: '1560185007-cde436f6a4d0',
  houseD: '1560185127-6ed189bf02f4',
  houseE: '1583608205776-bfd35f0d9f83',
  interiorA: '1600607687939-ce8a6c25118c',
  interiorB: '1600566753086-00f18fb6b3ea',
  interiorC: '1600210492486-724fe5c67fb0',
  interiorD: '1560448204-e02f11c3d0e2',
  interiorE: '1502672260266-1c1ef2d93688',
  interiorF: '1522708323590-d24dbb6b0267',
  interiorG: '1600585154526-990dced4db0d',
  interiorH: '1600573472550-8090b5e0745e',
  lobby: '1542314831-068cd1dbfeeb',
  tower: '1567016432779-094069958ea5',
} as const

/**
 * React 18 passes unknown lowercase attributes straight through but warns about
 * camelCased ones, so first-fold images spread this instead of `fetchPriority`.
 */
export const HIGH_PRIORITY: Record<string, string> = { fetchpriority: 'high' }

const WIDTHS = [640, 960, 1280, 1920, 2400]

export function photoUrl(id: string, width = 1600): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=78`
}

export function photoSrcSet(id: string): string {
  return WIDTHS.map((w) => `${photoUrl(id, w)} ${w}w`).join(', ')
}
