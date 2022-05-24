import Vue from 'vue'
import VueRouter from 'vue-router'
// @ts-ignore
import Dashboard from '../views/Dashboard.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
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
