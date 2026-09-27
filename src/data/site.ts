export const site = {
  name: 'SD Creations',
  tagline: 'हाथों से बना, प्यार से सजा',
  taglineMeaning: 'Made by hand, adorned with love',
  description:
    'Hand-painted Tanjore rakhis, lumbas and auspicious keepsakes, made by hand in Kolkata. Pick your favourites and order on WhatsApp.',
  city: 'Kolkata',
  /** Digits only, with country code. Used for wa.me and tel: links. */
  phone: '919836960841',
  phoneDisplay: '+91 98369 60841',
  /**
   * Set automatically on Vercel. Used for absolute links in link previews.
   * Override with VITE_SITE_URL if you add a custom domain.
   */
  url: (import.meta.env.VITE_SITE_URL || import.meta.env.SITE_URL || '').replace(/\/$/, ''),
}
