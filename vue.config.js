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
  const base = LOCALES.flatMap((l) => [
    `/${l}`,
    `/${l}/blog`,
    `/${l}/book`,
    `/${l}/there`,
  ])
  // Start with core pages; blog entry pages can be added later if needed.
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
    config.plugins = config.plugins || []
    // NOTE: Image minimization via image-minimizer-webpack-plugin is currently disabled
    // due to AJV/schema-utils version constraints in this project. We will enable it later.
    // Prerender core routes using prerender-spa-plugin directly (works with multipage config)
    if (process.env.ENABLE_PRERENDER === '1') {
      const routes = buildPrerenderRoutes()
      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.resolve(__dirname, 'dist'),
          outputDir: path.resolve(__dirname, 'dist'),
          routes,
          renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
            headless: true,
            maxConcurrentRoutes: 4,
            // wait to allow async/i18n/store data to settle
            renderAfterTime: 2000,
          }),
        })
      )
    }
  }
}
