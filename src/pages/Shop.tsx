import { collectionUrl, collections, productsIn, products, type Collection } from '../data/catalog'
import { site } from '../data/site'
import { Ornament } from '../components/decor'
import { ProductCard } from '../components/ProductCard'
import { price } from '../lib/format'
import { useHead } from '../lib/head'

function Tabs({ active }: { active?: Collection }) {
  return (
    <div class="tabs-bar">
      <nav class="container tabs" aria-label="Collections">
        <a href="/shop" class="tab" aria-current={!active ? 'page' : undefined}>
          All <span>{products.length}</span>
        </a>
        {collections.map((c) => (
          <a key={c.id} href={collectionUrl(c)} class="tab" aria-current={active?.id === c.id ? 'page' : undefined}>
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

function Crumbs({ c }: { c?: Collection }) {
  return (
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span aria-hidden="true">/</span>
      {c ? <a href="/shop">Shop</a> : <span aria-current="page">Shop</span>}
      {c && (
        <>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{c.name}</span>
        </>
      )}
    </nav>
  )
}

function CollectionShop({ c }: { c: Collection }) {
  const items = productsIn(c.id)
  const same = new Set(items.map((p) => p.price)).size === 1
  const priceLine = same ? `${price(items[0].price)} each` : `from ${price(Math.min(...items.map((p) => p.price)))}`
  useHead({
    title: `${c.name} ${c.typePlural} · ${site.name}`,
    description: `${c.description} ${items.length} designs, ${priceLine}. Order on WhatsApp, delivered in ${site.city}.`,
    path: collectionUrl(c),
  })
  return (
    <>
      <section class="page-head">
        <div class="container">
          <Crumbs c={c} />
          <p class="page-hindi" lang="hi">
            {c.hindi}
          </p>
          <h1 class="display page-title">
            {c.name}
            {c.meaning && <em> · {c.meaning}</em>}
          </h1>
          <Ornament />
          <p class="page-desc">{c.description}</p>
          <ul class="facts">
            <li>{c.limited ? 'Limited edition' : c.typePlural}</li>
            <li>{c.size}</li>
            <li>Delivered in {c.delivery}</li>
            <li>{priceLine}</li>
          </ul>
        </div>
      </section>
      <Tabs active={c} />
      <section class="container shop-body">
        <Grid collection={c} eager />
      </section>
    </>
  )
}

function AllShop() {
  useHead({
    title: `Shop all pieces · ${site.name}`,
    description: `All ${products.length} hand-painted pieces: rakhis, lumbas and auspicious keepsakes. Order on WhatsApp, delivered in ${site.city}.`,
    path: '/shop',
  })
  return (
    <>
      <section class="page-head">
        <div class="container">
          <Crumbs />
          <p class="eyebrow">The collection</p>
          <h1 class="display page-title">All pieces</h1>
          <Ornament />
          <p class="page-desc">
            {products.length} hand-painted pieces across three collections. Add the ones you love, then send your bag
            on WhatsApp.
          </p>
        </div>
      </section>
      <Tabs />
      <div class="container shop-body">
        {collections.map((c, i) => (
          <section class="shop-group" key={c.id} aria-labelledby={`g-${c.id}`}>
            <header class="group-head">
              <div>
                <p class="group-hindi" lang="hi">
                  {c.hindi}
                </p>
                <h2 id={`g-${c.id}`}>{c.name}</h2>
              </div>
              <a href={collectionUrl(c)} class="text-link" aria-label={`View collection: ${c.name}`}>
                View collection
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
