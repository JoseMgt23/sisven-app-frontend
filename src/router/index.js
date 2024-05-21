import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Products from '@/views/Products.vue'
import Categorias from '@/views/Categorias.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: Categorias
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
