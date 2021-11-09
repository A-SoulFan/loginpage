import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/views/login.vue'
const ChangePsw = () => import('@/views/changePsw.vue')
const Register = () => import('@/views/register.vue')

const routes:RouteRecordRaw[] = [
  {path:'/',redirect:'/login'},
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/changePsw',
    name:'changePsw',
    component:ChangePsw
  },
  {
    path:'/register',
    name:'register',
    component:Register
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
