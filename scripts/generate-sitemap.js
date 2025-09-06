const fs = require('fs');
const path = require('path');

const baseUrl = 'https://www.aimeecotetherapy.com';
const routes = ['/', '/blog', '/book', '/there', '/home'];
const languages = ['fr', 'en', 'es'];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

languages.forEach(lang => {
  const urls = routes
    .map(route => `  <url>\n    <loc>${baseUrl}/${lang}${route}</loc>\n  </url>`)
    .join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  const dir = path.join(__dirname, '..', 'public', lang);
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, 'sitemap.xml'), sitemap);
});

const indexEntries = languages
  .map(lang => `  <sitemap>\n    <loc>${baseUrl}/${lang}/sitemap.xml</loc>\n  </sitemap>`)
  .join('\n');
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexEntries}\n</sitemapindex>\n`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), sitemapIndex);
console.log('Generated sitemaps for languages:', languages.join(', '));

