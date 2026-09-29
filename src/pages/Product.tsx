import { useRef } from 'preact/hooks'
import {
  collectionOf,
  collectionUrl,
  fullName,
  productsIn,
  productUrl,
  type Product,
} from '../data/catalog'
import { site } from '../data/site'
import { AddButton } from '../components/AddButton'
import { BrushIcon, CloseIcon, RulerIcon, SparkIcon, TruckIcon, WhatsAppIcon, ZoomIcon } from '../components/icons'
import { Photo } from '../components/Photo'
import { Rail } from '../components/Rail'
import { SectionHead } from '../components/SectionHead'
import { price } from '../lib/format'
import { useHead } from '../lib/head'
import { photoFor } from '../lib/images'
import { productMessage, waLink } from '../lib/whatsapp'

export function ProductPage({ product: p }: { product: Product }) {
  const c = collectionOf(p)
  const ph = photoFor(p)
  const zoom = useRef<HTMLDialogElement>(null)
  const more = productsIn(c.id).filter((x) => x.id !== p.id)

  useHead({
    title: `${fullName(p)} · ${c.type} · ${site.name}`,
    description: `Hand-painted ${c.type.toLowerCase()} from the ${c.name} collection, ${price(p.price)}. ${c.size}. Order on WhatsApp, delivered in ${site.city} in ${c.delivery}.`,
    path: productUrl(p),
    image: ph.og,
    type: 'product',
    jsonLd: site.url
      ? {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: fullName(p),
          image: site.url + ph.og,
          description: c.description,
          category: c.type,
          brand: { '@type': 'Brand', name: site.name },
          offers: {
            '@type': 'Offer',
            price: p.price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/MadeToOrder',
            url: site.url + productUrl(p),
          },
        }
      : undefined,
  })

  return (
    <div>
      <div class="container product">
        <nav class="crumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/shop">Shop</a>
          <span>/</span>
          <a href={collectionUrl(c)}>{c.name}</a>
          <span>/</span>
          <span aria-current="page">{p.name}</span>
        </nav>

        <div class="product-grid">
          <div class="product-media">
            <button type="button" class="zoom-trigger" onClick={() => zoom.current?.showModal()} aria-label="Zoom in on photo">
              <Photo product={p} class="product-photo" sizes="(min-width: 900px) 540px, 92vw" priority="high" />
              <span class="zoom-hint" aria-hidden="true">
                <ZoomIcon size={17} stroke-width={1.4} />
              </span>
            </button>
          </div>

          <div class="product-info">
            <a href={collectionUrl(c)} class="product-coll">
              {c.name} <span lang="hi">{c.hindi}</span>
            </a>
            <h1 class="display product-title">{p.name}</h1>
            <p class="product-type">
              {c.type}
              {c.limited && <span class="flag">Limited edition</span>}
            </p>
            <p class="product-price">{price(p.price)}</p>
            <p class="product-desc">{c.description}</p>

            <div class="product-actions">
              <AddButton product={p} variant="large" />
              <a class="btn btn-wa btn-lg" href={waLink(productMessage(p))} target="_blank" rel="noopener">
                <WhatsAppIcon size={18} /> Order just this
              </a>
            </div>

            <ul class="specs">
              <li>
                <RulerIcon size={20} stroke-width={1.2} />
                <div>
                  <b>Size</b>
                  <span>{c.size}</span>
                </div>
              </li>
              <li>
                <TruckIcon size={20} stroke-width={1.2} />
                <div>
                  <b>Delivery</b>
                  <span>
                    {c.delivery}, within {site.city}
                  </span>
                </div>
              </li>
              <li>
                <BrushIcon size={20} stroke-width={1.2} />
                <div>
                  <b>Made with</b>
                  <span>{c.materials.join(' · ')}</span>
                </div>
              </li>
            </ul>

            <p class="handmade-note">
              <SparkIcon size={18} stroke-width={1.2} />
              <span>
                Every piece is completely handmade, so yours may vary slightly from the photo. That’s what makes it
                one of a kind.
              </span>
            </p>
          </div>
        </div>
      </div>

      {more.length > 0 && (
        <section class="more" aria-labelledby="more-title">
          <div class="container">
            <SectionHead id="more-title" eyebrow={c.typePlural} title={`More from ${c.name}`} />
          </div>
          <Rail products={more} label={`More from ${c.name}`} />
        </section>
      )}

      <dialog
        ref={zoom}
        class="zoom"
        aria-label={`${fullName(p)} photo`}
        onClick={() => zoom.current?.close()}
      >
        <img src={ph.large} alt={`${fullName(p)}, full size`} width={960} height={1280} loading="lazy" decoding="async" />
        <button type="button" class="icon-btn zoom-close" aria-label="Close">
          <CloseIcon stroke-width={1.5} />
        </button>
      </dialog>
    </div>
  )
}
