import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogs: [],
    drawer: false,
    items: [
      {
        text: 'Home',
        href: '/home',
      },
      {
        text: 'Blog',
        href: '/blog',
      },
      {
        text: 'Schedule an appointment',
        href: '/book',
      },
      {
        text: 'Getting there',
        href: '/there',
      },
    ],
  },
  getters: {
    articles: state => {
      var articljson = require.context('../locales/en', true, /^.*\/blog[0-9-_,\s]+\.json$/i)
      var flattenArticles = []
      articljson.keys().forEach(key => {
        const matched = key.match(/\/blog([0-9-_]+)\.json$/i)
        if (matched && matched.length > 1) {
          const blog = matched[1]
          const article = {
          title: 'blog' + blog + '.title',
          content: 'blog' + blog + '.content',
          category: 'blog' + blog + '.category',
          image: 'blog' + blog + '.jpg',
          }
            flattenArticles = [...flattenArticles, article]
        }
      })
      return flattenArticles
    },
    prominentblog: state => {
      var prominentblog = {}

      for (const article of flattenArticles) {
        if (article.prominent) {
          prominentblog = article
        }
      }

      return prominentblog
    },
    categories: state => {
      const categories = []

      for (const article of flattenArticles) {
        if (
          !article.category ||
          categories.find(category => category.text === article.category)
        ) {
          continue
        }

        const text = article.category

        categories.push({
          text,
          href: text,
        })
      }

      return categories.sort().slice(0, 4)
    },
    links: (state, getters) => {
      return state.items
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
  },
  actions: {},
})
