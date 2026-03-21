const fs = require('fs')
const path = require('path')

const baseUrl = 'https://aimeecotetherapy.com'
const routes = ['/', '/blog', '/book', '/there', '/faq']
const languages = ['fr', 'en', 'es']
const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog')
const today = new Date().toISOString().split('T')[0]

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

// Collect all blog slugs that exist in at least one language
const allBlogSlugs = new Set()
languages.forEach(lang => blogRoutesByLang[lang].forEach(r => allBlogSlugs.add(r)))

function buildHreflangLinks (routePath) {
  return languages
    .map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${baseUrl}/${l}${routePath}"/>`)
    .concat([`    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en${routePath}"/>`])
    .join('\n')
}

languages.forEach(lang => {
  const allRoutes = [...routes, ...blogRoutesByLang[lang]]
  const urls = allRoutes
    .map(route => {
      const loc = `${baseUrl}/${lang}${route}`
      const hreflangs = buildHreflangLinks(route)
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n${hreflangs}\n  </url>`
    })
    .join('\n')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`
  const dir = path.join(__dirname, '..', 'public', lang)
  ensureDir(dir)
  fs.writeFileSync(path.join(dir, 'sitemap.xml'), sitemap)
})

const indexEntries = languages
  .map(lang => `  <sitemap>\n    <loc>${baseUrl}/${lang}/sitemap.xml</loc>\n  </sitemap>`)
  .join('\n')
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexEntries}\n</sitemapindex>\n`

fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), sitemapIndex)

const robots = `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /admin/\n\nSitemap: ${baseUrl}/sitemap.xml\n`
fs.writeFileSync(path.join(__dirname, '..', 'public', 'robots.txt'), robots)

console.log('Generated sitemaps and robots for languages:', languages.join(', '))
