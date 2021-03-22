import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '../views/Start.vue'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Start',
    component: Start
  },
  {
    path: '/home/:boardName',
    name: 'Home',
    component: Home, 
    children: [
      // UserHome will be rendered inside User's <router-view>
      // when /user/:id is matched
      {
        path: 'threadviewer/:name/:timestamp',
        name: 'threadviewer',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/ThreadViewer.vue')
      },

      // ...other sub routes
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
