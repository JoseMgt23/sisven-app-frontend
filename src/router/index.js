import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Products from '@/views/Products.vue'

import Categorias from '@/views/Categorias.vue'
import EditarCategoria from '@/component/Categorias/EditarCategoria'
import NewCategoria from '@/component/Categorias/NewCategoria'

import Customers from '@/view/Customers.vue'
import PayModes from '@/view/PayModes.vue'

import EditarProduct from '@/components/Products/EditarProduct.vue'
import NewProduct from '@/components/Products/NewProduct.vue'

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
    path: '/editar-product/:id',
    name: 'EditarProduct',
    component: EditarProduct
  },
  {
    path: '/add-product/',
    name: 'NewProduct',
    component: NewProduct
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: Categorias
  },
  {
    path: '/editar-categoria/:id',
    name: 'EditarCategoria',
    component: EditarCategoria
  },
  {
    path: '/add-categoria/',
    name: 'NewCategoria',
    component: NewCategoria
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers
  },
  {
    path: '/paymodes',
    name: 'PayModes',
    component: PayModes
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
