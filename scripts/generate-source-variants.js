/*
  Generate .webp and .avif variants next to each JPG/PNG in src/assets.
  - Skips files if variant already exists
  - Keeps original dimensions (assumes base images were already resized)
  Usage: node scripts/generate-source-variants.js [--webpQuality=75] [--avifQuality=50]
*/
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const ROOT = path.resolve(__dirname, '..')
const SRC_ASSETS = path.join(ROOT, 'src', 'assets')

const args = process.argv.slice(2)
const arg = (k, d) => {
  const hit = args.find(a => a.startsWith(`--${k}=`))
  return hit ? hit.split('=')[1] : d
}
const WEBP_QUALITY = parseInt(arg('webpQuality', '75'), 10)
const AVIF_QUALITY = parseInt(arg('avifQuality', '50'), 10)

const VALID_EXT = new Set(['.jpg', '.jpeg', '.png'])

async function * walk (dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === '.git' || entry.name === '.svn') continue
      yield * walk(full)
    } else {
      yield full
    }
  }
}

async function ensureVariant (file, format, quality) {
  const out = `${file}.${format}`
  if (fs.existsSync(out)) return false
  const img = sharp(file)
  if (format === 'webp') {
    await img.webp({ quality: WEBP_QUALITY }).toFile(out)
  } else if (format === 'avif') {
    await img.avif({ quality: AVIF_QUALITY }).toFile(out)
  }
  return true
}

async function main () {
  if (!fs.existsSync(SRC_ASSETS)) {
    console.error('src/assets not found')
    process.exit(1)
  }
  let created = 0
  let skipped = 0
  for await (const file of walk(SRC_ASSETS)) {
    const ext = path.extname(file).toLowerCase()
    if (!VALID_EXT.has(ext)) continue
    const wasWebp = await ensureVariant(file, 'webp', WEBP_QUALITY)
    const wasAvif = await ensureVariant(file, 'avif', AVIF_QUALITY)
    if (wasWebp) created++
    else skipped++
    if (wasAvif) created++
    else skipped++
  }
  console.log(`Variants: created=${created}, skipped=${skipped}`)
}

main().catch(err => { console.error(err); process.exit(1) })

