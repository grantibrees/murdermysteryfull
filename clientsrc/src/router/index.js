import Vue from 'vue'
import VueRouter from 'vue-router'
// @ts-ignore
import Admin from '../views/Admin.vue'
import Welcome from '../views/Welcome.vue'
import Display from '../views/Display.vue'

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
]



const router = new VueRouter({
  routes
})

export default router
