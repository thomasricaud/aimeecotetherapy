const fs = require('fs');
const path = require('path');

const baseUrl = 'https://www.aimeecotetherapy.com';
const routes = ['/', '/blog', '/book', '/there', '/home'];

const urls = routes
  .map(route => `  <url>\n    <loc>${baseUrl}${route}</loc>\n  </url>`)
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap);
console.log('sitemap.xml generated at', outputPath);
