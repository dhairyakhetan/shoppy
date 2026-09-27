import { useEffect, useRef, useState } from 'preact/hooks'
import { collectionOf, productUrl } from '../data/catalog'
import { site } from '../data/site'
import { bagOpen, clearBag, count, details, lines, setQty, total, type Details } from '../lib/bag'
import { plural, price } from '../lib/format'
import { orderMessage, waLink } from '../lib/whatsapp'
import { AddButton } from './AddButton'
import { Diya } from './decor'
import { ArrowIcon, ChatIcon, CheckIcon, CloseIcon, PinIcon, TrashIcon, WhatsAppIcon } from './icons'
import { Photo } from './Photo'

const close = () => (bagOpen.value = false)

function Field({ name, label, placeholder, multiline }: { name: keyof Details; label: string; placeholder: string; multiline?: boolean }) {
  const onInput = (e: Event) => {
    details.value = { ...details.value, [name]: (e.currentTarget as HTMLInputElement).value }
  }
  const Tag = multiline ? 'textarea' : 'input'
  return (
    <label class="field">
      <span>{label}</span>
      <Tag
        value={details.value[name]}
        onInput={onInput}
        placeholder={placeholder}
        rows={multiline ? 2 : undefined}
        autoComplete={name === 'name' ? 'name' : name === 'area' ? 'address-level3' : 'off'}
      />
    </label>
  )
}

export function BagDrawer() {
  const ref = useRef<HTMLDialogElement>(null)
  const open = bagOpen.value
  const [sent, setSent] = useState(false)
  const n = count.value

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) {
      setSent(false)
      d.showModal()
    } else if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      class="bag"
      aria-labelledby="bag-title"
      onClose={close}
      onClick={(e) => e.target === ref.current && close()}
    >
      <div class="bag-inner">
        <header class="bag-head">
          <h2 id="bag-title">
            Your bag {n > 0 && <span class="bag-count">{plural(n, 'item')}</span>}
          </h2>
          <button type="button" class="icon-btn" onClick={close} aria-label="Close bag">
            <CloseIcon />
          </button>
        </header>

        {sent && (
          <div class="bag-sent" role="status">
            <span class="bag-sent-icon">
              <CheckIcon size={18} stroke-width={3} />
            </span>
            <div>
              <p>
                <b>Your order is ready in WhatsApp.</b> Just tap send there, and we'll reply to confirm.
              </p>
              <div class="bag-sent-actions">
                <button type="button" class="btn btn-sm btn-ghost" onClick={() => (clearBag(), setSent(false), close())}>
                  Done, clear my bag
                </button>
              </div>
            </div>
          </div>
        )}

        {n === 0 ? (
          <div class="bag-empty">
            <Diya size={88} id="diya-bag" lit />
            <p class="bag-empty-title">Your bag is empty</p>
            <p>Every piece is painted by hand. Find one you love.</p>
            <a href="/shop" class="btn btn-primary" onClick={close}>
              Browse designs <ArrowIcon size={18} />
            </a>
          </div>
        ) : (
          <>
            <div class="bag-body">
              <ul class="bag-lines">
                {lines.value.map(({ product: p, qty }) => {
                  const c = collectionOf(p)
                  return (
                    <li key={p.id} class="bag-line" data-accent={c.accent}>
                      <a href={productUrl(p)} class="bag-thumb" onClick={close} tabIndex={-1} aria-hidden="true">
                        <Photo product={p} sizes="72px" />
                      </a>
                      <div class="bag-line-info">
                        <a href={productUrl(p)} onClick={close} class="bag-line-name">
                          {p.name}
                        </a>
                        <span class="bag-line-meta">
                          {c.name} · {price(p.price)}
                        </span>
                        <div class="bag-line-controls">
                          <AddButton product={p} variant="line" />
                          <button
                            type="button"
                            class="icon-btn icon-btn-sm bag-remove"
                            onClick={() => setQty(p.id, 0)}
                            aria-label={`Remove ${c.name} ${p.name}`}
                          >
                            <TrashIcon size={18} />
                          </button>
                        </div>
                      </div>
                      <span class="bag-line-total">{price(p.price * qty)}</span>
                    </li>
                  )
                })}
              </ul>

              <fieldset class="bag-details">
                <legend>
                  Your details <span>(optional, added to the message)</span>
                </legend>
                <Field name="name" label="Name" placeholder="Your name" />
                <Field name="area" label={`Area in ${site.city}`} placeholder="e.g. Salt Lake, Behala" />
                <Field name="note" label="Note" placeholder="Anything we should know?" multiline />
              </fieldset>
            </div>

            <footer class="bag-foot">
              <div class="bag-total">
                <span>Total</span>
                <b>{price(total.value)}</b>
              </div>
              <ul class="bag-notes">
                <li>
                  <PinIcon size={16} /> Delivery within {site.city} only
                </li>
                <li>
                  <ChatIcon size={16} /> Payment is arranged with you on WhatsApp
                </li>
              </ul>
              <a
                class="btn btn-wa btn-lg btn-block"
                href={waLink(orderMessage(lines.value, details.value))}
                target="_blank"
                rel="noopener"
                onClick={() => setSent(true)}
              >
                <WhatsAppIcon size={22} /> Send order on WhatsApp
              </a>
            </footer>
          </>
        )}
      </div>
    </dialog>
  )
}
