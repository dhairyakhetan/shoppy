import {
  collections,
  findProduct,
  getCollection,
  productUrl,
  products,
  type Collection,
  type Product,
} from './data/catalog'

export type Route =
  | { page: 'home' }
  | { page: 'shop'; collection?: Collection }
  | { page: 'product'; product: Product }
  | { page: 'not-found' }

export const normalize = (path: string) => path.replace(/\/+$/, '') || '/'

export function matchRoute(path: string): Route {
  const parts = normalize(path).split('/').filter(Boolean)
  if (parts.length === 0) return { page: 'home' }
  if (parts[0] !== 'shop') return { page: 'not-found' }
  if (parts.length === 1) return { page: 'shop' }

  const collection = getCollection(parts[1])
  if (!collection) return { page: 'not-found' }
  if (parts.length === 2) return { page: 'shop', collection }

  const product = parts.length === 3 && findProduct(parts[1], parts[2])
  return product ? { page: 'product', product } : { page: 'not-found' }
}

/** Every page on the site, for prerendering and the sitemap. */
export const allPaths = () => [
  '/',
  '/shop',
  ...collections.map((c) => `/shop/${c.id}`),
  ...products.map(productUrl),
]
