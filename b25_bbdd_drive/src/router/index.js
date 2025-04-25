import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/Views/LoginPage.vue'
import Landing from '@/Views/LandingPage.vue'

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/landing', name: 'Landing', component: Landing }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
