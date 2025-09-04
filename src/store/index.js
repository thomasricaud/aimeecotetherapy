import Vue from 'vue'
import Vuex from 'vuex'
import fm from 'front-matter'
import i18n from '@/i18n'
Vue.use(Vuex)

function markdownToHtml (text) {
  const escape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const processInline = s => {
    return s
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/__([^_]+)__/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/_([^_]+)_/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
  }

  const lines = escape(text.trim()).split('\n')
  let html = ''
  let paragraph = ''
  let inUl = false
  let inOl = false

  const flushParagraph = () => {
    if (paragraph) {
      html += `<p>${paragraph}</p>`
      paragraph = ''
    }
  }

  const closeLists = () => {
    if (inUl) {
      html += '</ul>'
      inUl = false
    }
    if (inOl) {
      html += '</ol>'
      inOl = false
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) {
      flushParagraph()
      closeLists()
      continue
    }
    let match
    if ((match = line.match(/^(#{1,6})\s+(.*)/))) {
      flushParagraph()
      closeLists()
      const level = match[1].length
      html += `<h${level}>${processInline(match[2])}</h${level}>`
      continue
    }
    if ((match = line.match(/^[*-]\s+(.*)/))) {
      flushParagraph()
      if (!inUl) {
        closeLists()
        html += '<ul>'
        inUl = true
      }
      html += `<li>${processInline(match[1])}</li>`
      continue
    }
    if ((match = line.match(/^\d+\.\s+(.*)/))) {
      flushParagraph()
      if (!inOl) {
        closeLists()
        html += '<ol>'
        inOl = true
      }
      html += `<li>${processInline(match[1])}</li>`
      continue
    }
    if ((match = line.match(/^>\s+(.*)/))) {
      flushParagraph()
      closeLists()
      html += `<blockquote>${processInline(match[1])}</blockquote>`
      continue
    }
    if (/^---+$/.test(line)) {
      flushParagraph()
      closeLists()
      html += '<hr />'
      continue
    }
    const processed = processInline(line)
    paragraph += paragraph ? `<br />${processed}` : processed
  }

  flushParagraph()
  closeLists()
  return html
}

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
          // Convert markdown content to HTML so formatting entered in the CMS
          // editor (headings, lists, line breaks, etc.) appears on the site
          const content = markdownToHtml(body)
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
