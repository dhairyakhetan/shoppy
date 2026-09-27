import { useEffect, useRef } from 'preact/hooks'
import { collectionUrl, collections } from '../data/catalog'
import { addedPulse, bagOpen, count } from '../lib/bag'
import { currentPath } from '../lib/router'
import { toggleTheme } from '../lib/theme'
import { Diya, LogoMark } from './decor'
import { BagIcon } from './icons'

export function Logo({ id }: { id: string }) {
  return (
    <a href="/" class="logo" aria-label="SD Creations, home">
      <LogoMark id={id} />
      <span class="logo-text">
        <b>SD</b> Creations
      </span>
    </a>
  )
}

function ThemeToggle() {
  return (
    <button
      type="button"
      class="icon-btn theme-toggle"
      onClick={(e) => toggleTheme(e.currentTarget)}
      title="Light the diya"
    >
      <Diya id="diya-toggle" size={30} />
      <span class="sr-only when-light">Switch to dark mode</span>
      <span class="sr-only when-dark">Switch to light mode</span>
    </button>
  )
}

function BagButton() {
  const n = count.value
  const ref = useRef<HTMLButtonElement>(null)
  const pulse = addedPulse.value

  // Little bounce each time something is added.
  useEffect(() => {
    if (!pulse || !ref.current) return
    ref.current.classList.remove('bump')
    void ref.current.offsetWidth
    ref.current.classList.add('bump')
  }, [pulse])

  return (
    <button
      type="button"
      ref={ref}
      class="icon-btn bag-btn"
      onClick={() => (bagOpen.value = true)}
      aria-label={n ? `Open bag, ${n} ${n === 1 ? 'item' : 'items'}` : 'Open bag'}
    >
      <BagIcon size={22} />
      {n > 0 && <span class="bag-badge">{n > 99 ? '99+' : n}</span>}
    </button>
  )
}

export function Header() {
  const path = currentPath.value
  const is = (href: string) => (path === href ? 'page' : undefined)
  return (
    <header class="site-header">
      <div class="container header-inner">
        <Logo id="lm-header" />
        <nav class="nav" aria-label="Main">
          <a href="/shop" class="nav-shop" aria-current={is('/shop')}>
            Shop<span class="nav-all"> all</span>
          </a>
          {collections.map((c) => (
            <a key={c.id} href={collectionUrl(c)} class="nav-extra" aria-current={is(collectionUrl(c))}>
              {c.typePlural}
            </a>
          ))}
          <a href="/#how-to-order" class="nav-extra">
            How to order
          </a>
        </nav>
        <div class="header-actions">
          <ThemeToggle />
          <BagButton />
        </div>
      </div>
    </header>
  )
}
