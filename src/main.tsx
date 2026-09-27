import './styles/index.css'
import { hydrate, render } from 'preact'
import { App, pageKey } from './app'
import { loadBag } from './lib/bag'
import { headElements, takeHead } from './lib/head'
import { currentPath, startRouter } from './lib/router'
import { followSystemTheme } from './lib/theme'
import { allPaths, normalize } from './routes'

if (typeof window !== 'undefined') {
  startRouter()
  const root = document.getElementById('app')!
  // Normally the page arrives prerendered and we just attach to it. If the HTML
  // is for a different page (or missing, in dev), render from scratch instead.
  if (root.firstElementChild?.getAttribute('data-page') === pageKey(currentPath.value)) hydrate(<App />, root)
  else {
    root.textContent = ''
    render(<App />, root)
  }
  // The saved bag is only known in the browser, so it's loaded after hydrating.
  loadBag()
  followSystemTheme()
}

/** Called at build time, once per page, to produce static HTML. */
export async function prerender(data: { url: string }) {
  const { renderToString } = await import('preact-render-to-string')
  currentPath.value = normalize(data.url)
  const html = renderToString(<App />)
  const head = takeHead()!
  return {
    html,
    links: new Set(allPaths()),
    head: { lang: 'en', title: head.title, elements: headElements(head) },
  }
}
