import { createRouter, createWebHistory } from 'vue-router'
import VerifyPoints from '../views/VerifyPoints.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/point',
    },
    {
      path: '/point',
      name: 'point',
      component: VerifyPoints
    },
    {
      path: '/slider',
      name: 'slider',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/VerifySlider.vue')
    },
    {
      path: '/code',
      name: 'code',
      component: () => import('../views/VerifyCode.vue')
    }
  ]
})

export default router
