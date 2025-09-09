/*
  Generate modern formats (WebP/AVIF) for built images in dist/.
  Safe to run after `npm run build`. Does not modify originals.
*/
const fs = require('fs')
const path = require('path')
const os = require('os')
const sharp = require('sharp')

// Directory to scan for images. Defaults to the built `dist/` folder but can
// be overridden by providing a relative path as the first CLI argument, e.g.
// `node scripts/optimize-images.js public`.
const TARGET_DIR = path.resolve(__dirname, '..', process.argv[2] || 'dist')
const EXTS = new Set(['.jpg', '.jpeg', '.png'])

async function * walk (dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      yield * walk(full)
    } else {
      yield full
    }
  }
}

async function convert (file) {
  const webpOut = file + '.webp'
  const avifOut = file + '.avif'
  if (!fs.existsSync(webpOut)) {
    await sharp(file).webp({ quality: 75 }).toFile(webpOut)
  }
  if (!fs.existsSync(avifOut)) {
    await sharp(file).avif({ quality: 50 }).toFile(avifOut)
  }
}

async function main () {
  const concurrency = Math.max(1, os.cpus().length - 1)
  const queue = []
  let count = 0

  for await (const file of walk(TARGET_DIR)) {
    const ext = path.extname(file).toLowerCase()
    if (!EXTS.has(ext)) continue
    const task = convert(file).then(() => { count++ })
    queue.push(task)
    if (queue.length >= concurrency) {
      await Promise.race(queue).catch(() => {})
      // remove settled promises
      for (let i = queue.length - 1; i >= 0; i--) {
        if (queue[i].status === 'fulfilled' || queue[i].status === 'rejected') queue.splice(i, 1)
      }
    }
  }
  await Promise.allSettled(queue)
  console.log(`Optimized ${count} images to WebP/AVIF variants`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
