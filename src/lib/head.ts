// Page titles and link-preview tags. During prerendering these are written
// into each page's <head>; in the browser, the title updates on navigation.
import { useEffect } from 'preact/hooks'
import { site } from '../data/site'

export interface Head {
  title: string
  description: string
  path: string
  /** Absolute path to a JPEG for link previews. */
  image?: string
  type?: 'website' | 'product'
  jsonLd?: object
}

let lastHead: Head | null = null
export const takeHead = () => {
  const h = lastHead
  lastHead = null
  return h
}

export function useHead(head: Head) {
  if (typeof window === 'undefined') {
    lastHead = head
    return
  }
  useEffect(() => {
    document.title = head.title
    document.querySelector('meta[name=description]')?.setAttribute('content', head.description)
  }, [head.title, head.description])
}

type El = { type: string; props: Record<string, string> }

export function headElements(h: Head): Set<El> {
  const abs = (p: string) => (site.url ? site.url + p : p)
  const image = abs(h.image ?? '/og.jpg')
  const els: El[] = [
    { type: 'meta', props: { name: 'description', content: h.description } },
    { type: 'meta', props: { property: 'og:site_name', content: site.name } },
    { type: 'meta', props: { property: 'og:type', content: h.type === 'product' ? 'product' : 'website' } },
    { type: 'meta', props: { property: 'og:title', content: h.title } },
    { type: 'meta', props: { property: 'og:description', content: h.description } },
    { type: 'meta', props: { property: 'og:image', content: image } },
    { type: 'meta', props: { property: 'og:locale', content: 'en_IN' } },
    { type: 'meta', props: { name: 'twitter:card', content: 'summary_large_image' } },
  ]
  if (site.url) {
    els.push({ type: 'link', props: { rel: 'canonical', href: abs(h.path) } })
    els.push({ type: 'meta', props: { property: 'og:url', content: abs(h.path) } })
  }
  if (h.jsonLd) {
    els.push({
      type: 'script',
      // `<` is escaped so the JSON can never close the script tag early.
      props: { type: 'application/ld+json', children: JSON.stringify(h.jsonLd).replace(/</g, '\\u003c') },
    })
  }
  return new Set(els)
}
