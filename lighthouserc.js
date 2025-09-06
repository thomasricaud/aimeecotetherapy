const locales = ['en', 'fr', 'es']
const baseUrl = process.env.SITE_URL || 'http://localhost:8080'

module.exports = {
  ci: {
    collect: {
      url: locales.map(locale => `${baseUrl}/${locale}/`),
      numberOfRuns: 1,
      settings: {
        onlyCategories: ['seo'],
        chromeFlags: '--headless'
      }
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
