import Vue from 'vue'
// Switch to SVG icons instead of webfont
import Vuetify from 'vuetify/lib'
// Register only the SVG icons we use
import {
  mdiEarth,
  mdiCalendar,
  mdiChevronLeft,
  mdiChevronRight,
  mdiEmailOutline,
  mdiMapMarker,
  mdiPhone,
  mdiFacebookMessenger,
  mdiInstagram,
  mdiFacebook,
  mdiEmail,
} from '@mdi/js'
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
  icons: {
    iconfont: 'mdiSvg',
    values: {
      earth: mdiEarth,
      calendar: mdiCalendar,
      chevronLeft: mdiChevronLeft,
      chevronRight: mdiChevronRight,
      emailOutline: mdiEmailOutline,
      mapMarker: mdiMapMarker,
      phone: mdiPhone,
      facebookMessenger: mdiFacebookMessenger,
      instagram: mdiInstagram,
      facebook: mdiFacebook,
      email: mdiEmail,
    },
  },
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
        success: '#73B572',
        error: '#D94D02',
        warning: '#F6D204',
      },
    },
  },
})
