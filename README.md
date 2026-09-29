# SD Creations

Online shop for SD Creations: hand-painted Tanjore rakhis, lumbas and keepsakes from Kolkata.
Shoppers fill a bag and send the whole order as one pre-filled WhatsApp message. There's no checkout or payment on the site.

## Stack

- **Vite + Preact**, with the same component model as React. The library is about 4 KB instead of about 45 KB, so the site stays fast on mobile data.
- **Prerendered**: every page is built to real HTML at build time. Products show up before any JS loads, and each product link gets its own WhatsApp/Google preview. After the JS loads, navigation works like an app, with smooth page transitions.
- **No backend.** The bag lives in the browser (`localStorage`), and ordering happens on WhatsApp.
- Photos are converted to AVIF/WebP in four sizes, with blurred placeholders. Fonts are trimmed to only the letters the site uses.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build locally
```

## Common changes

| To change… | Edit |
| --- | --- |
| Products, prices, collections, sizes, delivery times | `src/data/catalog.ts` |
| Phone number, tagline, city | `src/data/site.ts` |
| Colours (ivory, ink, brass, emerald; light and dark) | `src/styles/tokens.css` |

### Adding a product

1. Put the photo in `photos/`, named after the product id, e.g. `photos/swarn-dhaga-design-11.jpg`. Portrait photos work best (they're shown at 3:4).
2. Add the product to `products` in `src/data/catalog.ts` with the same id.
3. Run `npm run dev` or push. Photos are optimised automatically (`npm run images`) and only changed photos are re-processed. Commit the generated files in `public/img/p/` and `src/data/images.json`.

Hindi text is picked up automatically: new Devanagari letters anywhere in `src/` are added to the trimmed Hindi font on the next dev/build.

## Deploy (Vercel)

Import the repo in Vercel. It detects Vite, and `vercel.json` sets the rest (build command, `dist/`, long caching for hashed files).

Link previews and the sitemap use the production address automatically. If you add a custom domain, set the environment variable `VITE_SITE_URL=https://your-domain.com` in the Vercel project.

## Structure

```
photos/                 original product photos (source of truth)
public/img/p/           generated AVIF/WebP/JPEG versions (don't edit by hand)
scripts/                photo optimiser + font trimmer (run before dev/build)
src/data/               catalogue and site details
src/pages/              Home, Shop, Product, 404
src/components/         header, bag drawer, product card, diya toggle, …
src/lib/                bag state, router, WhatsApp message, theme
src/styles/             design tokens and styles
```
