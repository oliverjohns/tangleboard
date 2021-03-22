import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Call from '../views/Call.vue'
import Caller from '../views/Caller.vue'
import Stream from '../views/Stream.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Call',
    name: 'Call',
    component: Call
  },
  {
    path: '/Caller',
    name: 'Caller',
    component: Caller
  },
  {
    path: '/Streams',
    name: 'Streams',
    component: Stream
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/threadviewer/:name/:timestamp',
    name: 'threadviewer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ThreadViewer.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
