import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'MainLayout'},
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'FormLayout'},
    component: () => import('../views/Login')
  },
  {
    path: '/registration',
    name: 'registration',
    meta: {layout: 'FormLayout'},
    component: () => import('../views/Registration')
  },
  { 
    path: '/404',
    name: '404',
    meta: {layout: 'MainLayout'},
    component: () => import('../views/NotFound')
  },
  {
    path: '/:id',
    name: 'userPage',
    meta: {layout: 'MainLayout'},
    component: () => import('../views/UserPage')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {

  await store.dispatch('auth/requaredToken')

  if ((to.path === '/login' || to.path === '/registration') && store.getters['auth/requaredToken']) {
    next('/')
  } else {
    next()
  }

})

export default router
