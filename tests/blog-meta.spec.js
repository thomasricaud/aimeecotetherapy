import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueMeta from 'vue-meta'
import BlogEntry from '@/views/BlogEntry.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueMeta)

describe('BlogEntry meta tags', () => {
  it('renders title and description meta tag', () => {
    const store = new Vuex.Store({
      getters: {
        articles: () => [
          {
            title: 'Test Article',
            description: 'A short description',
            content: '<p>Content</p>'
          }
        ]
      }
    })

    const wrapper = shallowMount(BlogEntry, {
      localVue,
      store,
      mocks: {
        $route: { params: { title: 'Test Article' } }
      }
    })

    const meta = wrapper.vm.$meta().refresh()
    expect(meta.metaInfo.title).toBe('Test Article')
    const description = meta.metaInfo.meta.find(m => m.name === 'description')
    expect(description).toBeTruthy()
    expect(description.content).toBe('A short description')
  })
})
