import { collectionUrl, collections } from '../data/catalog'
import { site } from '../data/site'
import { helloMessage, telLink, waLink } from '../lib/whatsapp'
import { Ornament } from './decor'
import { Logo } from './Header'
import { PhoneIcon, PinIcon, WhatsAppIcon } from './icons'

export function Footer() {
  return (
    <footer class="site-footer">
      <div class="container footer-top">
        <Logo />
        <p class="footer-hindi" lang="hi">
          {site.tagline}
        </p>
        <p class="footer-meaning">{site.taglineMeaning}</p>
        <Ornament />
      </div>

      <div class="container footer-grid">
        <nav class="footer-col" aria-label="Shop">
          <h2>Shop</h2>
          <ul>
            <li>
              <a href="/shop">All pieces</a>
            </li>
            {collections.map((c) => (
              <li key={c.id}>
                <a href={collectionUrl(c)}>{c.name}</a>
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

        <div class="footer-col footer-contact">
          <h2>Contact</h2>
          <ul>
            <li>
              <a href={waLink(helloMessage)} target="_blank" rel="noopener">
                <WhatsAppIcon size={16} /> WhatsApp {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={telLink}>
                <PhoneIcon size={16} stroke-width={1.5} /> Call {site.phoneDisplay}
              </a>
            </li>
            <li>
              <PinIcon size={16} stroke-width={1.5} /> {site.city}, delivering within the city
            </li>
          </ul>
        </div>
      </div>

      <div class="container footer-bottom">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>Painted by hand in {site.city}</p>
      </div>
    </footer>
  )
}
