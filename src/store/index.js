import Vue from 'vue'
import Vuex from 'vuex'
import fm from 'front-matter'
import i18n from '@/i18n'
import { marked } from 'marked'

Vue.use(Vuex)
marked.setOptions({ breaks: true })

const markdownContext = require.context('!!raw-loader!../content/blog', true, /index\.[a-z]{2}\.md$/)

export default new Vuex.Store({
  state: {
    blogs: [],
    drawer: false,
    items: [
      {
        text: 'nav.home',
        href: '/home',
      },
      {
        text: 'nav.blog',
        href: '/blog',
      },
      {
        text: 'nav.book',
        href: '/book',
      },
      {
        text: 'nav.there',
        href: '/there',
      },
    ],
  },
  getters: {
    articles: state => {
      const locale = i18n.locale
      return markdownContext.keys()
        .filter(key => key.match(new RegExp(`index\\.${locale}\\.md$`)))
        .reverse()
        .map(key => {
          const { attributes, body } = fm(markdownContext(key).default)
          // Convert markdown content to HTML so line breaks and other formatting
          // entered in the CMS editor are rendered properly on the website
          const content = marked(body.trim())
          return { ...attributes, content }
        })
    },
    prominentblog: (state, getters) => {
      return getters.articles.find(article => article.prominent) || {}
    },
    categories: (state, getters) => {
      const categories = []
      for (const article of getters.articles) {
        if (!article.category || categories.find(category => category.text === article.category)) {
          continue
        }
        const text = article.category
        categories.push({ text, href: text })
      }
      return categories.sort().slice(0, 4)
    },
    links: state => {
      return state.items
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
  },
  actions: {},
})
