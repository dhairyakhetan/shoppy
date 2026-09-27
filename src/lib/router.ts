// A tiny client-side router. Pages are prerendered as real HTML, and once the
// JS is loaded, links switch pages instantly with a smooth View Transition
// (in browsers that support it; others just switch).
import { signal } from '@preact/signals'
import { normalize } from '../routes'

export const currentPath = signal('/')

const isBrowser = typeof window !== 'undefined'
const reduceMotion = () => isBrowser && matchMedia('(prefers-reduced-motion: reduce)').matches

/** Name that the big product photo and the clicked card photo share, so one morphs into the other. */
const PHOTO = 'product-photo'
let overrides: HTMLElement[] = []
const clearOverrides = () => {
  overrides.forEach((el) => (el.style.viewTransitionName = ''))
  overrides = []
}
const nameElement = (el: Element | null | undefined, name: string) => {
  if (!(el instanceof HTMLElement)) return
  el.style.viewTransitionName = name
  overrides.push(el)
}

/** Waits until Preact has flushed the pending re-render. */
const rendered = () => new Promise((r) => setTimeout(r, 0))

async function transition(update: () => void | Promise<void>) {
  if (!document.startViewTransition || reduceMotion() || document.visibilityState === 'hidden') {
    await update()
    return
  }
  const vt = document.startViewTransition(async () => {
    await update()
  })
  vt.finished.finally(clearOverrides)
  await vt.updateCallbackDone.catch(() => {})
}

function scrollToHash(hash: string) {
  const el = hash && document.getElementById(decodeURIComponent(hash.slice(1)))
  if (el) el.scrollIntoView({ block: 'start' })
  return !!el
}

export async function navigate(to: string, opts: { replace?: boolean; photo?: Element | null } = {}) {
  const url = new URL(to, location.href)
  const path = normalize(url.pathname)

  // Same page, just a different #section: smooth-scroll to it.
  if (path === currentPath.value && url.hash) {
    history.replaceState(history.state, '', url.hash)
    document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth' })
    return
  }

  // Remember where we were so Back returns to the same spot.
  history.replaceState({ ...history.state, y: scrollY }, '')

  if (opts.photo) {
    // If we're already on a product page, its photo must give up the name first.
    document.querySelectorAll<HTMLElement>('.product-photo').forEach((el) => nameElement(el, 'none'))
    nameElement(opts.photo, PHOTO)
  }

  await transition(async () => {
    clearOverrides()
    const method = opts.replace ? 'replaceState' : 'pushState'
    history[method]({ y: 0 }, '', url.pathname + url.search + url.hash)
    currentPath.value = path
    await rendered()
    if (!scrollToHash(url.hash)) scrollTo(0, 0)
  })
}

function onPopState(e: PopStateEvent) {
  const leaving = currentPath.value
  const path = normalize(location.pathname)
  if (path === leaving) {
    scrollToHash(location.hash)
    return
  }
  transition(async () => {
    clearOverrides()
    currentPath.value = path
    await rendered()
    // Coming back from a product to a list: morph the photo back into its card.
    const card = document.querySelector(`[data-href="${CSS.escape(leaving)}"] .card-photo`)
    if (card && !document.querySelector('.product-photo')) nameElement(card, PHOTO)
    scrollTo(0, e.state?.y ?? 0)
  })
}

function onClick(e: MouseEvent) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  const a = (e.target as Element).closest?.('a')
  if (!a || !a.href || a.target || a.hasAttribute('download') || a.origin !== location.origin) return
  e.preventDefault()
  // Clicking a product card: remember its photo so it can morph into the product page.
  const card = a.closest<HTMLElement>('[data-href]')
  const photo = card?.dataset.href === normalize(a.pathname) ? card.querySelector('.card-photo') : null
  navigate(a.href, { photo })
}

export function startRouter() {
  currentPath.value = normalize(location.pathname)
  history.scrollRestoration = 'manual'
  addEventListener('popstate', onPopState)
  document.addEventListener('click', onClick)
}
