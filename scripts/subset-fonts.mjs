// Cuts the two web fonts down to only the letters the site uses, so they
// load fast on mobile data:
//   • Fraunces (headings): basic Latin + punctuation.
//   • Rozha One (Hindi): only the Devanagari letters found in /src.
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

const DEVANAGARI = /[ऀ-ॿ᳐-᳿꣠-ꣿ‌‍]/gu
const hindi = new Set(['◌']) // dotted circle, used by shapers for lone marks
for await (const file of walk(path.join(root, 'src'))) {
  for (const c of (await readFile(file, 'utf8')).match(DEVANAGARI) ?? []) hindi.add(c)
}

const results = await Promise.all([
  build(pkg('@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2'), latin, 'fraunces.woff2'),
  build(pkg('@fontsource/rozha-one/files/rozha-one-devanagari-400-normal.woff2'), [...hindi].join(''), 'rozha-one-hindi.woff2'),
])
console.log(`fonts: ${results.join(', ')}`)
