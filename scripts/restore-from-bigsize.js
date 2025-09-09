/*
  Restore specified assets from src/assetsBigsize to src/assets, then optimize and generate WebP/AVIF.
  Usage: node scripts/restore-from-bigsize.js <file1> [file2 ...]
  Paths are relative to src/assets (e.g., "logo.jpg" or "blog/header.jpg").
*/
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const ROOT = path.resolve(__dirname, '..')
const SRC_ASSETS = path.join(ROOT, 'src', 'assets')
const BIG_ASSETS = path.join(ROOT, 'src', 'assetsBigsize')

const MAX_WIDTH = 1600
const JPEG_QUALITY = 70
const PNG_COMPRESSION = 9

const targets = process.argv.slice(2)
if (!targets.length) {
  console.error('Please specify at least one file to restore (relative to src/assets).')
  process.exit(1)
}

async function ensureDir (p) {
  await fs.promises.mkdir(p, { recursive: true })
}

async function optimizeOne (file) {
  const ext = path.extname(file).toLowerCase()
  const input = sharp(file)
  const meta = await input.metadata()
  let pipeline = sharp(file)
  if ((meta.width || 0) > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true })
  }
  const outTmp = file + '.tmp-opt'
  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
  } else if (ext === '.png') {
    // Keep PNG for possible transparency
    pipeline = pipeline.png({ compressionLevel: PNG_COMPRESSION })
  }
  await pipeline.toFile(outTmp)
  await fs.promises.rename(outTmp, file)
}

async function genVariant (file, format, opts) {
  const out = `${file}.${format}`
  await sharp(file)[format](opts).toFile(out)
}

async function main () {
  for (const rel of targets) {
    const srcBig = path.join(BIG_ASSETS, rel)
    const dst = path.join(SRC_ASSETS, rel)
    if (!fs.existsSync(srcBig)) {
      console.error(`Missing in assetsBigsize: ${rel}`)
      continue
    }
    await ensureDir(path.dirname(dst))
    await fs.promises.copyFile(srcBig, dst)
    await optimizeOne(dst)
    // Generate AVIF/WEBP variants next to the asset for versioning
    await genVariant(dst, 'webp', { quality: 75 })
    await genVariant(dst, 'avif', { quality: 50 })
    console.log(`Restored and optimized: ${rel}`)
  }
}
main().catch((e) => { console.error(e); process.exit(1) })
