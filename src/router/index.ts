import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'

const router = createRouter({
  history: createWebHistory('/shipping-label/'),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      props: route => ({ ...route.query })
    }
  ]
})

export default router