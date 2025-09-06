const fs = require('fs')
const path = require('path')

const LOCALES = ['en', 'fr', 'es']
const BLOG_DIR = path.resolve(__dirname, 'src/content/blog')

function getBlogSlugs () {
  try {
    return fs.readdirSync(BLOG_DIR)
      .filter((name) => fs.existsSync(path.join(BLOG_DIR, name)) && fs.statSync(path.join(BLOG_DIR, name)).isDirectory())
  } catch (e) {
    return []
  }
}

function buildPrerenderRoutes () {
  // Prerender only locale roots to stabilize Puppeteer on Windows.
  // We can add section pages and posts later once stable.
  const base = LOCALES.map((l) => `/${l}`)
  return ['/', ...base]
}

module.exports = {
  devServer: {
    // `disableHostCheck` was removed in webpack-dev-server v4.
    // Allow all hosts during local development.
    allowedHosts: 'all',
  },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    },
    // Leave empty to prevent vue-cli-plugin-prerender-spa from auto-running in multipage setup
    prerenderSpa: {}
  },

  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    },
    'index.fr': {
      entry: 'src/main.js',
      template: 'public/index.fr.html',
      filename: 'index.fr.html'
    },
    'index.es': {
      entry: 'src/main.js',
      template: 'public/index.es.html',
      filename: 'index.es.html'
    }
  }
  ,
  // Image optimization + modern formats (WebP/AVIF) during production builds
  configureWebpack: (config) => {
    if (process.env.NODE_ENV !== 'production') return
    const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
    const PrerenderSPAPlugin = require('prerender-spa-plugin')
    const Critters = require('critters-webpack-plugin')
    config.plugins = config.plugins || []
    // NOTE: Image minimization via image-minimizer-webpack-plugin is currently disabled
    // due to AJV/schema-utils version constraints in this project. We will enable it later.
    // Prerender core routes using prerender-spa-plugin directly (works with multipage config)
    if (process.env.ENABLE_PRERENDER === '1') {
      const routes = buildPrerenderRoutes()
      const renderer = new PrerenderSPAPlugin.PuppeteerRenderer({
        headless: true,
        maxConcurrentRoutes: 1,
        renderAfterDocumentEvent: 'x-app-rendered',
        captureConsole: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        timeout: 120000,
      })
      // Map locale roots to the correct HTML in multipage output
      renderer.preServer = (Prerenderer) => {
        const server = Prerenderer._server._expressServer
        server.get('*', (req, res, next) => {
          if (path.extname(req.url)) return next()
          if (/^\/fr(\/|$)/.test(req.url)) {
            return res.sendFile(path.resolve(__dirname, 'dist/index.fr.html'))
          }
          if (/^\/es(\/|$)/.test(req.url)) {
            return res.sendFile(path.resolve(__dirname, 'dist/index.es.html'))
          }
          if (/^\/en(\/|$)/.test(req.url)) {
            return res.sendFile(path.resolve(__dirname, 'dist/index.html'))
          }
          return res.sendFile(path.resolve(__dirname, 'dist/index.html'))
        })
      }
      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.resolve(__dirname, 'dist'),
          outputDir: path.resolve(__dirname, 'dist'),
          routes,
          renderer,
        })
      )
    }
    // Inline critical CSS and load the rest non-blocking
    config.plugins.push(new Critters({
      preload: 'swap',
      preloadFonts: true,
      pruneSource: true,
      compress: true,
      inlineFonts: true,
      mergeStylesheets: true,
      // multipage support
      additionalStylesheets: [],
    }))
  }
}
