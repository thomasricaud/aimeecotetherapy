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
    // Placeholder to prevent vue-cli-plugin-prerender-spa from crashing when no config provided.
    // We will configure routes and options later.
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
}
