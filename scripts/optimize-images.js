/*
  Generate modern formats (WebP/AVIF) for built images in dist/.
  Safe to run after `npm run build`. Does not modify originals.
*/
const fs = require('fs')
const path = require('path')
const os = require('os')
const { ImagePool } = require('@squoosh/lib')

const DIST_DIR = path.resolve(__dirname, '..', 'dist')
const EXTS = new Set(['.jpg', '.jpeg', '.png'])

async function* walk (dir) {
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

async function main () {
  const imagePool = new ImagePool(Math.max(1, os.cpus().length - 1))
  const tasks = []

  for await (const file of walk(DIST_DIR)) {
    const ext = path.extname(file).toLowerCase()
    if (!EXTS.has(ext)) continue

    // Skip if variants already exist
    const webpOut = file + '.webp'
    const avifOut = file + '.avif'
    if (fs.existsSync(webpOut) && fs.existsSync(avifOut)) continue

    tasks.push((async () => {
      const input = await fs.promises.readFile(file)
      const image = imagePool.ingestImage(input)
      await image.encode({
        webp: { quality: 75 },
        avif: { cqLevel: 33 },
      })
      const { webp, avif } = await image.encodedWith
      if (webp && !fs.existsSync(webpOut)) await fs.promises.writeFile(webpOut, webp.binary)
      if (avif && !fs.existsSync(avifOut)) await fs.promises.writeFile(avifOut, avif.binary)
    })())
  }

  await Promise.all(tasks)
  await imagePool.close()
  console.log(`Optimized ${tasks.length} images to WebP/AVIF variants`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

