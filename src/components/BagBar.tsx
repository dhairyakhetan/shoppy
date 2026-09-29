import { bagOpen, count, total } from '../lib/bag'
import { plural, price } from '../lib/format'
import { ArrowIcon } from './icons'

/** The "2 pieces · ₹1,100 — View bag" bar pinned to the bottom once the bag has something in it. */
export function BagBar() {
  const n = count.value
  const show = n > 0 && !bagOpen.value
  return (
    <div class={`bag-bar${show ? ' show' : ''}`} inert={!show}>
      <button type="button" class="bag-bar-btn" onClick={() => (bagOpen.value = true)}>
        <span class="bag-bar-info">
          <span class="bag-bar-count">{plural(n, 'piece')}</span>
          <span class="bag-bar-total">{price(total.value)}</span>
        </span>
        <span class="bag-bar-cta">
          View bag <ArrowIcon size={16} stroke-width={1.5} />
        </span>
      </button>
    </div>
  )
}
