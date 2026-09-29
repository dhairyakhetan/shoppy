// Light / dark theme. The initial theme is set by an inline script in
// index.html (before paint); this handles toggling afterwards.
type Theme = 'light' | 'dark'

const COLORS: Record<Theme, string> = { light: '#F7F2EA', dark: '#12100D' }

const current = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

function apply(t: Theme) {
  document.documentElement.dataset.theme = t
  document.querySelector('meta[name=theme-color]')?.setAttribute('content', COLORS[t])
}

/** Switches theme with a circular "light spreading" reveal from the diya. */
export function toggleTheme(from?: HTMLElement) {
  const next: Theme = current() === 'dark' ? 'light' : 'dark'
  try {
    localStorage.setItem('theme', next)
  } catch {}

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reduce || !from) {
    apply(next)
    return
  }

  const r = from.getBoundingClientRect()
  const x = r.left + r.width / 2
  const y = r.top + r.height / 2
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  const root = document.documentElement

  root.classList.add('theme-transition')
  const vt = document.startViewTransition(() => apply(next))
  vt.ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 900, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
    )
  })
  vt.finished.finally(() => root.classList.remove('theme-transition'))
}

/** Follow the phone's theme until the visitor picks one themselves. */
export function followSystemTheme() {
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    let saved: string | null = null
    try {
      saved = localStorage.getItem('theme')
    } catch {}
    if (!saved) apply(e.matches ? 'dark' : 'light')
  })
}
