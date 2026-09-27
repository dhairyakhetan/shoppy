import { collectionUrl, collections, productsIn, products, type Collection } from '../data/catalog'
import { site } from '../data/site'
import { ArrowIcon, RulerIcon, TruckIcon } from '../components/icons'
import { ProductCard } from '../components/ProductCard'
import { price } from '../lib/format'
import { useHead } from '../lib/head'

function Filters({ active }: { active?: Collection }) {
  return (
    <div class="filter-bar">
      <nav class="container chips" aria-label="Collections">
        <a href="/shop" class="chip" aria-current={!active ? 'page' : undefined}>
          All <span>{products.length}</span>
        </a>
        {collections.map((c) => (
          <a
            key={c.id}
            href={collectionUrl(c)}
            class="chip"
            data-accent={c.accent}
            aria-current={active?.id === c.id ? 'page' : undefined}
          >
            {c.typePlural} <span>{productsIn(c.id).length}</span>
          </a>
        ))}
      </nav>
    </div>
  )
}

function Grid({ collection, eager }: { collection: Collection; eager?: boolean }) {
  return (
    <div class="grid">
      {productsIn(collection.id).map((p, i) => (
        <ProductCard key={p.id} product={p} priority={eager && i < 4 && (i === 0 ? 'high' : true)} showCollection={false} />
      ))}
    </div>
  )
}

function CollectionShop({ c }: { c: Collection }) {
  const items = productsIn(c.id)
  const same = new Set(items.map((p) => p.price)).size === 1
  useHead({
    title: `${c.name} ${c.typePlural} · ${site.name}`,
    description: `${c.description} ${items.length} designs, ${same ? `${price(items[0].price)} each` : `from ${price(Math.min(...items.map((p) => p.price)))}`}. Order on WhatsApp, delivered in ${site.city}.`,
    path: collectionUrl(c),
  })
  return (
    <>
      <section class="shop-hero" data-accent={c.accent}>
        <div class="container">
          <nav class="crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <a href="/shop">Shop</a>
            <span>/</span>
            <span aria-current="page">{c.name}</span>
          </nav>
          <p class="shop-hindi" lang="hi">
            {c.hindi}
          </p>
          <h1 class="shop-title">
            {c.name}
            {c.limited && <span class="badge">Limited edition</span>}
          </h1>
          <p class="shop-desc">
            {c.meaning && <em>“{c.meaning}.” </em>}
            {c.description}
          </p>
          <ul class="facts">
            <li>
              <RulerIcon size={18} /> {c.size}
            </li>
            <li>
              <TruckIcon size={18} /> {c.delivery}
            </li>
          </ul>
        </div>
      </section>
      <Filters active={c} />
      <section class="container shop-body">
        <Grid collection={c} eager />
      </section>
    </>
  )
}

function AllShop() {
  useHead({
    title: `Shop all designs · ${site.name}`,
    description: `All ${products.length} hand-painted designs: rakhis, lumbas and auspicious keepsakes. Order on WhatsApp, delivered in ${site.city}.`,
    path: '/shop',
  })
  return (
    <>
      <section class="shop-hero" data-accent="rani">
        <div class="container">
          <nav class="crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <span aria-current="page">Shop</span>
          </nav>
          <h1 class="shop-title">All designs</h1>
          <p class="shop-desc">
            {products.length} hand-painted pieces across three collections. Tap ADD on the ones you love, then send
            your bag on WhatsApp.
          </p>
        </div>
      </section>
      <Filters />
      <div class="container shop-body">
        {collections.map((c, i) => (
          <section class="shop-group" key={c.id} data-accent={c.accent} aria-labelledby={`g-${c.id}`}>
            <header class="group-head">
              <div>
                <p class="group-kicker">
                  <span lang="hi">{c.hindi}</span>
                  <span class="group-type">{c.typePlural}</span>
                </p>
                <h2 id={`g-${c.id}`}>{c.name}</h2>
              </div>
              <a href={collectionUrl(c)} class="link-arrow">
                Details <ArrowIcon size={18} />
              </a>
            </header>
            <Grid collection={c} eager={i === 0} />
          </section>
        ))}
      </div>
    </>
  )
}

export function Shop({ collection }: { collection?: Collection }) {
  return collection ? <CollectionShop c={collection} /> : <AllShop />
}
