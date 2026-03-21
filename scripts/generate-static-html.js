const fs = require('fs')
const path = require('path')
const fm = require('front-matter')

const distDir = path.resolve(__dirname, '..', 'dist')
const localesDir = path.resolve(__dirname, '..', 'src', 'locales')
const blogDir = path.resolve(__dirname, '..', 'src', 'content', 'blog')
const baseUrl = 'https://aimeecotetherapy.com'
const languages = ['en', 'fr', 'es']

const shellFiles = {
  en: 'index.html',
  fr: 'index.fr.html',
  es: 'index.es.html'
}

// Load i18n translations
function loadLocale (lang) {
  const file = path.join(localesDir, lang, `${lang}.json`)
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

// Load blog frontmatter
function loadBlogMeta (slug, lang) {
  const file = path.join(blogDir, slug, `index.${lang}.md`)
  if (!fs.existsSync(file)) return null
  const content = fs.readFileSync(file, 'utf-8')
  const { attributes } = fm(content)
  return attributes
}

// Get all blog slugs
function getBlogSlugs () {
  return fs.readdirSync(blogDir)
    .filter(name => fs.statSync(path.join(blogDir, name)).isDirectory())
}

// Static routes with their i18n keys
const staticRoutes = [
  { path: '', titleKey: 'meta.homeTitle', descKey: 'meta.homeDesc' },
  { path: '/blog', titleKey: 'meta.blogTitle', descKey: 'meta.blogDesc' },
  { path: '/book', titleKey: 'meta.bookTitle', descKey: 'meta.bookDesc' },
  { path: '/there', titleKey: 'meta.thereTitle', descKey: 'meta.thereDesc' },
  { path: '/faq', titleKey: 'meta.faqTitle', descKey: 'meta.faqDesc' }
]

function escapeHtml (str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function replaceMetaTags (html, { title, description, canonical, routePath, ogImage }) {
  const safeTitle = escapeHtml(title)
  const safeDesc = escapeHtml(description)
  const image = ogImage || `${baseUrl}/logo.jpg`

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`)

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${safeDesc}">`
  )

  // Replace canonical (add if not present)
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link[^>]*rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}">`)
  } else {
    html = html.replace('</head>', `    <link rel="canonical" href="${canonical}">\n  </head>`)
  }

  // Replace og:title
  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${safeTitle}">`
  )

  // Replace og:description
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${safeDesc}">`
  )

  // Replace og:url
  html = html.replace(
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${canonical}">`
  )

  // Replace og:image
  html = html.replace(
    /<meta property="og:image" content="[^"]*">/,
    `<meta property="og:image" content="${image}">`
  )

  // Replace twitter:title
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${safeTitle}">`
  )

  // Replace twitter:description
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${safeDesc}">`
  )

  // Replace twitter:url
  html = html.replace(
    /<meta name="twitter:url" content="[^"]*">/,
    `<meta name="twitter:url" content="${canonical}">`
  )

  // Replace twitter:image
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*">/,
    `<meta name="twitter:image" content="${image}">`
  )

  // Update hreflang links for the current route path
  languages.forEach(lang => {
    const hrefLangUrl = `${baseUrl}/${lang}${routePath}/`
    html = html.replace(
      new RegExp(`<link rel="alternate" hreflang="${lang}" href="[^"]*">`),
      `<link rel="alternate" hreflang="${lang}" href="${hrefLangUrl}">`
    )
  })
  html = html.replace(
    /<link rel="alternate" hreflang="x-default" href="[^"]*">/,
    `<link rel="alternate" hreflang="x-default" href="${baseUrl}/en${routePath}/">`
  )

  return html
}

function writeHtml (outputPath, html) {
  const dir = path.dirname(outputPath)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(outputPath, html)
}

let generated = 0

languages.forEach(lang => {
  const locale = loadLocale(lang)
  const shellPath = path.join(distDir, shellFiles[lang])
  if (!fs.existsSync(shellPath)) {
    console.warn(`Warning: shell ${shellFiles[lang]} not found in dist, skipping ${lang}`)
    return
  }
  const shellHtml = fs.readFileSync(shellPath, 'utf-8')

  // Generate static pages
  staticRoutes.forEach(route => {
    // Skip home — shell already serves it
    if (route.path === '') return

    const title = locale[route.titleKey] || route.titleKey
    const description = locale[route.descKey] || route.descKey
    const routePath = route.path
    const canonical = `${baseUrl}/${lang}${routePath}/`

    const html = replaceMetaTags(shellHtml, { title, description, canonical, routePath })
    const outputPath = path.join(distDir, lang, routePath.slice(1), 'index.html')
    writeHtml(outputPath, html)
    generated++
  })

  // Generate blog entry pages
  const blogSlugs = getBlogSlugs()
  blogSlugs.forEach(slug => {
    const meta = loadBlogMeta(slug, lang)
    if (!meta) return

    const title = meta.title || slug
    const description = meta.description || ''
    const routePath = `/blog/${slug}`
    const canonical = `${baseUrl}/${lang}${routePath}/`
    const ogImage = meta.image ? `${baseUrl}${meta.image}` : null

    const html = replaceMetaTags(shellHtml, { title, description, canonical, routePath, ogImage })
    const outputPath = path.join(distDir, lang, 'blog', slug, 'index.html')
    writeHtml(outputPath, html)
    generated++
  })
})

console.log(`Generated ${generated} static HTML files for SEO`)
