import { collectionOf, type Product } from '../data/catalog'
import { photoFor } from '../lib/images'

interface Props {
  product: Product
  /** Tells the browser how wide the photo will be shown, so it picks the right file. */
  sizes: string
  class?: string
  /** Load straight away (for photos visible on first load). */
  priority?: boolean | 'high'
}

export function Photo({ product, sizes, class: cls, priority }: Props) {
  const ph = photoFor(product)
  const c = collectionOf(product)
  return (
    <picture>
      <source type="image/avif" srcset={ph.avif} sizes={sizes} />
      <img
        class={cls}
        src={ph.src}
        srcset={ph.webp}
        sizes={sizes}
        width={960}
        height={1280}
        alt={`${c.name} ${product.name}, a hand-painted ${c.type.toLowerCase()}`}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority === 'high' ? 'high' : undefined}
        decoding="async"
        style={{ backgroundImage: ph.placeholder }}
      />
    </picture>
  )
}
