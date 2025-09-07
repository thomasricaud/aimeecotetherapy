/*
  Downsize and recompress images in src/assets/ while preserving originals in src/assetsBigsize/.
  - Copies any large source image to assetsBigsize if not already present
  - Rewrites the asset in-place with a smaller, optimized version (same extension)
  Usage: node scripts/resize-source-assets.js [--maxWidth=1600] [--jpegQuality=70]
*/
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const ROOT = path.resolve(__dirname, '..')
const SRC_ASSETS = path.join(ROOT, 'src', 'assets')
const BIG_ASSETS = path.join(ROOT, 'src', 'assetsBigsize')

const args = process.argv.slice(2)
const arg = (k, d) => {
  const hit = args.find(a => a.startsWith(`--${k}=`))
  return hit ? hit.split('=')[1] : d
}
const MAX_WIDTH = parseInt(arg('maxWidth', '1600'), 10)
const JPEG_QUALITY = parseInt(arg('jpegQuality', '70'), 10)
const PNG_COMPRESSION = 9
const SIZE_BYTES_THRESHOLD = 300 * 1024 // 300 KB

const VALID_EXT = new Set(['.jpg', '.jpeg', '.png'])

async function * walk (dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      // Skip version-control/system dirs
      if (entry.name === '.git' || entry.name === '.svn') continue
      yield * walk(full)
    } else {
      yield full
    }
  }
}

async function ensureDir (p) {
  await fs.promises.mkdir(p, { recursive: true })
}

async function copyIfMissing (from, to) {
  if (!fs.existsSync(to)) {
    await ensureDir(path.dirname(to))
    await fs.promises.copyFile(from, to)
  }
}

async function optimizeOne (file) {
  const rel = path.relative(SRC_ASSETS, file)
  const ext = path.extname(file).toLowerCase()
  if (!VALID_EXT.has(ext)) return { skipped: true }

  const input = sharp(file)
  const meta = await input.metadata()
  const stats = await fs.promises.stat(file)

  const tooWide = (meta.width || 0) > MAX_WIDTH
  const tooLarge = stats.size > SIZE_BYTES_THRESHOLD
  if (!tooWide && !tooLarge) return { skipped: true }

  // Preserve original in assetsBigsize
  const bigTarget = path.join(BIG_ASSETS, rel)
  await copyIfMissing(file, bigTarget)

  // Compute pipeline
  let pipeline = sharp(file)
  if (tooWide) pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true })

  // sharp cannot write to the same path as input; write temp then replace
  let outFile = file + '.tmp-opt'
  let convertedToJpeg = false
  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
  } else if (ext === '.png') {
    // If PNG is photographic (no alpha), convert to JPEG for much smaller size
    if (!meta.hasAlpha && (tooWide || tooLarge)) {
      pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      outFile = file.replace(/\.png$/i, '.jpg') + '.tmp-opt'
      convertedToJpeg = true
    } else {
      // Keep PNG where transparency likely matters (icons, logos)
      pipeline = pipeline.png({ compressionLevel: PNG_COMPRESSION })
    }
  }

  await pipeline.toFile(outFile)
  if (convertedToJpeg) {
    const finalJpg = file.replace(/\.png$/i, '.jpg')
    await fs.promises.rename(outFile, finalJpg)
    await fs.promises.unlink(file)
    return { optimized: true, rel, width: meta.width, size: stats.size, replaced: [rel, path.relative(SRC_ASSETS, finalJpg)] }
  } else {
    await fs.promises.rename(outFile, file)
    return { optimized: true, rel, width: meta.width, size: stats.size }
  }
}

async function main () {
  if (!fs.existsSync(SRC_ASSETS)) {
    console.error('src/assets not found')
    process.exit(1)
  }
  let optimized = 0
  let skipped = 0
  const failures = []
  const replacements = [] // [fromRel, toRel]
  for await (const file of walk(SRC_ASSETS)) {
    try {
      const res = await optimizeOne(file)
      if (res.optimized) optimized++
      else skipped++
      if (res.replaced) replacements.push(res.replaced)
    } catch (e) {
      failures.push({ file, error: e.message })
    }
  }
  // Update references in src/ for any converted PNG -> JPG
  if (replacements.length) {
    const SRC_DIR = path.join(ROOT, 'src')
    const filesToScan = []
    for await (const f of walk(SRC_DIR)) {
      if (/(\.vue|\.js)$/i.test(f)) filesToScan.push(f)
    }
    for (const [fromRel, toRel] of replacements) {
      const fromPath = `@/assets/${fromRel.replace(/\\/g, '/')}`
      const toPath = `@/assets/${toRel.replace(/\\/g, '/')}`
      for (const f of filesToScan) {
        const original = await fs.promises.readFile(f, 'utf8')
        const updated = original.split(fromPath).join(toPath)
        if (updated !== original) {
          await fs.promises.writeFile(f, updated, 'utf8')
        }
      }
    }
  }
  console.log(`Optimization complete: optimized=${optimized}, skipped=${skipped}, failures=${failures.length}`)
  if (failures.length) {
    failures.slice(0, 5).forEach(f => console.warn('Failed:', f.file, f.error))
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
