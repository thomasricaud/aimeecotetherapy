import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Blog from '@/views/Blog.vue'
import BlogEntry from '@/views/BlogEntry.vue'
import Book from '@/views/Book.vue'
import There from '@/views/There.vue'
import i18n from '@/i18n'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/en',
    },
    {
      path: '/:lang(fr|en|es)',
      component: { render: h => h('router-view') },
      beforeEnter: (to, from, next) => {
        const { lang } = to.params
        i18n.locale = lang
        next()
      },
      children: [
        { path: '', name: 'home', component: Home },
        { path: 'blog', name: 'blog', component: Blog },
        { path: 'blog/:slug', name: 'blogentry', component: BlogEntry },
        { path: 'book', name: 'book', component: Book },
        { path: 'there', name: 'there', component: There },
      ],
    },
  ],
})
