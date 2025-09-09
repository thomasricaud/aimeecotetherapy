// lighthouserc.js
const tryPuppeteerChromePath = () => {
  try { return require('puppeteer').executablePath(); } catch { return undefined; }
};

const urls = [
  'http://127.0.0.1:8080/en/',
  'http://127.0.0.1:8080/fr/',
  'http://127.0.0.1:8080/es/'
];
const isLocal = urls.every(u => /^https?:\/\/(localhost|127\.0\.0\.1|host\.docker\.internal)/.test(u));

module.exports = {
  ci: {
    collect: {
      url: urls,
      numberOfRuns: 2,
      // Construit puis sert l'app; Vite preview si dispo sinon serve statique
      startServerCommand: 'npm run build && node scripts/start-seo-server.js',
      startServerReadyPattern: 'Local:\\s+http://.*:8080|Accepting connections',
      settings: {
        chromeFlags: '--headless=new --no-sandbox --disable-dev-shm-usage',
        chromePath: process.env.CHROME_PATH || tryPuppeteerChromePath()
      }
    },
    assert: {
      assertions: {
        // Seuil global SEO
        'categories:seo': ['error', { minScore: 0.90 }],
        // Audits SEO fréquents (IDs corrects)
        'canonical': 'error',
        'hreflang': 'warn',
        'is-crawlable': 'error',
        'robots-txt': 'warn',
        'structured-data': 'warn',
        'document-title': 'error',
        'meta-description': 'error',
        'http-status-code': 'error',
        'link-text': 'warn',
        'crawlable-anchors': 'warn'
      }
    },
    upload: isLocal
      ? {
          target: 'filesystem',
          outputDir: '.lighthouseci/reports',
          reportFilenamePattern: '%%HOSTNAME%%-%%PATHNAME%%-%%DATETIME%%.report.%%EXTENSION%%'
        }
      : {
          // Pour la prod publique uniquement (évite localhost)
          target: 'temporary-public-storage'
        }
  }
};

