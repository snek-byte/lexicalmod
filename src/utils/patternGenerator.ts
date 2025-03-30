import GeoPattern from 'geopattern'

export type PatternMode = 'geopatterns' | 'doodles'

const doodleSVGs: string[] = [
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60"><circle cx="80" cy="30" r="25" fill="none" stroke="#222" stroke-width="2"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60"><path d="M0,30 Q80,0 160,30 Q80,60 0,30 Z" fill="none" stroke="#000" stroke-width="2"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="18" fill="#333">★</text></svg>'
]

function toBase64(data: string) {
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(data)))
}

export function generateRandomPattern(mode: PatternMode = 'geopatterns') {
  try {
    if (mode === 'geopatterns') {
      const seed = Math.random().toString(36).substring(2)
      const pattern = GeoPattern.generate(seed)
      const svg = pattern.toSvg()
      const encoded = toBase64(svg)
      return { thumbnail: encoded, full: encoded }
    }

    if (mode === 'doodles') {
      const url = doodleSVGs[Math.floor(Math.random() * doodleSVGs.length)]
      return { thumbnail: url, full: url }
    }
  } catch (err) {
    console.error('Pattern generation failed:', err)
  }

  return {
    thumbnail: 'data:image/svg+xml;base64,' + btoa('<svg width="160" height="60"/>'),
    full: 'data:image/svg+xml;base64,' + btoa('<svg width="1240" height="1748"/>')
  }
}
