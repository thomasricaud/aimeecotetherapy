import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueMeta from 'vue-meta'
import BlogEntry from '@/views/BlogEntry.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueMeta)

describe('BlogEntry meta tags', () => {
  it('renders title and description meta tags', () => {
    const store = new Vuex.Store({
      getters: {
        articles: () => [
          {
            title: 'Test Article',
            description: 'A short description',
            content: '<p>Content</p>',
            slug: 'test-article'
          }
        ]
      }
    })

    const wrapper = shallowMount(BlogEntry, {
      localVue,
      store,
      mocks: {
        $route: { params: { slug: 'test-article' } }
      }
    })

      const meta = wrapper.vm.$meta().refresh()
      expect(meta.metaInfo.title).toBe('Test Article')
      const description = meta.metaInfo.meta.find(m => m.name === 'description')
      expect(description).toBeTruthy()
      expect(description.content).toBe('A short description')

      const robots = meta.metaInfo.meta.find(m => m.name === 'robots')
      expect(robots).toBeTruthy()
      expect(robots.content).toBe('index,follow')

      const ogTitle = meta.metaInfo.meta.find(m => m.property === 'og:title')
      expect(ogTitle).toBeTruthy()
      expect(ogTitle.content).toBe('Test Article')

      const ogDesc = meta.metaInfo.meta.find(m => m.property === 'og:description')
      expect(ogDesc).toBeTruthy()
      expect(ogDesc.content).toBe('A short description')

      const twitterTitle = meta.metaInfo.meta.find(m => m.name === 'twitter:title')
      expect(twitterTitle).toBeTruthy()
      expect(twitterTitle.content).toBe('Test Article')

      const twitterDesc = meta.metaInfo.meta.find(m => m.name === 'twitter:description')
      expect(twitterDesc).toBeTruthy()
      expect(twitterDesc.content).toBe('A short description')
  })
})
