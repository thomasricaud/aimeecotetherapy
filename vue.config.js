module.exports = {
  devServer: {
    disableHostCheck: true,
  },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
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
