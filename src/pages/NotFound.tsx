import { site } from '../data/site'
import { Diya } from '../components/decor'
import { useHead } from '../lib/head'

export function NotFound() {
  useHead({
    title: `Page not found · ${site.name}`,
    description: site.description,
    path: '/404',
  })
  return (
    <section class="container not-found">
      <Diya size={112} id="diya-404" lit />
      <h1 class="h2">This page has wandered off</h1>
      <p>The link may be old, or the design may have moved. Let’s get you back to the collection.</p>
      <div class="hero-ctas">
        <a href="/shop" class="btn btn-primary btn-lg">
          Browse designs
        </a>
        <a href="/" class="btn btn-ghost btn-lg">
          Go home
        </a>
      </div>
    </section>
  )
}
