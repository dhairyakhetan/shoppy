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
import { Rangoli, Sparkles, Toran } from '../components/decor'
import {
  ArrowIcon,
  BagIcon,
  BrushIcon,
  PinIcon,
  SparkIcon,
  TruckIcon,
  WhatsAppIcon,
} from '../components/icons'
import { Photo } from '../components/Photo'
import { Rail } from '../components/Rail'
import { SectionHead } from '../components/SectionHead'
import { price } from '../lib/format'
import { useHead } from '../lib/head'
import { customMessage, waLink } from '../lib/whatsapp'

// ── Hero ────────────────────────────────────────────────────────────────────

const HERO = ['golden-heritage-peacock-heritage', 'tanjore-soan-om', 'swarn-dhaga-design-6']

function Hero() {
  const [left, right, center] = HERO.map((id) => getProduct(id)!)
  const fan = (p: Product, cls: string, priority?: 'high' | true) => (
    <a href={productUrl(p)} class={`fan ${cls}`} data-href={productUrl(p)}>
      <Photo product={p} class="card-photo" sizes="(min-width: 900px) 250px, 42vw" priority={priority} />
    </a>
  )
  return (
    <section class="hero">
      <div class="hero-bg" aria-hidden="true">
        <i class="blob b1" />
        <i class="blob b2" />
        <i class="blob b3" />
        <i class="stars" />
      </div>
      <Toran />
      <div class="container hero-inner">
        <div class="hero-copy">
          <p class="pill">
            <PinIcon size={16} /> Handmade in {site.city}
          </p>
          <h1 class="hero-title">
            Festive Tanjore art, <em>painted by hand</em>
          </h1>
          <p class="hero-hindi" lang="hi">
            {site.tagline}
          </p>
          <p class="hero-sub">
            Rakhis, lumbas and little auspicious keepsakes, each one hand-painted with gold-tone detailing. Fill
            your bag, then order in a single WhatsApp message.
          </p>
          <div class="hero-ctas">
            <a class="btn btn-primary btn-lg" href="/shop">
              Shop all designs <ArrowIcon size={20} />
            </a>
            <a class="btn btn-ghost btn-lg" href="#how-to-order">
              How ordering works
            </a>
          </div>
          <ul class="hero-trust">
            <li>
              <BrushIcon size={18} /> 100% handmade
            </li>
            <li>
              <TruckIcon size={18} /> Delivery in {site.city}
            </li>
            <li>
              <SparkIcon size={18} /> Custom designs
            </li>
          </ul>
        </div>
        <div class="hero-art">
          <Rangoli class="hero-rangoli" />
          <Sparkles />
          {fan(left, 'fan-l', true)}
          {fan(right, 'fan-r', true)}
          {fan(center, 'fan-c', 'high')}
        </div>
      </div>
    </section>
  )
}

// ── Marquee strip ───────────────────────────────────────────────────────────

const STRIP = [
  'Hand-painted Tanjore art',
  'Gold-tone detailing',
  `Made in ${site.city}`,
  'Custom designs on request',
  'Order on WhatsApp',
  'Every piece one of a kind',
]

function Marquee() {
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden ? 'true' : undefined}>
      {STRIP.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  )
  return (
    <div class="marquee">
      <div class="marquee-track">
        {row()}
        {row(true)}
      </div>
    </div>
  )
}

// ── Collections ─────────────────────────────────────────────────────────────

function CollectionCard({ c }: { c: Collection }) {
  const items = productsIn(c.id)
  const prices = new Set(items.map((p) => p.price))
  const priceLine = prices.size === 1 ? `${price(items[0].price)} each` : `from ${price(lowestPrice(c.id))}`
  return (
    <a href={collectionUrl(c)} class="coll-card reveal" data-accent={c.accent}>
      <div class="coll-text">
        <p class="coll-type">
          {c.typePlural}
          {c.limited && <span class="coll-limited">Limited edition</span>}
        </p>
        <h3 class="coll-hindi" lang="hi">
          {c.hindi}
        </h3>
        <p class="coll-name">
          {c.name}
          {c.meaning && <span>“{c.meaning}”</span>}
        </p>
        <p class="coll-meta">
          {items.length} designs · {priceLine}
        </p>
      </div>
      <div class="coll-photos" aria-hidden="true">
        {items.slice(0, 3).map((p, i) => (
          <div class={`coll-photo p${i}`} key={p.id}>
            <Photo product={p} sizes="160px" />
          </div>
        ))}
      </div>
      <span class="coll-cta" aria-hidden="true">
        <ArrowIcon size={22} />
      </span>
    </a>
  )
}

// ── How ordering works ──────────────────────────────────────────────────────

const STEPS = [
  {
    icon: BagIcon,
    title: 'Fill your bag',
    text: 'Browse the designs and tap ADD on the ones you love. Change quantities any time.',
  },
  {
    icon: WhatsAppIcon,
    title: 'Send it on WhatsApp',
    text: 'Your bag turns into a ready-made message with every design and the total. Just tap send.',
  },
  {
    icon: TruckIcon,
    title: 'Pay and receive',
    text: `We confirm your order, payment and delivery with you on chat, then deliver it anywhere in ${site.city}.`,
  },
]

function HowToOrder() {
  return (
    <section class="section how" aria-labelledby="how-title" id="how-to-order">
      <div class="container">
        <SectionHead
          id="how-title"
          eyebrow="How it works"
          title="Ordering is as easy as a chat"
          sub="No accounts, no forms, no card details. Just WhatsApp."
          center
        />
        <ol class="steps">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li class="step reveal" key={title}>
              <span class="step-icon">
                <Icon size={26} />
                <span class="step-num">{i + 1}</span>
              </span>
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

function CustomBand() {
  return (
    <section class="container custom-wrap" id="custom" aria-labelledby="custom-title">
      <div class="custom-band reveal">
        <Rangoli class="band-rangoli" />
        <div class="custom-copy">
          <p class="eyebrow eyebrow-light">Custom designs</p>
          <h2 class="h2" id="custom-title">
            Have something special in mind?
          </h2>
          <p>Custom designs are available on request. Tell us your idea and we'll work out a piece made just for you.</p>
        </div>
        <a class="btn btn-light btn-lg" href={waLink(customMessage)} target="_blank" rel="noopener">
          <WhatsAppIcon size={22} /> Ask on WhatsApp
        </a>
      </div>
    </section>
  )
}

// ── FAQ ─────────────────────────────────────────────────────────────────────

function Faq() {
  const faqs = [
    {
      q: 'How do I place an order?',
      a: 'Add the designs you like to your bag and tap “Send order on WhatsApp”. Your order opens as a ready-made message. Send it, and we’ll reply to confirm.',
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
      a: 'Everything is completely handmade, so small variations between pieces are expected. That’s part of what makes each one special.',
    },
    { q: 'Can I get a custom design?', a: 'Yes! Custom designs are available on request. Message us on WhatsApp with your idea.' },
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
function mixed() {
  const lists = collections.map((c) => productsIn(c.id))
  const out: Product[] = []
  for (let i = 0; out.length < products.length; i++) for (const l of lists) if (l[i]) out.push(l[i])
  return out.slice(0, 12)
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
      <Marquee />

      <section class="section" aria-labelledby="coll-title">
        <div class="container">
          <SectionHead id="coll-title" eyebrow="Collections" title="Three collections, all hand-painted" />
          <div class="coll-grid">
            {collections.map((c) => (
              <CollectionCard key={c.id} c={c} />
            ))}
          </div>
        </div>
      </section>

      <section class="section section-tight" aria-labelledby="picks-title">
        <div class="container">
          <SectionHead
            id="picks-title"
            eyebrow="Designs"
            title="Pick your favourites"
            action={
              <a class="link-arrow" href="/shop">
                See all {products.length} <ArrowIcon size={18} />
              </a>
            }
          />
        </div>
        <Rail products={mixed()} label="Designs" />
      </section>

      <HowToOrder />
      <CustomBand />
      <Faq />
    </>
  )
}
