const fs = require('fs')
const path = require('path')

const baseUrl = 'https://www.aimeecotetherapy.com'
const routes = ['/', '/blog', '/book', '/there', '/home']
const languages = ['fr', 'en', 'es']
const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog')

function ensureDir (dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function getBlogRoutes (lang) {
  const dirs = fs.readdirSync(blogDir).filter(name => fs.statSync(path.join(blogDir, name)).isDirectory())
  const slugs = new Set()
  dirs.forEach(d => {
    const file = path.join(blogDir, d, `index.${lang}.md`)
    if (fs.existsSync(file)) {
      slugs.add(`/blog/${d}`)
    }
  })
  return Array.from(slugs)
}

const blogRoutesByLang = languages.reduce((acc, lang) => {
  acc[lang] = getBlogRoutes(lang)
  return acc
}, {})

languages.forEach(lang => {
  const urls = [...routes, ...blogRoutesByLang[lang]]
    .map(route => `  <url>\n    <loc>${baseUrl}/${lang}${route}</loc>\n  </url>`)
    .join('\n')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  const dir = path.join(__dirname, '..', 'public', lang)
  ensureDir(dir)
  fs.writeFileSync(path.join(dir, 'sitemap.xml'), sitemap)
})

const indexEntries = languages
  .map(lang => `  <sitemap>\n    <loc>${baseUrl}/${lang}/sitemap.xml</loc>\n  </sitemap>`)
  .join('\n')
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexEntries}\n</sitemapindex>\n`

fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), sitemapIndex)

const robotLines = Object.entries(blogRoutesByLang)
  .flatMap(([lang, routes]) => routes.map(route => `Allow: /${lang}${route}`))
  .join('\n')

const robots = `User-agent: *\nAllow: /\n${robotLines ? robotLines + '\n' : ''}Sitemap: ${baseUrl}/sitemap.xml\n`
fs.writeFileSync(path.join(__dirname, '..', 'public', 'robots.txt'), robots)

console.log('Generated sitemaps and robots for languages:', languages.join(', '))
