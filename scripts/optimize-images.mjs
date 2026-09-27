// Turns every photo in /photos into small, responsive AVIF + WebP files
// in /public/img, plus a JPEG for link previews (WhatsApp etc).
//
// Runs automatically before `npm run build`, and only re-processes photos
// that changed, so it is safe to run as often as you like:
//   npm run images
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const SRC = path.join(root, 'photos')
const OUT = path.join(root, 'public/img/p')
const MANIFEST = path.join(root, 'src/data/images.json')

// Every product photo is shown in a 3:4 frame.
const RATIO = 4 / 3
const WIDTHS = [360, 540, 720, 960]
const OG_WIDTH = 600

const manifest = existsSync(MANIFEST) ? JSON.parse(await readFile(MANIFEST, 'utf8')) : {}
await mkdir(OUT, { recursive: true })

const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort()
const next = {}
let changed = 0

for (const file of files) {
  const name = path.parse(file).name
  const input = await readFile(path.join(SRC, file))
  const hash = createHash('sha1').update(input).update(WIDTHS.join()).digest('hex').slice(0, 8)
  const base = `${name}.${hash}`
  const prev = manifest[name]

  if (prev?.hash === hash && existsSync(path.join(OUT, `${base}.og.jpg`))) {
    next[name] = prev
    continue
  }

  const meta = await sharp(input).metadata()
  const widths = WIDTHS.filter((w) => w <= meta.width)
  const frame = (w) => sharp(input).rotate().resize(w, Math.round(w * RATIO), { fit: 'cover' })

  await Promise.all(
    widths.flatMap((w) => [
      frame(w).avif({ quality: 52, effort: 5 }).toFile(path.join(OUT, `${base}.${w}.avif`)),
      frame(w).webp({ quality: 74, effort: 5 }).toFile(path.join(OUT, `${base}.${w}.webp`)),
    ]),
  )
  await frame(OG_WIDTH).jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(OUT, `${base}.og.jpg`))

  // A 12×16 preview, inlined as a blurred placeholder while the real photo loads.
  const tiny = await frame(12).webp({ quality: 40 }).toBuffer()

  next[name] = { hash, widths, lqip: `data:image/webp;base64,${tiny.toString('base64')}` }
  changed++
  console.log(`  ✓ ${name}`)
}

// Clean up files from photos that were replaced or deleted.
const keep = new Set(Object.entries(next).map(([n, v]) => `${n}.${v.hash}`))
for (const f of await readdir(OUT)) {
  const stem = f.split('.').slice(0, 2).join('.')
  if (!keep.has(stem)) await rm(path.join(OUT, f))
}

await writeFile(MANIFEST, JSON.stringify(next, null, 2) + '\n')
console.log(`images: ${files.length} photos, ${changed} processed`)
