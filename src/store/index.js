import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var flattenArticles = []
var articljson = require.context('../data', true, /[A-Za-z0-9-_,\s]+\.json$/i)
articljson.keys().reverse().forEach(key => {
  const matched = key.match(/([A-Za-z0-9-_]+)\.json$/i)
  if (matched && matched.length > 1) {
    const blog = matched[1]
    var arti = articljson(key)
    if (arti.length === 1) {
      arti[0].title = blog + '.title'
      arti[0].content = blog + '.content'
      arti[0].category = blog + '.category'
      arti[0].hero = blog + '.jpg'
      flattenArticles = [...flattenArticles, arti[0]]
    } else {
      flattenArticles = [...flattenArticles, ...articljson(key)]
    }
  }
})
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
        text: 'Contact me',
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
