import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'
import Home from '@/views/Home.vue'
import Blog from '@/views/Blog.vue'
import Welcome from '@/components/Welcome.vue'

const localVue = createLocalVue()
localVue.use(VueI18n)
localVue.use(Vuex)

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
      WelcomeName: 'Aimee',
      WelcomeTitle: 'Therapist',
      WelcomeTitle2: 'A bilingual French - English therapist located in Chatou',
      Welcome: '',
      Welcome2: '',
      pagination: { prev: '', next: '', page_of: 'Page {page} of {pages}' }
    }
  }
})

describe('Pages', () => {
  test('home page contains bilingual tagline', () => {
    const wrapper = shallowMount(Home, {
      localVue,
      i18n,
      stubs: {
        Welcome: Welcome,
        WelcomeAlert: true,
        Family: true,
        Asystem: true,
        NewToTherapy: true,
        MyApproach: true
      }
    })
    expect(wrapper.html()).toContain('A bilingual French - English therapist located in Chatou')
  })

  test('blog page lists blog articles', () => {
    const store = new Vuex.Store({
      getters: {
        articles: () => [
          { title: 'First post', content: 'Test content' }
        ]
      }
    })

    const wrapper = shallowMount(Blog, {
      localVue,
      i18n,
      store,
      stubs: {
        Banner: true,
        Articles: {
          template: '<div><feed/></div>',
          components: {
            feed: {
              template: '<div><feed-card v-for="a in articles" :key="a.title" /></div>',
              computed: {
                articles () {
                  return this.$store.getters.articles
                }
              },
              components: { 'feed-card': { template: '<div class="feed-card"></div>' } }
            }
          }
        }
      }
    })

    expect(wrapper.findAll('.feed-card').length).toBeGreaterThan(0)
  })
})
