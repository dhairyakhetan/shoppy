import { copyFile } from 'node:fs/promises'
import path from 'node:path'
import preact from '@preact/preset-vite'
import { defineConfig, type Plugin } from 'vite'
import { allPaths } from './src/routes'

// Absolute site address, used in link previews and the sitemap.
// On Vercel this is filled in automatically; set VITE_SITE_URL for a custom domain.
const siteUrl = (
  process.env.VITE_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
).replace(/\/$/, '')

function seoFiles(): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const lines = ['User-agent: *', 'Allow: /']
      if (siteUrl) {
        const urls = allPaths().map((p) => `  <url><loc>${siteUrl}${p}</loc></url>`)
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
        })
        lines.push(`Sitemap: ${siteUrl}/sitemap.xml`)
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: lines.join('\n') + '\n' })
    },
    // Vercel serves /404.html for unknown addresses.
    async writeBundle(opts) {
      const dir = opts.dir!
      await copyFile(path.join(dir, '404/index.html'), path.join(dir, '404.html'))
    },
  }
}

export default defineConfig({
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: '#app',
        additionalPrerenderRoutes: ['/404'],
        previewMiddlewareEnabled: true,
        previewMiddlewareFallback: '/404',
      },
    }),
    seoFiles(),
  ],
  define: {
    'import.meta.env.SITE_URL': JSON.stringify(siteUrl),
  },
  build: {
    target: 'es2022',
    assetsInlineLimit: 0,
  },
})
