// The shopping bag. Kept in localStorage so it survives reloads, and synced
// between open tabs.
import { computed, effect, signal } from '@preact/signals'
import { getProduct, type Product } from '../data/catalog'

export interface BagLine {
  product: Product
  qty: number
}

export interface Details {
  name: string
  area: string
  note: string
}

const BAG_KEY = 'sd-bag'
const DETAILS_KEY = 'sd-details'

/** product id → quantity */
export const bag = signal<Record<string, number>>({})
export const details = signal<Details>({ name: '', area: '', note: '' })
export const bagOpen = signal(false)
/** Bumped on every add, so the bag icon can do a little bounce. */
export const addedPulse = signal(0)

export const lines = computed<BagLine[]>(() =>
  Object.entries(bag.value).flatMap(([id, qty]) => {
    const product = getProduct(id)
    return product && qty > 0 ? [{ product, qty }] : []
  }),
)
export const count = computed(() => lines.value.reduce((n, l) => n + l.qty, 0))
export const total = computed(() => lines.value.reduce((n, l) => n + l.qty * l.product.price, 0))

export const qtyOf = (id: string) => bag.value[id] ?? 0

export function setQty(id: string, qty: number) {
  const next = { ...bag.value }
  if (qty > 0) next[id] = Math.floor(qty)
  else delete next[id]
  bag.value = next
}

export function add(id: string) {
  setQty(id, qtyOf(id) + 1)
  addedPulse.value++
}

export const clearBag = () => (bag.value = {})

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

/** Called once in the browser, after the prerendered page has hydrated. */
export function loadBag() {
  const saved = read<Record<string, number>>(BAG_KEY, {})
  // Drop anything that's no longer in the catalogue, or has a bad quantity.
  bag.value = Object.fromEntries(
    Object.entries(saved).filter(([id, q]) => getProduct(id) && Number.isInteger(q) && q > 0),
  )
  details.value = read(DETAILS_KEY, details.value)

  effect(() => write(BAG_KEY, bag.value))
  effect(() => write(DETAILS_KEY, details.value))

  addEventListener('storage', (e) => {
    if (e.key === BAG_KEY) bag.value = read(BAG_KEY, {})
    if (e.key === DETAILS_KEY) details.value = read(DETAILS_KEY, details.value)
  })
}
