import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import VueI18n from 'vue-i18n'
import Vuelidate from 'vuelidate'
Vue.use(Vuetify)
Vue.use(VueI18n)
Vue.use(Vuelidate)

const messages = {
  en: {
    $vuetify: {
      dataIterator: {
        rowsPerPageText: 'Items per page:',
        pageText: '{0}-{1} of {2}',
      },
    },
  },
  es: {
    $vuetify: {
      dataIterator: {
        rowsPerPageText: 'Element per sida:',
        pageText: '{0}-{1} av {2}',
      },
    },
  },
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
  theme: {
    themes: {
      light: {
        primary: '#549480',
        secondary: '#8DBFAF',
        info: '#2E5246',
        accent: '#0F3529',
        anchor: '#F0FFF0',
        success: '#4dffd2',
        error: '#4dffd2',
        warning: '#4dffd2',
      },
    },
  },
})
