import Vue from 'vue'
import VueRouter from 'vue-router'
// @ts-ignore
import Admin from '../views/Admin.vue'
import Welcome from '../views/Welcome.vue'
import Display from '../views/Display.vue'
import TVDisplay from '../views/TVDisplay'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/display',
    name: 'Display',
    component: Display,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/tvdisplay',
    name: 'TVDisplay',
    component: TVDisplay
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
