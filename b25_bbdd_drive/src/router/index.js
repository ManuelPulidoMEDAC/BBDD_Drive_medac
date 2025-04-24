import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/Views/LoginPage.vue'
import Landing from '@/Views/LandingPage.vue'

const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/login', name: 'login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
