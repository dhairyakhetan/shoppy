import { bagOpen, count, total } from '../lib/bag'
import { plural, price } from '../lib/format'
import { BagIcon, ChevronIcon } from './icons'

/** The "3 items | ₹450 · View bag" bar pinned to the bottom once the bag has something in it. */
export function BagBar() {
  const n = count.value
  const show = n > 0 && !bagOpen.value
  return (
    <div class={`bag-bar${show ? ' show' : ''}`} inert={!show}>
      <button type="button" class="bag-bar-btn" onClick={() => (bagOpen.value = true)}>
        <span class="bag-bar-icon">
          <BagIcon size={20} />
        </span>
        <span class="bag-bar-info">
          <span class="bag-bar-count">{plural(n, 'item')}</span>
          <span class="bag-bar-total">{price(total.value)}</span>
        </span>
        <span class="bag-bar-cta">
          View bag <ChevronIcon size={18} />
        </span>
      </button>
    </div>
  )
}
