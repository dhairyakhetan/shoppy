import { useEffect, useRef } from 'preact/hooks'
import { fullName, type Product } from '../data/catalog'
import { add, bagOpen, qtyOf, setQty } from '../lib/bag'
import { MinusIcon, PlusIcon } from './icons'

interface Props {
  product: Product
  /** "card" is the compact Add button; "large" is the full-width one on product pages; "line" is inside the bag. */
  variant?: 'card' | 'large' | 'line'
}

/** An Add button that turns into a − 1 + stepper once the piece is in the bag. */
export function AddButton({ product, variant = 'card' }: Props) {
  const qty = qtyOf(product.id)
  const name = fullName(product)
  const wrap = useRef<HTMLDivElement>(null)
  // Keep keyboard focus in place when the button swaps for the stepper and back.
  const refocus = useRef<'plus' | 'add' | null>(null)

  useEffect(() => {
    const target = refocus.current
    refocus.current = null
    if (target) wrap.current?.querySelector<HTMLElement>(`[data-focus=${target}]`)?.focus()
  }, [qty > 0])

  const onAdd = () => {
    if (qty === 0) refocus.current = 'plus'
    add(product.id)
  }
  const onMinus = () => {
    if (qty === 1) refocus.current = 'add'
    setQty(product.id, qty - 1)
  }

  return (
    <div class={`add add-${variant}`} ref={wrap}>
      {qty === 0 ? (
        <button
          type="button"
          class="add-btn"
          data-focus="add"
          onClick={onAdd}
          aria-label={variant === 'large' ? undefined : `Add ${name} to bag`}
        >
          {variant === 'large' ? 'Add to bag' : 'Add'}
          {variant !== 'large' && <PlusIcon size={13} stroke-width={1.6} />}
        </button>
      ) : (
        <>
          <div class="stepper" role="group" aria-label={`${name} quantity`}>
            <button type="button" onClick={onMinus} aria-label={qty === 1 ? `Remove ${name} from bag` : 'One less'}>
              <MinusIcon size={14} stroke-width={1.6} />
            </button>
            <output aria-live="polite" aria-label={`${qty} in bag`}>
              {qty}
            </output>
            <button type="button" data-focus="plus" onClick={onAdd} aria-label="One more">
              <PlusIcon size={14} stroke-width={1.6} />
            </button>
          </div>
          {variant === 'large' && (
            <button type="button" class="btn btn-outline view-bag" onClick={() => (bagOpen.value = true)}>
              View bag
            </button>
          )}
        </>
      )}
    </div>
  )
}
