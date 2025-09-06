import Vue from 'vue'
import vuetify from './plugins/vuetify'
import './plugins/base'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import VueYouTubeEmbed from 'vue-youtube-embed'
import VueMeta from 'vue-meta' // eslint-disable-line import/no-unresolved
 
Vue.use(VueYouTubeEmbed)
Vue.use(VueMeta)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

// Signal to prerenderer when the app finished rendering
if (typeof document !== 'undefined') {
  Vue.nextTick(() => {
    try { document.dispatchEvent(new Event('x-app-rendered')) } catch (e) {}
  })
}
