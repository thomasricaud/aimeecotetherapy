const locales = ['en', 'fr', 'es']
const baseUrl = process.env.SITE_URL || 'http://localhost:8080'
const fs = require('fs')

// Determine which Chrome to use. Prefer system Chrome/Chromium, fall back to Puppeteer's bundled Chromium
let chromePath = process.env.CHROME_PATH
const possibleChrome = ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser']

if (!chromePath) {
  chromePath = possibleChrome.find(p => fs.existsSync(p))
}

if (!chromePath) {
  try {
    chromePath = require('puppeteer').executablePath()
  } catch (e) {
    // Puppeteer not installed; rely on default chrome resolution
  }
}

const settings = {
  onlyCategories: ['seo'],
  chromeFlags: '--headless --no-sandbox'
}

if (chromePath) {
  settings.chromePath = chromePath
}

module.exports = {
  ci: {
    collect: {
      url: locales.map(locale => `${baseUrl}/${locale}/`),
      numberOfRuns: 1,
      settings
    },
    assert: {
      assertions: {
        'seo/document-title': 'error',
        'seo/meta-description': 'error',
        'seo/hreflang': 'error',
        'seo/canonical': 'error',
        'seo/structured-data': 'error'
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}
