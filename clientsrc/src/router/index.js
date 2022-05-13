import Vue from 'vue'
import VueRouter from 'vue-router'
// @ts-ignore
import Home from '../views/Home.vue'
// @ts-ignore

import Session from '../views/Session.vue' // may need to change
// @ts-ignore
import Dashboard from '../views/Dashboard.vue'
// @ts-ignore
import SessionCreate from '../views/SessionCreate.vue'
// @ts-ignore
import SessionJoin from '../views/SessionJoin.vue'
// @ts-ignore
import SessionUniqueVisitor from '../views/SessionUniqueVisitor.vue'
// @ts-ignore
import SessionUniqueHost from '../views/SessionUniqueHost.vue'
// @ts-ignore
import { authGuard } from "@bcwdev/auth0-vue"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {

    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: authGuard,

    children: [
      {
        path: '/session',
        name: 'Session',
        component: Session
      },

      {
        path: '/session/create',
        name: 'SessionCreate',
        component: SessionCreate,
        // beforeEnter: authGuard
      },



    ]
  },

  {
    path: '/session/join',
    name: 'SessionJoin',
    component: SessionJoin,
    // beforeEnter: authGuard

  },
  {
    path: '/session/:code',
    name: 'SessionUniqueVisitor',
    component: SessionUniqueVisitor,
    // beforeEnter: authGuard
  },
  {
    path: '/session/:code/host',
    name: 'SessionUniqueHost',
    component: SessionUniqueHost,
    // beforeEnter: authGuard
  },
]



const router = new VueRouter({
  routes
})

export default router
