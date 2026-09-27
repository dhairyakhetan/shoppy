import manifest from '../data/images.json'
import type { Product } from '../data/catalog'

interface Entry {
  hash: string
  widths: number[]
  lqip: string
}

const images = manifest as Record<string, Entry>

export function photoFor(p: Product) {
  const name = p.photo ?? p.id
  const e = images[name]
  if (!e) throw new Error(`No photo for "${p.id}". Add photos/${name}.jpg and run \`npm run images\`.`)
  const base = `/img/p/${name}.${e.hash}`
  const set = (ext: string) => e.widths.map((w) => `${base}.${w}.${ext} ${w}w`).join(', ')
  return {
    avif: set('avif'),
    webp: set('webp'),
    src: `${base}.${e.widths.includes(540) ? 540 : e.widths[0]}.webp`,
    large: `${base}.${e.widths.at(-1)}.webp`,
    og: `${base}.og.jpg`,
    // Blurred preview (same trick Next.js uses) shown while the photo loads.
    placeholder: `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 4'><filter id='b' color-interpolation-filters='sRGB'><feGaussianBlur stdDeviation='.2'/><feComponentTransfer><feFuncA type='discrete' tableValues='1 1'/></feComponentTransfer></filter><image width='3' height='4' preserveAspectRatio='none' filter='url(#b)' href='${e.lqip}'/></svg>`,
    )}")`,
  }
}
