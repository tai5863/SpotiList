import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Visualize from '@/views/Visualize.vue'
import Playlist from '@/views/Playlist.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/visualize',
    name: 'Visualize',
    component: Visualize,
    props: (route) => {
      return { routeParams: route.query }
    }
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: Playlist,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
