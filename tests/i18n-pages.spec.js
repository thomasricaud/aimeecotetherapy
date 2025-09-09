import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import fs from 'fs'
import path from 'path'
import Home from '@/views/Home.vue'
import Blog from '@/views/Blog.vue'
import BlogEntry from '@/views/BlogEntry.vue'
import Book from '@/views/Book.vue'
import Faq from '@/views/Faq.vue'
import There from '@/views/There.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueI18n)

function loadLocaleMessages (locale) {
  const dir = path.resolve(__dirname, '../src/locales', locale)
  const messages = {}
  fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.json')) {
      Object.assign(messages, require(`@/locales/${locale}/${file}`))
    }
  })
  return messages
}

const locales = ['en', 'fr', 'es']

describe('Pages render in all locales', () => {
  locales.forEach(locale => {
    const i18n = new VueI18n({
      locale,
      messages: { [locale]: loadLocaleMessages(locale) }
    })

    describe(`locale: ${locale}`, () => {
      it('Home page renders', () => {
        const wrapper = shallowMount(Home, {
          localVue,
          i18n,
          stubs: {
            Welcome: { template: '<div>{{$t("WelcomeTitle2")}}</div>' },
            WelcomeAlert: true,
            Family: true,
            Asystem: true,
            NewToTherapy: true,
            MyApproach: true
          }
        })
        expect(wrapper.text()).toContain(i18n.t('WelcomeTitle2'))
      })

      it('Blog page renders', () => {
        const store = new Vuex.Store({
          getters: {
            articles: () => [
              { title: 'First post', category: 'cat', author: 'auth', content: '...' }
            ]
          }
        })
        const wrapper = shallowMount(Blog, {
          localVue,
          store,
          i18n,
          stubs: {
            Banner: true,
            Articles: {
              computed: {
                articles () {
                  return this.$store.getters.articles
                }
              },
              template: '<div><div v-for="a in articles" class="blog">{{ a.title }}</div></div>'
            }
          }
        })
        expect(wrapper.findAll('.blog').length).toBe(1)
        expect(i18n.t('nav.blog')).not.toBe('nav.blog')
      })

      it('BlogEntry page renders', () => {
        const store = new Vuex.Store({
          getters: {
            articles: () => [
              { slug: 'post', title: 'First post', category: 'cat', author: 'auth', content: '...' }
            ]
          }
        })
        const wrapper = shallowMount(BlogEntry, {
          localVue,
          store,
          i18n,
          mocks: { $route: { params: { slug: 'post' } } },
          stubs: { 'v-chip': true, 'v-img': true }
        })
        expect(wrapper.text()).toContain('First post')
      })

      it('Book page renders', () => {
        shallowMount(Book, {
          localVue,
          i18n,
          stubs: { BookView: true }
        })
        expect(i18n.t('meta.bookTitle')).not.toBe('meta.bookTitle')
      })

      it('Faq page renders', () => {
        const store = new Vuex.Store({
          getters: {
            faqs: () => [
              { question: 'How many sessions will I need?', answer: 'a1' }
            ]
          }
        })
        const wrapper = shallowMount(Faq, {
          localVue,
          store,
          i18n,
          stubs: { SmartPicture: { template: '<div />' } }
        })
        expect(wrapper.text()).toContain('How many sessions will I need?')
        expect(i18n.t('faq.title')).not.toBe('faq.title')
      })

      it('There page renders', () => {
        shallowMount(There, {
          localVue,
          i18n,
          stubs: { GettingThere: true }
        })
        expect(i18n.t('meta.thereTitle')).not.toBe('meta.thereTitle')
      })
    })
  })
})

