import { collectionUrl, collections } from '../data/catalog'
import { site } from '../data/site'
import { helloMessage, telLink, waLink } from '../lib/whatsapp'
import { Rangoli } from './decor'
import { Logo } from './Header'
import { PhoneIcon, PinIcon, WhatsAppIcon } from './icons'

export function Footer() {
  return (
    <footer class="site-footer">
      <Rangoli class="footer-rangoli" />
      <div class="container footer-grid">
        <div class="footer-brand">
          <Logo id="lm-footer" />
          <p class="footer-hindi" lang="hi">
            {site.tagline}
          </p>
          <p class="footer-meaning">{site.taglineMeaning}</p>
        </div>

        <nav class="footer-col" aria-label="Shop">
          <h2>Shop</h2>
          <ul>
            <li>
              <a href="/shop">All designs</a>
            </li>
            {collections.map((c) => (
              <li key={c.id}>
                <a href={collectionUrl(c)}>
                  {c.name} <span>· {c.typePlural}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav class="footer-col" aria-label="Help">
          <h2>Help</h2>
          <ul>
            <li>
              <a href="/#how-to-order">How ordering works</a>
            </li>
            <li>
              <a href="/#custom">Custom designs</a>
            </li>
            <li>
              <a href="/#faq">Questions</a>
            </li>
          </ul>
        </nav>

        <div class="footer-col">
          <h2>Say hello</h2>
          <ul class="footer-contact">
            <li>
              <a href={waLink(helloMessage)} target="_blank" rel="noopener">
                <WhatsAppIcon size={18} /> WhatsApp {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={telLink}>
                <PhoneIcon size={18} /> Call {site.phoneDisplay}
              </a>
            </li>
            <li>
              <PinIcon size={18} /> {site.city}. We deliver within {site.city} only.
            </li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>
          © {new Date().getFullYear()} {site.name}. Painted by hand in {site.city}.
        </p>
      </div>
    </footer>
  )
}
