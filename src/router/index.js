import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Blog from '@/views/Blog.vue'
import BlogEntry from '@/views/BlogEntry.vue'
import Book from '@/views/Book.vue'
import There from '@/views/There.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Home,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog,
    },
    {
      path: '/blogentry/:title/:content/:image',
      name: 'blogentry',
      component: BlogEntry,
    },
    {
      path: '/book',
      name: 'book',
      component: Book,
    },
    {
      path: '/there',
      name: 'there',
      component: There,
    },
  ],
})
