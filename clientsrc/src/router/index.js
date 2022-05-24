import Vue from 'vue'
import VueRouter from 'vue-router'
// @ts-ignore
import Dashboard from '../views/Dashboard.vue'
import Welcome from '../views/Welcome.vue'


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
  }
  // {

  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: Dashboard,

  //   children: [
  //     {
  //       path: '/session',
  //       name: 'Session',
  //       component: Session
  //     },
  //   ]
  // },
]



const router = new VueRouter({
  routes
})

export default router
