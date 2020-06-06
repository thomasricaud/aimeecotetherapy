import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Blog from '../views/Blog.vue'
import Welcome from '../views/Welcome.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
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
  ],
})
