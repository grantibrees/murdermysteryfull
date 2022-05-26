import Vue from 'vue'
import VueRouter from 'vue-router'
// @ts-ignore
import Dashboard from '../views/Dashboard.vue'
import Welcome from '../views/Welcome.vue'
import Display from '../views/Display.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/display',
    name: 'Display',
    component: Display,

    children: [ 
      {
        path: '/cyberpunks',
        name: 'Cyberpunks'
      },
      {
        path: '/mole',
        name: 'Mole'
      }
    ] 
  }
]



const router = new VueRouter({
  routes
})

export default router
