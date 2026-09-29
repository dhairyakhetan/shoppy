// ─────────────────────────────────────────────────────────────────────────────
// The whole shop lives in this file.
//
// To add a product:
//   1. Put its photo in /photos (portrait works best, it's shown at 3:4),
//      named like the product id, e.g. photos/swarn-dhaga-design-11.jpg
//   2. Add an entry to `products` below with that same id.
//   3. Run `npm run dev` / push. Photos are optimised automatically.
// ─────────────────────────────────────────────────────────────────────────────

export type CollectionId = 'swarn-dhaga' | 'golden-heritage' | 'tanjore-soan'

export interface Collection {
  id: CollectionId
  name: string
  /** Name in Devanagari, shown alongside the English. */
  hindi: string
  /** What the name means, if it's worth saying. */
  meaning?: string
  /** What kind of piece it is, e.g. "Rakhi". Singular. */
  type: string
  typePlural: string
  tagline: string
  description: string
  materials: string[]
  size: string
  delivery: string
  limited?: boolean
}

export interface Product {
  /** Used in the URL and to find the photo in /photos. */
  id: string
  collection: CollectionId
  name: string
  price: number
  /** Photo filename in /photos without extension. Defaults to `id`. */
  photo?: string
}

export const collections: Collection[] = [
  {
    id: 'swarn-dhaga',
    name: 'Swarn Dhaga',
    hindi: 'स्वर्ण धागा',
    meaning: 'the golden thread',
    type: 'Rakhi',
    typePlural: 'Rakhis',
    tagline: 'Hand-painted rakhis on traditional thread',
    description:
      'Each rakhi has a hand-painted Tanjore centrepiece with gold-tone detailing, tied on traditional thread and, on some designs, finished with decorative beads.',
    materials: [
      'Hand-painted Tanjore artwork',
      'Gold-tone detailing',
      'Traditional threads, with decorative beads on some designs',
      'Handmade base',
    ],
    size: 'About 12 × 12 cm',
    delivery: '5–8 working days',
  },
  {
    id: 'golden-heritage',
    name: 'Golden Heritage',
    hindi: 'गोल्डन हेरिटेज',
    type: 'Lumba',
    typePlural: 'Lumbas',
    tagline: 'Ornate lumbas, limited edition',
    description:
      'A limited-edition collection of richly detailed lumbas, with hand-painted Tanjore work, gold-tone accents, decorative beads and traditional threads.',
    materials: [
      'Hand-painted Tanjore artwork',
      'Gold-tone detailing',
      'Decorative beads and traditional threads',
      'Handmade base',
    ],
    size: 'About 8 × 8 cm',
    delivery: '5–7 working days',
    limited: true,
  },
  {
    id: 'tanjore-soan',
    name: 'Tanjore Soan',
    hindi: 'तंजोर सून',
    type: 'Keepsake',
    typePlural: 'Keepsakes',
    tagline: 'Small auspicious keepsakes',
    description:
      'Little hand-painted Tanjore pieces carrying auspicious symbols, with gold-tone detailing on a handmade base. Lovely for a puja space or as a gift.',
    materials: ['Hand-painted Tanjore artwork', 'Gold-tone detailing', 'Handmade base'],
    size: 'About 5 × 5 cm',
    delivery: '3–5 working days',
  },
]

const rakhis: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: `swarn-dhaga-design-${i + 1}`,
  collection: 'swarn-dhaga',
  name: `Design ${i + 1}`,
  price: 150,
}))

export const products: Product[] = [
  ...rakhis,
  { id: 'golden-heritage-peacock-heritage', collection: 'golden-heritage', name: 'Peacock Heritage', price: 950 },
  { id: 'golden-heritage-royal-kalash', collection: 'golden-heritage', name: 'Royal Kalash', price: 850 },
  { id: 'golden-heritage-swarna-abhushan', collection: 'golden-heritage', name: 'Swarna Abhushan', price: 1100 },
  { id: 'tanjore-soan-swastika', collection: 'tanjore-soan', name: 'Swastika', price: 150 },
  { id: 'tanjore-soan-om', collection: 'tanjore-soan', name: 'Om', price: 150 },
  { id: 'tanjore-soan-swastika-gold', collection: 'tanjore-soan', name: 'Swastika Gold', price: 150 },
  { id: 'tanjore-soan-sun', collection: 'tanjore-soan', name: 'Sun', price: 150 },
]

// ── Lookups ─────────────────────────────────────────────────────────────────

const collectionById = new Map(collections.map((c) => [c.id, c]))
const productById = new Map(products.map((p) => [p.id, p]))

export const getCollection = (id: string) => collectionById.get(id as CollectionId)
export const getProduct = (id: string) => productById.get(id)
export const collectionOf = (p: Product) => collectionById.get(p.collection)!
export const productsIn = (id: CollectionId) => products.filter((p) => p.collection === id)

/** The last part of a product's URL: "design-1" rather than "swarn-dhaga-design-1". */
export const productSlug = (p: Product) =>
  p.id.startsWith(p.collection + '-') ? p.id.slice(p.collection.length + 1) : p.id

export const productUrl = (p: Product) => `/shop/${p.collection}/${productSlug(p)}`
export const collectionUrl = (c: Collection | CollectionId) =>
  `/shop/${typeof c === 'string' ? c : c.id}`

export const findProduct = (collection: string, slug: string) =>
  products.find((p) => p.collection === collection && productSlug(p) === slug)

/** Full display name, e.g. "Swarn Dhaga – Design 4". */
export const fullName = (p: Product) => `${collectionOf(p).name} – ${p.name}`

export const lowestPrice = (id: CollectionId) => Math.min(...productsIn(id).map((p) => p.price))
