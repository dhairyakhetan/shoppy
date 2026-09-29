import {
  collectionUrl,
  collections,
  getProduct,
  lowestPrice,
  productsIn,
  productUrl,
  products,
  type Collection,
  type Product,
} from '../data/catalog'
import { site } from '../data/site'
import { BrushIcon, ChatIcon, PinIcon, SparkIcon, WhatsAppIcon, ArrowIcon } from '../components/icons'
import { Photo } from '../components/Photo'
import { ProductCard } from '../components/ProductCard'
import { SectionHead } from '../components/SectionHead'
import { price } from '../lib/format'
import { useHead } from '../lib/head'
import { customMessage, waLink } from '../lib/whatsapp'

// ── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  const main = getProduct('golden-heritage-peacock-heritage')!
  const side = getProduct('swarn-dhaga-design-6')!
  return (
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">Hand-painted in {site.city}</p>
          <h1 class="display">
            Tanjore art, <em>painted by&nbsp;hand</em>
          </h1>
          <p class="hero-hindi" lang="hi">
            {site.tagline}
          </p>
          <p class="lede">
            Rakhis, lumbas and small auspicious keepsakes, each one finished with gold-tone detailing. Choose your
            pieces and order in a single WhatsApp message.
          </p>
          <div class="hero-ctas">
            <a class="btn btn-primary" href="/shop">
              Explore the collection <ArrowIcon size={16} stroke-width={1.5} />
            </a>
            <a class="text-link" href="#how-to-order">
              How ordering works
            </a>
          </div>
        </div>

        <div class="hero-art">
          <span class="arch-outline" aria-hidden="true" />
          <a href={productUrl(main)} class="arch arch-main" data-href={productUrl(main)}>
            <Photo product={main} class="card-photo" sizes="(min-width: 900px) 420px, 70vw" priority="high" />
          </a>
          <a href={productUrl(side)} class="arch arch-side" data-href={productUrl(side)}>
            <Photo product={side} class="card-photo" sizes="(min-width: 900px) 200px, 34vw" priority />
          </a>
          <p class="hero-caption">
            <span>Golden Heritage</span> Peacock Heritage lumba
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Promises ────────────────────────────────────────────────────────────────

function Promises() {
  const items = [
    { icon: BrushIcon, title: 'Painted by hand', text: 'Every piece, start to finish' },
    { icon: SparkIcon, title: 'Gold-tone detailing', text: 'In the Tanjore tradition' },
    { icon: PinIcon, title: `Delivered in ${site.city}`, text: 'Within the city' },
    { icon: ChatIcon, title: 'Custom on request', text: 'Just ask on WhatsApp' },
  ]
  return (
    <ul class="container promises">
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title}>
          <Icon size={22} stroke-width={1.2} />
          <div>
            <b>{title}</b>
            <span>{text}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}

// ── Collections ─────────────────────────────────────────────────────────────

function CollectionTile({ c, cover }: { c: Collection; cover: string }) {
  const items = productsIn(c.id)
  const same = new Set(items.map((p) => p.price)).size === 1
  return (
    <a href={collectionUrl(c)} class="coll reveal">
      <div class="coll-arch">
        <Photo product={getProduct(cover)!} sizes="(min-width: 900px) 360px, 88vw" />
        {c.limited && <span class="coll-flag">Limited edition</span>}
      </div>
      <p class="coll-hindi" lang="hi">
        {c.hindi}
      </p>
      <h3 class="coll-name">{c.name}</h3>
      <p class="coll-meta">
        {c.typePlural} · {items.length} designs · {same ? price(items[0].price) : `from ${price(lowestPrice(c.id))}`}
      </p>
      <span class="coll-cta">
        Discover <ArrowIcon size={15} stroke-width={1.5} />
      </span>
    </a>
  )
}

const COVERS: Record<string, string> = {
  'swarn-dhaga': 'swarn-dhaga-design-4',
  'golden-heritage': 'golden-heritage-swarna-abhushan',
  'tanjore-soan': 'tanjore-soan-sun',
}

// ── How ordering works ──────────────────────────────────────────────────────

const STEPS = [
  { title: 'Choose your pieces', text: 'Browse the collection and add the designs you love to your bag.' },
  {
    title: 'Send it on WhatsApp',
    text: 'Your bag becomes a ready-written message with every piece and the total. Just tap send.',
  },
  {
    title: 'Confirm and receive',
    text: `We confirm availability, payment and delivery with you on chat, then deliver within ${site.city}.`,
  },
]

function HowToOrder() {
  return (
    <section class="how" id="how-to-order" aria-labelledby="how-title">
      <div class="container">
        <SectionHead
          id="how-title"
          eyebrow="How it works"
          title="Ordering, as easy as a conversation"
          sub="No accounts and no card details. Everything is arranged personally on WhatsApp."
          center
        />
        <ol class="steps">
          {STEPS.map(({ title, text }, i) => (
            <li class="step reveal" key={title}>
              <span class="step-num">{['I', 'II', 'III'][i]}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// ── Custom designs ──────────────────────────────────────────────────────────

function Custom() {
  const p = getProduct('tanjore-soan-om')!
  return (
    <section class="section" id="custom" aria-labelledby="custom-title">
      <div class="container custom">
        <div class="custom-art reveal">
          <div class="arch">
            <Photo product={p} sizes="(min-width: 900px) 380px, 80vw" />
          </div>
        </div>
        <div class="custom-copy reveal">
          <p class="eyebrow">Custom designs</p>
          <h2 class="h2" id="custom-title">
            Something made <em>just for you</em>
          </h2>
          <p class="lede">
            Have a colour, a symbol or an occasion in mind? Custom designs are available on request. Tell us your idea
            and we’ll work it out together.
          </p>
          <a class="btn btn-wa" href={waLink(customMessage)} target="_blank" rel="noopener">
            <WhatsAppIcon size={18} /> Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

// ── FAQ ─────────────────────────────────────────────────────────────────────

function Faq() {
  const faqs = [
    {
      q: 'How do I place an order?',
      a: 'Add the pieces you like to your bag and tap “Send order on WhatsApp”. Your order opens as a ready-written message. Send it, and we’ll reply to confirm.',
    },
    {
      q: 'How do I pay?',
      a: 'Payment is discussed and arranged with you on WhatsApp once we confirm your order. Nothing is charged on this website.',
    },
    { q: 'Where do you deliver?', a: `We deliver within ${site.city} only.` },
    {
      q: 'How long does delivery take?',
      a: collections.map((c) => `${c.typePlural}: ${c.delivery}`).join('. ') + '.',
    },
    {
      q: 'Will my piece look exactly like the photo?',
      a: 'Everything is completely handmade, so small variations between pieces are expected. It is part of what makes each one unique.',
    },
    { q: 'Can I get a custom design?', a: 'Yes. Custom designs are available on request. Message us on WhatsApp with your idea.' },
  ]
  return (
    <section class="section faq" id="faq" aria-labelledby="faq-title">
      <div class="container faq-inner">
        <SectionHead id="faq-title" eyebrow="Good to know" title="Questions, answered" />
        <div class="faq-list">
          {faqs.map(({ q, a }) => (
            <details key={q} class="faq-item">
              <summary>
                {q}
                <span class="faq-icon" aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

/** A mix across collections: one from each, round and round. */
function selected(n: number) {
  const lists = collections.map((c) => productsIn(c.id))
  const out: Product[] = []
  for (let i = 0; out.length < products.length; i++) for (const l of lists) if (l[i]) out.push(l[i])
  return out.slice(0, n)
}

export function Home() {
  useHead({
    title: `${site.name} · Hand-painted Tanjore rakhis, lumbas & keepsakes`,
    description: site.description,
    path: '/',
    jsonLd: site.url
      ? {
          '@context': 'https://schema.org',
          '@type': 'Store',
          name: site.name,
          url: site.url,
          image: `${site.url}/og.jpg`,
          telephone: `+${site.phone}`,
          address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'IN' },
          areaServed: site.city,
        }
      : undefined,
  })

  return (
    <>
      <Hero />
      <Promises />

      <section class="section" aria-labelledby="coll-title">
        <div class="container">
          <SectionHead id="coll-title" eyebrow="The collections" title="Three collections, one tradition" center />
          <div class="coll-grid">
            {collections.map((c) => (
              <CollectionTile key={c.id} c={c} cover={COVERS[c.id] ?? productsIn(c.id)[0].id} />
            ))}
          </div>
        </div>
      </section>

      <section class="section section-alt" aria-labelledby="picks-title">
        <div class="container">
          <SectionHead
            id="picks-title"
            eyebrow="Selected pieces"
            title="From the studio"
            action={
              <a class="text-link" href="/shop">
                View all {products.length} pieces
              </a>
            }
          />
          <div class="grid">
            {selected(8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <HowToOrder />
      <Custom />
      <Faq />
    </>
  )
}
