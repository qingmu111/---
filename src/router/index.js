import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LoginIndex',
    component: () => import('@/views/Login')
  },
  {
    path: '/layout',
    name: 'LayoutIndex',
    component: () => import('@/views/Layout'),
    children: [
      { path: '/layout', redirect: '/layout/home' },

      {
        path: 'home',
        name: 'HomeIndex',
        component: () => import('@/views/Home')
      },
      {
        path: 'qa',
        name: 'QaIndex',
        component: () => import('@/views/Qa')
      },
      {
        path: 'vedio',
        name: 'VedioIndex',
        component: () => import('@/views/Vedio')
      },
      {
        path: 'my',
        name: 'MyIndex',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/search',
    name: 'SearchIndex',
    component: () => import('@/views/Search')
  },
  {
    path: '/article/:articleId',
    name: 'ArticleIndex',
    component: () => import('@/views/Article'),
    props: true

  }
]

const router = new VueRouter({
  routes
})

export default router
