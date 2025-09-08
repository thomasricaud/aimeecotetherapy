import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import Home from '@/views/Home.vue'
import Blog from '@/views/Blog.vue'
import Faq from '@/views/Faq.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueI18n)

function createI18n () {
  const messages = {
    en: {
      WelcomeTitle2: 'A bilingual French - English therapist located in Chatou (78400)'
      ,
      'faq.q1': 'What is couples therapy for one?',
      'faq.a1': 'a1',
      'faq.q2': 'q2',
      'faq.a2': 'a2',
      'faq.q3': 'q3',
      'faq.a3': 'a3',
      'faq.q4': 'q4',
      'faq.a4': 'a4',
      'faq.q5': 'q5',
      'faq.a5': 'a5',
      'faq.q6': 'q6',
      'faq.a6': 'a6',
      'faq.q7': 'q7',
      'faq.a7': 'a7',
      'faq.q8': 'q8',
      'faq.a8': 'a8',
      'faq.q9': 'q9',
      'faq.a9': 'a9',
      'faq.q10': 'q10',
      'faq.a10': 'a10',
      'faq.logoAlt': 'logo',
      'faq.title': 'FAQ'
    }
  }
  return new VueI18n({ locale: 'en', messages })
}

describe('Pages', () => {
  it('Home page contains tagline', () => {
    const i18n = createI18n()
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
    expect(wrapper.text()).toContain('A bilingual French - English therapist located in Chatou')
  })

  it('Blog page displays articles', () => {
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
      },
      mocks: {
        $t: msg => msg
      }
    })
    const blogs = wrapper.findAll('.blog')
    expect(blogs.length).toBe(1)
    expect(wrapper.text()).toContain('First post')
  })

  it('Faq page renders question', () => {
    const i18n = createI18n()
    const wrapper = shallowMount(Faq, {
      localVue,
      i18n,
      stubs: {
        SmartPicture: { template: '<div class="logo-stub" />' }
      }
    })
    expect(wrapper.text()).toContain('What is couples therapy for one?')
    expect(wrapper.find('.logo-stub').exists()).toBe(true)
  })
})
