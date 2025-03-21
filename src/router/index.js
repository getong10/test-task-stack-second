import Vue from 'vue'
import VueRouter from 'vue-router'
import { authState } from '@/mixins/AuthMixin'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DashboardPage',
    component: () => import('../pages/DashboardPage.vue')
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../pages/LoginPage.vue')
  },
  {
    path: '/project',
    name: 'ProjectPage',
    component: () => import('../pages/ProjectPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isInvalidPath = to.path !== '/login' && to.path !== '/' && to.path !== '/project';
  
  if (to.path === '/login' && authState.isAuth) {
    next('/');
  } else if (to.path !== '/login' && !authState.isAuth) {
    next('/login');
  } else if (isInvalidPath) {
    next('/');
  } else {
    next();
  }
});

export default router