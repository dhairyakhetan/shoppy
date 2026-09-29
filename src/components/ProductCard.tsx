import { collectionOf, productUrl, type Product } from '../data/catalog'
import { price } from '../lib/format'
import { AddButton } from './AddButton'
import { Photo } from './Photo'

interface Props {
  product: Product
  sizes?: string
  priority?: boolean | 'high'
  /** Show which collection it's from (useful in mixed lists). */
  showCollection?: boolean
}

export function ProductCard({ product, sizes, priority, showCollection = true }: Props) {
  const c = collectionOf(product)
  const href = productUrl(product)
  return (
    <article class="card reveal" data-href={href}>
      <a href={href} class="card-link">
        <div class="card-media">
          <Photo
            product={product}
            class="card-photo"
            priority={priority}
            sizes={sizes ?? '(min-width: 1100px) 280px, (min-width: 700px) 30vw, 46vw'}
          />
          {c.limited && <span class="card-flag">Limited edition</span>}
        </div>
        <div class="card-body">
          <span class="card-coll">{showCollection ? `${c.name} · ${c.type}` : c.type}</span>
          <h3 class="card-title">{product.name}</h3>
        </div>
      </a>
      <div class="card-foot">
        <span class="card-price">{price(product.price)}</span>
        <AddButton product={product} />
      </div>
    </article>
  )
}
