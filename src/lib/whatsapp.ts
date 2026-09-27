import { fullName, type Product } from '../data/catalog'
import { site } from '../data/site'
import type { BagLine, Details } from './bag'
import { plural, price } from './format'

export const waLink = (text: string) => `https://wa.me/${site.phone}?text=${encodeURIComponent(text)}`
export const telLink = `tel:+${site.phone}`

export function orderMessage(lines: BagLine[], d: Details) {
  const items = lines.map(
    ({ product: p, qty }) => `• ${fullName(p)} × ${qty} = ${price(p.price * qty)}`,
  )
  const qty = lines.reduce((n, l) => n + l.qty, 0)
  const total = lines.reduce((n, l) => n + l.qty * l.product.price, 0)
  const about = [
    d.name.trim() && `Name: ${d.name.trim()}`,
    d.area.trim() && `Area: ${d.area.trim()}`,
    d.note.trim() && `Note: ${d.note.trim()}`,
  ].filter(Boolean)

  return [
    `Hi ${site.name}! I'd like to place an order:`,
    '',
    ...items,
    '',
    `*Total: ${price(total)}* (${plural(qty, 'item')})`,
    ...(about.length ? ['', ...about] : []),
    '',
    'Please confirm availability, payment and delivery. Thank you!',
  ].join('\n')
}

export const productMessage = (p: Product) =>
  `Hi ${site.name}! I'd like to order ${fullName(p)} (${price(p.price)}). Is it available?`

export const customMessage = `Hi ${site.name}! I'd like to ask about a custom design.`

export const helloMessage = `Hi ${site.name}! I have a question.`
