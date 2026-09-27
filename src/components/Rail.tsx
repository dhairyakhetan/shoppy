import { useRef } from 'preact/hooks'
import type { Product } from '../data/catalog'
import { ChevronIcon } from './icons'
import { ProductCard } from './ProductCard'

/** A sideways-scrolling row of products, with arrow buttons on desktop. */
export function Rail({ products, label }: { products: Product[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: 1 | -1) => {
    const el = ref.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }
  return (
    <div class="rail-wrap">
      <div class="rail" ref={ref} role="region" aria-label={label} tabIndex={0}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} sizes="(min-width: 700px) 240px, 44vw" />
        ))}
      </div>
      <button type="button" class="rail-arrow prev" onClick={() => scroll(-1)} aria-label="Scroll left">
        <ChevronIcon style={{ rotate: '180deg' }} />
      </button>
      <button type="button" class="rail-arrow next" onClick={() => scroll(1)} aria-label="Scroll right">
        <ChevronIcon />
      </button>
    </div>
  )
}
