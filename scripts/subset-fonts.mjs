// Cuts the web fonts down to only the letters the site uses, so they load
// fast on mobile data:
//   • Cormorant Garamond (headings, regular + italic): basic Latin + punctuation.
//   • Tiro Devanagari Hindi (Hindi): only the Devanagari letters found in /src.
//
// Runs automatically before `npm run dev` and `npm run build`.
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import subsetFont from 'subset-font'

const root = path.resolve(import.meta.dirname, '..')
const OUT = path.join(root, 'src/assets/fonts')
const pkg = (p) => path.join(root, 'node_modules', p)

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(p)
    else if (/\.(tsx?|css|html)$/.test(entry.name)) yield p
  }
}

async function build(source, text, out) {
  const subset = await subsetFont(await readFile(source), text, { targetFormat: 'woff2' })
  const file = path.join(OUT, out)
  let same = false
  try { same = (await readFile(file)).equals(subset) } catch {}
  if (!same) await writeFile(file, subset)
  return `${out} ${(subset.length / 1024).toFixed(1)} KB`
}

await mkdir(OUT, { recursive: true })

// Latin: printable ASCII plus the typographic extras used in copy.
let latin = ''
for (let c = 0x20; c < 0x7f; c++) latin += String.fromCharCode(c)
latin += '–—‘’“”•…·×→←✓é'

const DEVANAGARI = /[\u0900-\u097F\u1CD0-\u1CFF\uA8E0-\uA8FF\u200C\u200D]/gu
const hindi = new Set(['\u25CC']) // dotted circle, used by shapers for lone marks
for await (const file of walk(path.join(root, 'src'))) {
  for (const c of (await readFile(file, 'utf8')).match(DEVANAGARI) ?? []) hindi.add(c)
}

const cormorant = (style) => pkg(`@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-${style}.woff2`)
const results = await Promise.all([
  build(cormorant('normal'), latin, 'cormorant.woff2'),
  build(cormorant('italic'), latin, 'cormorant-italic.woff2'),
  build(pkg('@fontsource/tiro-devanagari-hindi/files/tiro-devanagari-hindi-devanagari-400-normal.woff2'), [...hindi].join(''), 'tiro-hindi.woff2'),
])
console.log(`fonts: ${results.join(', ')}`)
