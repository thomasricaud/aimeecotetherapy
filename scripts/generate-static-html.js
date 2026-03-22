const fs = require('fs')
const path = require('path')
const fm = require('front-matter')

const distDir = path.resolve(__dirname, '..', 'dist')
const localesDir = path.resolve(__dirname, '..', 'src', 'locales')
const blogDir = path.resolve(__dirname, '..', 'src', 'content', 'blog')
const faqDir = path.resolve(__dirname, '..', 'src', 'content', 'faq')
const baseUrl = 'https://aimeecotetherapy.com'
const languages = ['en', 'fr', 'es']

const shellFiles = {
  en: 'index.html',
  fr: 'index.fr.html',
  es: 'index.es.html'
}

// Load ALL i18n translations for a language (merge multiple JSON files)
function loadLocale (lang) {
  const langDir = path.join(localesDir, lang)
  let merged = {}
  const files = fs.readdirSync(langDir).filter(f => f.endsWith('.json'))
  files.forEach(f => {
    const data = JSON.parse(fs.readFileSync(path.join(langDir, f), 'utf-8'))
    merged = { ...merged, ...data }
  })
  return merged
}

// Load blog frontmatter + body
function loadBlogFull (slug, lang) {
  const file = path.join(blogDir, slug, `index.${lang}.md`)
  if (!fs.existsSync(file)) return null
  const content = fs.readFileSync(file, 'utf-8')
  const { attributes, body } = fm(content)
  return { ...attributes, body }
}

// Get all blog slugs
function getBlogSlugs () {
  return fs.readdirSync(blogDir)
    .filter(name => fs.statSync(path.join(blogDir, name)).isDirectory())
}

// Load all FAQ entries for a language
function loadFaqs (lang) {
  if (!fs.existsSync(faqDir)) return []
  const faqs = []
  const dirs = fs.readdirSync(faqDir).filter(name => {
    const p = path.join(faqDir, name)
    return fs.statSync(p).isDirectory()
  })
  dirs.forEach(dir => {
    const file = path.join(faqDir, dir, `index.${lang}.md`)
    if (!fs.existsSync(file)) return
    const content = fs.readFileSync(file, 'utf-8')
    const { attributes, body } = fm(content)
    faqs.push({ question: attributes.question, answer: body.trim() })
  })
  return faqs
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
  if (!str) return ''
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// ──────────────────────────────────────────────────────────────
// HTML CONTENT GENERATORS — one per page type
// These produce the semantic HTML that Google will index.
// Vue.js will replace this content when it hydrates on the client.
// ──────────────────────────────────────────────────────────────

function generateHomeContent (locale, lang) {
  const name = locale.WelcomeName || 'Aimee Cote, MS'
  const title = locale.WelcomeTitle || ''
  const subtitle = locale.WelcomeTitle2 || ''
  const welcome = locale.Welcome || ''
  const welcome2 = locale.Welcome2 || ''
  const familyHelp = locale.FamilyHelp || ''
  const approachTitle = locale.MyApproachTitle || ''
  const approach = locale.myapproach || ''
  const approach2 = locale.myapproach2 || ''
  const systemTitle = locale.ASystem || ''
  const system1 = locale.ASystem1 || ''
  const system2 = locale.ASystem2 || ''
  const aboutHeading = locale.AboutHeading || ''
  const aboutMe = locale.AboutMe || ''
  const navBook = locale['nav.book'] || 'Schedule an appointment'
  const newToTherapyTitle = locale.NewToTherapyTitle || ''
  const newToTherapyDesc = locale.NewToTherapyDescription || ''

  // Build services list
  const services = []
  for (let i = 1; i <= 6; i++) {
    const key = `Family${i}`
    if (locale[key]) services.push(locale[key])
  }

  return `
    <header>
      <nav aria-label="Main navigation">
        <a href="/${lang}/">${locale['nav.home'] || 'Home'}</a>
        <a href="/${lang}/blog/">${locale['nav.blog'] || 'Blog'}</a>
        <a href="/${lang}/book/">${navBook}</a>
        <a href="/${lang}/there/">${locale['nav.there'] || 'Getting there'}</a>
        <a href="/${lang}/faq/">${locale['nav.faq'] || 'FAQ'}</a>
      </nav>
    </header>
    <main>
      <section aria-label="Welcome">
        <h1>${escapeHtml(name)}</h1>
        <h2>${escapeHtml(title)}</h2>
        <p><strong>${escapeHtml(subtitle)}</strong></p>
        <p>${escapeHtml(welcome)}</p>
        <p>${escapeHtml(welcome2)}</p>
      </section>
      <section aria-label="${escapeHtml(familyHelp)}">
        <h2>${escapeHtml(familyHelp)}</h2>
        <ul>${services.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
      </section>
      <section aria-label="${escapeHtml(aboutHeading)}">
        <h2>${escapeHtml(aboutHeading)}</h2>
        <p>${escapeHtml(aboutMe)}</p>
        <ul>
          <li>${escapeHtml(locale.AboutSkillIndividual || '')}</li>
          <li>${escapeHtml(locale.AboutSkillCouple || '')}</li>
          <li>${escapeHtml(locale.AboutSkillFamily || '')}</li>
        </ul>
      </section>
      <section aria-label="${escapeHtml(systemTitle)}">
        <h2>${escapeHtml(systemTitle)}</h2>
        <p>${escapeHtml(system1)}</p>
        <p>${escapeHtml(system2)}</p>
      </section>
      <section aria-label="${escapeHtml(newToTherapyTitle)}">
        <h2>${escapeHtml(newToTherapyTitle)}</h2>
        <p>${escapeHtml(newToTherapyDesc)}</p>
      </section>
      <section aria-label="${escapeHtml(approachTitle)}">
        <h2>${escapeHtml(approachTitle)}</h2>
        ${approach}
        <p>${escapeHtml(approach2)}</p>
      </section>
      <section aria-label="Service area">
        ${lang === 'fr'
    ? `<h2>Thérapeute accessible depuis les villes voisines</h2>
            <p>Le cabinet est situé à Chatou (78400), dans les Yvelines, et accueille des patients de toute la région ouest parisienne : <strong>Saint-Germain-en-Laye</strong>, <strong>Le Vésinet</strong>, <strong>Croissy-sur-Seine</strong>, <strong>Le Pecq</strong>, <strong>Rueil-Malmaison</strong>, <strong>Bougival</strong>, <strong>Louveciennes</strong>, <strong>Marly-le-Roi</strong>, <strong>Nanterre</strong>, <strong>Neuilly-sur-Seine</strong>, <strong>Versailles</strong> et <strong>Paris</strong>. Des séances de thérapie en ligne sont également disponibles pour les personnes vivant ailleurs en France ou à l'étranger.</p>
            <p>Aimee Cote est psychopraticienne (et non psychologue — <a href="/${lang}/faq/">voir la FAQ pour en savoir plus sur la différence</a>). Elle propose une approche systémique de la thérapie, bilingue français et anglais, adaptée aux familles internationales et aux expatriés.</p>`
    : lang === 'es'
      ? `<h2>Terapeuta accesible desde las ciudades cercanas</h2>
            <p>El consultorio se encuentra en Chatou (78400), Yvelines, y recibe pacientes de toda la zona oeste de París: <strong>Saint-Germain-en-Laye</strong>, <strong>Le Vésinet</strong>, <strong>Croissy-sur-Seine</strong>, <strong>Rueil-Malmaison</strong>, <strong>Bougival</strong>, <strong>Neuilly-sur-Seine</strong>, <strong>Versailles</strong> y <strong>París</strong>. También se ofrecen sesiones de terapia en línea.</p>`
      : `<h2>Therapist serving nearby cities</h2>
            <p>The office is located in Chatou (78400), Yvelines, and welcomes clients from across western Paris: <strong>Saint-Germain-en-Laye</strong>, <strong>Le Vésinet</strong>, <strong>Croissy-sur-Seine</strong>, <strong>Le Pecq</strong>, <strong>Rueil-Malmaison</strong>, <strong>Bougival</strong>, <strong>Louveciennes</strong>, <strong>Marly-le-Roi</strong>, <strong>Nanterre</strong>, <strong>Neuilly-sur-Seine</strong>, <strong>Versailles</strong> and <strong>Paris</strong>. Online therapy sessions are also available for those living elsewhere in France or abroad.</p>
            <p>Aimee Cote is a psychotherapist and marriage & family therapist (not a psychologist — <a href="/${lang}/faq/">see the FAQ for more on the distinction</a>). She offers a systemic approach to therapy, bilingual in French and English, tailored to international families and expats near Paris.</p>`
}
      </section>
    </main>
    <footer>
      <p>Aimee Cote Therapy – 15 Avenue de l'Europe, 78400 Chatou – +33 6 22 70 11 83</p>
    </footer>`
}

function generateBlogListContent (locale, lang) {
  const slugs = getBlogSlugs()
  const articles = slugs.map(slug => loadBlogFull(slug, lang)).filter(Boolean)
  const blogTitle = locale['meta.blogTitle'] || 'Blog'
  const blogDesc = locale['meta.blogDesc'] || ''
  const navBook = locale['nav.book'] || 'Schedule an appointment'

  return `
    <header>
      <nav aria-label="Main navigation">
        <a href="/${lang}/">${locale['nav.home'] || 'Home'}</a>
        <a href="/${lang}/blog/">${locale['nav.blog'] || 'Blog'}</a>
        <a href="/${lang}/book/">${navBook}</a>
        <a href="/${lang}/there/">${locale['nav.there'] || 'Getting there'}</a>
        <a href="/${lang}/faq/">${locale['nav.faq'] || 'FAQ'}</a>
      </nav>
    </header>
    <main>
      <h1>${escapeHtml(blogTitle)}</h1>
      <p>${escapeHtml(blogDesc)}</p>
      <section aria-label="Articles">
        ${articles.map(a => `
          <article>
            <h2><a href="/${lang}/blog/${a.slug || ''}">${escapeHtml(a.title || '')}</a></h2>
            <p>${escapeHtml(a.description || '')}</p>
            <span>${escapeHtml(a.category || '')}</span>
            <span>${escapeHtml(a.author || '')}</span>
          </article>
        `).join('')}
      </section>
    </main>
    <footer>
      <p>Aimee Cote Therapy – 15 Avenue de l'Europe, 78400 Chatou – +33 6 22 70 11 83</p>
    </footer>`
}

function generateBlogEntryContent (blog, locale, lang, slug) {
  const navBook = locale['nav.book'] || 'Schedule an appointment'

  return `
    <header>
      <nav aria-label="Main navigation">
        <a href="/${lang}/">${locale['nav.home'] || 'Home'}</a>
        <a href="/${lang}/blog/">${locale['nav.blog'] || 'Blog'}</a>
        <a href="/${lang}/book/">${navBook}</a>
        <a href="/${lang}/there/">${locale['nav.there'] || 'Getting there'}</a>
        <a href="/${lang}/faq/">${locale['nav.faq'] || 'FAQ'}</a>
      </nav>
    </header>
    <main>
      <article>
        <h1>${escapeHtml(blog.title || slug)}</h1>
        <p><strong>${escapeHtml(blog.author || 'Aimee Cote')}</strong> · ${escapeHtml(blog.category || '')}</p>
        ${blog.image ? `<img src="${blog.image}" alt="${escapeHtml(blog.title || '')}" loading="lazy">` : ''}
        <div>${blog.body || ''}</div>
      </article>
      <a href="/${lang}/blog/">&larr; ${locale['nav.blog'] || 'Blog'}</a>
    </main>
    <footer>
      <p>Aimee Cote Therapy – 15 Avenue de l'Europe, 78400 Chatou – +33 6 22 70 11 83</p>
    </footer>`
}

function generateBookContent (locale, lang) {
  const navBook = locale['nav.book'] || 'Schedule an appointment'

  return `
    <header>
      <nav aria-label="Main navigation">
        <a href="/${lang}/">${locale['nav.home'] || 'Home'}</a>
        <a href="/${lang}/blog/">${locale['nav.blog'] || 'Blog'}</a>
        <a href="/${lang}/book/">${navBook}</a>
        <a href="/${lang}/there/">${locale['nav.there'] || 'Getting there'}</a>
        <a href="/${lang}/faq/">${locale['nav.faq'] || 'FAQ'}</a>
      </nav>
    </header>
    <main>
      <h1>${escapeHtml(locale.BookTitle || '')}</h1>
      <ul>
        ${locale.Book2 ? `<li>${escapeHtml(locale.Book2)}</li>` : ''}
        ${locale.Book3 ? `<li>${escapeHtml(locale.Book3)}</li>` : ''}
        ${locale.Book4 ? `<li><strong>${escapeHtml(locale.Book4)}</strong></li>` : ''}
        ${locale.Book5 ? `<li><strong>${escapeHtml(locale.Book5)}</strong></li>` : ''}
      </ul>
      ${locale.Book6 ? `<p>${escapeHtml(locale.Book6)}</p>` : ''}
    </main>
    <footer>
      <p>Aimee Cote Therapy – 15 Avenue de l'Europe, 78400 Chatou – +33 6 22 70 11 83</p>
    </footer>`
}

function generateThereContent (locale, lang) {
  const navBook = locale['nav.book'] || 'Schedule an appointment'

  return `
    <header>
      <nav aria-label="Main navigation">
        <a href="/${lang}/">${locale['nav.home'] || 'Home'}</a>
        <a href="/${lang}/blog/">${locale['nav.blog'] || 'Blog'}</a>
        <a href="/${lang}/book/">${navBook}</a>
        <a href="/${lang}/there/">${locale['nav.there'] || 'Getting there'}</a>
        <a href="/${lang}/faq/">${locale['nav.faq'] || 'FAQ'}</a>
      </nav>
    </header>
    <main>
      <h1>${escapeHtml(locale['meta.thereTitle'] || 'Getting There')}</h1>
      <p>${escapeHtml(locale.GettingThereDescription || '')}</p>
      <address>
        <p><strong>Aimee Cote Therapy</strong></p>
        <p>15 Avenue de l'Europe</p>
        <p>78400 Chatou, France</p>
        <p>+33 6 22 70 11 83</p>
        <p>aimee.cote.therapy@gmail.com</p>
      </address>
    </main>
    <footer>
      <p>Aimee Cote Therapy – 15 Avenue de l'Europe, 78400 Chatou – +33 6 22 70 11 83</p>
    </footer>`
}

function generateFaqContent (locale, lang) {
  const faqs = loadFaqs(lang)
  const faqTitle = locale['faq.title'] || locale['meta.faqTitle'] || 'FAQ'
  const navBook = locale['nav.book'] || 'Schedule an appointment'

  // Build FAQ schema markup
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return {
    bodyHtml: `
    <header>
      <nav aria-label="Main navigation">
        <a href="/${lang}/">${locale['nav.home'] || 'Home'}</a>
        <a href="/${lang}/blog/">${locale['nav.blog'] || 'Blog'}</a>
        <a href="/${lang}/book/">${navBook}</a>
        <a href="/${lang}/there/">${locale['nav.there'] || 'Getting there'}</a>
        <a href="/${lang}/faq/">${locale['nav.faq'] || 'FAQ'}</a>
      </nav>
    </header>
    <main>
      <h1>${escapeHtml(faqTitle)}</h1>
      <section aria-label="FAQ">
        ${faqs.map(faq => `
          <details>
            <summary><strong>${escapeHtml(faq.question)}</strong></summary>
            <p>${escapeHtml(faq.answer)}</p>
          </details>
        `).join('')}
      </section>
    </main>
    <footer>
      <p>Aimee Cote Therapy – 15 Avenue de l'Europe, 78400 Chatou – +33 6 22 70 11 83</p>
    </footer>`,
    faqSchema: JSON.stringify(faqSchema)
  }
}

// ──────────────────────────────────────────────────────────────
// META TAG REPLACEMENT (unchanged logic)
// ──────────────────────────────────────────────────────────────

function replaceMetaTags (html, { title, description, canonical, routePath, ogImage }) {
  const safeTitle = escapeHtml(title)
  const safeDesc = escapeHtml(description)
  const image = ogImage || `${baseUrl}/logo.jpg`

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`)

  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${safeDesc}">`
  )

  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link[^>]*rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}">`)
  } else {
    html = html.replace('</head>', `    <link rel="canonical" href="${canonical}">\n  </head>`)
  }

  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${safeTitle}">`
  )
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${safeDesc}">`
  )
  html = html.replace(
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${canonical}">`
  )
  html = html.replace(
    /<meta property="og:image" content="[^"]*">/,
    `<meta property="og:image" content="${image}">`
  )
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${safeTitle}">`
  )
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${safeDesc}">`
  )
  html = html.replace(
    /<meta name="twitter:url" content="[^"]*">/,
    `<meta name="twitter:url" content="${canonical}">`
  )
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*">/,
    `<meta name="twitter:image" content="${image}">`
  )

  // Update hreflang links
  languages.forEach(l => {
    const hrefLangUrl = `${baseUrl}/${l}${routePath}/`
    html = html.replace(
      new RegExp(`<link rel="alternate" hreflang="${l}" href="[^"]*">`),
      `<link rel="alternate" hreflang="${l}" href="${hrefLangUrl}">`
    )
  })
  html = html.replace(
    /<link rel="alternate" hreflang="x-default" href="[^"]*">/,
    `<link rel="alternate" hreflang="x-default" href="${baseUrl}/en${routePath}/">`
  )

  return html
}

// ──────────────────────────────────────────────────────────────
// INJECT BODY CONTENT into <div id="app"></div>
// ──────────────────────────────────────────────────────────────

function injectBodyContent (html, bodyHtml) {
  // Replace the empty <div id="app"></div> with content inside it
  // Vue 2 will replace the innerHTML when it mounts, so this is safe
  return html.replace(
    '<div id="app"></div>',
    `<div id="app">${bodyHtml}</div>`
  )
}

function injectFaqSchema (html, schemaJson) {
  // Add FAQ schema before closing </head>
  return html.replace(
    '</head>',
    `<script type="application/ld+json">${schemaJson}</script>\n</head>`
  )
}

// ──────────────────────────────────────────────────────────────
// MAIN GENERATION LOOP
// ──────────────────────────────────────────────────────────────

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

  // ── HOME PAGE ──
  // Generate home with content (also updates the shell for the root language URL)
  {
    const routePath = ''
    const title = locale['meta.homeTitle'] || 'Home'
    const description = locale['meta.homeDesc'] || ''
    const canonical = `${baseUrl}/${lang}/`
    let html = replaceMetaTags(shellHtml, { title, description, canonical, routePath })
    html = injectBodyContent(html, generateHomeContent(locale, lang))
    const outputPath = path.join(distDir, lang, 'index.html')
    writeHtml(outputPath, html)
    generated++
  }

  // ── STATIC PAGES ──
  staticRoutes.forEach(route => {
    if (route.path === '') return // home already handled above

    const title = locale[route.titleKey] || route.titleKey
    const description = locale[route.descKey] || route.descKey
    const routePath = route.path
    const canonical = `${baseUrl}/${lang}${routePath}/`

    let html = replaceMetaTags(shellHtml, { title, description, canonical, routePath })

    // Generate page-specific body content
    let bodyHtml = ''
    switch (route.path) {
      case '/blog':
        bodyHtml = generateBlogListContent(locale, lang)
        break
      case '/book':
        bodyHtml = generateBookContent(locale, lang)
        break
      case '/there':
        bodyHtml = generateThereContent(locale, lang)
        break
      case '/faq': {
        const faqResult = generateFaqContent(locale, lang)
        bodyHtml = faqResult.bodyHtml
        html = injectFaqSchema(html, faqResult.faqSchema)
        break
      }
    }

    if (bodyHtml) {
      html = injectBodyContent(html, bodyHtml)
    }

    const outputPath = path.join(distDir, lang, routePath.slice(1), 'index.html')
    writeHtml(outputPath, html)
    generated++
  })

  // ── BLOG ENTRY PAGES ──
  const blogSlugs = getBlogSlugs()
  blogSlugs.forEach(slug => {
    const blog = loadBlogFull(slug, lang)
    if (!blog) return

    const title = blog.title || slug
    const description = blog.description || ''
    const routePath = `/blog/${slug}`
    const canonical = `${baseUrl}/${lang}${routePath}/`
    const ogImage = blog.image ? `${baseUrl}${blog.image}` : null

    let html = replaceMetaTags(shellHtml, { title, description, canonical, routePath, ogImage })
    html = injectBodyContent(html, generateBlogEntryContent(blog, locale, lang, slug))

    const outputPath = path.join(distDir, lang, 'blog', slug, 'index.html')
    writeHtml(outputPath, html)
    generated++
  })
})

console.log(`Generated ${generated} static HTML files with pre-rendered content for SEO`)
